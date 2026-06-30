import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  evaluateAnswer,
  getAccentFeedback,
  getCorrectAnswerLabel,
  type ConjugationGridPayload,
  type ConstructedResponsePayload,
  type DialogueBuilderPayload,
  type ErrorCorrectionPayload,
  type FlashCardPayload,
  type FillBlankPayload,
  type LessonQuestion,
  type ListeningQuestionPayload,
  type MatchPairsPayload,
  type MultiBlankClozePayload,
  type MultipleChoicePayload,
  type OrderItemsPayload,
  type PassageQuestionPayload,
  type SpeakingPromptPayload,
  type TextInputPayload,
} from '../../lib/lesson-engine';
import {
  DEFAULT_MAD_MINUTE_CONFIG,
  isMadMinuteConfig,
  type LessonConfig,
  type LessonKind,
  type MadMinuteConfig,
  type StandardLessonConfig,
} from '../../lib/lesson-config-core';
import { generateMadMinuteFact } from '../../lib/mad-minute';
import { LessonIntro } from '../lesson/LessonIntro';
import { prepareLessonQueue, hashString, nextSeed, type QueueItem } from '../lesson/lesson-flow';
import { clearMatchForLeft } from '../lesson/match-pairs';
import { AudioBlock, QuestionMediaDisplay, mediaFromQuestion } from '../lesson/media';
import { fetchApi } from './api';
import { lessonRouteParams } from './route-params';

type LessonData = {
  child: {
    slug: string;
    displayName: string;
  };
  heartsStart: number;
  progress: {
    bestScoreCorrect: number;
    bestScoreTotal: number;
  };
  lesson: {
    id: string;
    title: string;
    kind: LessonKind;
    config: LessonConfig | null;
    xpBase: number;
    unit: { title: string };
    track: {
      slug: string;
      title: string;
      color: string;
      accent: string;
    };
    questions: LessonQuestion[];
  };
};

type MadMinuteAttempt = {
  factor: number;
  multiplier: number;
  answer: number;
};

type FirstAttempt = {
  questionId: string;
  answer: unknown;
};

type CompletionResult = {
  result: {
    lessonAttemptId: string;
    scoreCorrect: number;
    scoreTotal: number;
    xpAwarded: number;
    heartsRemaining: number;
    streak: number;
    bestScoreCorrect?: number;
    goalCorrect?: number;
    nextLesson: null | {
      id: string;
      title: string;
      trackTitle: string;
      unitTitle: string;
    };
  };
};

type Feedback = {
  correct: boolean;
  review: boolean;
  answerLabel: string;
  explanation?: string | null;
  accentFeedback?: string | null;
};

type SpeakingAnswer = {
  recorded?: boolean;
  note?: string;
  transcript?: string;
};

