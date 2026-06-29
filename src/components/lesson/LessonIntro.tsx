import type { StandardLessonConfig } from '../../lib/lesson-config-core';
import { QuestionMediaDisplay } from './media';

type LessonIntroData = {
  lesson: {
    title: string;
    unit: { title: string };
    track: { title: string };
  };
};

export function LessonIntro({
  data,
  config,
  onStart,
}: {
  data: LessonIntroData;
  config: StandardLessonConfig;
  onStart: () => void;
}) {
  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <header className="block-card p-5">
        <p className="stat-chip w-fit">
          {data.lesson.track.title} · {data.lesson.unit.title}
        </p>
        <h1 className="mt-3 text-[clamp(2.3rem,6vw,4.2rem)]">{data.lesson.title}</h1>
      </header>

      <article className="block-card p-5 sm:p-7">
        <div className="space-y-6">
          {config.intro?.map((card, index) => (
            <section key={`${card.title}-${index}`} className={index > 0 ? 'border-t-[3px] border-ink pt-6' : ''}>
              <QuestionMediaDisplay media={card.media} />
              <h2 className="text-[clamp(2rem,5vw,3.4rem)] leading-tight">{card.title}</h2>
              <p className="mt-3 text-lg font-bold text-muted">{card.body}</p>
              {card.bullets && (
                <ul className="mt-4 space-y-2 text-lg font-black">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-lg border-2 border-ink bg-white px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <button className="primary-button mt-7 w-full sm:w-auto" type="button" onClick={onStart}>
          Start Lesson
        </button>
      </article>
    </section>
  );
}
