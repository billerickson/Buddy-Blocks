import { describe, expect, it } from 'vitest';
import { calculateXp, evaluateAnswer, getAccentFeedback, type LessonQuestion } from '../src/lib/lesson-engine';

const question = (overrides: Partial<LessonQuestion>): LessonQuestion => ({
  id: 'q1',
  type: 'multiple-choice',
  prompt: 'Prompt',
  payload: { choices: ['A', 'B'], correctAnswer: 'A' },
  ...overrides,
});

describe('lesson engine', () => {
  it('scores choice-based question answer shapes', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'multiple-choice',
          payload: { choices: ['A', 'B'], correctAnswer: 'B' },
        }),
        'B',
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'fill-blank',
          payload: {
            sentenceBefore: '6 + ',
            sentenceAfter: ' = 10',
            choices: ['2', '3', '4'],
            correctAnswer: '4',
          },
        }),
        '4',
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'passage-question',
          payload: {
            passage: 'Mia watered the plant every morning.',
            question: 'Who watered the plant?',
            choices: ['Mia', 'Noah'],
            correctAnswer: 'Mia',
          },
        }),
        'Mia',
      ),
    ).toBe(true);
  });

  it('scores text answers with case and whitespace normalization', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'text-input',
          payload: { acceptedAnswers: ['quick fox'], answerType: 'text' },
        }),
        '  Quick   Fox ',
      ),
    ).toBe(true);
  });

  it('scores text answers with accent-tolerant normalization and returns accent feedback', () => {
    const accentQuestion = question({
      type: 'text-input',
      payload: { acceptedAnswers: ['está en la escuela'], answerType: 'text' },
    });

    expect(evaluateAnswer(accentQuestion, 'esta en la escuela')).toBe(true);
    expect(getAccentFeedback(accentQuestion, 'esta en la escuela')).toBe('está en la escuela');
  });

  it('scores numeric text input by numeric value', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'text-input',
          payload: { acceptedAnswers: ['13'], answerType: 'number' },
        }),
        '13.0',
      ),
    ).toBe(true);
  });

  it('scores match-pairs and order-items questions', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'match-pairs',
          payload: {
            pairs: [
              { left: 'hola', right: 'hello' },
              { left: 'adios', right: 'goodbye' },
            ],
          },
        }),
        { hola: 'hello', adios: 'goodbye' },
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'order-items',
          payload: { items: ['amigo', 'hola'], correctOrder: ['hola', 'amigo'] },
        }),
        ['amigo', 'hola'],
      ),
    ).toBe(false);
  });

  it('scores unordered groups inside order-items questions', () => {
    const synonymPairs = question({
      type: 'order-items',
      payload: {
        items: ['cold', 'small', 'chilly', 'little'],
        correctOrder: ['cold', 'chilly', 'small', 'little'],
        unorderedGroupsOf: 2,
      },
    });

    expect(evaluateAnswer(synonymPairs, ['chilly', 'cold', 'small', 'little'])).toBe(true);
    expect(evaluateAnswer(synonymPairs, ['small', 'little', 'chilly', 'cold'])).toBe(true);
    expect(evaluateAnswer(synonymPairs, ['cold', 'small', 'chilly', 'little'])).toBe(false);
  });

  it('scores multi-blank cloze answers', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'multi-blank-cloze',
          payload: {
            parts: ['Yo ', ' en Texas y ', ' español.'],
            blanks: [
              { correctAnswer: 'vivo', acceptedAnswers: ['vivo'] },
              { correctAnswer: 'estudio', acceptedAnswers: ['estudio'] },
            ],
          },
        }),
        ['vivo', 'estudio'],
      ),
    ).toBe(true);
  });

  it('scores easy, medium, and hard flash cards', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'flash-card',
          payload: {
            mode: 'easy',
            front: 'contexto',
            choices: ['context', 'school'],
            correctAnswer: 'context',
          },
        }),
        'context',
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'flash-card',
          payload: {
            mode: 'medium',
            front: 'la escuela',
            acceptedAnswers: ['school', 'the school'],
            answerType: 'text',
          },
        }),
        'the school',
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'flash-card',
          payload: {
            mode: 'hard',
            front: 'school',
            acceptedAnswers: ['la escuela', 'escuela'],
            answerType: 'text',
          },
        }),
        'escuela',
      ),
    ).toBe(true);
  });

  it('scores constructed response length gates', () => {
    const responseQuestion = question({
      type: 'constructed-response',
      payload: { minWords: 4, sampleAnswer: 'Me gusta jugar futbol.' },
    });

    expect(evaluateAnswer(responseQuestion, 'Me gusta jugar futbol.')).toBe(true);
    expect(evaluateAnswer(responseQuestion, 'Me gusta.')).toBe(false);
  });

  it('scores dialogue, listening, speaking, and correction prompts', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'dialogue-builder',
          payload: {
            turns: [{ speaker: 'Ana', line: 'Como estas?' }],
            choices: ['Estoy bien.', 'Tengo trece anos.'],
            correctAnswer: 'Estoy bien.',
          },
        }),
        'Estoy bien.',
      ),
    ).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'listening-question',
          payload: { audioSrc: '/audio/test.mp3', choices: ['lunes', 'martes'], correctAnswer: 'martes' },
        }),
        'martes',
      ),
    ).toBe(true);

    expect(evaluateAnswer(question({ type: 'speaking-prompt', payload: { minSeconds: 5 } }), { recorded: true })).toBe(true);

    expect(
      evaluateAnswer(
        question({
          type: 'error-correction',
          payload: { sentence: 'Yo tiene hambre.', acceptedAnswers: ['Yo tengo hambre.'] },
        }),
        'yo tengo hambre',
      ),
    ).toBe(true);
  });

  it('scores conjugation grid answers with accent-tolerant cells', () => {
    expect(
      evaluateAnswer(
        question({
          type: 'conjugation-grid',
          payload: {
            columns: ['presente', 'preterito'],
            rows: [
              { label: 'yo hablar', answers: ['hablo', 'hablé'] },
              { label: 'ella vivir', answers: ['vive', ['vivió', 'vivio']] },
            ],
          },
        }),
        {
          'yo hablar': ['hablo', 'hable'],
          'ella vivir': ['vive', 'vivio'],
        },
      ),
    ).toBe(true);
  });

  it('awards completion, correctness, perfect, and practice-mode XP', () => {
    expect(calculateXp(10, 8, 8, 5)).toBe(23);
    expect(calculateXp(10, 3, 8, 0)).toBe(6);
  });
});
