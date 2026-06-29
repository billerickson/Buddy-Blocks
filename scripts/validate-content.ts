import {
  TRACKS,
  formatCurriculumSummary,
  summarizeCurriculum,
  validateCurriculum,
} from '../src/lib/curriculum';

validateCurriculum(TRACKS);
console.log('Curriculum content is valid.');
console.log(formatCurriculumSummary(summarizeCurriculum(TRACKS)));
