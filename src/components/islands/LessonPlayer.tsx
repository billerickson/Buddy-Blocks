import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  evaluateAnswer,
  getCorrectAnswerLabel,
  type FillBlankPayload,
  type LessonQuestion,
  type MatchPairsPayload,
  type MultipleChoicePayload,
  type OrderItemsPayload,
  type TextInputPayload,
} from '../../lib/lesson-engine';
import { fetchApi } from './api';

type LessonData = {
  child: {
    slug: string;
    displayName: string;
  };
  heartsStart: number;
  lesson: {
    id: string;
    title: string;
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

type QueueItem = {
  question: LessonQuestion;
  review: boolean;
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
};

export default function LessonPlayer({ childSlug, lessonId }: { childSlug: string; lessonId: string }) {
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

  const [choiceAnswer, setChoiceAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedLeft, setSelectedLeft] = useState('');
  const [matchAnswer, setMatchAnswer] = useState<Record<string, string>>({});
  const [orderAnswer, setOrderAnswer] = useState<string[]>([]);

  useEffect(() => {
    fetchApi<LessonData>(`/api/children/${childSlug}/lessons/${lessonId}`)
      .then((lessonData) => {
        setData(lessonData);
        setHearts(lessonData.heartsStart);
        setQueue(lessonData.lesson.questions.map((question) => ({ question, review: false })));
      })
      .catch((reason) => setError(reason.message));
  }, [childSlug, lessonId]);

  const current = queue[position];
  const progress = queue.length ? Math.round(((position + (feedback ? 1 : 0)) / queue.length) * 100) : 0;
  const firstAttemptIds = useMemo(() => new Set(firstAttempts.map((attempt) => attempt.questionId)), [firstAttempts]);

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

  if (!data || !current) return <p className="text-xl font-black text-muted">Snapping lesson blocks together...</p>;

  if (completion) {
    return (
      <section className="mx-auto max-w-3xl">
        <div className="block-card p-6 text-center sm:p-8">
          <p className="stat-chip mx-auto w-fit">Lesson complete</p>
          <h1 className="mt-5 text-[clamp(3rem,9vw,5.5rem)]">Nice build!</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <span className="stat-chip justify-center">{completion.xpAwarded} XP</span>
            <span className="stat-chip justify-center">
              {completion.scoreCorrect}/{completion.scoreTotal}
            </span>
            <span className="stat-chip justify-center">{completion.streak} day streak</span>
            <span className="stat-chip justify-center">{completion.heartsRemaining} hearts</span>
          </div>
          {completion.heartsRemaining <= 0 && (
            <p className="mt-5 rounded-lg border-2 border-action bg-[#fff3eb] p-3 font-black">
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
      </section>
    );
  }

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
      </header>

      <article className="block-card p-5 sm:p-7">
        {current.review && <p className="stat-chip mb-4 w-fit bg-reward">Review block</p>}
        <h2 className="text-[clamp(2rem,5vw,3.4rem)] leading-tight">{current.question.prompt}</h2>

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
          />
        </div>

        {feedback ? (
          <div className={`mt-6 rounded-lg border-[3px] border-ink p-4 ${feedback.correct ? 'bg-[#d9fff5]' : 'bg-[#ffe1ea]'}`}>
            <h3 className="text-3xl">{feedback.correct ? 'Correct' : 'Try this one again'}</h3>
            <p className="mt-2 font-extrabold text-muted">
              {feedback.correct ? 'That block snapped in.' : `Answer: ${feedback.answerLabel}`}
            </p>
            {feedback.explanation && <p className="mt-2 font-bold">{feedback.explanation}</p>}
            <button className="primary-button mt-5 w-full sm:w-auto" type="button" onClick={advance} disabled={submitting}>
              {position + 1 >= queue.length ? 'Finish' : 'Next'}
            </button>
          </div>
        ) : (
          <button className="primary-button mt-6 w-full sm:w-auto" type="button" onClick={submitCurrent} disabled={!hasAnswer(current.question) || submitting}>
            Check
          </button>
        )}
      </article>
    </section>
  );

  function hasAnswer(question: LessonQuestion) {
    if (question.type === 'multiple-choice' || question.type === 'fill-blank') return Boolean(choiceAnswer);
    if (question.type === 'text-input') return Boolean(textAnswer.trim());
    if (question.type === 'match-pairs') {
      const payload = question.payload as MatchPairsPayload;
      return payload.pairs.every((pair) => matchAnswer[pair.left]);
    }
    if (question.type === 'order-items') {
      const payload = question.payload as OrderItemsPayload;
      return orderAnswer.length === payload.correctOrder.length;
    }
    return false;
  }

  function currentAnswer(question: LessonQuestion) {
    if (question.type === 'multiple-choice' || question.type === 'fill-blank') return choiceAnswer;
    if (question.type === 'text-input') return textAnswer;
    if (question.type === 'match-pairs') return matchAnswer;
    if (question.type === 'order-items') return orderAnswer;
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
  }
}

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
};

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
    const rightValues = payload.pairs.map((pair) => pair.right);

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          {payload.pairs.map((pair) => (
            <button
              key={pair.left}
              type="button"
              disabled={disabled || Boolean(matchAnswer[pair.left])}
              data-selected={selectedLeft === pair.left}
              className="touch-choice w-full"
              onClick={() => setSelectedLeft(pair.left)}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rightValues.map((right) => {
            const used = Object.values(matchAnswer).includes(right);
            return (
              <button
                key={right}
                type="button"
                disabled={disabled || used || !selectedLeft}
                className="touch-choice w-full"
                onClick={() => {
                  if (!selectedLeft) return;
                  setMatchAnswer({ ...matchAnswer, [selectedLeft]: right });
                  setSelectedLeft('');
                }}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const payload = question.payload as OrderItemsPayload;
  return (
    <div>
      <div className="min-h-[64px] rounded-lg border-[3px] border-ink bg-white p-3 text-xl font-black">
        {orderAnswer.length ? orderAnswer.join(' ') : 'Tap words or numbers below'}
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
