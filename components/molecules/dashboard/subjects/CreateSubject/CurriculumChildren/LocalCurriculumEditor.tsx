import React, { useState, useEffect, useRef } from 'react';
import Input from '@/components/atoms/form/Input';
import type { TermSessionType } from '@/app/lib/types/academicYear.types';
import type {
  CurriculumEntry,
  CurriculumTopic,
} from '@/app/lib/types/curriculum.types';

import WeekSelect from '@/components/atoms/form/WeekSelect';
import Button from '@/components/atoms/form/Button';
import {
  AdditionIcon,
  DeleteIcon,
  EditIcon,
  ArrangeIcon,
} from '@/components/atoms/icons/Icons';
import showToast from '@/app/lib/utils/toast';
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
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function LocalCurriculumEditor({
  classId,
  selectedTerm,
  curriculum,
  setCurriculum,
}: {
  classId: string;
  selectedTerm: TermSessionType | null;
  curriculum: CurriculumEntry[];
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumEntry[]>>;
}) {

  const currentTermCurriculum =
    selectedTerm && Array.isArray(curriculum)
      ? curriculum.find((c) => c.termId === selectedTerm._id && c.classId === classId)
      : undefined;

  const [localInitialized, setLocalInitialized] = useState(
    Boolean(currentTermCurriculum)
  );

  if (!selectedTerm) {
    return (
      <div className="w-full mt-5 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className={cn('text-yellow-800', poppins_500.className)}>
          Please select a term session above to create curriculum topics.
        </p>
      </div>
    );
  }

  if (!currentTermCurriculum && !localInitialized) {
    const newEntry: CurriculumEntry = {
      classId,
      termId: selectedTerm._id || selectedTerm.id || '',
      topics: [],
    };
    setCurriculum([...(curriculum || []), newEntry]);
    setLocalInitialized(true);
    return (
      <div className="w-full mt-5">
        Initializing curriculum for selected term...
      </div>
    );
  }

  return (
    <div className="w-full mt-5">
      {currentTermCurriculum && (
        <TermEditor
          term={currentTermCurriculum}
          termSession={selectedTerm}
          classId={classId}
          curriculum={curriculum}
          setCurriculum={setCurriculum}
        />
      )}
    </div>
  );
}

