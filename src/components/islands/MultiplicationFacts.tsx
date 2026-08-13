import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  buildMultiplicationDeck,
  calculateMultiplicationXp,
  multiplicationFactKey,
  normalizeSelectedFactors,
  parseSpokenMultiplicationAnswer,
  requeueMissedMultiplicationFact,
  scoreMultiplicationAttempts,
  type MultiplicationFact,
  type MultiplicationInputMethod,
  type MultiplicationMasteryStats,
  type MultiplicationMode,
} from '../../lib/multiplication';
import {
  fetchMultiplicationOverview,
  getQueuedCompletionResult,
  submitMultiplicationSession,
  type OfflineSource,
} from './offline/api';
import { OfflineStatusPill } from './offline/OfflineStatusPill';
import { childSlugFromLocation } from './route-params';

type MasteryItem = {
  factor: number;
  multiplier: number;
  attempts: number;
  correct: number;
  correctStreak: number;
  accuracy: number;
  bestKeyboardResponseMs: number | null;
  lastResponseMs: number | null;
  lastInputMethod: MultiplicationInputMethod | null;
  lastPracticedAt: string;
  level: 'new' | 'learning' | 'fluent';
};

type MultiplicationSummary = {
  sessionsCompleted: number;
  factsCorrect: number;
  factsAttempted: number;
  xpTotal: number;
  fluentFacts: number;
  practicedFacts: number;
  best60Seconds: number;
  best120Seconds: number;
};

type SessionSummary = {
  id: string;
  mode: MultiplicationMode;
  selectedFactors: number[];
  durationSeconds: 60 | 120 | null;
  inputMethod: MultiplicationInputMethod | 'mixed';
  startedAt: string;
  completedAt: string;
  scoreCorrect: number;
  scoreTotal: number;
  accuracy: number;
  xpAwarded: number;
};

type MultiplicationOverview = {
  child: { slug: string; displayName: string; gradeLevel: number };
  summary: MultiplicationSummary;
  mastery: MasteryItem[];
  recentSessions: SessionSummary[];
};

type SubmittedAttempt = MultiplicationFact & {
  answer: number;
  responseMs: number;
  inputMethod: MultiplicationInputMethod;
  attemptedAt: string;
};

type CompletionEnvelope = {
  result: {
    session: SessionSummary;
    scoreCorrect: number;
    scoreTotal: number;
    accuracy: number;
    xpAwarded: number;
    streak: number;
    isNewPersonalBest: boolean;
    summary: MultiplicationSummary;
    mastery: MasteryItem[];
    syncStatus?: 'queued' | 'synced';
    clientAttemptId?: string;
  };
};

type SpeechRecognitionAlternativeLike = { transcript: string; confidence?: number };
type SpeechRecognitionResultLike = { length: number; [index: number]: SpeechRecognitionAlternativeLike };
type SpeechRecognitionEventLike = { results: { length: number; [index: number]: SpeechRecognitionResultLike } };
type SpeechRecognitionErrorLike = { error: string };
type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start(): void;
  abort(): void;
};
type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;
type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const ALL_FACTORS = Array.from({ length: 12 }, (_, index) => index + 1);
const DEFAULT_FACTORS = [2, 3, 4, 5, 6];

