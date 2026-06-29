import type { LessonQuestion, QuestionMedia } from '../../lib/lesson-engine';

export function QuestionMediaDisplay({ media }: { media?: QuestionMedia }) {
  if (!media?.image && !media?.audio && !media?.video) return null;

  return (
    <div className="mb-5 space-y-3 rounded-lg border-[3px] border-ink bg-white p-4">
      {media.image && (
        <figure>
          <img className="max-h-[360px] w-full rounded-lg object-contain" src={media.image.src} alt={media.image.alt} />
          {media.image.caption && <figcaption className="mt-2 text-sm font-black text-muted">{media.image.caption}</figcaption>}
        </figure>
      )}
      {media.audio && <AudioBlock src={media.audio.src} label={media.audio.label} transcript={media.audio.transcript} />}
      {media.video && (
        <video className="w-full rounded-lg border-2 border-ink" controls src={media.video.src}>
          <a href={media.video.src}>{media.video.label ?? 'Open video'}</a>
        </video>
      )}
    </div>
  );
}

export function mediaFromQuestion(question: LessonQuestion) {
  return (question.payload as { media?: QuestionMedia }).media;
}

export function AudioBlock({ src, label, transcript }: { src: string; label?: string; transcript?: string }) {
  return (
    <section className="rounded-lg border-[3px] border-ink bg-white p-4">
      {label && <h3 className="text-2xl font-black">{label}</h3>}
      <audio className="mt-3 w-full" controls src={src}>
        <a href={src}>Open audio</a>
      </audio>
      {transcript && (
        <details className="mt-3 rounded-lg border-2 border-ink bg-[#f0fff9] p-3 font-bold">
          <summary className="cursor-pointer font-black">Transcript</summary>
          <p className="mt-2 whitespace-pre-line text-muted">{transcript}</p>
        </details>
      )}
    </section>
  );
}