function SortableTopicItem({
  topic,
  onEdit,
  onRemove,
  week,
}: {
  topic: CurriculumTopic;
  onEdit: () => void;
  onRemove: () => void;
  week?: number | undefined;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-3 p-3 border rounded-lg mb-2 bg-white',
        isDragging && 'shadow-lg'
      )}
    >
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
        <div className={cn('font-medium', poppins_500.className)}>
          {topic.title} {week ? '-' : null}{' '}
          <span className="text-sm text-gray3">
            {week ? 'Week ' + week : null}
          </span>
        </div>
        {topic.description ? (
          <div className={cn('text-sm text-gray-500', poppins_400.className)}>
            {topic.description}
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onEdit}
          className="text-gray-600"
          aria-label={`Edit topic: ${topic.title}`}
          title={`Edit topic: ${topic.title}`}
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

function EditableTopicItem({
  topic,
  onSave,
  onCancel,
  onRemove,
  onWeekChange,
}: {
  topic: CurriculumTopic;
  onSave: (t: CurriculumTopic) => void;
  onCancel: () => void;
  onRemove: () => void;
  onWeekChange?: (w?: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: topic.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [title, setTitle] = useState<string>(topic.title || '');
  const [description, setDescription] = useState<string>(topic.description || '');
  const [week, setWeek] = useState<number | undefined>(typeof topic.week === 'number' ? topic.week : undefined);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-start gap-3 p-3 border rounded-lg mb-3 bg-white'
      )}
    >
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

      <div className="flex-1 space-y-2">
        <Input
          id={`edit-${topic.id}-title`}
          label="Topic"
          type="text"
          labelClassName="label"
          className="input h-10 rounded-lg"
          name="topic"
          placeholder="Enter topic title"
          value={title}
          handleChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />

        <Input
          type="textarea"
          label="Topic Brief"
          id={`edit-${topic.id}-brief`}
          name="brief"
          placeholder="Short description"
          rows={2}
          labelClassName="label"
          className="input"
          value={description}
          handleChange={(e) =>
            setDescription((e.target as HTMLTextAreaElement).value)
          }
        />

        <div className="flex items-end gap-2">
          <div className="w-40">
            <WeekSelect
              value={typeof week === 'number' ? String(week) : 'none'}
              onValueChange={(v) => {
                if (v === 'none') {
                  setWeek(undefined);
                  onWeekChange?.(undefined);
                } else {
                  const n = Number(v);
                  if (!Number.isNaN(n)) {
                    setWeek(n);
                    onWeekChange?.(n);
                  }
                }
              }}
              triggerClasses={cn(poppins_400.className, 'rounded-lg h-9 px-2')}
              selectClasses="w-full"
              labelClassName={cn(poppins_400.className)}
              contentClasses={cn('w-full', poppins_400.className)}
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              onClick={() =>
                onSave({
                  id: topic.id,
                  title: title.trim(),
                  description: description.trim(),
                  week,
                })
              }
              className="bg-green-600 text-white h-9 px-3 rounded"
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className="h-9 px-3 rounded border"
            >
              Cancel
            </Button>
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500"
              title="Remove topic"
            >
              <DeleteIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermEditor({
  term,
  termSession,
  classId,
  curriculum,
  setCurriculum,
}: {
  term: CurriculumEntry;
  termSession: TermSessionType;
  classId: string;
  curriculum: CurriculumEntry[];
  setCurriculum: React.Dispatch<React.SetStateAction<CurriculumEntry[]>>;
}) {
  const [title, setTitle] = useState<string>('');
  const [brief, setBrief] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const currentDefaultWeek = term?.defaultWeek;
  const draftSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDefaultWeekRef = useRef(currentDefaultWeek);

  useEffect(() => {
    const syncDraft = () => {
      const shouldHaveDraft =
        !editingId && (title.trim() !== '' || brief.trim() !== '');

      setCurriculum((prev) => {
        const curriculumCopy = [...(prev || [])];
        const idx = curriculumCopy.findIndex(
          (c) => c.termId === term.termId && c.classId === classId
        );
        if (idx === -1) return prev;

        const topics = [...(curriculumCopy[idx].topics || [])];
        const draftId = `draft-${term.termId}`;
        const draftIndex = topics.findIndex((t) => String(t.id) === draftId);

        if (!shouldHaveDraft) {
          // remove draft if present
          if (draftIndex !== -1) {
            topics.splice(draftIndex, 1);
            curriculumCopy[idx] = {
              ...{ ...curriculumCopy[idx], classId },
              topics,
            };
            return curriculumCopy;
          }
          return prev;
        }

        // ensure draft exists and is up-to-date
        const draftTopic = {
          id: draftId,
          title: title.trim(),
          description: brief.trim(),
          week: curriculumCopy[idx].defaultWeek,
        };
        if (draftIndex !== -1) {
          topics[draftIndex] = { ...topics[draftIndex], ...draftTopic };
        } else {
          topics.push(draftTopic);
        }
        curriculumCopy[idx] = { ...{ ...curriculumCopy[idx], classId }, topics };
        return curriculumCopy;
      });
    };

    const defaultWeekChanged = prevDefaultWeekRef.current !== currentDefaultWeek;

    // clear any pending timer
    if (draftSyncTimer.current) {
      clearTimeout(draftSyncTimer.current);
      draftSyncTimer.current = null;
    }

    if (defaultWeekChanged) {
      // apply immediately when defaultWeek changed
      syncDraft();
      prevDefaultWeekRef.current = currentDefaultWeek;
    } else {
      // debounce user typing to reduce re-renders while typing
      draftSyncTimer.current = setTimeout(syncDraft, 300);
    }

    return () => {
      if (draftSyncTimer.current) {
        clearTimeout(draftSyncTimer.current);
        draftSyncTimer.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, brief, editingId, currentDefaultWeek]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const dateRange =
    termSession.startDate && termSession.endDate
      ? formatDateRange(termSession.startDate, termSession.endDate)
      : null;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const curriculumCopy = [...(curriculum || [])];
      const idx = curriculumCopy.findIndex(
        (c) => c.termId === term.termId && c.classId === classId
      );
      if (idx === -1) return;
      const topics = [...(curriculumCopy[idx].topics || [])];
      const oldIndex = topics.findIndex((t) => t.id === active.id);
      const newIndex = topics.findIndex((t) => t.id === over?.id);
      const reordered = arrayMove(topics, oldIndex, newIndex);
      curriculumCopy[idx] = {
        ...{ ...curriculumCopy[idx], classId },
        topics: reordered,
      };
      setCurriculum(curriculumCopy);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setCurriculum((prev) => {
      const curriculumCopy = [...(prev || [])];
      const idx = curriculumCopy.findIndex(
        (c) => c.termId === term.termId && c.classId === classId
      );
      if (idx === -1) return prev;
      const topics = [...(curriculumCopy[idx].topics || [])];
      // If editing an existing topic, update it
      if (editingId) {
        const tIdx = topics.findIndex((t) => t.id === editingId);
        if (tIdx !== -1)
          topics[tIdx] = {
            ...topics[tIdx],
            title: title.trim(),
            description: brief.trim(),
          };
      } else {
        // If a draft exists, convert it into a real topic id
        const draftId = `draft-${term.termId}`;
        const dIdx = topics.findIndex((t) => String(t.id) === draftId);
        const newTopic = {
          id: `${term.termId}-${Date.now()}`,
          title: title.trim(),
          description: brief.trim(),
          week: curriculumCopy[idx].defaultWeek,
        };
        if (dIdx !== -1) {
          topics[dIdx] = newTopic;
        } else {
          topics.push(newTopic);
        }
      }
      curriculumCopy[idx] = { ...{ ...curriculumCopy[idx], classId }, topics };
      return curriculumCopy;
    });
    setTitle('');
    setBrief('');
    setEditingId(null);
  };

  const handleRemove = (topicId: string) => {
    setCurriculum((prev) => {
      const curriculumCopy = [...(prev || [])];
      const idx = curriculumCopy.findIndex(
        (c) => c.termId === term.termId && c.classId === classId
      );
      if (idx === -1) return prev;
      const topics = (curriculumCopy[idx].topics || []).filter(
        (t) => t.id !== topicId
      );
      curriculumCopy[idx] = { ...{ ...curriculumCopy[idx], classId }, topics };
      return curriculumCopy;
    });
  };

  return (
    <div className="bg-white p-4 rounded mb-4 border border-gray-200">
      <div className="mb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  'text-base font-medium text-gray-900',
                  poppins_500.className
                )}
              >
                {termSession.name}
              </h3>
              {typeof term.defaultWeek === 'number' && (
                <div className="mb-0">
                  <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">{`week ${term.defaultWeek}`}</span>
                </div>
              )}
            </div>
            {dateRange && (
              <p
                className={cn(
                  'text-sm text-gray-600 mt-1',
                  poppins_400.className
                )}
              >
                {dateRange}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        {!term.topics || term.topics.length === 0 ? (
          <p className={cn('text-sm text-gray3', poppins_400.className)}>
            No topics yet. Add one below.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={term.topics.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {term.topics.map((t) => {
                if (editingId === t.id) {
                  return (
                    <EditableTopicItem
                      key={t.id}
                      topic={t}
                      onSave={(updated) => {
                        setCurriculum((prev) => {
                          const curriculumCopy: CurriculumEntry[] = [...(prev || [])];
                          const idx = curriculumCopy.findIndex(
                            (c) =>
                              c.termId === term.termId &&
                              c.classId === classId
                          );
                          if (idx === -1) return prev;
                          const topics = [...(curriculumCopy[idx].topics || [])].map((topicItem) =>
                            topicItem.id === updated.id
                              ? {
                                  ...topicItem,
                                  title: updated.title,
                                  description: updated.description,
                                  week: updated.week,
                                }
                              : topicItem
                          );
                          curriculumCopy[idx] = {
                            ...{ ...curriculumCopy[idx], classId },
                            topics,
                          };
                          return curriculumCopy;
                        });
                        setEditingId(null);
                      }}
                        onCancel={() => setEditingId(null)}
                        onRemove={() => handleRemove(t.id)}
                        onWeekChange={(w) => {
                          setCurriculum((prev) => {
                            const curriculumCopy: CurriculumEntry[] = [...(prev || [])];
                            const idx = curriculumCopy.findIndex(
                              (c) => c.termId === term.termId && c.classId === classId
                            );
                            if (idx === -1) return prev;
                            const topics = (curriculumCopy[idx].topics || []).map((topicItem) =>
                              topicItem.id === t.id ? { ...topicItem, week: w } : topicItem
                            );
                            curriculumCopy[idx] = { ...{ ...curriculumCopy[idx], classId }, topics };
                            return curriculumCopy;
                          });
                        }}
                    />
                  );
                }
                return (
                  <SortableTopicItem
                    key={t.id}
                    topic={t}
                    week={t.week}
                    onEdit={() => {
                      if (editingId && editingId !== t.id) {
                        showToast(
                          'Finish editing the current topic before editing another.',
                          'edit-in-progress',
                          { type: 'warning' }
                        );
                        return;
                      }
                      setEditingId(t.id);
                    }}
                    onRemove={() => handleRemove(t.id)}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {editingId ? (
        <div className="p-3 rounded bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
          You are editing a topic inline. Use the Save / Cancel buttons on the
          topic row to persist or cancel changes.
        </div>
      ) : (
        <form onSubmit={handleAdd}>
          <WeekSelect
            value={
              typeof term.defaultWeek === 'number'
                ? String(term.defaultWeek)
                : 'none'
            }
            onValueChange={(v) => {
              setCurriculum((prev) => {
                const curriculumCopy = [...(prev || [])];
                const idx = curriculumCopy.findIndex(
                  (c) => c.termId === term.termId && c.classId === classId
                );
                if (idx === -1) return prev;
                const item: CurriculumEntry = { ...curriculumCopy[idx] };
                if (v === 'none') {
                  delete item.defaultWeek;
                } else {
                  const n = Number(v);
                  if (!Number.isNaN(n)) item.defaultWeek = n;
                }
                curriculumCopy[idx] = { ...item, classId };
                return curriculumCopy;
              });
            }}
            triggerClasses={cn(
              poppins_400.className,
              'rounded-lg h-12 px-2 mb-3 mt-3'
            )}
            selectClasses="w-full"
            labelClassName={cn(poppins_400.className)}
            contentClasses={cn('w-full', poppins_400.className)}
          />

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
            handleChange={(e) =>
              setBrief((e.target as HTMLTextAreaElement).value)
            }
          />

          <Button
            wide
            round
            type="submit"
            className="bg-light text-primary mt-4"
          >
            <span
              className={cn(
                'text-base flex items-center gap-2',
                poppins_500.className
              )}
            >
              <span>
                <AdditionIcon color="#4caf50 " />
              </span>
              Add new topic
            </span>
          </Button>
        </form>
      )}
    </div>
  );
}
