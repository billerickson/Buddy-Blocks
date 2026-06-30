import { describe, expect, it } from 'vitest';
import { selectOfflineLessonIds, type HomeLike, type TrackDataLike } from '../src/components/islands/offline/api';

describe('offline lesson pack selection', () => {
  it('prioritizes recommended and practice lessons before available track lessons without duplicates', () => {
    const home: HomeLike = {
      recommendedLesson: { id: 'lesson_recommended' },
      practiceSets: [{ lessonId: 'practice_set_1' }, { lessonId: 'lesson_duplicate' }],
      tracks: [{ slug: 'math' }],
    };
    const tracks: TrackDataLike[] = [
      {
        track: { slug: 'math' },
        units: [
          {
            lessons: [
              { id: 'lesson_locked', status: 'locked' },
              { id: 'lesson_duplicate', status: 'available' },
              { id: 'lesson_available', status: 'available' },
              { id: 'lesson_done', status: 'completed' },
            ],
          },
        ],
      },
    ];

    expect(selectOfflineLessonIds(home, tracks, 4)).toEqual([
      'lesson_recommended',
      'practice_set_1',
      'lesson_duplicate',
      'lesson_available',
    ]);
  });

  it('respects the lesson pack limit', () => {
    expect(
      selectOfflineLessonIds(
        {
          recommendedLesson: null,
          practiceSets: [],
          tracks: [{ slug: 'math' }],
        },
        [
          {
            track: { slug: 'math' },
            units: [
              {
                lessons: [
                  { id: 'lesson_1', status: 'available' },
                  { id: 'lesson_2', status: 'available' },
                  { id: 'lesson_3', status: 'available' },
                ],
              },
            ],
          },
        ],
        2,
      ),
    ).toEqual(['lesson_1', 'lesson_2']);
  });
});
