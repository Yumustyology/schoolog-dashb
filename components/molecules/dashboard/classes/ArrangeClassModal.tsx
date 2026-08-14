import React from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/form/Button';
import NoticeMarquee from '@/components/atoms/form/NoticeMarquee';
import ClassArrangeEntry, { ClassDataShape } from '@/components/atoms/dashboard/classes/ClassArrangeEntry';
import classGradeActions from '@/app/lib/actions/class-grade.actions';
import type { ResponseType } from '@/app/lib/types/api-response.types';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

type ArrangeClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ApiClassGrade = {
  _id: string;
  name: string;
  level?: string | null;
  classTeacher?: { name?: string | null; avatar?: string | null } | null;
  studentCount?: number;
  studentMaleCount?: number;
  studentFemaleCount?: number;
};

const ArrangeClassModal: React.FC<ArrangeClassModalProps & { onReorder?: (orderedIds?: string[]) => void }> = ({ isOpen, onClose, onReorder }) => {
  const [items, setItems] = React.useState<ApiClassGrade[]>([]);
  const [arrangedIds, setArrangedIds] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const resp = await classGradeActions.fetchClassGradesAll() as ResponseType<Record<string, unknown>[]>;
        const data = resp?.data ?? [];
        const mapped: ApiClassGrade[] = (data || []).map((d: Record<string, unknown>) => ({
          _id: String(d['_id'] ?? d['id'] ?? ''),
          name: String(d['name'] ?? d['className'] ?? 'Unnamed'),
          level: (d['level'] as string) ?? null,
          classTeacher: (d['classTeacher'] as Record<string, unknown> | null) ?? null,
          studentCount: typeof d['studentCount'] === 'number' ? (d['studentCount'] as number) : Number(d['studentCount'] ?? 0),
          studentMaleCount: typeof d['studentMaleCount'] === 'number' ? (d['studentMaleCount'] as number) : Number(d['studentMaleCount'] ?? 0),
          studentFemaleCount: typeof d['studentFemaleCount'] === 'number' ? (d['studentFemaleCount'] as number) : Number(d['studentFemaleCount'] ?? 0),
        }));
        if (!mounted) return;
        setItems(mapped);
        setArrangedIds(mapped.map((m) => String(m._id)));
      } catch (err) {
        // log and continue with empty state
        // eslint-disable-next-line no-console
        console.error('failed to load class grades for arrange modal', err);
        if (!mounted) return;
        setItems([]);
        setArrangedIds([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    if (isOpen) load();
    return () => { mounted = false; };
  }, [isOpen]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => String(i._id) === String(active.id));
      const newIndex = items.findIndex((i) => String(i._id) === String(over.id));
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems as ApiClassGrade[]);
      const ids = newItems.map((it) => String(it._id));
      setArrangedIds(ids);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await classGradeActions.reorderClassGrades(arrangedIds);
      // Notify parent component of successful reorder
      if (onReorder) onReorder(arrangedIds);
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to reorder class grades', err);
      // You might want to show a toast/notification here
    } finally {
      setIsSaving(false);
    }
  };

  const footer = (
    <div className="flex items-center gap-6">
      <Button
        onClick={handleSave}
        wide
        round
        className="h-12 rounded-full"
        disabled={isSaving}
        loading={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save changes'}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} className="tablet:w-[710px] min-h-[80dvh]" onClose={onClose} title="Arrange classes" footer={footer} minHeight="80dvh">
      <NoticeMarquee
        isAnimate={false}
        noticeText="Arrange the class in sequential level, these will be used it comes to promoting or demoting specific class or students. It also help the system to automate student promotions and graduations"
        className="text-xs"
      />

      {isLoading ? (
        <div className="grid gap-3 mt-[18px] pb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full p-4 rounded-lg border border-gray-100 bg-white animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => String(i._id))} strategy={verticalListSortingStrategy}>
            <div className="grid gap-0 mt-[18px] pb-8">
              {items.map((c) => (
                <SortableItem key={c._id} id={String(c._id)} classData={c} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* footer is provided to Modal to keep it sticky */}
    </Modal>
  );
};

export default ArrangeClassModal;

const SortableItem = React.memo(function SortableItem({ id, classData }: { id: string; classData: ApiClassGrade }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = React.useMemo(() => ({
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  } as React.CSSProperties), [transform, transition]);

  const mapped = React.useMemo((): ClassDataShape => {
    const teacher = classData.classTeacher as Record<string, unknown> | null;
    const teacherImg = teacher && typeof teacher['avatar'] === 'string' ? String(teacher['avatar']) : '/assets/images/avatar.png';
    const teacherName = teacher && typeof teacher['name'] === 'string' ? String(teacher['name']) : 'Unassigned';
    const total = typeof classData.studentCount === 'number' ? classData.studentCount : Number(classData.studentCount ?? 0);
    const male = typeof classData.studentMaleCount === 'number' ? classData.studentMaleCount : Number(classData.studentMaleCount ?? 0);
    const female = typeof classData.studentFemaleCount === 'number' ? classData.studentFemaleCount : Number(classData.studentFemaleCount ?? 0);
    return {
      id: typeof classData._id === 'string' && /^\d+$/.test(classData._id) ? Number(classData._id) : classData._id,
      className: classData.name,
      teacherImg,
      teacher: teacherName,
      number_of_male: male,
      number_of_female: female,
      number_of_student: total,
    };
  }, [classData]);

  return (
    <div ref={setNodeRef} style={style}>
      {/* map ApiClassGrade to the internal Class shape expected by ClassArrangeEntry */}
      <ClassArrangeEntry classData={mapped} dragListeners={listeners} dragAttributes={attributes} />
    </div>
  );
});