export default function MultiplicationFacts({ childSlug: childSlugProp }: { childSlug?: string }) {
  const childSlug = childSlugFromLocation(childSlugProp);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const attemptsRef = useRef<SubmittedAttempt[]>([]);
  const deckRef = useRef<MultiplicationFact[]>([]);
  const questionStartedAtRef = useRef(0);
  const startedAtRef = useRef('');
  const finishingRef = useRef(false);
  const finishSessionRef = useRef<() => void>(() => {});

  const [overview, setOverview] = useState<MultiplicationOverview | null>(null);
  const [dataSource, setDataSource] = useState<OfflineSource>('network');
  const [phase, setPhase] = useState<'setup' | 'running' | 'saving' | 'complete'>('setup');
  const [selectedFactors, setSelectedFactors] = useState<number[]>(DEFAULT_FACTORS);
  const [mode, setMode] = useState<MultiplicationMode>('practice');
  const [durationSeconds, setDurationSeconds] = useState<60 | 120>(60);
  const [preferredInput, setPreferredInput] = useState<MultiplicationInputMethod>('keyboard');
  const [fact, setFact] = useState<MultiplicationFact | null>(null);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState<SubmittedAttempt[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastResult, setLastResult] = useState<{ correct: boolean; expected: number; fact: MultiplicationFact } | null>(null);
  const [completion, setCompletion] = useState<CompletionEnvelope['result'] | null>(null);
  const [error, setError] = useState('');
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');

  const masteryMap = useMemo(
    () =>
      new Map<string, MultiplicationMasteryStats>(
        (overview?.mastery ?? []).map((item) => [
          multiplicationFactKey(item),
          {
            attempts: item.attempts,
            correct: item.correct,
            correctStreak: item.correctStreak,
            bestKeyboardResponseMs: item.bestKeyboardResponseMs,
          },
        ]),
      ),
    [overview],
  );

  useEffect(() => {
    if (!childSlug) {
      setError('Child path not found.');
      return;
    }

    const speechWindow = window as SpeechWindow;
    const supportsVoice = Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition);
    const saved = loadSettings(childSlug);
    if (saved) {
      setSelectedFactors(saved.selectedFactors);
      setMode(saved.mode);
      setDurationSeconds(saved.durationSeconds);
      setPreferredInput(saved.preferredInput === 'voice' && !supportsVoice ? 'keyboard' : saved.preferredInput);
    }

    fetchMultiplicationOverview<MultiplicationOverview>(childSlug)
      .then((result) => {
        setOverview(result.data);
        setDataSource(result.source);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Could not load multiplication facts.'));

    setVoiceAvailable(supportsVoice);
    return () => recognitionRef.current?.abort();
  }, [childSlug]);

  useEffect(() => {
    if (!childSlug) return;
    saveSettings(childSlug, { selectedFactors, mode, durationSeconds, preferredInput });
  }, [childSlug, selectedFactors, mode, durationSeconds, preferredInput]);

  useEffect(() => {
    if (phase !== 'running' || mode !== 'timed') return undefined;
    const deadline = Date.now() + timeLeft * 1_000;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1_000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        finishSessionRef.current();
      }
    }, 200);
    return () => window.clearInterval(timer);
  }, [phase, mode]);

  useEffect(() => {
    if (phase !== 'running' || preferredInput !== 'keyboard') return undefined;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [fact, phase, preferredInput]);

  useEffect(() => {
    if (completion?.syncStatus !== 'queued' || !completion.clientAttemptId || !childSlug) return undefined;
    const clientAttemptId = completion.clientAttemptId;
    const refreshSyncedCompletion = async () => {
      try {
        const queued = await getQueuedCompletionResult<CompletionEnvelope>(clientAttemptId);
        if (queued?.status !== 'synced' || !queued.syncedResult) return;
        setCompletion(queued.syncedResult.result);
        const refreshed = await fetchMultiplicationOverview<MultiplicationOverview>(childSlug);
        setOverview(refreshed.data);
        setDataSource(refreshed.source);
      } catch {
        // The sync status pill retains the retry action if refreshing progress fails.
      }
    };
    const handleOfflineUpdate = () => void refreshSyncedCompletion();
    window.addEventListener('buddy-blocks-offline-updated', handleOfflineUpdate);
    void refreshSyncedCompletion();
    return () => window.removeEventListener('buddy-blocks-offline-updated', handleOfflineUpdate);
  }, [childSlug, completion?.clientAttemptId, completion?.syncStatus]);

  finishSessionRef.current = () => void finishSession();

  if (error && !overview) {
    return (
      <section className="block-card p-6">
        <h1 className="text-4xl">Facts Lab paused</h1>
        <p className="mt-4 font-black text-berryDark">{error}</p>
        <a className="secondary-button mt-6" href={`/kid/${childSlug}/`}>Back Home</a>
      </section>
    );
  }
  if (!overview) return <p className="text-xl font-black text-muted">Loading the Facts Lab...</p>;

  if (phase === 'complete' && completion) {
    const queued = completion.syncStatus === 'queued';
    const difficultFacts = completion.mastery
      .filter((item) => item.level !== 'fluent')
      .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
      .slice(0, 6);
    return (
      <section className="mx-auto max-w-5xl space-y-5">
        <OfflineStatusPill compact />
        <article className="block-card p-6 text-center sm:p-8">
          <div className="mx-auto flex w-fit flex-wrap justify-center gap-2">
            <span className="stat-chip bg-reward">Facts saved</span>
            {queued && <span className="stat-chip bg-[#fff3eb]">Waiting to sync</span>}
            {completion.isNewPersonalBest && <span className="stat-chip bg-[#d9fff5]">New record</span>}
          </div>
          <h1 className="mt-4 text-[clamp(3rem,9vw,6rem)]">Nice fact stack!</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-extrabold text-muted">
            You answered {completion.scoreCorrect} of {completion.scoreTotal} facts correctly.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultStat label="Correct" value={`${completion.scoreCorrect}/${completion.scoreTotal}`} />
            <ResultStat label="Accuracy" value={`${completion.accuracy}%`} />
            <ResultStat label="XP earned" value={`${completion.xpAwarded} XP`} />
            <ResultStat label="Fluent facts" value={`${completion.summary.fluentFacts}/144`} />
          </div>
          {difficultFacts.length > 0 && (
            <div className="mx-auto mt-6 max-w-3xl rounded-lg border-[3px] border-ink bg-[#fff8d8] p-5 text-left">
              <h2 className="text-2xl">Keep building these</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {difficultFacts.map((item) => (
                  <span className="stat-chip bg-white" key={multiplicationFactKey(item)}>
                    {item.factor} × {item.multiplier}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="primary-button" type="button" onClick={startSession}>Practice Same Set</button>
            <button className="secondary-button" type="button" onClick={returnToSetup}>Change Setup</button>
            <a className="secondary-button" href={`/kid/${childSlug}/`}>Home</a>
          </div>
        </article>
      </section>
    );
  }

  if ((phase === 'running' || phase === 'saving') && fact) {
    const correctCount = attempts.filter((item) => item.answer === item.factor * item.multiplier).length;
    const timeProgress = mode === 'timed' ? Math.round((timeLeft / durationSeconds) * 100) : 100;
    return (
      <section className="mx-auto max-w-4xl space-y-5">
        <OfflineStatusPill compact />
        <header className="block-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="stat-chip w-fit">{mode === 'timed' ? `${durationSeconds / 60}-minute Time Test` : 'Endless Practice'}</p>
              <h1 className="mt-3 text-[clamp(2.5rem,7vw,4.8rem)]">Multiplication Facts</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {mode === 'timed' && <span className="stat-chip" aria-live="off">{timeLeft}s</span>}
              <span className="stat-chip">{correctCount} correct</span>
              <span className="stat-chip">{attempts.length} answered</span>
            </div>
          </div>
          {mode === 'timed' && (
            <div className="mt-5 progress-rail" aria-label="Time remaining">
              <span className="progress-fill" style={{ width: `${timeProgress}%` }} />
            </div>
          )}
        </header>

        {error && (
          <p className="rounded-lg border-[3px] border-ink bg-[#ffe1ea] p-4 text-center font-black text-berryDark" role="alert">
            {error} Your answers are still here, so you can try saving again.
          </p>
        )}

        <article className="block-card p-5 sm:p-8">
          <div className="flex justify-end">
            <button className="secondary-button px-4 py-2" type="button" disabled={phase === 'saving' || attempts.length === 0} onClick={() => void finishSession()}>
              Finish
            </button>
          </div>
          <form className="mt-4" onSubmit={submitTypedAnswer}>
            <label className="block text-center text-[clamp(4.5rem,16vw,9rem)] font-black leading-none text-ink" htmlFor="facts-answer">
              {fact.factor} × {fact.multiplier} =
            </label>
            <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                id="facts-answer"
                className="min-h-[76px] min-w-0 flex-1 rounded-lg border-[3px] border-ink bg-white px-4 text-center text-4xl font-black outline-none focus:ring-4 focus:ring-reward"
                value={answer}
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={phase === 'saving' || listening}
                onInput={(event) => setAnswer((event.currentTarget as HTMLInputElement).value.replace(/[^0-9]/g, '').slice(0, 3))}
                autoComplete="off"
                enterKeyHint="done"
              />
              <button className="primary-button min-h-[76px]" type="submit" disabled={phase === 'saving' || listening || !answer}>
                Enter
              </button>
              {voiceAvailable && (
                <button
                  className={`secondary-button min-h-[76px] px-5 ${listening ? 'bg-reward' : ''}`}
                  type="button"
                  disabled={phase === 'saving' || listening}
                  aria-pressed={listening}
                  onClick={listenForAnswer}
                >
                  {listening ? 'Listening…' : '🎤 Speak'}
                </button>
              )}
            </div>
          </form>
          {voiceMessage && <p className="mt-3 text-center font-black text-muted" aria-live="polite">{voiceMessage}</p>}
          {lastResult && (
            <div
              className={`mt-5 rounded-lg border-[3px] border-ink p-4 text-center text-xl font-black ${lastResult.correct ? 'bg-[#d9fff5]' : 'bg-[#ffe1ea]'}`}
              aria-live="polite"
            >
              {lastResult.correct
                ? `Correct — ${lastResult.fact.factor} × ${lastResult.fact.multiplier} = ${lastResult.expected}.`
                : `${lastResult.fact.factor} × ${lastResult.fact.multiplier} = ${lastResult.expected}. ${strategyHint(lastResult.fact)}`}
            </div>
          )}
          {preferredInput === 'voice' && voiceAvailable && (
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-bold text-muted">
              Voice recognition is handled by your browser and may use its online speech service. Buddy Blocks stores only the number answer, never audio or the transcript.
            </p>
          )}
        </article>
      </section>
    );
  }

  const weakFactors = factorsNeedingPractice(overview.mastery);
  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <OfflineStatusPill compact />
      <header className="block-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="stat-chip bg-reward">For every grade</span>
              {dataSource === 'cache' && <span className="stat-chip bg-[#fff3eb]">Cached</span>}
            </div>
            <h1 className="mt-4 text-[clamp(3.2rem,9vw,6.8rem)]">Facts Lab</h1>
            <p className="mt-3 max-w-3xl text-lg font-extrabold text-muted">
              Pick the times tables you want, then practice without a clock or race your best time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="stat-chip">{overview.summary.fluentFacts}/144 fluent</span>
            <span className="stat-chip">Best minute: {overview.summary.best60Seconds}</span>
            <span className="stat-chip">Best 2 min: {overview.summary.best120Seconds}</span>
            <span className="stat-chip">{overview.summary.xpTotal} facts XP</span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="block-card p-5 sm:p-7">
          <p className="stat-chip w-fit">Step 1</p>
          <h2 className="mt-3 text-4xl">Choose your tables</h2>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {ALL_FACTORS.map((factorNumber) => {
              const selected = selectedFactors.includes(factorNumber);
              const fluent = overview.mastery.filter((item) => item.factor === factorNumber && item.level === 'fluent').length;
              return (
                <button
                  key={factorNumber}
                  type="button"
                  aria-pressed={selected}
                  className={`min-h-[78px] rounded-lg border-[3px] border-ink text-3xl font-black shadow-[4px_4px_0_var(--block-shadow)] transition ${selected ? 'bg-reward' : 'bg-white hover:bg-[#fff8d8]'}`}
                  onClick={() => toggleFactor(factorNumber)}
                >
                  {factorNumber}s
                  <span className="mt-1 block text-xs uppercase text-muted">{fluent}/12</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <PresetButton label="All 1–12" onClick={() => setSelectedFactors(ALL_FACTORS)} />
            <PresetButton label="2s–5s" onClick={() => setSelectedFactors([2, 3, 4, 5])} />
            <PresetButton label="6s–9s" onClick={() => setSelectedFactors([6, 7, 8, 9])} />
            <PresetButton label="10s–12s" onClick={() => setSelectedFactors([10, 11, 12])} />
            <PresetButton label="Needs practice" onClick={() => setSelectedFactors(weakFactors)} />
            <PresetButton label="Clear" onClick={() => setSelectedFactors([])} />
          </div>
          <p className={`mt-4 font-black ${selectedFactors.length ? 'text-muted' : 'text-berryDark'}`}>
            {selectedFactors.length ? `${selectedFactors.length} table${selectedFactors.length === 1 ? '' : 's'} selected` : 'Choose at least one table.'}
          </p>
        </article>

        <article className="block-card p-5 sm:p-7">
          <p className="stat-chip w-fit">Step 2</p>
          <h2 className="mt-3 text-4xl">Choose a mode</h2>
          <div className="mt-5 grid gap-3">
            <ModeButton
              selected={mode === 'practice'}
              title="Endless Practice"
              description="No clock. Missed facts return soon with a strategy hint."
              onClick={() => setMode('practice')}
            />
            <ModeButton
              selected={mode === 'timed'}
              title="Time Test"
              description="Answer as many as you can in one or two minutes."
              onClick={() => setMode('timed')}
            />
          </div>
          {mode === 'timed' && (
            <div className="mt-4 flex gap-3">
              {[60, 120].map((seconds) => (
                <button
                  key={seconds}
                  className={`secondary-button flex-1 ${durationSeconds === seconds ? 'bg-reward' : ''}`}
                  type="button"
                  aria-pressed={durationSeconds === seconds}
                  onClick={() => setDurationSeconds(seconds as 60 | 120)}
                >
                  {seconds / 60} minute{seconds === 60 ? '' : 's'}
                </button>
              ))}
            </div>
          )}

          <h3 className="mt-6 text-2xl">Answer with</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ModeButton selected={preferredInput === 'keyboard'} title="Number pad" description="Type or tap the answer." onClick={() => setPreferredInput('keyboard')} compact />
            <ModeButton
              selected={preferredInput === 'voice'}
              title="Speak answer"
              description={voiceAvailable ? 'Tap the mic and say the number.' : 'Not supported by this browser.'}
              onClick={() => voiceAvailable && setPreferredInput('voice')}
              disabled={!voiceAvailable}
              compact
            />
          </div>
          {preferredInput === 'voice' && (
            <p className="mt-4 rounded-lg border-2 border-line bg-[#fff8d8] p-3 text-sm font-bold text-muted">
              Your browser may send microphone audio to its speech provider. Buddy Blocks never stores audio or transcripts. The number pad always remains available.
            </p>
          )}
          <button className="primary-button mt-6 w-full" type="button" disabled={selectedFactors.length === 0} onClick={startSession}>
            Start {mode === 'timed' ? 'Time Test' : 'Practice'}
          </button>
        </article>
      </div>

      <MasteryOverview mastery={overview.mastery} />
    </section>
  );

  function toggleFactor(factorNumber: number) {
    setSelectedFactors((current) =>
      current.includes(factorNumber)
        ? current.filter((value) => value !== factorNumber)
        : normalizeSelectedFactors([...current, factorNumber]),
    );
  }

  function startSession() {
    if (selectedFactors.length === 0) return;
    recognitionRef.current?.abort();
    const deck = buildMultiplicationDeck(selectedFactors, {
      adaptive: mode === 'practice',
      mastery: masteryMap,
    });
    const [first, ...remaining] = deck;
    if (!first) return;
    attemptsRef.current = [];
    deckRef.current = remaining;
    startedAtRef.current = new Date().toISOString();
    questionStartedAtRef.current = performance.now();
    finishingRef.current = false;
    setAttempts([]);
    setCompletion(null);
    setFact(first);
    setAnswer('');
    setLastResult(null);
    setVoiceMessage('');
    setTimeLeft(durationSeconds);
    setError('');
    setPhase('running');
  }

  function submitTypedAnswer(event: Event) {
    event.preventDefault();
    if (!answer) return;
    submitFactAnswer(Number(answer), 'keyboard');
  }

  function submitFactAnswer(numericAnswer: number, inputMethod: MultiplicationInputMethod) {
    if (finishingRef.current || phase !== 'running' || !fact || !Number.isInteger(numericAnswer)) return;
    const expected = fact.factor * fact.multiplier;
    const correct = numericAnswer === expected;
    const nextAttempt: SubmittedAttempt = {
      ...fact,
      answer: numericAnswer,
      responseMs: Math.min(600_000, Math.max(0, Math.round(performance.now() - questionStartedAtRef.current))),
      inputMethod,
      attemptedAt: new Date().toISOString(),
    };
    const nextAttempts = [...attemptsRef.current, nextAttempt];
    attemptsRef.current = nextAttempts;
    setAttempts(nextAttempts);
    setAnswer('');
    setVoiceMessage(inputMethod === 'voice' ? `Heard ${numericAnswer}.` : '');
    setLastResult({ correct, expected, fact });

    let nextDeck = deckRef.current;
    if (mode === 'practice' && !correct) nextDeck = requeueMissedMultiplicationFact(nextDeck, fact, 3);
    if (nextDeck.length === 0) {
      nextDeck = buildMultiplicationDeck(selectedFactors, {
        previousFact: fact,
        adaptive: mode === 'practice',
        mastery: masteryMap,
      });
    }
    const [nextFact, ...remaining] = nextDeck;
    deckRef.current = remaining;
    setFact(nextFact ?? fact);
    questionStartedAtRef.current = performance.now();
  }

  async function finishSession() {
    if (finishingRef.current || phase === 'saving' || phase === 'complete') return;
    finishingRef.current = true;
    recognitionRef.current?.abort();
    setPhase('saving');
    const submittedAttempts = attemptsRef.current;
    const config = {
      mode,
      selectedFactors,
      durationSeconds: mode === 'timed' ? durationSeconds : null,
    } as const;
    const scored = scoreMultiplicationAttempts(config, submittedAttempts);
    const localResult = buildLocalCompletion(scored.scoreCorrect, scored.scoreTotal);

    try {
      const response = await submitMultiplicationSession<CompletionEnvelope>({
        childSlug,
        body: {
          mode,
          selectedFactors,
          durationSeconds: mode === 'timed' ? durationSeconds : null,
          inputMethod: preferredInput,
          startedAt: startedAtRef.current || new Date().toISOString(),
          attempts: submittedAttempts,
        },
        localResult,
      });
      setCompletion(response.data.result);
      if (response.source === 'network') {
        const refreshed = await fetchMultiplicationOverview<MultiplicationOverview>(childSlug);
        setOverview(refreshed.data);
      }
      setPhase('complete');
    } catch (reason) {
      finishingRef.current = false;
      setError(reason instanceof Error ? reason.message : 'Could not save this facts session.');
      setPhase('running');
    }
  }

  function buildLocalCompletion(scoreCorrect: number, scoreTotal: number): CompletionEnvelope {
    if (!overview) throw new Error('Multiplication progress is not loaded.');
    const xpAwarded = calculateMultiplicationXp(scoreCorrect, scoreTotal);
    return {
      result: {
        session: {
          id: `pending_${Date.now()}`,
          mode,
          selectedFactors,
          durationSeconds: mode === 'timed' ? durationSeconds : null,
          inputMethod: preferredInput,
          startedAt: startedAtRef.current,
          completedAt: new Date().toISOString(),
          scoreCorrect,
          scoreTotal,
          accuracy: scoreTotal > 0 ? Math.round((scoreCorrect / scoreTotal) * 100) : 0,
          xpAwarded,
        },
        scoreCorrect,
        scoreTotal,
        accuracy: scoreTotal > 0 ? Math.round((scoreCorrect / scoreTotal) * 100) : 0,
        xpAwarded,
        streak: 0,
        isNewPersonalBest: false,
        summary: {
          ...overview.summary,
          sessionsCompleted: overview.summary.sessionsCompleted + 1,
          factsCorrect: overview.summary.factsCorrect + scoreCorrect,
          factsAttempted: overview.summary.factsAttempted + scoreTotal,
          xpTotal: overview.summary.xpTotal + xpAwarded,
        },
        mastery: overview.mastery,
        syncStatus: 'queued',
      },
    };
  }

  function listenForAnswer() {
    if (!voiceAvailable || phase !== 'running' || listening) return;
    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const result = event.results[0];
      const alternatives = Array.from({ length: result?.length ?? 0 }, (_, index) => result[index]?.transcript ?? '');
      const parsed = parseSpokenMultiplicationAnswer(alternatives);
      if (parsed === null) {
        setVoiceMessage("I couldn't hear a number. Try again or use the number pad.");
        return;
      }
      submitFactAnswer(parsed, 'voice');
    };
    recognition.onerror = (event) => {
      const message = event.error === 'not-allowed'
        ? 'Microphone permission is off. Use the number pad or allow microphone access.'
        : event.error === 'no-speech'
          ? "I didn't hear an answer. Tap the mic and try again."
          : 'Voice answer was not available. Use the number pad or try again.';
      setVoiceMessage(message);
    };
    recognition.onend = () => setListening(false);
    setVoiceMessage('Say just the number, like “forty-two.”');
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
      setVoiceMessage('Voice answer could not start. Use the number pad or try again.');
    }
  }

  function returnToSetup() {
    setCompletion(null);
    setFact(null);
    setPhase('setup');
  }
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="stat-chip cursor-pointer bg-white hover:bg-reward" type="button" onClick={onClick}>{label}</button>;
}

function ModeButton({
  selected,
  title,
  description,
  onClick,
  compact = false,
  disabled = false,
}: {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
  compact?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`rounded-lg border-[3px] border-ink p-4 text-left shadow-[4px_4px_0_var(--block-shadow)] transition ${selected ? 'bg-reward' : 'bg-white hover:bg-[#fff8d8]'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`block font-black ${compact ? 'text-lg' : 'text-2xl'}`}>{title}</span>
      <span className="mt-1 block font-bold text-muted">{description}</span>
    </button>
  );
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border-[3px] border-ink bg-white p-4 text-left shadow-[4px_4px_0_var(--block-shadow)]">
      <p className="text-sm font-black uppercase text-muted">{label}</p>
      <p className="mt-1 text-3xl font-black">{value}</p>
    </div>
  );
}

function MasteryOverview({ mastery }: { mastery: MasteryItem[] }) {
  return (
    <section className="soft-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="stat-chip w-fit">Learning intelligence</p>
          <h2 className="mt-3 text-4xl">Table mastery</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-black">
          <span className="stat-chip bg-[#f2f2f7]">New</span>
          <span className="stat-chip bg-[#fff3b0]">Learning</span>
          <span className="stat-chip bg-[#d9fff5]">Fluent</span>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ALL_FACTORS.map((factor) => {
          const tableFacts = mastery.filter((item) => item.factor === factor);
          const fluent = tableFacts.filter((item) => item.level === 'fluent').length;
          const learning = tableFacts.filter((item) => item.level === 'learning').length;
          return (
            <div className="rounded-lg border-2 border-line bg-white p-4" key={factor}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl">{factor}s</h3>
                <span className="font-black text-muted">{fluent}/12</span>
              </div>
              <div className="mt-3 grid grid-cols-12 gap-1" aria-label={`${factor}s table mastery`}>
                {ALL_FACTORS.map((multiplier) => {
                  const item = tableFacts.find((candidate) => candidate.multiplier === multiplier);
                  const level = item?.level ?? 'new';
                  const color = level === 'fluent' ? 'bg-[#18bca4]' : level === 'learning' ? 'bg-[#ffd84d]' : 'bg-[#e8e7ef]';
                  return (
                    <span
                      key={multiplier}
                      className={`aspect-square rounded-sm border border-ink/20 ${color}`}
                      title={`${factor} × ${multiplier}: ${level}`}
                    />
                  );
                })}
              </div>
              <p className="mt-2 text-sm font-bold text-muted">{learning} learning · {12 - fluent - learning} new</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function factorsNeedingPractice(mastery: MasteryItem[]) {
  const result = ALL_FACTORS.filter((factor) => {
    const tableFacts = mastery.filter((item) => item.factor === factor);
    return tableFacts.length === 0 || tableFacts.some((item) => item.level !== 'fluent');
  });
  return result.length > 0 ? result : ALL_FACTORS;
}

function strategyHint(fact: MultiplicationFact) {
  if (fact.factor === 1 || fact.multiplier === 1) return 'Any number times 1 stays the same.';
  if (fact.factor === 10 || fact.multiplier === 10) return 'Multiplying by 10 adds a zero.';
  if (fact.multiplier > 5) {
    return `Try ${fact.factor} × 5, then add ${fact.factor} another ${fact.multiplier - 5} time${fact.multiplier - 5 === 1 ? '' : 's'}.`;
  }
  return `Count ${fact.multiplier} groups of ${fact.factor}.`;
}

function saveSettings(
  childSlug: string,
  settings: {
    selectedFactors: number[];
    mode: MultiplicationMode;
    durationSeconds: 60 | 120;
    preferredInput: MultiplicationInputMethod;
  },
) {
  try {
    localStorage.setItem(`buddy-blocks-multiplication:${childSlug}`, JSON.stringify(settings));
  } catch {
    // Preferences are optional when storage is unavailable.
  }
}

function loadSettings(childSlug: string) {
  try {
    const raw = localStorage.getItem(`buddy-blocks-multiplication:${childSlug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      selectedFactors?: number[];
      mode?: MultiplicationMode;
      durationSeconds?: number;
      preferredInput?: MultiplicationInputMethod;
    };
    const selectedFactors = normalizeSelectedFactors(parsed.selectedFactors ?? DEFAULT_FACTORS);
    return {
      selectedFactors: selectedFactors.length > 0 ? selectedFactors : DEFAULT_FACTORS,
      mode: parsed.mode === 'timed' ? 'timed' as const : 'practice' as const,
      durationSeconds: parsed.durationSeconds === 120 ? 120 as const : 60 as const,
      preferredInput: parsed.preferredInput === 'voice' ? 'voice' as const : 'keyboard' as const,
    };
  } catch {
    return null;
  }
}
