import type { ExerciseType, QuestionPayload } from './lesson-engine';

export type ChildFixture = {
  id: string;
  slug: 'reagan' | 'ada';
  displayName: string;
  avatarKey: string;
  levelBand: string;
  gradeLevel: 3 | 6;
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
  slug: string;
  subject: 'math' | 'vocabulary' | 'spanish';
  gradeLevel: 3 | 6;
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
    levelBand: 'Grade 6',
    gradeLevel: 6,
  },
  {
    id: 'child_ada',
    slug: 'ada',
    displayName: 'Ada',
    avatarKey: 'teal-tinkerer',
    levelBand: 'Grade 3',
    gradeLevel: 3,
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

const madMinute = (gradeLevel: 3 | 6, factor: number | 'mixed'): LessonFixture => {
  const label = factor === 'mixed' ? 'Mixed' : `${factor}s`;

  return {
    id: `lesson_grade${gradeLevel}_math_mad_minute_${factor === 'mixed' ? 'mixed' : `${factor}s`}`,
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

export const GRADE_3_TRACKS: TrackFixture[] = [
  {
    id: 'track_grade3_math',
    slug: 'grade-3-math',
    subject: 'math',
    gradeLevel: 3,
    title: 'Math',
    description: 'Build Grade 3 addition, subtraction, multiplication, and word-problem fluency.',
    color: '#5b79ff',
    accent: '#ffd84d',
    units: [
      {
        id: 'unit_grade3_math_addition_basics',
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
        id: 'unit_grade3_math_subtraction_basics',
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
        id: 'unit_grade3_math_mad_minute',
        slug: 'mad-minute',
        title: 'Mad Minute',
        description: 'Race the clock with multiplication facts from 2s through 12s.',
        lessons: ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'mixed'] as const).map((factor) => madMinute(3, factor)),
      },
    ],
  },
  {
    id: 'track_grade3_vocabulary',
    slug: 'grade-3-vocabulary',
    subject: 'vocabulary',
    gradeLevel: 3,
    title: 'Vocabulary',
    description: 'Practice Grade 3 word meanings, context clues, synonyms, and vivid words.',
    color: '#ffd84d',
    accent: '#18bca4',
    units: [
      {
        id: 'unit_grade3_vocabulary_word_meanings',
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
        id: 'unit_grade3_vocabulary_synonyms',
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
    id: 'track_grade3_spanish',
    slug: 'grade-3-spanish',
    subject: 'spanish',
    gradeLevel: 3,
    title: 'Spanish',
    description: 'Learn Grade 3-friendly greetings, polite phrases, colors, and starter sentences.',
    color: '#18bca4',
    accent: '#ff7f45',
    units: [
      {
        id: 'unit_grade3_spanish_greetings',
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
        id: 'unit_grade3_spanish_colors',
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

export const GRADE_6_TRACKS: TrackFixture[] = [
  {
    id: 'track_grade6_math',
    slug: 'grade-6-math',
    subject: 'math',
    gradeLevel: 6,
    title: 'Math',
    description: 'Practice Grade 6 ratios, rates, expressions, equations, and fact fluency.',
    color: '#5b79ff',
    accent: '#ffd84d',
    units: [
      {
        id: 'unit_grade6_math_ratios_rates',
        slug: 'ratios-rates',
        title: 'Ratios And Rates',
        description: 'Compare quantities, build tables, and find unit rates.',
        lessons: [
          {
            id: 'lesson_grade6_math_ratios_tables',
            slug: 'ratio-tables',
            title: 'Ratio Tables',
            xpBase: 10,
            questions: [
              mc('A recipe uses 2 cups of oats for every 5 cups of flour. Which ratio shows oats to flour?', ['2:5', '5:2', '2:7', '5:7'], '2:5'),
              text('A class has 18 pencils for 6 students. Type the pencils per student.', ['3'], 'number'),
              fill('If 3 notebooks cost $12, then 1 notebook costs', '.', ['3', '4', '9', '15'], '4'),
              match('Match each ratio to an equivalent ratio.', [
                { left: '2:3', right: '6:9' },
                { left: '4:5', right: '8:10' },
                { left: '1:6', right: '3:18' },
              ]),
              order('Tap the rates from least to greatest.', ['12 miles in 3 hr', '20 miles in 4 hr', '18 miles in 6 hr'], ['18 miles in 6 hr', '12 miles in 3 hr', '20 miles in 4 hr']),
              mc('Which table matches 4 stickers per page?', ['1 -> 4, 2 -> 8, 3 -> 12', '1 -> 5, 2 -> 8, 3 -> 11', '1 -> 4, 2 -> 6, 3 -> 8', '1 -> 3, 2 -> 7, 3 -> 12'], '1 -> 4, 2 -> 8, 3 -> 12'),
              text('A trail map uses 1 inch for 8 miles. How many miles for 5 inches?', ['40'], 'number'),
              fill('Equivalent ratios make the same', '.', ['comparison', 'shape', 'sound', 'letter'], 'comparison'),
            ],
          },
          {
            id: 'lesson_grade6_math_unit_rates',
            slug: 'unit-rates',
            title: 'Unit Rates',
            xpBase: 10,
            questions: [
              mc('A bike travels 36 miles in 3 hours. What is the unit rate?', ['9 miles/hour', '12 miles/hour', '33 miles/hour', '39 miles/hour'], '12 miles/hour'),
              text('24 ounces cost $6. Type the dollars per 1 ounce.', ['0.25', '.25'], 'number'),
              fill('To find a unit rate, divide so the second quantity is', '.', ['1', '2', '10', '100'], '1'),
              match('Match each situation to its unit rate.', [
                { left: '$15 for 3 books', right: '$5/book' },
                { left: '45 pages in 5 days', right: '9 pages/day' },
                { left: '72 miles in 6 hr', right: '12 miles/hr' },
              ]),
              mc('Which is the better buy?', ['$12 for 3 packs', '$15 for 5 packs', '$10 for 2 packs', '$21 for 6 packs'], '$15 for 5 packs'),
              text('A printer makes 84 pages in 7 minutes. Pages per minute?', ['12'], 'number'),
              order('Tap unit prices from cheapest to most expensive.', ['$4 each', '$2 each', '$3 each'], ['$2 each', '$3 each', '$4 each']),
              mc('Which question asks for a unit rate?', ['How much for one ticket?', 'How many tickets total?', 'What color is the ticket?', 'Who has tickets?'], 'How much for one ticket?'),
            ],
          },
        ],
      },
      {
        id: 'unit_grade6_math_expressions_equations',
        slug: 'expressions-equations',
        title: 'Expressions And Equations',
        description: 'Use variables, expressions, and one-step equations.',
        lessons: [
          {
            id: 'lesson_grade6_math_expressions',
            slug: 'expressions',
            title: 'Expressions',
            xpBase: 10,
            questions: [
              mc('Which expression means "5 more than n"?', ['n + 5', '5n', 'n - 5', '5 - n'], 'n + 5'),
              text('Evaluate 3x + 2 when x = 4.', ['14'], 'number'),
              fill('The expression 6m means 6 times', '.', ['m', '6', '12', 'one'], 'm'),
              match('Match the phrase to the expression.', [
                { left: 'twice a number', right: '2n' },
                { left: '7 less than x', right: 'x - 7' },
                { left: 'the sum of y and 9', right: 'y + 9' },
              ]),
              mc('Which expression is equivalent to 4(a + 3)?', ['4a + 12', '4a + 3', 'a + 12', '7a'], '4a + 12'),
              text('Evaluate p/3 when p = 27.', ['9'], 'number'),
              order('Tap the steps to evaluate 2x + 5 when x = 6.', ['Add 5', 'Replace x with 6', 'Multiply 2 x 6'], ['Replace x with 6', 'Multiply 2 x 6', 'Add 5']),
              fill('A variable is a symbol for an unknown', '.', ['number', 'paragraph', 'color', 'sound'], 'number'),
            ],
          },
          {
            id: 'lesson_grade6_math_equations',
            slug: 'one-step-equations',
            title: 'One-Step Equations',
            xpBase: 10,
            questions: [
              mc('Solve x + 9 = 17.', ['6', '8', '9', '26'], '8'),
              text('Solve 4n = 28.', ['7'], 'number'),
              fill('To solve y - 6 = 11, add', 'to both sides.', ['6', '11', '17', '5'], '6'),
              match('Match each equation to its solution.', [
                { left: 'a + 4 = 10', right: '6' },
                { left: '3b = 21', right: '7' },
                { left: 'c - 5 = 8', right: '13' },
              ]),
              mc('Which inverse operation solves x/5 = 6?', ['multiply by 5', 'divide by 5', 'add 5', 'subtract 5'], 'multiply by 5'),
              text('Solve m - 12 = 19.', ['31'], 'number'),
              order('Tap the solving steps.', ['Check the solution', 'Undo the operation', 'Write the equation'], ['Write the equation', 'Undo the operation', 'Check the solution']),
              mc('Which value makes 2x = 18 true?', ['8', '9', '16', '20'], '9'),
            ],
          },
        ],
      },
      {
        id: 'unit_grade6_math_mad_minute',
        slug: 'mad-minute',
        title: 'Mad Minute',
        description: 'Race the clock with multiplication facts from 2s through 12s.',
        lessons: ([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'mixed'] as const).map((factor) => madMinute(6, factor)),
      },
    ],
  },
  {
    id: 'track_grade6_vocabulary',
    slug: 'grade-6-vocabulary',
    subject: 'vocabulary',
    gradeLevel: 6,
    title: 'Vocabulary',
    description: 'Build Grade 6 academic vocabulary, word parts, claims, and evidence language.',
    color: '#ffd84d',
    accent: '#18bca4',
    units: [
      {
        id: 'unit_grade6_vocabulary_academic_words',
        slug: 'academic-words',
        title: 'Academic Words',
        description: 'Use context and word parts to unlock school vocabulary.',
        lessons: [
          {
            id: 'lesson_grade6_vocabulary_context_precision',
            slug: 'context-precision',
            title: 'Context And Precision',
            xpBase: 10,
            questions: [
              mc('In "The evidence was sufficient," what does sufficient mean?', ['enough', 'hidden', 'late', 'incorrect'], 'enough'),
              fill('A precise word for "walked slowly" is', '.', ['strolled', 'sprinted', 'shouted', 'measured'], 'strolled'),
              text('Type a word that means "to examine closely".', ['analyze', 'inspect', 'study'], 'text'),
              match('Match each academic word.', [
                { left: 'summarize', right: 'tell the main ideas briefly' },
                { left: 'compare', right: 'tell how things are alike' },
                { left: 'contrast', right: 'tell how things are different' },
              ]),
              mc('Which word best completes: The scientist made a careful ___ of the data.', ['analysis', 'celebration', 'nap', 'detour'], 'analysis'),
              order('Tap from weakest to strongest evidence.', ['specific quote', 'random guess', 'general idea'], ['random guess', 'general idea', 'specific quote']),
              fill('To infer means to use clues to make a reasonable', '.', ['guess', 'noise', 'drawing', 'copy'], 'guess'),
              mc('Which clue helps define "reluctant"?', ['She did not want to begin.', 'She ran very fast.', 'It was bright blue.', 'They counted coins.'], 'She did not want to begin.'),
            ],
          },
          {
            id: 'lesson_grade6_vocabulary_word_parts',
            slug: 'word-parts',
            title: 'Word Parts',
            xpBase: 10,
            questions: [
              mc('What does the prefix "re-" usually mean?', ['again', 'not', 'before', 'many'], 'again'),
              fill('The suffix "-less" means', '.', ['without', 'full of', 'again', 'before'], 'without'),
              text('Type the base word in "unhelpful".', ['help'], 'text'),
              match('Match each word part.', [
                { left: 'pre-', right: 'before' },
                { left: 'sub-', right: 'under' },
                { left: '-ful', right: 'full of' },
              ]),
              mc('Which word means "not visible"?', ['invisible', 'visible', 'preview', 'revision'], 'invisible'),
              order('Build the word meaning "not careful".', ['care', 'less'], ['care', 'less']),
              fill('A "prediction" is something said before it', '.', ['happens', 'breaks', 'sings', 'shrinks'], 'happens'),
              mc('What does "transport" suggest?', ['carry across', 'write again', 'not fair', 'full of hope'], 'carry across'),
            ],
          },
        ],
      },
      {
        id: 'unit_grade6_vocabulary_argument',
        slug: 'argument-reading',
        title: 'Argument Reading',
        description: 'Recognize claims, reasons, evidence, and tone.',
        lessons: [
          {
            id: 'lesson_grade6_vocabulary_claims_evidence',
            slug: 'claims-evidence',
            title: 'Claims And Evidence',
            xpBase: 10,
            questions: [
              mc('What is a claim?', ['a position the writer wants to prove', 'a random detail', 'a title', 'a comma rule'], 'a position the writer wants to prove'),
              fill('Evidence should be relevant and', '.', ['specific', 'sleepy', 'round', 'silent'], 'specific'),
              text('Type the word for facts or examples that support a claim.', ['evidence'], 'text'),
              match('Match each argument part.', [
                { left: 'claim', right: 'main position' },
                { left: 'reason', right: 'why the claim makes sense' },
                { left: 'evidence', right: 'facts or examples' },
              ]),
              mc('Which sentence is evidence?', ['The survey found 82% agreed.', 'I think recess matters.', 'Schools should change.', 'This is my claim.'], 'The survey found 82% agreed.'),
              order('Tap the argument parts in a strong order.', ['Evidence', 'Claim', 'Reason'], ['Claim', 'Reason', 'Evidence']),
              fill('A counterclaim is an opposing', '.', ['claim', 'number', 'suffix', 'setting'], 'claim'),
              mc('Which evidence is strongest?', ['A direct quote from the text', 'A personal guess', 'A vague memory', 'A funny picture'], 'A direct quote from the text'),
            ],
          },
          {
            id: 'lesson_grade6_vocabulary_tone_connotation',
            slug: 'tone-connotation',
            title: 'Tone And Connotation',
            xpBase: 10,
            questions: [
              mc('Which word has the most positive connotation?', ['confident', 'bossy', 'pushy', 'arrogant'], 'confident'),
              fill("Tone is the writer's attitude toward the", '.', ['subject', 'page number', 'font', 'period'], 'subject'),
              text('Type a word that means "feeling unsure".', ['uncertain', 'doubtful', 'unsure'], 'text'),
              match('Match each tone word.', [
                { left: 'humorous', right: 'funny' },
                { left: 'serious', right: 'thoughtful and not silly' },
                { left: 'critical', right: 'pointing out faults' },
              ]),
              mc('Which word sounds more intense than "upset"?', ['furious', 'calm', 'okay', 'fine'], 'furious'),
              order('Tap from least to most intense.', ['furious', 'annoyed', 'angry'], ['annoyed', 'angry', 'furious']),
              fill('Connotation is the feeling a word suggests beyond its dictionary', '.', ['meaning', 'spelling', 'shape', 'sound'], 'meaning'),
              mc('Which phrase creates a worried tone?', ['The dark hallway seemed endless.', 'The balloons bobbed happily.', 'The joke made us laugh.', 'The sun warmed the porch.'], 'The dark hallway seemed endless.'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'track_grade6_spanish',
    slug: 'grade-6-spanish',
    subject: 'spanish',
    gradeLevel: 6,
    title: 'Spanish',
    description: 'Practice Grade 6 Spanish classroom phrases, descriptions, and present-tense verbs.',
    color: '#18bca4',
    accent: '#ff7f45',
    units: [
      {
        id: 'unit_grade6_spanish_classroom',
        slug: 'classroom-conversation',
        title: 'Classroom Conversation',
        description: 'Use school phrases and describe classroom needs.',
        lessons: [
          {
            id: 'lesson_grade6_spanish_classroom_phrases',
            slug: 'classroom-phrases',
            title: 'Classroom Phrases',
            xpBase: 10,
            questions: [
              mc('What does "Necesito ayuda" mean?', ['I need help', 'I have a dog', 'I like apples', 'Good night'], 'I need help'),
              fill('To ask "May I go to the bathroom?" say "Puedo ir al', '?"', ['bano', 'libro', 'perro', 'rojo'], 'bano'),
              text('Type the Spanish word for "book".', ['libro'], 'text'),
              match('Match each classroom phrase.', [
                { left: 'No entiendo', right: 'I do not understand' },
                { left: 'Repita, por favor', right: 'Repeat, please' },
                { left: 'Tengo una pregunta', right: 'I have a question' },
              ]),
              mc('Which phrase means "I am finished"?', ['Termine', 'Tengo hambre', 'Me llamo', 'Es azul'], 'Termine'),
              order('Build "I need a pencil".', ['un lapiz', 'necesito'], ['necesito', 'un lapiz']),
              fill('"Escuchen" means', '.', ['listen', 'write', 'run', 'eat'], 'listen'),
              mc('What does "abre el libro" mean?', ['open the book', 'close the door', 'write the date', 'read the clock'], 'open the book'),
            ],
          },
          {
            id: 'lesson_grade6_spanish_descriptions',
            slug: 'descriptions',
            title: 'Descriptions',
            xpBase: 10,
            questions: [
              mc('What does "alto" mean?', ['tall', 'short', 'new', 'old'], 'tall'),
              fill('A red backpack is "la mochila', '."', ['roja', 'azul', 'verde', 'grande'], 'roja'),
              text('Type the Spanish word for "small".', ['pequeno', 'pequena'], 'text'),
              match('Match each description.', [
                { left: 'rapido', right: 'fast' },
                { left: 'lento', right: 'slow' },
                { left: 'interesante', right: 'interesting' },
              ]),
              mc('Which phrase means "the big class"?', ['la clase grande', 'el libro rojo', 'la mochila pequena', 'el amigo rapido'], 'la clase grande'),
              order('Build "the interesting book".', ['interesante', 'el', 'libro'], ['el', 'libro', 'interesante']),
              fill('"Nuevo" means', '.', ['new', 'old', 'cold', 'full'], 'new'),
              mc('Which adjective agrees with "la maestra"?', ['inteligente', 'rojo', 'alto', 'pequeno'], 'inteligente'),
            ],
          },
        ],
      },
      {
        id: 'unit_grade6_spanish_present_tense',
        slug: 'present-tense',
        title: 'Present Tense',
        description: 'Use common present-tense verbs in simple sentences.',
        lessons: [
          {
            id: 'lesson_grade6_spanish_ar_verbs',
            slug: 'ar-verbs',
            title: 'AR Verbs',
            xpBase: 10,
            questions: [
              mc('What does "hablo" mean?', ['I speak', 'you speak', 'we speak', 'they speak'], 'I speak'),
              fill('"Estudiamos" means we', '.', ['study', 'eat', 'run', 'sleep'], 'study'),
              text('Type the Spanish for "I study".', ['estudio'], 'text'),
              match('Match each verb form.', [
                { left: 'yo hablo', right: 'I speak' },
                { left: 'tu hablas', right: 'you speak' },
                { left: 'nosotros hablamos', right: 'we speak' },
              ]),
              mc('Which ending goes with "yo" for regular -ar verbs?', ['-o', '-as', '-amos', '-an'], '-o'),
              order('Build "I study Spanish".', ['espanol', 'estudio'], ['estudio', 'espanol']),
              fill('"Ellos cantan" means they', '.', ['sing', 'study', 'ask', 'need'], 'sing'),
              mc('Which sentence means "we dance"?', ['bailamos', 'bailo', 'bailas', 'bailan'], 'bailamos'),
            ],
          },
          {
            id: 'lesson_grade6_spanish_er_ir_verbs',
            slug: 'er-ir-verbs',
            title: 'ER And IR Verbs',
            xpBase: 10,
            questions: [
              mc('What does "como" mean?', ['I eat', 'I write', 'I live', 'I speak'], 'I eat'),
              fill('"Vivo en Texas" means I', 'in Texas.', ['live', 'eat', 'open', 'read'], 'live'),
              text('Type the Spanish for "I write".', ['escribo'], 'text'),
              match('Match each verb.', [
                { left: 'comer', right: 'to eat' },
                { left: 'vivir', right: 'to live' },
                { left: 'escribir', right: 'to write' },
              ]),
              mc('Which form means "we eat"?', ['comemos', 'como', 'comes', 'comen'], 'comemos'),
              order('Build "I write a sentence".', ['una frase', 'escribo'], ['escribo', 'una frase']),
              fill('"Ellas viven" means they', '.', ['live', 'eat', 'write', 'listen'], 'live'),
              mc('Which ending goes with "yo" for regular -er and -ir verbs?', ['-o', '-es', '-emos', '-en'], '-o'),
            ],
          },
        ],
      },
    ],
  },
];

export const TRACKS: TrackFixture[] = [...GRADE_3_TRACKS, ...GRADE_6_TRACKS];

export function getTracksForGrade(gradeLevel: ChildFixture['gradeLevel']) {
  return TRACKS.filter((track) => track.gradeLevel === gradeLevel);
}

export function getTracksForChild(child: ChildFixture) {
  return getTracksForGrade(child.gradeLevel);
}

export function getChildBySlug(slug: string) {
  return CHILDREN.find((child) => child.slug === slug) ?? null;
}

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
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).flatMap((track) =>
      track.units.flatMap((unit) =>
        unit.lessons.map((lesson) => ({
          childSlug: child.slug,
          lessonId: lesson.id,
        })),
      ),
    ),
  );
}

export function getTrackPaths() {
  return CHILDREN.flatMap((child) =>
    getTracksForChild(child).map((track) => ({
      childSlug: child.slug,
      trackSlug: track.slug,
    })),
  );
}
