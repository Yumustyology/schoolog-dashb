import React, { useState } from 'react';
import { useEntity } from 'simpler-state';
import { createSubjectEntity } from '@/app/lib/entities/subject.entity';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { AdditionIcon, DeleteIcon, EditIcon, ArrangeIcon } from '@/components/atoms/icons/Icons';
import { cn } from '@/app/lib/utils';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { formatDateRange } from '@/app/lib/utils/dateUtils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function CurriculumEditor() {
  const createSubject = useEntity(createSubjectEntity);

  // Use selected term instead of multiple terms
  if (!createSubject.selectedTerm) {
    return (
      <div className="w-full mt-5 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className={cn('text-yellow-800', poppins_500.className)}>
          Please select a term session above to create curriculum topics.
        </p>
      </div>
    );
  }

  // Check if curriculum for current term exists, if not create it while preserving other terms
  const currentTermCurriculum = (createSubject.curriculum || []).find(
    curr => curr.termId === createSubject.selectedTerm!._id
  );

  if (!currentTermCurriculum) {
    const newTermCurriculum = {
      termId: createSubject.selectedTerm._id,
      topics: [] as { id: string; title: string; description?: string }[],
    };
    
    createSubjectEntity.set((prev) => ({ 
      ...prev, 
      curriculum: [...(prev.curriculum || []), newTermCurriculum]
    }));
    
    return <div className="w-full mt-5">Initializing curriculum for selected term...</div>;
  }

  return (
    <div className="w-full mt-5">
      <TermEditor 
        key={currentTermCurriculum.termId} 
        term={currentTermCurriculum} 
        termSession={createSubject.selectedTerm}
      />
    </div>
  );
}

// Sortable Topic Item Component
function SortableTopicItem({
  topic,
  onEdit,
  onRemove,
}: {
  topic: { id: string; title: string; description?: string };
  onEdit: () => void;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-start gap-3 p-3 border rounded-lg mb-2 bg-white",
        isDragging && "shadow-lg"
      )}
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing mt-1"
        aria-label="Drag to reorder"
        title="Drag to reorder"
      >
        <ArrangeIcon size={16} />
      </button>
      
      <div className="flex-1">
        <div className={cn('font-medium', poppins_500.className)}>{topic.title}</div>
        {topic.description ? (
          <div className={cn('text-sm text-gray-500', poppins_400.className)}>{topic.description}</div>
        ) : null}
      </div>
      
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onEdit}
          className="text-gray-600"
          aria-label="Edit topic"
          title="Edit topic"
        >
          <EditIcon size={22} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500"
          aria-label="Remove topic"
          title="Remove topic"
        >
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function TermEditor({
  term,
  termSession,
}: {
  term: { termId: string; topics: { id: string; title: string; description?: string }[] };
  termSession: { _id: string; name: string; start_date: string; end_date: string };
}) {
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Set up drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dateRange = termSession.start_date && termSession.end_date 
    ? formatDateRange(termSession.start_date, termSession.end_date) 
    : null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      createSubjectEntity.set((prev) => {
        const curriculum = prev.curriculum ? [...prev.curriculum] : [];
        const idx = curriculum.findIndex((c) => c.termId === term.termId);
        if (idx === -1) return prev;

        const topics = [...(curriculum[idx].topics || [])];
        const oldIndex = topics.findIndex((topic) => topic.id === active.id);
        const newIndex = topics.findIndex((topic) => topic.id === over?.id);

        const reorderedTopics = arrayMove(topics, oldIndex, newIndex);
        curriculum[idx] = { ...curriculum[idx], topics: reorderedTopics };
        
        return { ...prev, curriculum };
      });
    }
  };

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
    <div className="bg-white p-4 rounded mb-4 border border-gray-200">
      <div className="mb-3">
        <h3 className={cn('text-base font-medium text-gray-900', poppins_500.className)}>
          {termSession.name}
        </h3>
        {dateRange && (
          <p className={cn('text-sm text-gray-600 mt-1', poppins_400.className)}>
            {dateRange}
          </p>
        )}
      </div>

      <div className="mb-4">
        {(!term.topics || term.topics.length === 0) ? (
          <p className={cn('text-sm text-gray3', poppins_400.className)}>No topics yet. Add one below.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={term.topics.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {term.topics.map((t) => (
                <SortableTopicItem
                  key={t.id}
                  topic={t}
                  onEdit={() => {
                    setEditingId(t.id);
                    setTitle(t.title);
                    setBrief(t.description ?? '');
                  }}
                  onRemove={() => handleRemove(t.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
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
