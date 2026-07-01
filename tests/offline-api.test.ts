import { describe, expect, it } from 'vitest';
import {
  selectOfflineLessonIds,
  selectTrackLessonIds,
  type HomeLike,
  type TrackDataLike,
  type TrackOfflinePack,
} from '../src/components/islands/offline/api';

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

  it('selects every lesson from a saved track pack in pack order', () => {
    const pack: TrackOfflinePack = {
      child: { slug: 'mira' },
      track: { slug: 'spanish-1', title: 'Spanish 1' },
      progress: { lessonsCompleted: 0, xpTotal: 0, currentLesson: null },
      units: [],
      lessons: [
        {
          lesson: {
            id: 'lesson_1',
            title: 'One',
            unit: { title: 'Unit' },
            track: { slug: 'spanish-1', title: 'Spanish 1' },
          },
        },
        {
          lesson: {
            id: 'lesson_2',
            title: 'Two',
            unit: { title: 'Unit' },
            track: { slug: 'spanish-1', title: 'Spanish 1' },
          },
        },
      ],
    };

    expect(selectTrackLessonIds(pack)).toEqual(['lesson_1', 'lesson_2']);
  });
});
