import type { ExerciseType, QuestionPayload } from './lesson-engine';

export type ChildFixture = {
  id: string;
  slug: 'reagan' | 'ada';
  displayName: string;
  avatarKey: string;
  levelBand: string;
};

export type QuestionFixture = {
  type: ExerciseType;
  prompt: string;
  payload: QuestionPayload;
  explanation?: string;
};

export type LessonKind = 'standard' | 'mad-minute';

export type MadMinuteConfig = {
  mode: 'multiplication';
  factor: number | 'mixed';
  minFactor?: number;
  maxFactor?: number;
  minMultiplier: number;
  maxMultiplier: number;
  durationSeconds: number;
  goalCorrect: number;
};

export type LessonFixture = {
  id: string;
  slug: string;
  title: string;
  xpBase: number;
  kind?: LessonKind;
  config?: MadMinuteConfig;
  questions: QuestionFixture[];
};

export type UnitFixture = {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: LessonFixture[];
};

export type TrackFixture = {
  id: string;
  slug: 'math' | 'vocabulary' | 'spanish';
  title: string;
  description: string;
  color: string;
  accent: string;
  units: UnitFixture[];
};

export const PARENT_ID = 'parent_bill';
export const PARENT_USERNAME = 'bill';
export const PARENT_EMAIL = 'bill@learn.billplustara.com';

export const CHILDREN: ChildFixture[] = [
  {
    id: 'child_reagan',
    slug: 'reagan',
    displayName: 'Reagan',
    avatarKey: 'berry-builder',
    levelBand: 'Upper elementary',
  },
  {
    id: 'child_ada',
    slug: 'ada',
    displayName: 'Ada',
    avatarKey: 'teal-tinkerer',
    levelBand: 'Early elementary',
  },
];

const mc = (prompt: string, choices: string[], correctAnswer: string, explanation?: string): QuestionFixture => ({
  type: 'multiple-choice',
  prompt,
  payload: { choices, correctAnswer },
  explanation,
});

const text = (
  prompt: string,
  acceptedAnswers: string[],
  answerType: 'text' | 'number' = 'text',
  explanation?: string,
): QuestionFixture => ({
  type: 'text-input',
  prompt,
  payload: { acceptedAnswers, answerType },
  explanation,
});

const fill = (
  sentenceBefore: string,
  sentenceAfter: string,
  choices: string[],
  correctAnswer: string,
  explanation?: string,
): QuestionFixture => ({
  type: 'fill-blank',
  prompt: `${sentenceBefore} ___ ${sentenceAfter}`.trim(),
  payload: { sentenceBefore, sentenceAfter, choices, correctAnswer },
  explanation,
});

const match = (
  prompt: string,
  pairs: Array<{ left: string; right: string }>,
  explanation?: string,
): QuestionFixture => ({
  type: 'match-pairs',
  prompt,
  payload: { pairs },
  explanation,
});

const order = (prompt: string, items: string[], correctOrder: string[], explanation?: string): QuestionFixture => ({
  type: 'order-items',
  prompt,
  payload: { items, correctOrder },
  explanation,
});

const madMinute = (factor: number | 'mixed'): LessonFixture => {
  const label = factor === 'mixed' ? 'Mixed' : `${factor}s`;

  return {
    id: `lesson_math_mad_minute_${factor === 'mixed' ? 'mixed' : `${factor}s`}`,
    slug: factor === 'mixed' ? 'mixed' : `${factor}s`,
    title: `${label} Facts`,
    xpBase: 10,
    kind: 'mad-minute',
    config: {
      mode: 'multiplication',
      factor,
      minFactor: 2,
      maxFactor: 12,
      minMultiplier: 1,
      maxMultiplier: 12,
      durationSeconds: 60,
      goalCorrect: 40,
    },
    questions: [],
  };
};

