import React, { useState } from 'react';
import { useEntity } from 'simpler-state';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon, DeleteIcon, EditIcon } from '@/components/atoms/icons/Icons';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';

export default function CurriculumEditor() {
  const createSubject = useEntity(createSubjectEntity);

  // initialize minimal curriculum shape in createSubjectEntity if missing
  if (!createSubject.curriculum || createSubject.curriculum.length === 0) {
    const defaults = Array.from({ length: 4 }).map((_, i) => ({
      termId: `term-${i + 1}`,
      topics: [] as { id: string; title: string; description?: string }[],
    }));
    // set defaults and render a short placeholder while state updates
    createSubjectEntity.set((prev) => ({ ...prev, curriculum: defaults }));
    return <div className="w-full mt-5">Initializing curriculum...</div>;
  }

  return (
    <div className="w-full mt-5">
      {createSubject.curriculum.map((term, idx) => (
        <TermEditor key={term.termId} term={term} termIndex={idx} />
      ))}
    </div>
  );
}

function TermEditor({
  term,
  termIndex,
}: {
  term: { termId: string; topics: { id: string; title: string; description?: string }[] };
  termIndex: number;
}) {
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createSubjectEntity.set((prev) => {
      const curriculum = prev.curriculum ? [...prev.curriculum] : [];
      const idx = curriculum.findIndex((c) => c.termId === term.termId);
      if (idx === -1) return prev;

      const topics = [...(curriculum[idx].topics || [])];
      if (editingId) {
        const tIdx = topics.findIndex((t) => t.id === editingId);
        if (tIdx !== -1) topics[tIdx] = { ...topics[tIdx], title: title.trim(), description: brief.trim() };
      } else {
        topics.push({ id: `${term.termId}-${Date.now()}`, title: title.trim(), description: brief.trim() });
      }
      curriculum[idx] = { ...curriculum[idx], topics };
      return { ...prev, curriculum };
    });

    setTitle('');
    setBrief('');
    setEditingId(null);
  };

  const handleRemove = (topicId: string) => {
    createSubjectEntity.set((prev) => {
      const curriculum = prev.curriculum ? [...prev.curriculum] : [];
      const idx = curriculum.findIndex((c) => c.termId === term.termId);
      if (idx === -1) return prev;
      const topics = (curriculum[idx].topics || []).filter((t) => t.id !== topicId);
      curriculum[idx] = { ...curriculum[idx], topics };
      return { ...prev, curriculum };
    });
  };

  return (
    <div className="bg-white p-4 rounded mb-4">
      <h3 className={cn('text-base font-medium mb-2', poppins_500.className)}>{`Term ${termIndex + 1}`}</h3>

      <div className="mb-4">
        {(!term.topics || term.topics.length === 0) ? (
          <p className={cn('text-sm text-gray3', poppins_400.className)}>No topics yet. Add one below.</p>
        ) : (
          term.topics.map((t) => (
            <div key={t.id} className="flex items-start gap-3 p-3 border rounded-lg mb-2">
              <div className="flex-1">
                <div className={cn('font-medium', poppins_500.className)}>{t.title}</div>
                {t.description ? (
                  <div className={cn('text-sm text-gray-500', poppins_400.className)}>{t.description}</div>
                ) : null}
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(t.id);
                    setTitle(t.title);
                    setBrief(t.description ?? '');
                  }}
                  className="text-gray-600"
                  aria-label="Edit topic"
                  title="Edit topic"
                >
                  <EditIcon size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(t.id)}
                  className="text-red-500"
                  aria-label="Remove topic"
                  title="Remove topic"
                >
                  <DeleteIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAdd}>
        <Input
          id={`${term.termId}-topic`}
          label="Topic"
          type="text"
          labelClassName="label"
          className="input h-12 rounded-lg"
          name="topic"
          placeholder="Enter topic title"
          value={title}
          handleChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />

        <Input
          type="textarea"
          label="Topic Brief"
          id={`${term.termId}-brief`}
          name="brief"
          placeholder="Short description"
          rows={3}
          labelClassName="label mt-3"
          className="input"
          value={brief}
          handleChange={(e) => setBrief((e.target as HTMLTextAreaElement).value)}
        />

        <Button wide round type="submit" className="bg-light text-primary mt-4">
          <span className={cn('text-base flex items-center gap-2', poppins_500.className)}>
            <span className={editingId ? 'text-green-500' : ''}>
              <AdditionIcon color='#4caf50 ' />
            </span>
            {editingId ? 'Update topic' : 'Add new topic'}
          </span>
        </Button>
      </form>
    </div>
  );
}
