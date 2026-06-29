# Weekly Practice Sets

Weekly practice sets are child-specific vocabulary lists for short-lived school work. They are stored outside canonical curriculum so they can be pinned, expired, and archived without changing grade-wide lesson content.

## Data Model

Practice data lives in D1:

- `practice_sets`: one parent-created list for one child.
- `practice_set_cards`: vocabulary terms, definitions, examples, and accepted typed answers.
- `practice_set_attempts`: completion history for generated practice lessons.
- `practice_card_attempts`: per-card answer history.

Archive a set after the school test instead of deleting it. Archived sets stop appearing on Kid Home and cannot be opened as active lessons, but their attempt rows remain available for history and future reporting.

## Parent API Workflow

List a child's sets:

```http
GET /api/parent/children/:childSlug/practice-sets
```

Create a weekly set:

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

Parent practice-set mutation APIs require normal parent mode. Child mode receives `parent_reauth_required`.

## Kid Experience

Active practice sets are visible when:

- `status` is `active`.
- `startsAt` is empty or in the past.
- `expiresAt` is empty or in the future.

Pinned active sets appear above regular track cards on Kid Home and become the recommended next block. Expired, draft, and archived sets stay hidden from Kid Home.

Each visible set exposes a virtual standard lesson ID:

```text
practice_set_<practiceSetId>
```

The Worker serves that virtual lesson through the normal lesson API. Each card generates two `flash-card` questions:

- Easy: term on the card, definition choices.
- Hard: definition/example on the card, typed accepted answers.

Practice completion writes to practice attempt tables and daily activity, but it does not write canonical `lesson_attempts`, `child_lesson_progress`, or `child_track_progress`.
