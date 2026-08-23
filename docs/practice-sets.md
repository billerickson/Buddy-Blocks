# Flash Card Sections

Flash card sections are child-specific study lists for spelling words, vocabulary, questions, definitions, or other short-lived school work. They are stored outside canonical curriculum so they can be pinned, expired, and archived without changing grade-wide lesson content.

## Data Model

Practice data lives in D1:

- `practice_sets`: one child-owned list.
- `practice_set_cards`: vocabulary terms, definitions, examples, and accepted typed answers.
- `practice_set_attempts`: completion history for generated practice lessons.
- `practice_card_attempts`: per-card answer history.

Archive a set after the school test instead of deleting it. Archived sets stop appearing on Kid Home and cannot be opened as active lessons, but their attempt rows remain available for history and future reporting.

## Kid Authoring Workflow

Kids open **My Flash Cards** from Kid Home at `/kid/:childSlug/flash-cards/`. The editor lets the active child create, edit, pin, archive, and restore their own sections.

List the active child's sections:

```http
GET /api/children/:childSlug/flash-card-sections
```

Create a section:

```http
POST /api/children/:childSlug/flash-card-sections
Content-Type: application/json

{
  "title": "Week 1 Words",
  "subject": "flash-cards",
  "source": "Friday quiz",
  "pinned": true,
  "cards": [
    {
      "term": "vast",
      "definition": "very big",
      "example": "The desert is vast.",
      "acceptedAnswers": []
    }
  ]
}
```

Update, pin/unpin, replace cards, archive, or restore:

```http
PATCH /api/children/:childSlug/flash-card-sections/:practiceSetId
Content-Type: application/json

{
  "status": "archived"
}
```

These endpoints require an active child and an exact matching child-mode cookie. Parent mode and a different child's mode receive `child_locked`.

## Parent API Workflow

List a child's sets:

```http
GET /api/parent/children/:childSlug/practice-sets
```

Create a set:

```http
POST /api/parent/children/:childSlug/practice-sets
Content-Type: application/json

{
  "title": "Week 1 Words",
  "subject": "vocabulary",
  "source": "Friday quiz",
  "pinned": true,
  "expiresAt": "2099-01-05T00:00:00.000Z",
  "cards": [
    {
      "term": "vast",
      "definition": "very big",
      "example": "The desert is vast.",
      "acceptedAnswers": ["large"]
    }
  ]
}
```

Update, pin/unpin, replace cards, or archive:

```http
PATCH /api/parent/children/:childSlug/practice-sets/:practiceSetId
Content-Type: application/json

{
  "status": "archived"
}
```

The existing parent APIs remain available for parent-managed sets. Parent practice-set mutation APIs require normal parent mode. Child mode receives `parent_reauth_required`.

## Kid Experience

Active practice sets are visible when:

- `status` is `active`.
- `startsAt` is empty or in the past.
- `expiresAt` is empty or in the future.

Kid Home always shows a **My Flash Cards** entry. Pinned active sets appear above regular track cards and become the recommended next block. Expired, draft, and archived sets stay hidden from the practice list, while archived sets remain available to restore in the editor.

Each visible set exposes a virtual standard lesson ID:

```text
practice_set_<practiceSetId>
```

The Worker serves that virtual lesson through the normal lesson API. Each card generates three questions in the same exposure-first order used by canonical Vocabulary lessons:

- Context: a `passage-question` using the example sentence when provided, or a short definition sentence when no example exists.
- Easy: a `flash-card` with the term on the card and definition choices.
- Hard: a `flash-card` with the definition/example on the card and typed accepted answers.

Practice completion writes to practice attempt tables and daily activity, but it does not write canonical `lesson_attempts`, `child_lesson_progress`, or `child_track_progress`.
