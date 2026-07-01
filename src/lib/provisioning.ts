import { TRACKS, getAllLessons, type TrackFixture } from './curriculum';
import { buildChildTrackRepairStatements, insertIgnoreStatement } from './seed-sql';
import { compareSubjectKeys, isFoundationSubject } from './subjects';

export type ProvisioningChild = {
  id: string;
  gradeLevel: number;
};

export function getTracksForGradeLevel(gradeLevel: number, tracks: TrackFixture[] = TRACKS) {
  return tracks
    .filter((track) => {
      if (!isFoundationSubject(track.subject)) return track.gradeLevel === gradeLevel;
      return track.gradeLevel === firstFoundationGradeLevel(track.subject, tracks);
    })
    .sort(compareBySubjectOrder);
}

export function buildChildProgressProvisioningStatements(
  child: ProvisioningChild,
  updatedAt: string,
  tracks: TrackFixture[] = TRACKS,
) {
  const statements: string[] = [];
  const allLessons = getAllLessons(tracks);

  for (const track of getTracksForGradeLevel(child.gradeLevel, tracks)) {
    const firstUnit = track.units[0];
    const firstLesson = firstUnit?.lessons[0];
    if (!firstUnit || !firstLesson) continue;

    statements.push(
      insertIgnoreStatement('child_track_progress', {
        id: `track_progress_${child.id}_${track.id}`,
        child_profile_id: child.id,
        track_id: track.id,
        current_unit_id: firstUnit.id,
        current_lesson_id: firstLesson.id,
        lessons_completed: 0,
        xp_total: 0,
        updated_at: updatedAt,
      }),
    );

    for (const lesson of allLessons.filter((item) => item.track.id === track.id)) {
      statements.push(
        insertIgnoreStatement('child_lesson_progress', {
          id: `lesson_progress_${child.id}_${lesson.id}`,
          child_profile_id: child.id,
          lesson_id: lesson.id,
          status: initialLessonStatus(lesson.id, firstLesson.id, lesson.kind),
          completed_at: null,
          best_score_correct: 0,
          best_score_total: 0,
        }),
      );
    }

    statements.push(...buildChildTrackRepairStatements(child.id, track.id, updatedAt));
  }

  return statements;
}

function initialLessonStatus(lessonId: string, firstLessonId: string, kind: string | undefined) {
  return lessonId === firstLessonId || kind === 'mad-minute' ? 'available' : 'locked';
}

function compareBySubjectOrder(a: TrackFixture, b: TrackFixture) {
  const subjectOrder = compareSubjectKeys(a.subject, b.subject);
  if (subjectOrder !== 0) return subjectOrder;
  return a.gradeLevel - b.gradeLevel;
}

function firstFoundationGradeLevel(subject: string, tracks: TrackFixture[]) {
  return Math.min(...tracks.filter((track) => track.subject === subject).map((track) => track.gradeLevel));
}
