# Lesson Player QA Checklist

Use this checklist after changing `LessonPlayer` rendering, question controls, lesson flow, or completion UI. Automated tests cover scoring and queue logic, but browser-level component smoke tests are not in place yet.

## Setup

```bash
npm run content:validate
npm test
npm run build
npm run db:seed:local
npm run dev:worker
```

Open the local Worker URL and sign in with the seeded parent account.

## Manual Smoke Pass

- Start a standard lesson with intro cards and confirm the intro advances into questions.
- Complete one multiple-choice question.
- Complete one text-input question, including an answer with different casing/spacing.
- Complete one flash-card easy prompt and one flash-card hard prompt.
- Complete one match-pairs prompt and confirm right-side choices are shuffled.
- Complete one order-items prompt.
- Complete one fill-blank prompt.
- Complete one passage-question prompt.
- Complete one multi-blank cloze prompt.
- Complete one constructed-response prompt.
- Complete one dialogue-builder prompt.
- Complete one listening-question prompt and open the transcript when present.
- Complete one speaking-prompt attempt with a typed note if microphone access is unavailable.
- Complete one error-correction prompt.
- Complete one conjugation-grid prompt.
- Finish a standard lesson and verify XP, score, hearts, streak, and next-lesson unlock display.
- Finish a Mad Minute lesson and verify timer, record, XP, and completion display.
- Open a weekly practice set and verify generated easy/hard flash-card prompts complete normally.