export const TRACKS: TrackFixture[] = [
  {
    id: 'track_math',
    slug: 'math',
    title: 'Math',
    description: 'Snap numbers together with addition and subtraction blocks.',
    color: '#5b79ff',
    accent: '#ffd84d',
    units: [
      {
        id: 'unit_math_addition_basics',
        slug: 'addition-basics',
        title: 'Addition Basics',
        description: 'Build sums with tens, doubles, and short stories.',
        lessons: [
          {
            id: 'lesson_math_addition_make_ten',
            slug: 'make-ten',
            title: 'Make Ten',
            xpBase: 10,
            questions: [
              mc('What is 7 + 5?', ['10', '11', '12', '13'], '12', '7 + 5 is the same as 7 + 3 + 2.'),
              text('Type the answer: 9 + 4', ['13'], 'number'),
              mc('Which pair makes 10?', ['3 + 8', '6 + 4', '2 + 9', '5 + 6'], '6 + 4'),
              order('Tap the numbers from smallest to greatest.', ['14', '8', '11'], ['8', '11', '14']),
              fill('6 +', '= 10', ['2', '3', '4', '5'], '4'),
              mc('What is 8 + 8?', ['14', '15', '16', '18'], '16', 'Doubles are two equal groups.'),
              text('Mia has 3 blocks and adds 6 more. How many blocks now?', ['9'], 'number'),
              match('Match each addition fact.', [
                { left: '5 + 5', right: '10' },
                { left: '6 + 3', right: '9' },
                { left: '4 + 8', right: '12' },
              ]),
            ],
          },
          {
            id: 'lesson_math_addition_word_stacks',
            slug: 'word-stacks',
            title: 'Word Problem Stacks',
            xpBase: 10,
            questions: [
              mc('Mia has 3 bags with 4 apples each. How many apples does she have?', ['7', '10', '12', '14'], '12'),
              text('Sam stacks 6 red blocks and 7 blue blocks. Type the total.', ['13'], 'number'),
              fill('There are 8 birds. 5 more land. Now there are', 'birds.', ['11', '12', '13', '14'], '13'),
              mc('Which story matches 4 + 9?', ['4 taken from 9', '4 groups of 9', '4 and 9 together', '9 split into 4'], '4 and 9 together'),
              order('Tap the totals from smallest to greatest.', ['9 + 5', '6 + 6', '7 + 8'], ['6 + 6', '9 + 5', '7 + 8']),
              text('A shelf has 10 books. Ada adds 8. How many books?', ['18'], 'number'),
              match('Match each story to its total.', [
                { left: '2 + 8', right: '10' },
                { left: '5 + 7', right: '12' },
                { left: '9 + 6', right: '15' },
              ]),
              mc('Which addition fact equals 17?', ['8 + 8', '9 + 8', '7 + 7', '10 + 6'], '9 + 8'),
            ],
          },
        ],
      },
      {
        id: 'unit_math_subtraction_basics',
        slug: 'subtraction-basics',
        title: 'Subtraction Basics',
        description: 'Take away, compare, and find the missing piece.',
        lessons: [
          {
            id: 'lesson_math_subtraction_take_away',
            slug: 'take-away',
            title: 'Take Away Blocks',
            xpBase: 10,
            questions: [
              mc('What is 14 - 6?', ['6', '7', '8', '9'], '8'),
              text('Type the answer: 12 - 5', ['7'], 'number'),
              fill('15 -', '= 9', ['4', '5', '6', '7'], '6'),
              mc('Reagan had 11 stickers and gave away 3. How many are left?', ['7', '8', '9', '14'], '8'),
              order('Tap the answers from greatest to smallest.', ['10 - 4', '13 - 2', '8 - 5'], ['13 - 2', '10 - 4', '8 - 5']),
              match('Match each subtraction fact.', [
                { left: '9 - 4', right: '5' },
                { left: '16 - 7', right: '9' },
                { left: '12 - 10', right: '2' },
              ]),
              text('20 blocks minus 8 blocks equals what?', ['12'], 'number'),
              mc('Which equation equals 6?', ['13 - 8', '12 - 6', '10 - 7', '9 - 1'], '12 - 6'),
            ],
          },
          {
            id: 'lesson_math_subtraction_missing_piece',
            slug: 'missing-piece',
            title: 'Missing Pieces',
            xpBase: 10,
            questions: [
              fill('9 +', '= 14', ['3', '4', '5', '6'], '5'),
              mc('What number makes 16 - ? = 10?', ['4', '5', '6', '7'], '6'),
              text('Find the missing number: 8 + ? = 15', ['7'], 'number'),
              match('Match each missing piece.', [
                { left: '6 + ? = 11', right: '5' },
                { left: '14 - ? = 8', right: '6' },
                { left: '? + 4 = 13', right: '9' },
              ]),
              mc('A tower has 18 blocks. 9 are blue. How many are not blue?', ['7', '8', '9', '10'], '9'),
              text('Type the missing part: 17 - ? = 12', ['5'], 'number'),
              order('Tap the missing numbers from smallest to greatest.', ['10 - ? = 6', '12 - ? = 5', '9 - ? = 7'], ['9 - ? = 7', '10 - ? = 6', '12 - ? = 5']),
              mc('Which fact helps solve 15 - 7?', ['7 + 8 = 15', '7 + 7 = 14', '15 + 7 = 22', '8 - 7 = 1'], '7 + 8 = 15'),
            ],
          },
        ],
      },
      {
        id: 'unit_math_mad_minute',
        slug: 'mad-minute',
        title: 'Mad Minute',
        description: 'Race the clock with multiplication facts from 2s through 12s.',
        lessons: ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'mixed'] as const).map((factor) => madMinute(factor)),
      },
    ],
  },
  {
    id: 'track_vocabulary',
    slug: 'vocabulary',
    title: 'Vocabulary',
    description: 'Stack word meaning, spelling, synonyms, and context clues.',
    color: '#ffd84d',
    accent: '#18bca4',
    units: [
      {
        id: 'unit_vocabulary_word_meanings',
        slug: 'word-meanings',
        title: 'Word Meanings',
        description: 'Choose definitions and use clues around the word.',
        lessons: [
          {
            id: 'lesson_vocabulary_meanings_big_small',
            slug: 'big-small-words',
            title: 'Big And Small Words',
            xpBase: 10,
            questions: [
              mc('What does "enormous" mean?', ['tiny', 'very large', 'quiet', 'quick'], 'very large'),
              fill('The puppy was very', 'after running outside.', ['sleepy', 'square', 'ancient', 'empty'], 'sleepy'),
              mc('Which word means "very old"?', ['ancient', 'modern', 'fresh', 'early'], 'ancient'),
              text('Type a word that means "fast".', ['quick', 'speedy', 'rapid'], 'text'),
              match('Match each word to its meaning.', [
                { left: 'tiny', right: 'very small' },
                { left: 'silent', right: 'no sound' },
                { left: 'brave', right: 'not afraid' },
              ]),
              order('Tap the size words from smallest to largest.', ['huge', 'tiny', 'medium'], ['tiny', 'medium', 'huge']),
              mc('What does "observe" mean?', ['to watch carefully', 'to shout loudly', 'to forget', 'to carry'], 'to watch carefully'),
              fill('A "fragile" cup can', 'easily.', ['break', 'run', 'sing', 'grow'], 'break'),
            ],
          },
          {
            id: 'lesson_vocabulary_meanings_context_clues',
            slug: 'context-clues',
            title: 'Context Clues',
            xpBase: 10,
            questions: [
              mc('The room was "dim," so Ada turned on a lamp. What does dim mean?', ['not bright', 'very loud', 'full', 'messy'], 'not bright'),
              fill('The soup was too', 'to eat, so we waited for it to cool.', ['hot', 'round', 'quiet', 'soft'], 'hot'),
              text('In "The trail was narrow," type the word that means not wide.', ['narrow'], 'text'),
              match('Match the clue to the word.', [
                { left: 'not wide', right: 'narrow' },
                { left: 'very happy', right: 'delighted' },
                { left: 'hard to lift', right: 'heavy' },
              ]),
              mc('Liam was "delighted" when he won. How did he feel?', ['sad', 'sleepy', 'very happy', 'confused'], 'very happy'),
              order('Tap the sentence events in order.', ['We dried off.', 'Rain started.', 'We opened umbrellas.'], ['Rain started.', 'We opened umbrellas.', 'We dried off.']),
              fill('The backpack was', 'because it was filled with books.', ['heavy', 'invisible', 'empty', 'tiny'], 'heavy'),
              mc('Which clue helps define "sturdy"?', ['It did not wobble.', 'It melted fast.', 'It was asleep.', 'It whispered.'], 'It did not wobble.'),
            ],
          },
        ],
      },
      {
        id: 'unit_vocabulary_synonyms',
        slug: 'synonyms',
        title: 'Synonyms',
        description: 'Find words that mean the same thing.',
        lessons: [
          {
            id: 'lesson_vocabulary_synonyms_same_meaning',
            slug: 'same-meaning',
            title: 'Same Meaning',
            xpBase: 10,
            questions: [
              mc('Which word means the same as "quick"?', ['slow', 'speedy', 'late', 'still'], 'speedy'),
              fill('A synonym for "happy" is', '.', ['glad', 'angry', 'wet', 'lost'], 'glad'),
              text('Type a synonym for "small".', ['little', 'tiny'], 'text'),
              match('Match the synonyms.', [
                { left: 'begin', right: 'start' },
                { left: 'big', right: 'large' },
                { left: 'smart', right: 'clever' },
              ]),
              mc('Which word is a synonym for "quiet"?', ['silent', 'noisy', 'bright', 'wild'], 'silent'),
              order('Tap the synonym pairs together.', ['cold', 'small', 'chilly', 'little'], ['cold', 'chilly', 'small', 'little']),
              fill('A synonym for "finish" is', '.', ['complete', 'borrow', 'hide', 'throw'], 'complete'),
              mc('Which pair has words that mean almost the same thing?', ['angry/mad', 'up/down', 'dark/light', 'open/shut'], 'angry/mad'),
            ],
          },
          {
            id: 'lesson_vocabulary_synonyms_stronger_words',
            slug: 'stronger-words',
            title: 'Stronger Words',
            xpBase: 10,
            questions: [
              mc('Which word is stronger than "good"?', ['excellent', 'okay', 'small', 'plain'], 'excellent'),
              fill('Instead of "very tired," you can say', '.', ['exhausted', 'tiny', 'ancient', 'silent'], 'exhausted'),
              text('Type a stronger word for "scared".', ['terrified', 'afraid', 'frightened'], 'text'),
              match('Match the regular word to a stronger word.', [
                { left: 'cold', right: 'freezing' },
                { left: 'hungry', right: 'starving' },
                { left: 'clean', right: 'spotless' },
              ]),
              mc('Which word makes this sentence more vivid: The tower was ___?', ['gigantic', 'kind of big', 'not little', 'some'], 'gigantic'),
              order('Tap from weakest to strongest.', ['enormous', 'big', 'gigantic'], ['big', 'enormous', 'gigantic']),
              fill('The joke was not just funny. It was', '!', ['hilarious', 'square', 'quiet', 'late'], 'hilarious'),
              mc('Which word is the strongest choice for "very angry"?', ['furious', 'upset', 'fine', 'calm'], 'furious'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track_spanish',
    slug: 'spanish',
    title: 'Spanish',
    description: 'Build greetings, colors, animals, food, and family phrases.',
    color: '#18bca4',
    accent: '#ff7f45',
    units: [
      {
        id: 'unit_spanish_greetings',
        slug: 'greetings',
        title: 'Greetings',
        description: 'Say hello, goodbye, and polite starter phrases.',
        lessons: [
          {
            id: 'lesson_spanish_greetings_hello_goodbye',
            slug: 'hello-goodbye',
            title: 'Hello And Goodbye',
            xpBase: 10,
            questions: [
              mc('What does "hola" mean?', ['goodbye', 'hello', 'please', 'thanks'], 'hello'),
              mc('Which word means "goodbye"?', ['adios', 'rojo', 'perro', 'agua'], 'adios'),
              text('Type the Spanish word for "hello".', ['hola'], 'text'),
              match('Match each Spanish word.', [
                { left: 'hola', right: 'hello' },
                { left: 'adios', right: 'goodbye' },
                { left: 'si', right: 'yes' },
              ]),
              fill('', 'means hello.', ['hola', 'azul', 'gato', 'pan'], 'hola'),
              order('Build the phrase "hello friend".', ['amigo', 'hola'], ['hola', 'amigo']),
              mc('What does "si" mean?', ['no', 'yes', 'red', 'cat'], 'yes'),
              fill('To say goodbye, say', '.', ['adios', 'verde', 'uno', 'leche'], 'adios'),
            ],
          },
          {
            id: 'lesson_spanish_greetings_polite_phrases',
            slug: 'polite-phrases',
            title: 'Polite Phrases',
            xpBase: 10,
            questions: [
              mc('What does "gracias" mean?', ['please', 'thank you', 'good night', 'apple'], 'thank you'),
              mc('Which phrase means "please"?', ['por favor', 'buenos dias', 'de nada', 'me gusta'], 'por favor'),
              text('Type the Spanish word for "thanks".', ['gracias'], 'text'),
              match('Match each polite phrase.', [
                { left: 'gracias', right: 'thank you' },
                { left: 'por favor', right: 'please' },
                { left: 'de nada', right: 'you are welcome' },
              ]),
              fill('Say', 'when you ask nicely.', ['por favor', 'rojo', 'gato', 'familia'], 'por favor'),
              order('Build the phrase "thank you friend".', ['amigo', 'gracias'], ['gracias', 'amigo']),
              mc('What does "buenos dias" mean?', ['good morning', 'goodbye', 'green', 'dog'], 'good morning'),
              fill('', 'means you are welcome.', ['de nada', 'hola', 'azul', 'manzana'], 'de nada'),
            ],
          },
        ],
      },
      {
        id: 'unit_spanish_colors',
        slug: 'colors',
        title: 'Colors',
        description: 'Name bright colors and use them in small phrases.',
        lessons: [
          {
            id: 'lesson_spanish_colors_color_words',
            slug: 'color-words',
            title: 'Color Words',
            xpBase: 10,
            questions: [
              mc('Which word means "red"?', ['rojo', 'azul', 'verde', 'amarillo'], 'rojo'),
              mc('What does "azul" mean?', ['yellow', 'green', 'blue', 'red'], 'blue'),
              text('Type the Spanish word for "green".', ['verde'], 'text'),
              match('Match the colors.', [
                { left: 'rojo', right: 'red' },
                { left: 'azul', right: 'blue' },
                { left: 'verde', right: 'green' },
              ]),
              fill('', 'means yellow.', ['amarillo', 'hola', 'perro', 'gracias'], 'amarillo'),
              order('Build the phrase "blue block".', ['azul', 'bloque'], ['bloque', 'azul']),
              mc('Which color is "verde"?', ['green', 'red', 'blue', 'white'], 'green'),
              fill('The Spanish word for red is', '.', ['rojo', 'azul', 'verde', 'negro'], 'rojo'),
            ],
          },
          {
            id: 'lesson_spanish_colors_color_sentences',
            slug: 'color-sentences',
            title: 'Color Sentences',
            xpBase: 10,
            questions: [
              mc('What does "el bloque rojo" mean?', ['the red block', 'the blue dog', 'the green apple', 'hello block'], 'the red block'),
              fill('El bloque', 'means the blue block.', ['azul', 'rojo', 'verde', 'gracias'], 'azul'),
              text('Type the Spanish color in "the green block": bloque ____', ['verde'], 'text'),
              match('Match each phrase.', [
                { left: 'bloque rojo', right: 'red block' },
                { left: 'bloque azul', right: 'blue block' },
                { left: 'bloque verde', right: 'green block' },
              ]),
              order('Build "the yellow block".', ['bloque', 'amarillo', 'el'], ['el', 'bloque', 'amarillo']),
              mc('Which phrase means "the green block"?', ['el bloque verde', 'el bloque rojo', 'hola verde', 'gracias bloque'], 'el bloque verde'),
              fill('Me gusta el bloque', '.', ['rojo', 'por favor', 'adios', 'de nada'], 'rojo'),
              mc('What does "Me gusta" mean?', ['I like', 'thank you', 'goodbye', 'yellow'], 'I like'),
            ],
          },
        ],
      },
    ],
  },
];

export function getAllLessons() {
  return TRACKS.flatMap((track) =>
    track.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        ...lesson,
        track,
        unit,
      })),
    ),
  );
}

export function getAllQuestions() {
  return getAllLessons().flatMap((lesson) =>
    lesson.questions.map((question, index) => ({
      ...question,
      id: `${lesson.id}_q${String(index + 1).padStart(2, '0')}`,
      lessonId: lesson.id,
      sortOrder: index + 1,
    })),
  );
}

export function getLessonPaths() {
  return getAllLessons().map((lesson) => ({
    childSlugs: CHILDREN.map((child) => child.slug),
    lessonId: lesson.id,
  }));
}

export function getTrackPaths() {
  return TRACKS.map((track) => ({
    trackSlug: track.slug,
    childSlugs: CHILDREN.map((child) => child.slug),
  }));
}