export default function LessonPlayer({
  childSlug: childSlugProp,
  lessonId: lessonIdProp,
}: {
  childSlug?: string;
  lessonId?: string;
}) {
  const { childSlug, lessonId } = lessonRouteParams(childSlugProp, lessonIdProp);
  const [data, setData] = useState<LessonData | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [position, setPosition] = useState(0);
  const [firstAttempts, setFirstAttempts] = useState<FirstAttempt[]>([]);
  const [hearts, setHearts] = useState(5);
  const [startedAt] = useState(() => new Date().toISOString());
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [completion, setCompletion] = useState<CompletionResult['result'] | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const [choiceAnswer, setChoiceAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedLeft, setSelectedLeft] = useState('');
  const [matchAnswer, setMatchAnswer] = useState<Record<string, string>>({});
  const [orderAnswer, setOrderAnswer] = useState<string[]>([]);
  const [multiBlankAnswer, setMultiBlankAnswer] = useState<string[]>([]);
  const [gridAnswer, setGridAnswer] = useState<Record<string, string[]>>({});
  const [speakingAnswer, setSpeakingAnswer] = useState<SpeakingAnswer>({});

  useEffect(() => {
    if (!childSlug || !lessonId) {
      setError('Lesson path not found.');
      return;
    }

    fetchApi<LessonData>(`/api/children/${childSlug}/lessons/${lessonId}`)
      .then((lessonData) => {
        const standardConfig = getStandardLessonConfig(lessonData.lesson.config);
        setData(lessonData);
        setHearts(lessonData.heartsStart);
        setIntroComplete(!standardConfig?.intro?.length);
        setQueue(prepareLessonQueue(lessonData.lesson.questions, standardConfig, lessonData.lesson.id));
      })
      .catch((reason) => setError(reason.message));
  }, [childSlug, lessonId]);

  const current = queue[position];
  const progress = queue.length ? Math.round(((position + (feedback ? 1 : 0)) / queue.length) * 100) : 0;
  const firstAttemptIds = useMemo(() => new Set(firstAttempts.map((attempt) => attempt.questionId)), [firstAttempts]);
  const standardConfig = getStandardLessonConfig(data?.lesson.config ?? null);

  if (error) {
    return (
      <section className="block-card p-6">
        <h1 className="text-4xl">Lesson paused</h1>
        <p className="mt-4 font-black text-berryDark">{error}</p>
        <a className="secondary-button mt-6" href={`/kid/${childSlug}/`}>
          Back Home
        </a>
      </section>
    );
  }

  if (!data) return <p className="text-xl font-black text-muted">Snapping lesson blocks together...</p>;

  if (completion) {
    const isMadMinute = data.lesson.kind === 'mad-minute';
    const perfectLesson = !isMadMinute && completion.scoreCorrect === completion.scoreTotal;
    const goalCorrect =
      completion.goalCorrect ??
      (isMadMinuteConfig(data.lesson.config) ? data.lesson.config.goalCorrect : DEFAULT_MAD_MINUTE_CONFIG.goalCorrect);
    const bestScoreCorrect = completion.bestScoreCorrect ?? Math.max(data.progress.bestScoreCorrect, completion.scoreCorrect);
    const factLabel = completion.scoreCorrect === 1 ? 'fact' : 'facts';

    return (
      <section className="completion-stage relative mx-auto max-w-5xl overflow-hidden rounded-lg px-1 py-2">
        <CompletionFireworks />
        <div className="block-card relative overflow-hidden p-6 text-center sm:p-8">
          <div className="completion-ribbon" aria-hidden="true" />
          <div className="relative">
            <div className="mx-auto w-fit">
              <MoxieCelebration perfect={perfectLesson} />
            </div>
            <p className="stat-chip mx-auto mt-4 w-fit bg-reward">Lesson complete</p>
            <h1 className="mt-4 text-[clamp(3.4rem,9vw,6.8rem)]">
              {isMadMinute ? 'Mad Minute done!' : perfectLesson ? 'Perfect stack!' : 'Nice build!'}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-lg font-black text-muted">
              {isMadMinute
                ? `You solved ${completion.scoreCorrect} multiplication ${factLabel} before the clock ran out.`
                : perfectLesson
                  ? 'Every answer snapped into place. Moxie added a shiny bonus block.'
                  : 'You stacked another skill block and saved your progress.'}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CompletionStat icon="xp" label="XP earned" value={`${completion.xpAwarded} XP`} />
              <CompletionStat
                icon="score"
                label={isMadMinute ? 'Correct facts' : 'Correct blocks'}
                value={`${completion.scoreCorrect}/${completion.scoreTotal}`}
              />
              <CompletionStat icon="streak" label="Streak stack" value={`${completion.streak} day${completion.streak === 1 ? '' : 's'}`} />
              {isMadMinute ? (
                <CompletionStat icon="record" label="Best record" value={`${bestScoreCorrect}/${goalCorrect}`} />
              ) : (
                <CompletionStat icon="heart" label="Hearts left" value={`${completion.heartsRemaining}`} />
              )}
            </div>

            {completion.nextLesson && (
              <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3 rounded-lg border-[3px] border-ink bg-[#f0fff9] p-4 shadow-[4px_4px_0_var(--block-shadow)] sm:flex-row sm:text-left">
                <RewardIcon type="unlock" />
                <div>
                  <p className="font-black uppercase text-muted">Next block unlocked</p>
                  <h2 className="text-3xl">{completion.nextLesson.title}</h2>
                  <p className="font-extrabold text-muted">
                    {completion.nextLesson.trackTitle} · {completion.nextLesson.unitTitle}
                  </p>
                </div>
              </div>
            )}

            {completion.heartsRemaining <= 0 && (
              <p className="mx-auto mt-5 max-w-2xl rounded-lg border-2 border-action bg-[#fff3eb] p-3 font-black">
                Practice mode still counts. Try another block when your brain is ready.
              </p>
            )}

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {completion.nextLesson && (
                <a className="primary-button" href={`/kid/${data.child.slug}/lesson/${completion.nextLesson.id}/`}>
                  Next Lesson
                </a>
              )}
              <a className="secondary-button" href={`/kid/${data.child.slug}/`}>
                Home
              </a>
            </div>
          </div>
        </div>
        <style>{completionStyles}</style>
      </section>
    );
  }

  if (data.lesson.kind === 'mad-minute') {
    return (
      <MadMinuteLesson
        data={data}
        childSlug={childSlug}
        lessonId={lessonId}
        onComplete={setCompletion}
        onError={setError}
      />
    );
  }

  if (standardConfig?.intro?.length && !introComplete) {
    return <LessonIntro data={data} config={standardConfig} onStart={() => setIntroComplete(true)} />;
  }

  if (!current) return <p className="text-xl font-black text-muted">Snapping lesson blocks together...</p>;

  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <header className="block-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="stat-chip w-fit">
              {data.lesson.track.title} · {data.lesson.unit.title}
            </p>
            <h1 className="mt-3 text-[clamp(2.3rem,6vw,4.2rem)]">{data.lesson.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="stat-chip">{hearts} hearts</span>
            <span className="stat-chip">
              {position + 1}/{queue.length}
            </span>
          </div>
        </div>
        <div className="mt-5 progress-rail" aria-label="Lesson progress">
          <span className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {standardConfig?.review && (
          <p className="stat-chip mt-4 w-fit bg-[#f0fff9]">
            {standardConfig.review.label ?? (standardConfig.review.mode === 'spaced' ? 'Spaced review' : 'Deck practice')}
          </p>
        )}
      </header>

      <article className="block-card p-5 sm:p-7">
        {current.review && <p className="stat-chip mb-4 w-fit bg-reward">Review block</p>}
        <h2 className="text-[clamp(2rem,5vw,3.4rem)] leading-tight">{current.question.prompt}</h2>
        <QuestionMediaDisplay media={mediaFromQuestion(current.question)} />

        <div className="mt-6">
          <QuestionControl
            question={current.question}
            disabled={Boolean(feedback) || submitting}
            choiceAnswer={choiceAnswer}
            setChoiceAnswer={setChoiceAnswer}
            textAnswer={textAnswer}
            setTextAnswer={setTextAnswer}
            selectedLeft={selectedLeft}
            setSelectedLeft={setSelectedLeft}
            matchAnswer={matchAnswer}
            setMatchAnswer={setMatchAnswer}
            orderAnswer={orderAnswer}
            setOrderAnswer={setOrderAnswer}
            multiBlankAnswer={multiBlankAnswer}
            setMultiBlankAnswer={setMultiBlankAnswer}
            gridAnswer={gridAnswer}
            setGridAnswer={setGridAnswer}
            speakingAnswer={speakingAnswer}
            setSpeakingAnswer={setSpeakingAnswer}
          />
        </div>

        {feedback ? (
          <div className={`mt-6 rounded-lg border-[3px] border-ink p-4 ${feedback.correct ? 'bg-[#d9fff5]' : 'bg-[#ffe1ea]'}`}>
            <h3 className="text-3xl">{feedback.correct ? (isPreviewFlashCard(current.question) ? 'Studied' : 'Correct') : 'Try this one again'}</h3>
            <p className="mt-2 font-extrabold text-muted">
              {feedback.correct ? (isPreviewFlashCard(current.question) ? feedback.answerLabel : 'That block snapped in.') : `Answer: ${feedback.answerLabel}`}
            </p>
            {feedback.explanation && <p className="mt-2 font-bold">{feedback.explanation}</p>}
            {feedback.correct && feedback.accentFeedback && <p className="mt-2 font-bold">{feedback.accentFeedback}</p>}
            <button className="primary-button mt-5 w-full sm:w-auto" type="button" onClick={advance} disabled={submitting}>
              {position + 1 >= queue.length ? 'Finish' : 'Next'}
            </button>
          </div>
        ) : (
          <button className="primary-button mt-6 w-full sm:w-auto" type="button" onClick={submitCurrent} disabled={!hasAnswer(current.question) || submitting}>
            {isPreviewFlashCard(current.question) ? 'I studied this' : 'Check'}
          </button>
        )}
      </article>
    </section>
  );

  function hasAnswer(question: LessonQuestion) {
    if (isPreviewFlashCard(question)) return true;

    if (
      question.type === 'multiple-choice' ||
      question.type === 'fill-blank' ||
      question.type === 'passage-question' ||
      question.type === 'dialogue-builder' ||
      question.type === 'listening-question' ||
      (question.type === 'flash-card' && (question.payload as FlashCardPayload).mode === 'easy')
    ) {
      return Boolean(choiceAnswer);
    }
    if (
      question.type === 'text-input' ||
      question.type === 'error-correction' ||
      question.type === 'constructed-response' ||
      (question.type === 'flash-card' && (question.payload as FlashCardPayload).mode !== 'easy')
    ) {
      return Boolean(textAnswer.trim());
    }
    if (question.type === 'match-pairs') {
      const payload = question.payload as MatchPairsPayload;
      return payload.pairs.every((pair) => matchAnswer[pair.left]);
    }
    if (question.type === 'order-items') {
      const payload = question.payload as OrderItemsPayload;
      return orderAnswer.length === payload.correctOrder.length;
    }
    if (question.type === 'multi-blank-cloze') {
      const payload = question.payload as MultiBlankClozePayload;
      return payload.blanks.every((_, index) => Boolean(multiBlankAnswer[index]?.trim()));
    }
    if (question.type === 'speaking-prompt') {
      return Boolean(speakingAnswer.recorded) || Boolean(speakingAnswer.note?.trim()) || Boolean(speakingAnswer.transcript?.trim());
    }
    if (question.type === 'conjugation-grid') {
      const payload = question.payload as ConjugationGridPayload;
      return payload.rows.every((row) => {
        const answers = gridAnswer[row.label] ?? [];
        return payload.columns.every((_, index) => Boolean(answers[index]?.trim()));
      });
    }
    return false;
  }

  function currentAnswer(question: LessonQuestion) {
    if (isPreviewFlashCard(question)) return 'studied';

    if (
      question.type === 'multiple-choice' ||
      question.type === 'fill-blank' ||
      question.type === 'passage-question' ||
      question.type === 'dialogue-builder' ||
      question.type === 'listening-question' ||
      (question.type === 'flash-card' && (question.payload as FlashCardPayload).mode === 'easy')
    ) {
      return choiceAnswer;
    }
    if (
      question.type === 'text-input' ||
      question.type === 'error-correction' ||
      question.type === 'constructed-response' ||
      (question.type === 'flash-card' && (question.payload as FlashCardPayload).mode !== 'easy')
    ) {
      return textAnswer;
    }
    if (question.type === 'match-pairs') return matchAnswer;
    if (question.type === 'order-items') return orderAnswer;
    if (question.type === 'multi-blank-cloze') return multiBlankAnswer;
    if (question.type === 'speaking-prompt') return speakingAnswer;
    if (question.type === 'conjugation-grid') return gridAnswer;
    return null;
  }

  function submitCurrent() {
    const answer = currentAnswer(current.question);
    const correct = evaluateAnswer(current.question, answer);
    const shouldRecordFirstAttempt = !current.review && !firstAttemptIds.has(current.question.id);
    const nextQueue = !correct && !current.review ? [...queue, { question: current.question, review: true }] : queue;

    if (shouldRecordFirstAttempt) {
      setFirstAttempts((attempts) => [...attempts, { questionId: current.question.id, answer }]);
    }

    if (!correct) setHearts((value) => Math.max(0, value - 1));
    setQueue(nextQueue);
    setFeedback({
      correct,
      review: current.review,
      answerLabel: getCorrectAnswerLabel(current.question),
      explanation: current.question.explanation,
      accentFeedback: correct ? getAccentFeedback(current.question, answer) : null,
    });
  }

  function advance() {
    if (position + 1 >= queue.length) {
      submitLesson();
      return;
    }
    setPosition((value) => value + 1);
    resetControls();
  }

  async function submitLesson() {
    setSubmitting(true);
    try {
      const payloadAttempts = ensureAllFirstAttempts();
      const response = await fetchApi<CompletionResult>(`/api/children/${childSlug}/lessons/${lessonId}`, {
        method: 'POST',
        body: JSON.stringify({ startedAt, attempts: payloadAttempts }),
      });
      setCompletion(response.result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save the lesson.');
    } finally {
      setSubmitting(false);
    }
  }

  function ensureAllFirstAttempts() {
    const attempts = [...firstAttempts];
    const seen = new Set(attempts.map((attempt) => attempt.questionId));
    for (const question of data?.lesson.questions ?? []) {
      if (!seen.has(question.id)) attempts.push({ questionId: question.id, answer: null });
    }
    return attempts;
  }

  function resetControls() {
    setFeedback(null);
    setChoiceAnswer('');
    setTextAnswer('');
    setSelectedLeft('');
    setMatchAnswer({});
    setOrderAnswer([]);
    setMultiBlankAnswer([]);
    setGridAnswer({});
    setSpeakingAnswer({});
  }
}

function getStandardLessonConfig(config: LessonConfig | null): StandardLessonConfig | null {
  if (!config || isMadMinuteConfig(config)) return null;
  return config;
}

function MadMinuteLesson({
  data,
  childSlug,
  lessonId,
  onComplete,
  onError,
}: {
  data: LessonData;
  childSlug: string;
  lessonId: string;
  onComplete: (result: CompletionResult['result']) => void;
  onError: (message: string) => void;
}) {
  const config = isMadMinuteConfig(data.lesson.config) ? data.lesson.config : DEFAULT_MAD_MINUTE_CONFIG;
  const inputRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef(false);
  const submittingRef = useRef(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.durationSeconds);
  const [fact, setFact] = useState(() => generateMadMinuteFact(config));
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState<MadMinuteAttempt[]>([]);
  const [startedAt, setStartedAt] = useState('');
  const [lastResult, setLastResult] = useState<null | { correct: boolean; answer: number }>(null);
  const [submitting, setSubmitting] = useState(false);

  const correctCount = attempts.filter((attempt) => attempt.answer === attempt.factor * attempt.multiplier).length;
  const goalProgress = Math.min(100, Math.round((Math.max(data.progress.bestScoreCorrect, correctCount) / config.goalCorrect) * 100));
  const timeProgress = Math.round((timeLeft / config.durationSeconds) * 100);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  useEffect(() => {
    if (!running || submitting) return undefined;
    if (timeLeft <= 0) {
      void submitMadMinute();
      return undefined;
    }

    const timer = window.setTimeout(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [running, submitting, timeLeft]);

  useEffect(() => {
    if (!running || submitting) return undefined;

    const frame = window.requestAnimationFrame(focusAnswerInput);
    return () => window.cancelAnimationFrame(frame);
  }, [fact, running, submitting]);

  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <header className="block-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="stat-chip w-fit">
              {data.lesson.track.title} · {data.lesson.unit.title}
            </p>
            <h1 className="mt-3 text-[clamp(2.6rem,7vw,4.8rem)]">{data.lesson.title}</h1>
            <p className="mt-3 max-w-2xl text-lg font-extrabold text-muted">
              Type each multiplication answer. Keep going until the 60-second clock runs out.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="stat-chip">{timeLeft}s</span>
            <span className="stat-chip">{correctCount} correct</span>
          </div>
        </div>
        <div className="mt-5 progress-rail" aria-label="Time remaining">
          <span className="progress-fill" style={{ width: `${timeProgress}%` }} />
        </div>
      </header>

      {!running && attempts.length === 0 ? (
        <article className="block-card p-6 text-center sm:p-8">
          <p className="stat-chip mx-auto w-fit">Goal: {config.goalCorrect} correct</p>
          <h2 className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">Ready, set, multiply.</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
            <span className="stat-chip justify-center">{config.durationSeconds} seconds</span>
            <span className="stat-chip justify-center">Record: {data.progress.bestScoreCorrect}</span>
            <span className="stat-chip justify-center">{factRangeLabel(config)}</span>
          </div>
          <div className="mx-auto mt-5 max-w-xl">
            <div className="progress-rail" aria-label="Record progress toward goal">
              <span className="progress-fill" style={{ width: `${goalProgress}%` }} />
            </div>
          </div>
          <button className="primary-button mt-7 w-full sm:w-auto" type="button" onClick={start}>
            Start
          </button>
        </article>
      ) : (
        <article className="block-card p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="stat-chip w-fit">Record goal</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="stat-chip">{Math.max(data.progress.bestScoreCorrect, correctCount)}/{config.goalCorrect}</span>
                <span className="stat-chip">{attempts.length} answered</span>
              </div>
            </div>
            <button className="secondary-button w-full sm:w-auto" type="button" disabled={submitting} onClick={() => void submitMadMinute()}>
              End Early
            </button>
          </div>

          <div className="mt-5 progress-rail" aria-label="Record progress toward goal">
            <span className="progress-fill" style={{ width: `${goalProgress}%` }} />
          </div>

          <form className="mt-8" onSubmit={submitFact}>
            <label className="block text-[clamp(4rem,14vw,8rem)] font-black leading-none text-ink" htmlFor="mad-minute-answer">
              {fact.factor} x {fact.multiplier} =
            </label>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                id="mad-minute-answer"
                className="min-h-[70px] flex-1 rounded-lg border-[3px] border-ink bg-white px-4 text-4xl font-black outline-none focus:ring-4 focus:ring-reward"
                value={answer}
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={!running || submitting}
                onInput={(event) => setAnswer((event.currentTarget as HTMLInputElement).value.replace(/[^0-9]/g, ''))}
                onFocus={(event) => event.currentTarget.select()}
                onBlur={() => {
                  if (!runningRef.current || submittingRef.current) return;
                  window.setTimeout(focusAnswerInput, 50);
                }}
                autoComplete="off"
                autoFocus
                enterKeyHint="done"
              />
              <button className="primary-button min-h-[70px]" type="submit" disabled={!running || submitting || !answer}>
                Enter
              </button>
            </div>
          </form>

          {lastResult && (
            <p className={`mt-5 rounded-lg border-[3px] border-ink p-4 text-xl font-black ${lastResult.correct ? 'bg-[#d9fff5]' : 'bg-[#ffe1ea]'}`}>
              {lastResult.correct ? 'Correct' : `Answer: ${lastResult.answer}`}
            </p>
          )}
        </article>
      )}
    </section>
  );

  function start() {
    runningRef.current = true;
    submittingRef.current = false;
    setAttempts([]);
    setAnswer('');
    setFact(generateMadMinuteFact(config));
    setLastResult(null);
    setStartedAt(new Date().toISOString());
    setTimeLeft(config.durationSeconds);
    setRunning(true);
    window.requestAnimationFrame(focusAnswerInput);
  }

  function submitFact(event: Event) {
    event.preventDefault();
    if (!running || submitting || !answer) return;

    const numericAnswer = Number(answer);
    const expected = fact.factor * fact.multiplier;
    setAttempts((items) => [...items, { ...fact, answer: numericAnswer }]);
    setLastResult({ correct: numericAnswer === expected, answer: expected });
    setAnswer('');
    setFact(generateMadMinuteFact(config, fact));
  }

  async function submitMadMinute() {
    if (submitting) return;
    runningRef.current = false;
    submittingRef.current = true;
    setRunning(false);
    setSubmitting(true);

    try {
      const response = await fetchApi<CompletionResult>(`/api/children/${childSlug}/lessons/${lessonId}`, {
        method: 'POST',
        body: JSON.stringify({ startedAt: startedAt || new Date().toISOString(), attempts }),
      });
      onComplete(response.result);
    } catch (reason) {
      onError(reason instanceof Error ? reason.message : 'Could not save the mad minute.');
    } finally {
      setSubmitting(false);
    }
  }

  function focusAnswerInput() {
    const input = inputRef.current;
    if (!input || !runningRef.current || submittingRef.current) return;
    input.focus({ preventScroll: true });
    input.select();
  }
}

function factRangeLabel(config: MadMinuteConfig) {
  if (config.factor !== 'mixed') return `${config.factor}s facts`;
  return `${config.minFactor ?? 2}s-${config.maxFactor ?? 12}s facts`;
}

type RewardIconType = 'xp' | 'score' | 'streak' | 'heart' | 'unlock' | 'record';

function CompletionStat({ icon, label, value }: { icon: RewardIconType; label: string; value: string }) {
  return (
    <div className="rounded-lg border-[3px] border-ink bg-white p-4 text-left shadow-[4px_4px_0_var(--block-shadow)]">
      <div className="flex items-center gap-3">
        <RewardIcon type={icon} />
        <div>
          <p className="text-sm font-black uppercase text-muted">{label}</p>
          <p className="text-2xl font-black">{value}</p>
        </div>
      </div>
    </div>
  );
}

function MoxieCelebration({ perfect }: { perfect: boolean }) {
  return (
    <svg className="h-36 w-36 sm:h-44 sm:w-44" viewBox="0 0 180 180" role="img" aria-label="Moxie celebrating">
      <rect x="23" y="28" width="134" height="134" rx="28" fill="#fff1f7" stroke="#242134" strokeWidth="7" />
      <rect x="48" y="70" width="84" height="78" rx="18" fill="#e63e80" stroke="#242134" strokeWidth="7" />
      <rect x="70" y="42" width="40" height="32" rx="12" fill="#18bca4" stroke="#242134" strokeWidth="6" />
      <circle cx="75" cy="104" r="6" fill="#242134" />
      <circle cx="107" cy="104" r="6" fill="#242134" />
      <path d="M74 125 Q91 140 110 125" fill="none" stroke="#242134" strokeWidth="6" strokeLinecap="round" />
      <circle cx="129" cy="52" r="15" fill="#ffd84d" stroke="#242134" strokeWidth="6" />
      <path d="M36 82 L19 68 M144 82 L162 68" stroke="#242134" strokeWidth="7" strokeLinecap="round" />
      <rect x="23" y="139" width="44" height="28" rx="8" fill="#5b79ff" stroke="#242134" strokeWidth="5" />
      <rect x="113" y="139" width="44" height="28" rx="8" fill="#ff7f45" stroke="#242134" strokeWidth="5" />
      {perfect && (
        <g className="completion-star">
          <path d="M91 5 L99 25 L120 25 L103 38 L110 59 L91 46 L72 59 L79 38 L62 25 L83 25 Z" fill="#ffd84d" stroke="#242134" strokeWidth="5" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

function RewardIcon({ type }: { type: RewardIconType }) {
  if (type === 'xp') {
    return (
      <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="20" y="24" width="60" height="60" rx="15" fill="#e63e80" stroke="#242134" strokeWidth="6" />
        <circle cx="50" cy="24" r="12" fill="#ffd84d" stroke="#242134" strokeWidth="5" />
        <text x="50" y="62" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="23" fontWeight="700" fill="#ffffff">
          XP
        </text>
      </svg>
    );
  }

  if (type === 'streak') {
    return (
      <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="20" y="33" width="60" height="48" rx="13" fill="#ff7f45" stroke="#242134" strokeWidth="6" />
        <path d="M50 8 C62 25 64 38 55 49 C66 47 73 40 74 30 C85 52 72 76 50 76 C31 76 19 64 19 48 C19 35 28 23 43 12 C40 27 43 35 50 41 C55 32 55 19 50 8 Z" fill="#ffd84d" stroke="#242134" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="16" y="24" width="68" height="60" rx="15" fill="#fff1f7" stroke="#242134" strokeWidth="6" />
        <path d="M50 68 C31 54 27 45 30 36 C33 28 44 28 50 37 C56 28 67 28 70 36 C73 45 69 54 50 68 Z" fill="#e63e80" stroke="#242134" strokeWidth="5" />
      </svg>
    );
  }

  if (type === 'record') {
    return (
      <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="18" y="22" width="64" height="62" rx="14" fill="#5b79ff" stroke="#242134" strokeWidth="6" />
        <path d="M35 64 H65 M35 50 H65 M35 36 H58" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="72" cy="28" r="13" fill="#ffd84d" stroke="#242134" strokeWidth="5" />
      </svg>
    );
  }

  if (type === 'unlock') {
    return (
      <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="18" y="38" width="64" height="46" rx="13" fill="#ffd84d" stroke="#242134" strokeWidth="6" />
        <path d="M35 39 V30 C35 18 44 11 55 13 C63 15 68 20 70 29" fill="none" stroke="#242134" strokeWidth="7" strokeLinecap="round" />
        <circle cx="50" cy="61" r="6" fill="#242134" />
        <path d="M50 66 V74" stroke="#242134" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="h-16 w-16 shrink-0" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="18" y="24" width="64" height="58" rx="12" fill="#18bca4" stroke="#242134" strokeWidth="6" />
      <rect x="34" y="13" width="32" height="18" rx="8" fill="#ffd84d" stroke="#242134" strokeWidth="5" />
      <path d="M31 54 L44 67 L70 38" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompletionFireworks() {
  const sparks = [
    { left: '8%', top: '16%', color: '#ffd84d', delay: '0s' },
    { left: '20%', top: '74%', color: '#18bca4', delay: '0.35s' },
    { left: '78%', top: '18%', color: '#5b79ff', delay: '0.2s' },
    { left: '90%', top: '62%', color: '#ff7f45', delay: '0.55s' },
    { left: '52%', top: '8%', color: '#e63e80', delay: '0.75s' },
  ];

  return (
    <div className="completion-fireworks" aria-hidden="true">
      {sparks.map((spark, index) => (
        <span
          key={`${spark.left}-${spark.top}`}
          className={`completion-burst completion-burst-${index + 1}`}
          style={{
            left: spark.left,
            top: spark.top,
            '--spark-color': spark.color,
            animationDelay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}

const completionStyles = `
  .completion-stage {
    isolation: isolate;
  }

  .completion-ribbon {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(255, 216, 77, 0.28) 0 12%, transparent 12% 100%),
      linear-gradient(225deg, rgba(24, 188, 164, 0.18) 0 14%, transparent 14% 100%),
      linear-gradient(180deg, rgba(255, 241, 247, 0.9), rgba(240, 255, 249, 0.76));
    pointer-events: none;
  }

  .completion-fireworks {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  }

  .completion-burst {
    --spark-color: #ffd84d;
    position: absolute;
    width: 9px;
    height: 9px;
    border: 2px solid #242134;
    border-radius: 3px;
    background: var(--spark-color);
    box-shadow:
      0 -38px 0 -1px var(--spark-color),
      27px -27px 0 -1px var(--spark-color),
      38px 0 0 -1px var(--spark-color),
      27px 27px 0 -1px var(--spark-color),
      0 38px 0 -1px var(--spark-color),
      -27px 27px 0 -1px var(--spark-color),
      -38px 0 0 -1px var(--spark-color),
      -27px -27px 0 -1px var(--spark-color);
    opacity: 0;
    transform: scale(0.45) rotate(0deg);
    animation: buddyFirework 1.8s ease-out infinite;
  }

  .completion-burst-2,
  .completion-burst-4 {
    animation-duration: 2.15s;
  }

  .completion-star {
    transform-origin: 91px 32px;
    animation: buddyStarBounce 1.4s ease-in-out infinite;
  }

  @keyframes buddyFirework {
    0% {
      opacity: 0;
      transform: scale(0.25) rotate(0deg);
    }
    18% {
      opacity: 1;
    }
    70% {
      opacity: 0.85;
      transform: scale(1) rotate(28deg);
    }
    100% {
      opacity: 0;
      transform: scale(1.18) rotate(42deg);
    }
  }

  @keyframes buddyStarBounce {
    0%,
    100% {
      transform: translateY(0) rotate(-4deg);
    }
    50% {
      transform: translateY(-6px) rotate(5deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .completion-burst,
    .completion-star {
      animation: none;
      opacity: 0.7;
    }
  }
`;

type QuestionControlProps = {
  question: LessonQuestion;
  disabled: boolean;
  choiceAnswer: string;
  setChoiceAnswer: (value: string) => void;
  textAnswer: string;
  setTextAnswer: (value: string) => void;
  selectedLeft: string;
  setSelectedLeft: (value: string) => void;
  matchAnswer: Record<string, string>;
  setMatchAnswer: (value: Record<string, string>) => void;
  orderAnswer: string[];
  setOrderAnswer: (value: string[]) => void;
  multiBlankAnswer: string[];
  setMultiBlankAnswer: (value: string[]) => void;
  gridAnswer: Record<string, string[]>;
  setGridAnswer: (value: Record<string, string[]>) => void;
  speakingAnswer: SpeakingAnswer;
  setSpeakingAnswer: (value: SpeakingAnswer) => void;
};

function isPreviewFlashCard(question: LessonQuestion) {
  return question.type === 'flash-card' && (question.payload as FlashCardPayload).mode === 'preview';
}

function QuestionControl({
  question,
  disabled,
  choiceAnswer,
  setChoiceAnswer,
  textAnswer,
  setTextAnswer,
  selectedLeft,
  setSelectedLeft,
  matchAnswer,
  setMatchAnswer,
  orderAnswer,
  setOrderAnswer,
  multiBlankAnswer,
  setMultiBlankAnswer,
  gridAnswer,
  setGridAnswer,
  speakingAnswer,
  setSpeakingAnswer,
}: QuestionControlProps) {
  if (question.type === 'multiple-choice') {
    const payload = question.payload as MultipleChoicePayload;
    return (
      <ChoiceGrid choices={payload.choices} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
    );
  }

  if (question.type === 'fill-blank') {
    const payload = question.payload as FillBlankPayload;
    return (
      <div>
        <p className="mb-4 text-2xl font-black">
          {payload.sentenceBefore} <span className="rounded-lg border-2 border-ink bg-reward px-3 py-1">?</span> {payload.sentenceAfter}
        </p>
        <ChoiceGrid choices={payload.choices} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
      </div>
    );
  }

  if (question.type === 'flash-card') {
    return (
      <FlashCardControl
        payload={question.payload as FlashCardPayload}
        disabled={disabled}
        choiceAnswer={choiceAnswer}
        setChoiceAnswer={setChoiceAnswer}
        textAnswer={textAnswer}
        setTextAnswer={setTextAnswer}
      />
    );
  }

  if (question.type === 'text-input') {
    const payload = question.payload as TextInputPayload;
    return (
      <input
        className="min-h-[62px] w-full rounded-lg border-[3px] border-ink bg-white px-4 text-2xl font-black outline-none focus:ring-4 focus:ring-reward"
        value={textAnswer}
        inputMode={payload.answerType === 'number' ? 'numeric' : 'text'}
        disabled={disabled}
        onInput={(event) => setTextAnswer((event.currentTarget as HTMLInputElement).value)}
        autoFocus
      />
    );
  }

  if (question.type === 'match-pairs') {
    const payload = question.payload as MatchPairsPayload;
    const rightValues = shuffledMatchRights(payload.pairs, question.id);

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          {payload.pairs.map((pair) => {
            const matchedRight = matchAnswer[pair.left];
            const isMatched = Boolean(matchedRight);

            return (
              <button
                key={pair.left}
                type="button"
                disabled={disabled}
                data-selected={selectedLeft === pair.left}
                className={`touch-choice w-full ${isMatched ? 'bg-[#d9fff5]' : ''}`}
                onClick={() => {
                  if (isMatched) {
                    setMatchAnswer(clearMatchForLeft(matchAnswer, pair.left));
                    setSelectedLeft(pair.left);
                    return;
                  }
                  setSelectedLeft(selectedLeft === pair.left ? '' : pair.left);
                }}
              >
                <span className="flex flex-col gap-1">
                  <span>{pair.left}</span>
                  {isMatched && <span className="text-sm font-black text-muted">Matched to {matchedRight}</span>}
                </span>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {rightValues.map((right, index) => {
            const matchedLeft = Object.entries(matchAnswer).find(([, value]) => value === right)?.[0];
            const used = Boolean(matchedLeft);
            return (
              <button
                key={`${right}-${index}`}
                type="button"
                disabled={disabled || used || !selectedLeft}
                className={`touch-choice w-full ${used ? 'bg-[#d9fff5]' : ''}`}
                onClick={() => {
                  if (!selectedLeft) return;
                  setMatchAnswer({ ...matchAnswer, [selectedLeft]: right });
                  setSelectedLeft('');
                }}
              >
                <span className="flex flex-col gap-1">
                  <span>{right}</span>
                  {used && <span className="text-sm font-black text-muted">Matched to {matchedLeft}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === 'order-items') {
    const payload = question.payload as OrderItemsPayload;
    return (
      <div>
        <div
          className="flex min-h-[72px] flex-wrap items-center gap-3 rounded-lg border-[3px] border-ink bg-white p-3 text-xl font-black"
          aria-live="polite"
        >
          {orderAnswer.length ? (
            orderAnswer.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex min-h-[46px] items-center rounded-lg border-[3px] border-ink bg-reward px-4 py-2 shadow-[3px_3px_0_var(--block-shadow)]"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-muted">Tap words or numbers below</span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {payload.items.map((item) => {
            const used = orderAnswer.includes(item);
            return (
              <button
                key={item}
                type="button"
                disabled={disabled || used}
                className="touch-choice min-w-[110px]"
                onClick={() => setOrderAnswer([...orderAnswer, item])}
              >
                {item}
              </button>
            );
          })}
        </div>
        <button type="button" className="secondary-button mt-4" disabled={disabled || orderAnswer.length === 0} onClick={() => setOrderAnswer([])}>
          Clear
        </button>
      </div>
    );
  }

  if (question.type === 'passage-question') {
    const payload = question.payload as PassageQuestionPayload;
    return (
      <div className="space-y-5">
        <PassageBlock title={payload.passageTitle} passage={payload.passage} />
        <p className="text-2xl font-black">{payload.question}</p>
        <ChoiceGrid choices={payload.choices} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
      </div>
    );
  }

  if (question.type === 'multi-blank-cloze') {
    const payload = question.payload as MultiBlankClozePayload;
    return (
      <div className="rounded-lg border-[3px] border-ink bg-white p-4">
        <div className="flex flex-wrap items-center gap-3 text-xl font-black">
          {payload.parts.map((part, index) => (
            <span key={`${part}-${index}`} className="contents">
              <span>{part}</span>
              {payload.blanks[index] && (
                <ClozeBlankControl
                  blank={payload.blanks[index]}
                  value={multiBlankAnswer[index] ?? ''}
                  disabled={disabled}
                  onChange={(value) => setMultiBlankAnswer(updateArrayValue(multiBlankAnswer, index, value))}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'constructed-response') {
    const payload = question.payload as ConstructedResponsePayload;
    return (
      <div>
        {payload.checklist && <Checklist items={payload.checklist} />}
        <textarea
          className="mt-4 min-h-[150px] w-full rounded-lg border-[3px] border-ink bg-white px-4 py-3 text-xl font-black outline-none focus:ring-4 focus:ring-reward"
          value={textAnswer}
          disabled={disabled}
          onInput={(event) => setTextAnswer((event.currentTarget as HTMLTextAreaElement).value)}
          autoFocus
        />
      </div>
    );
  }

  if (question.type === 'dialogue-builder') {
    const payload = question.payload as DialogueBuilderPayload;
    return (
      <div className="space-y-5">
        <DialogueBlock turns={payload.turns} />
        <ChoiceGrid choices={payload.choices} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
      </div>
    );
  }

  if (question.type === 'listening-question') {
    const payload = question.payload as ListeningQuestionPayload;
    return (
      <div className="space-y-5">
        <AudioBlock src={payload.audioSrc} label={payload.audioLabel} transcript={payload.transcript} />
        <ChoiceGrid choices={payload.choices} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
      </div>
    );
  }

  if (question.type === 'speaking-prompt') {
    return <SpeakingPromptControl payload={question.payload as SpeakingPromptPayload} answer={speakingAnswer} onChange={setSpeakingAnswer} disabled={disabled} />;
  }

  if (question.type === 'error-correction') {
    const payload = question.payload as ErrorCorrectionPayload;
    return (
      <div>
        <p className="rounded-lg border-[3px] border-ink bg-white p-4 text-2xl font-black">{payload.sentence}</p>
        <input
          className="mt-4 min-h-[62px] w-full rounded-lg border-[3px] border-ink bg-white px-4 text-2xl font-black outline-none focus:ring-4 focus:ring-reward"
          value={textAnswer}
          disabled={disabled}
          onInput={(event) => setTextAnswer((event.currentTarget as HTMLInputElement).value)}
          autoFocus
        />
      </div>
    );
  }

  if (question.type === 'conjugation-grid') {
    const payload = question.payload as ConjugationGridPayload;
    return (
      <div className="overflow-x-auto rounded-lg border-[3px] border-ink bg-white">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="bg-[#f0fff9]">
            <tr>
              <th className="border-b-[3px] border-ink p-3 text-sm font-black uppercase text-muted">Prompt</th>
              {payload.columns.map((column) => (
                <th key={column} className="border-b-[3px] border-ink p-3 text-sm font-black uppercase text-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payload.rows.map((row) => (
              <tr key={row.label} className="border-t-2 border-ink/20">
                <th className="p-3 text-xl font-black">{row.label}</th>
                {payload.columns.map((column, index) => (
                  <td key={`${row.label}-${column}`} className="p-3">
                    <input
                      className="min-h-[50px] w-full rounded-lg border-[3px] border-ink bg-white px-3 text-lg font-black outline-none focus:ring-4 focus:ring-reward"
                      value={gridAnswer[row.label]?.[index] ?? ''}
                      disabled={disabled}
                      onInput={(event) => setGridAnswer(updateGridValue(gridAnswer, row.label, index, (event.currentTarget as HTMLInputElement).value))}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <p className="rounded-lg border-[3px] border-ink bg-[#ffe1ea] p-4 font-black">This question type is not supported yet.</p>;
}

function FlashCardControl({
  payload,
  disabled,
  choiceAnswer,
  setChoiceAnswer,
  textAnswer,
  setTextAnswer,
}: {
  payload: FlashCardPayload;
  disabled: boolean;
  choiceAnswer: string;
  setChoiceAnswer: (value: string) => void;
  textAnswer: string;
  setTextAnswer: (value: string) => void;
}) {
  if (payload.mode === 'preview') {
    return (
      <div>
        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-lg border-[4px] border-ink bg-[#f0fff9] p-6 text-center shadow-[5px_5px_0_var(--block-shadow)]">
          <p className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-tight">{payload.front}</p>
          <p className="mt-5 rounded-lg border-[3px] border-ink bg-white px-5 py-3 text-[clamp(1.6rem,5vw,2.6rem)] font-black leading-tight">
            {payload.correctAnswer ?? ''}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex min-h-[180px] items-center justify-center rounded-lg border-[4px] border-ink bg-[#f0fff9] p-6 text-center shadow-[5px_5px_0_var(--block-shadow)]">
        <p className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-tight">{payload.front}</p>
      </div>
      <div className="mt-5">
        {payload.mode === 'easy' ? (
          <ChoiceGrid choices={payload.choices ?? []} value={choiceAnswer} disabled={disabled} onChange={setChoiceAnswer} />
        ) : (
          <input
            className="min-h-[62px] w-full rounded-lg border-[3px] border-ink bg-white px-4 text-2xl font-black outline-none focus:ring-4 focus:ring-reward"
            value={textAnswer}
            inputMode={payload.answerType === 'number' ? 'numeric' : 'text'}
            disabled={disabled}
            onInput={(event) => setTextAnswer((event.currentTarget as HTMLInputElement).value)}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}

function PassageBlock({ title, passage }: { title?: string; passage: string }) {
  return (
    <section className="rounded-lg border-[3px] border-ink bg-white p-4">
      {title && <h3 className="text-2xl font-black">{title}</h3>}
      <p className={`${title ? 'mt-3' : ''} whitespace-pre-line text-lg font-bold leading-relaxed text-muted`}>{passage}</p>
    </section>
  );
}

function ClozeBlankControl({
  blank,
  value,
  disabled,
  onChange,
}: {
  blank: MultiBlankClozePayload['blanks'][number];
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  if (blank.choices?.length) {
    return (
      <select
        className="min-h-[52px] rounded-lg border-[3px] border-ink bg-reward px-3 text-lg font-black outline-none focus:ring-4 focus:ring-reward"
        value={value}
        disabled={disabled}
        aria-label={blank.label ?? 'Blank answer'}
        onChange={(event) => onChange((event.currentTarget as HTMLSelectElement).value)}
      >
        <option value="">---</option>
        {blank.choices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      className="min-h-[52px] w-[min(220px,100%)] rounded-lg border-[3px] border-ink bg-reward px-3 text-lg font-black outline-none focus:ring-4 focus:ring-reward"
      value={value}
      disabled={disabled}
      inputMode={blank.answerType === 'number' ? 'numeric' : 'text'}
      aria-label={blank.label ?? 'Blank answer'}
      onInput={(event) => onChange((event.currentTarget as HTMLInputElement).value)}
    />
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="rounded-lg border-2 border-ink bg-[#f0fff9] px-4 py-3 font-black">
          {item}
        </li>
      ))}
    </ul>
  );
}

function DialogueBlock({ turns }: { turns: DialogueBuilderPayload['turns'] }) {
  return (
    <section className="space-y-3 rounded-lg border-[3px] border-ink bg-white p-4">
      {turns.map((turn, index) => (
        <div key={`${turn.speaker}-${index}`} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
          <span className="min-w-[100px] font-black text-muted">{turn.speaker}</span>
          <span className="text-lg font-black">{turn.line}</span>
        </div>
      ))}
    </section>
  );
}

function SpeakingPromptControl({
  payload,
  answer,
  onChange,
  disabled,
}: {
  payload: SpeakingPromptPayload;
  answer: SpeakingAnswer;
  onChange: (value: SpeakingAnswer) => void;
  disabled: boolean;
}) {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) window.URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return (
    <div className="space-y-4">
      {payload.checklist && <Checklist items={payload.checklist} />}
      <div className="rounded-lg border-[3px] border-ink bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="primary-button w-full sm:w-auto" type="button" disabled={disabled || recording} onClick={() => void startRecording()}>
            Start Recording
          </button>
          <button className="secondary-button w-full sm:w-auto" type="button" disabled={disabled || !recording} onClick={stopRecording}>
            Stop Recording
          </button>
        </div>
        {message && <p className="mt-3 font-black text-muted">{message}</p>}
        {audioUrl && <audio className="mt-4 w-full" controls src={audioUrl} />}
      </div>
      <textarea
        className="min-h-[110px] w-full rounded-lg border-[3px] border-ink bg-white px-4 py-3 text-xl font-black outline-none focus:ring-4 focus:ring-reward"
        value={answer.note ?? ''}
        disabled={disabled}
        onInput={(event) => onChange({ ...answer, note: (event.currentTarget as HTMLTextAreaElement).value })}
      />
    </div>
  );

  async function startRecording() {
    if (recording || disabled) return;
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia || !('MediaRecorder' in window)) {
      setMessage('Recording is not available in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      streamRef.current = stream;
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      });
      recorder.addEventListener('stop', () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        if (audioBlob.size > 0) {
          setAudioUrl((previousUrl) => {
            if (previousUrl) window.URL.revokeObjectURL(previousUrl);
            return window.URL.createObjectURL(audioBlob);
          });
        }
        onChange({ ...answer, recorded: true });
        setRecording(false);
        setMessage('Recording saved for this attempt.');
      });

      recorder.start();
      setRecording(true);
      setMessage(payload.minSeconds ? `Recording... aim for ${payload.minSeconds} seconds.` : 'Recording...');
    } catch {
      setMessage('Microphone permission was not granted.');
    }
  }

  function stopRecording() {
    if (!recording) return;
    recorderRef.current?.stop();
  }
}

function updateArrayValue(values: string[], index: number, value: string) {
  const nextValues = [...values];
  nextValues[index] = value;
  return nextValues;
}

function updateGridValue(values: Record<string, string[]>, rowLabel: string, index: number, value: string) {
  const rowValues = [...(values[rowLabel] ?? [])];
  rowValues[index] = value;
  return { ...values, [rowLabel]: rowValues };
}

function shuffledMatchRights(pairs: Array<{ left: string; right: string }>, questionId: string) {
  const original = pairs.map((pair) => pair.right);
  const shuffled = [...original];
  let seed = hashString(questionId || original.join('|'));

  for (let index = shuffled.length - 1; index > 0; index--) {
    seed = nextSeed(seed);
    const swapIndex = seed % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.length > 1 && shuffled.every((value, index) => value === original[index])) {
    const rotated = shuffled.slice(1);
    rotated.push(shuffled[0] ?? '');
    return rotated;
  }

  return shuffled;
}

function ChoiceGrid({
  choices,
  value,
  disabled,
  onChange,
}: {
  choices: string[];
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {choices.map((choice) => (
        <button
          key={choice}
          type="button"
          disabled={disabled}
          data-selected={value === choice}
          className="touch-choice"
          onClick={() => onChange(choice)}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}
