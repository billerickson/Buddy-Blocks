# Grade And Enrollment Model

Buddy Blocks v1 uses a deliberately small enrollment model:

- Each child has one global `grade_level`.
- A parent can set per-subject grade overrides in `child_subject_levels`.
- Track visibility is resolved by subject: the app shows tracks whose `grade_level` matches the override for that subject, or the child's global grade when no override exists.

For the current family setup, this means:

- Reagan is globally Grade 6.
- Reagan's Spanish subject is overridden to Grade 3.
- Ada is globally Grade 3 with no subject overrides.

## Parent Override Behavior

The parent subject-level API accepts:

```http
PATCH /api/parent/children/:childSlug/subject-levels
Content-Type: application/json

{
  "subject": "spanish",
  "gradeLevel": 3
}
```

Setting `gradeLevel` to `null`, or to the child's global grade, removes the override. Historical attempts are not deleted when a track is no longer currently visible through the effective-grade filter.

## Future Assignment Layer

Do not add assignment tables for v1 unless the product requirements change. A future `child_track_assignments` layer could support pinned review tracks, multiple active tracks in one subject, or custom special courses. Until then, use subject-level overrides for grade mismatches and practice sets for temporary school vocabulary.
