# Grade And Enrollment Model

Buddy Blocks v1 uses a deliberately small enrollment model:

- Each child has one global `grade_level`.
- A parent can set per-subject grade overrides in `child_subject_levels`.
- Track visibility is resolved by subject: the app shows tracks whose `grade_level` matches the override for that subject, or the child's global grade when no override exists.
- Spanish also supports a narrow sequential handoff: when a child completes the currently visible Spanish track, the next Spanish grade-level track becomes visible and accessible.

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

## Spanish Sequence Behavior

Spanish tracks represent language levels, not a one-to-one academic grade path. For v1:

- Reagan is globally Grade 6 but starts Spanish at Grade 3 through a subject override.
- Grade 3 Spanish is the beginner Spanish I / Level I course.
- Grade 4 Spanish is the Spanish II / Level II follow-up course.
- When the final Grade 3 Spanish lesson is completed, the Worker starts the Grade 4 Spanish track for that child and unlocks its first lesson.
- Kid Home skips completed tracks when choosing the regular recommendation, so Grade 4 Spanish can become the recommended lesson after Grade 3 Spanish is complete.

This sequence is intentionally scoped to Spanish. Math and Vocabulary remain controlled only by the effective grade level.

## Future Assignment Layer

Do not add assignment tables for v1 unless the product requirements change. A future `child_track_assignments` layer could support pinned review tracks, multiple active tracks in one subject, or custom special courses. Until then, use subject-level overrides for grade mismatches and practice sets for temporary school vocabulary.
