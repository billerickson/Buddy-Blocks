import { useEffect, useState } from 'preact/hooks';
import { fetchApi } from './api';
import { childSlugFromLocation } from './route-params';

type FlashCard = {
  id: string;
  term: string;
  definition: string | null;
  example: string | null;
  acceptedAnswers: string[];
  sortOrder: number;
};

type FlashCardSection = {
  id: string;
  lessonId: string;
  title: string;
  source: string | null;
  status: 'draft' | 'active' | 'archived';
  pinned: boolean;
  archivedAt: string | null;
  updatedAt: string;
  cards: FlashCard[];
};

type DraftCard = {
  key: string;
  term: string;
  definition: string;
  example: string;
};

type SectionDraft = {
  id: string | null;
  title: string;
  source: string;
  pinned: boolean;
  cards: DraftCard[];
};

function newDraftCard(card?: FlashCard): DraftCard {
  return {
    key: card?.id ?? `new_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    term: card?.term ?? '',
    definition: card?.definition ?? '',
    example: card?.example ?? '',
  };
}

function newSectionDraft(): SectionDraft {
  return {
    id: null,
    title: '',
    source: '',
    pinned: false,
    cards: [newDraftCard()],
  };
}

function sectionDraft(section: FlashCardSection): SectionDraft {
  return {
    id: section.id,
    title: section.title,
    source: section.source ?? '',
    pinned: section.pinned,
    cards: section.cards.length ? section.cards.map((card) => newDraftCard(card)) : [newDraftCard()],
  };
}

export default function FlashCardSections({ childSlug: childSlugProp }: { childSlug?: string }) {
  const childSlug = childSlugFromLocation(childSlugProp);
  const [sections, setSections] = useState<FlashCardSection[] | null>(null);
  const [draft, setDraft] = useState<SectionDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const apiPath = `/api/children/${encodeURIComponent(childSlug)}/flash-card-sections`;

  useEffect(() => {
    if (!childSlug) {
      setError('Child path not found.');
      return;
    }

    fetchApi<{ practiceSets: FlashCardSection[] }>(apiPath)
      .then(({ practiceSets }) => {
        setSections(practiceSets);
        if (practiceSets.length === 0) setDraft(newSectionDraft());
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Flash cards could not be loaded.'));
  }, [apiPath, childSlug]);

  function updateDraft(updates: Partial<Omit<SectionDraft, 'cards'>>) {
    setDraft((current) => (current ? { ...current, ...updates } : current));
  }

  function updateCard(key: string, updates: Partial<Omit<DraftCard, 'key'>>) {
    setDraft((current) =>
      current
        ? {
            ...current,
            cards: current.cards.map((card) => (card.key === key ? { ...card, ...updates } : card)),
          }
        : current,
    );
  }

  function addCard() {
    setDraft((current) => (current ? { ...current, cards: [...current.cards, newDraftCard()] } : current));
  }

  function removeCard(key: string) {
    setDraft((current) => {
      if (!current || current.cards.length <= 1) return current;
      return { ...current, cards: current.cards.filter((card) => card.key !== key) };
    });
  }

  async function saveSection(event: Event) {
    event.preventDefault();
    if (!draft) return;

    const title = draft.title.trim();
    const cards = draft.cards.map((card) => ({
      term: card.term.trim(),
      definition: card.definition.trim(),
      example: card.example.trim(),
    }));
    if (!title) {
      setError('Give this flash-card section a name.');
      return;
    }
    if (cards.some((card) => !card.term || !card.definition)) {
      setError('Every card needs both a front and a back.');
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');
    try {
      const result = await fetchApi<{ practiceSet: FlashCardSection }>(
        draft.id ? `${apiPath}/${encodeURIComponent(draft.id)}` : apiPath,
        {
          method: draft.id ? 'PATCH' : 'POST',
          body: JSON.stringify({
            title,
            subject: 'vocabulary',
            source: draft.source.trim() || null,
            pinned: draft.pinned,
            ...(draft.id ? {} : { status: 'active' }),
            cards: cards.map((card) => ({
              term: card.term,
              definition: card.definition,
              example: card.example || null,
              acceptedAnswers: [],
            })),
          }),
        },
      );

      setSections((current) => {
        const existing = current ?? [];
        return [result.practiceSet, ...existing.filter((section) => section.id !== result.practiceSet.id)];
      });
      setDraft(sectionDraft(result.practiceSet));
      setMessage(draft.id ? 'Flash-card section updated.' : 'Flash-card section created.');
    } catch (reason) {
      setError(reason instanceof Error ? friendlyApiError(reason.message) : 'Flash-card section could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function setSectionStatus(section: FlashCardSection, status: 'active' | 'archived') {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const result = await fetchApi<{ practiceSet: FlashCardSection }>(
        `${apiPath}/${encodeURIComponent(section.id)}`,
        { method: 'PATCH', body: JSON.stringify({ status }) },
      );
      setSections((current) =>
        (current ?? []).map((item) => (item.id === result.practiceSet.id ? result.practiceSet : item)),
      );
      if (draft?.id === result.practiceSet.id && status === 'archived') setDraft(null);
      setMessage(status === 'archived' ? 'Flash-card section archived.' : 'Flash-card section restored.');
    } catch (reason) {
      setError(reason instanceof Error ? friendlyApiError(reason.message) : 'Flash-card section could not be updated.');
    } finally {
      setSaving(false);
    }
  }

  if (!childSlug) return <p className="block-card p-5 font-black text-berryDark">Child path not found.</p>;
  if (sections === null && !error) return <p className="text-xl font-black text-muted">Gathering your flash cards...</p>;

  const activeSections = (sections ?? []).filter((section) => section.status === 'active');
  const archivedSections = (sections ?? []).filter((section) => section.status === 'archived');

  return (
    <section className="space-y-7">
      <header className="block-card p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="stat-chip w-fit bg-reward">Made by you</p>
            <h1 className="mt-4 text-[clamp(3rem,9vw,5.8rem)]">My Flash Cards</h1>
            <p className="mt-4 max-w-3xl text-lg font-extrabold text-muted">
              Build sections for spelling words, definitions, questions, or anything else you want to remember.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="secondary-button" href={`/kid/${encodeURIComponent(childSlug)}/`}>Home</a>
            <button
              className="primary-button"
              type="button"
              disabled={saving}
              onClick={() => {
                setDraft(newSectionDraft());
                setError('');
                setMessage('');
              }}
            >
              New Section
            </button>
          </div>
        </div>
      </header>

      {error && <p className="rounded-lg border-[3px] border-ink bg-[#ffe1ea] p-4 font-black text-berryDark" role="alert">{error}</p>}
      {message && <p className="rounded-lg border-[3px] border-ink bg-[#d9fff5] p-4 font-black text-ink" role="status">{message}</p>}

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-5">
          <section className="soft-panel p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="stat-chip w-fit">Your sections</p>
                <h2 className="mt-3 text-3xl">Ready to practice</h2>
              </div>
              <span className="stat-chip">{activeSections.length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {activeSections.length ? (
                activeSections.map((section) => (
                  <SectionRow
                    key={section.id}
                    section={section}
                    childSlug={childSlug}
                    saving={saving}
                    selected={draft?.id === section.id}
                    onEdit={() => {
                      setDraft(sectionDraft(section));
                      setError('');
                      setMessage('');
                    }}
                    onArchive={() => void setSectionStatus(section, 'archived')}
                  />
                ))
              ) : (
                <div className="rounded-lg border-2 border-dashed border-line bg-white p-4">
                  <p className="font-black">No active sections yet.</p>
                  <p className="mt-1 font-bold text-muted">Add your first card on the right.</p>
                </div>
              )}
            </div>
          </section>

          {archivedSections.length > 0 && (
            <details className="soft-panel p-5">
              <summary className="cursor-pointer font-black">Archived sections ({archivedSections.length})</summary>
              <div className="mt-4 space-y-3">
                {archivedSections.map((section) => (
                  <div className="rounded-lg border-2 border-line bg-white p-4" key={section.id}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-2xl">{section.title}</h3>
                        <p className="mt-1 font-bold text-muted">{section.cards.length} {section.cards.length === 1 ? 'card' : 'cards'}</p>
                      </div>
                      <button
                        className="secondary-button min-h-[44px] px-4 py-2"
                        type="button"
                        disabled={saving}
                        onClick={() => void setSectionStatus(section, 'active')}
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        {draft ? (
          <SectionEditor
            draft={draft}
            saving={saving}
            onSubmit={saveSection}
            onUpdate={updateDraft}
            onUpdateCard={updateCard}
            onAddCard={addCard}
            onRemoveCard={removeCard}
            onCancel={() => {
              setDraft(null);
              setError('');
            }}
          />
        ) : (
          <section className="block-card p-6 text-center sm:p-8">
            <p className="text-5xl" aria-hidden="true">🗂️</p>
            <h2 className="mt-4 text-3xl">Choose a section to edit</h2>
            <p className="mt-3 font-bold text-muted">Or start a brand-new section for your next stack.</p>
            <button className="primary-button mt-5" type="button" onClick={() => setDraft(newSectionDraft())}>
              New Section
            </button>
          </section>
        )}
      </div>
    </section>
  );
}

function SectionRow({
  section,
  childSlug,
  saving,
  selected,
  onEdit,
  onArchive,
}: {
  section: FlashCardSection;
  childSlug: string;
  saving: boolean;
  selected: boolean;
  onEdit: () => void;
  onArchive: () => void;
}) {
  return (
    <article className={`rounded-lg border-[3px] bg-white p-4 ${selected ? 'border-berry bg-[#fff1f7]' : 'border-ink'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {section.pinned && <span className="stat-chip bg-reward">Pinned</span>}
            <span className="stat-chip">{section.cards.length} {section.cards.length === 1 ? 'card' : 'cards'}</span>
          </div>
          <h3 className="mt-3 text-2xl">{section.title}</h3>
          {section.source && <p className="mt-1 font-bold text-muted">{section.source}</p>}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="primary-button min-h-[44px] px-4 py-2"
          href={`/kid/${encodeURIComponent(childSlug)}/lesson/${encodeURIComponent(section.lessonId)}/`}
        >
          Practice
        </a>
        <button className="secondary-button min-h-[44px] px-4 py-2" type="button" disabled={saving} onClick={onEdit}>
          Edit
        </button>
        <button className="danger-button min-h-[44px] px-4 py-2" type="button" disabled={saving} onClick={onArchive}>
          Archive
        </button>
      </div>
    </article>
  );
}

function SectionEditor({
  draft,
  saving,
  onSubmit,
  onUpdate,
  onUpdateCard,
  onAddCard,
  onRemoveCard,
  onCancel,
}: {
  draft: SectionDraft;
  saving: boolean;
  onSubmit: (event: Event) => void;
  onUpdate: (updates: Partial<Omit<SectionDraft, 'cards'>>) => void;
  onUpdateCard: (key: string, updates: Partial<Omit<DraftCard, 'key'>>) => void;
  onAddCard: () => void;
  onRemoveCard: (key: string) => void;
  onCancel: () => void;
}) {
  return (
    <form className="block-card p-5 sm:p-7" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="stat-chip w-fit">{draft.id ? 'Edit section' : 'New section'}</p>
          <h2 className="mt-3 text-4xl">{draft.id ? draft.title || 'Untitled section' : 'Build a new stack'}</h2>
        </div>
        <span className="stat-chip">{draft.cards.length} {draft.cards.length === 1 ? 'card' : 'cards'}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="font-black">
          Section name
          <input
            className="mt-2 min-h-[52px] w-full rounded-lg border-[3px] border-ink bg-white px-4 font-extrabold outline-none focus:ring-4 focus:ring-reward"
            value={draft.title}
            maxLength={100}
            required
            placeholder="Week 1 spelling"
            onInput={(event) => onUpdate({ title: (event.currentTarget as HTMLInputElement).value })}
          />
        </label>
        <label className="font-black">
          What is this for? <span className="text-sm text-muted">(optional)</span>
          <input
            className="mt-2 min-h-[52px] w-full rounded-lg border-[3px] border-ink bg-white px-4 font-extrabold outline-none focus:ring-4 focus:ring-reward"
            value={draft.source}
            maxLength={160}
            placeholder="Friday quiz"
            onInput={(event) => onUpdate({ source: (event.currentTarget as HTMLInputElement).value })}
          />
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border-2 border-line bg-[#fff8d8] p-4 font-black">
        <input
          className="mt-1 h-5 w-5 accent-berry"
          type="checkbox"
          checked={draft.pinned}
          onChange={(event) => onUpdate({ pinned: (event.currentTarget as HTMLInputElement).checked })}
        />
        <span>
          Pin this section
          <span className="mt-1 block text-sm font-bold text-muted">Pinned cards become your recommended next practice.</span>
        </span>
      </label>

      <div className="mt-6 space-y-4">
        {draft.cards.map((card, index) => (
          <fieldset className="rounded-lg border-2 border-line bg-[#fffaf0] p-4" key={card.key}>
            <legend className="px-2 font-black">Card {index + 1}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="font-black">
                Front
                <textarea
                  className="mt-2 min-h-[112px] w-full resize-y rounded-lg border-[3px] border-ink bg-white p-3 font-extrabold outline-none focus:ring-4 focus:ring-reward"
                  value={card.term}
                  maxLength={500}
                  required
                  placeholder="Word, question, or prompt"
                  onInput={(event) => onUpdateCard(card.key, { term: (event.currentTarget as HTMLTextAreaElement).value })}
                />
              </label>
              <label className="font-black">
                Back
                <textarea
                  className="mt-2 min-h-[112px] w-full resize-y rounded-lg border-[3px] border-ink bg-white p-3 font-extrabold outline-none focus:ring-4 focus:ring-reward"
                  value={card.definition}
                  maxLength={800}
                  required
                  placeholder="Meaning or answer"
                  onInput={(event) => onUpdateCard(card.key, { definition: (event.currentTarget as HTMLTextAreaElement).value })}
                />
              </label>
            </div>
            <label className="mt-4 block font-black">
              Example or memory clue <span className="text-sm text-muted">(optional)</span>
              <textarea
                className="mt-2 min-h-[80px] w-full resize-y rounded-lg border-2 border-ink bg-white p-3 font-bold outline-none focus:ring-4 focus:ring-reward"
                value={card.example}
                maxLength={800}
                placeholder="Use it in a sentence or add a helpful hint"
                onInput={(event) => onUpdateCard(card.key, { example: (event.currentTarget as HTMLTextAreaElement).value })}
              />
            </label>
            <div className="mt-3 flex justify-end">
              <button
                className="danger-button min-h-[42px] px-3 py-2"
                type="button"
                disabled={saving || draft.cards.length <= 1}
                onClick={() => onRemoveCard(card.key)}
              >
                Remove Card
              </button>
            </div>
          </fieldset>
        ))}
      </div>

      <button className="secondary-button mt-4 w-full" type="button" disabled={saving} onClick={onAddCard}>
        Add Another Card
      </button>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button className="secondary-button" type="button" disabled={saving} onClick={onCancel}>Cancel</button>
        <button className="primary-button" type="submit" disabled={saving}>
          {saving ? 'Saving...' : draft.id ? 'Save Changes' : 'Create Section'}
        </button>
      </div>
    </form>
  );
}

function friendlyApiError(message: string) {
  if (message === 'invalid_practice_set_payload') return 'Check the section name and every flash card, then try again.';
  if (message === 'child_locked') return 'This flash-card page belongs to a different child profile.';
  return message;
}
