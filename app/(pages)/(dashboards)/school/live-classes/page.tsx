'use client';

import React from 'react';
import useSWR, { mutate } from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import SelectComp from '@/components/atoms/form/Select';
import Modal from '@/components/molecules/Modal';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { AdditionIcon } from '@/components/atoms/icons/Icons';
import showToast from '@/app/lib/utils/toast';
import liveClassActions, { LiveClass, LiveClassStatus } from '@/app/lib/actions/live-class.action';
import { fetchClassGradesAll } from '@/app/lib/actions/class-grade.actions';
import { getSchoolSubjects } from '@/app/lib/actions/subjects.action';

type Subject = { _id: string; name: string };

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-[#F2994A14] text-[#F2994A]',
  live: 'bg-primary1 text-primary',
  ended: 'bg-[#F1F1F1] text-gray6',
  cancelled: 'bg-[#EB575714] text-[#EB5757]',
};

const LIVE_CLASSES_KEY = 'live-classes';

const displayName = (
  ref: { _id: string; name?: string; firstName?: string; lastName?: string } | string | null | undefined
): string => {
  if (!ref || typeof ref === 'string') return '';
  return ref.name || `${ref.firstName ?? ''} ${ref.lastName ?? ''}`.trim();
};

const CreateLiveClassModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) => {
  const [title, setTitle] = React.useState('');
  const [classGradeId, setClassGradeId] = React.useState('');
  const [subjectId, setSubjectId] = React.useState('');
  const [scheduledStart, setScheduledStart] = React.useState('');
  const [durationMinutes, setDurationMinutes] = React.useState('60');
  const [submitting, setSubmitting] = React.useState(false);

  const { data: classesResp } = useSWR(['all-class-grades'], () => fetchClassGradesAll());
  const classOptions = (classesResp?.data || []).map((c) => ({
    id: String((c as Record<string, unknown>)._id),
    name: String((c as Record<string, unknown>).name || ''),
  }));

  const { data: subjectsResp } = useSWR(['school-subjects'], () => getSchoolSubjects());
  const subjectOptions = ((subjectsResp?.data || []) as unknown as Subject[]).map((s) => ({
    id: s._id,
    name: s.name,
  }));

  const reset = () => {
    setTitle('');
    setClassGradeId('');
    setSubjectId('');
    setScheduledStart('');
    setDurationMinutes('60');
  };

  const close = () => {
    if (submitting) return;
    reset();
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !scheduledStart) {
      showToast('Title and scheduled time are required', 'live-class-missing-fields', { type: 'error' });
      return;
    }
    setSubmitting(true);
    try {
      await liveClassActions.createLiveClass({
        title,
        classGradeId: classGradeId || undefined,
        subjectId: subjectId || undefined,
        scheduledStart: new Date(scheduledStart).toISOString(),
        durationMinutes: Number(durationMinutes) || 60,
      });
      showToast('Live class scheduled', 'live-class-created', { type: 'success' });
      reset();
      setIsOpen(false);
      mutate((key: unknown) => Array.isArray(key) && key[0] === LIVE_CLASSES_KEY);
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Schedule live class">
      <div className="flex flex-col gap-5">
        <Input
          id="liveClassTitle"
          label="Title"
          type="text"
          labelClassName="label text-gray2 mb-0"
          className="h-11 rounded-lg"
          name="title"
          placeholder="e.g. JSS1 Mathematics — Chapter 4"
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <SelectComp
          label="Class (optional)"
          value={classGradeId}
          onValueChange={setClassGradeId}
          placeholder="Select a class"
          options={classOptions}
        />
        <SelectComp
          label="Subject (optional)"
          value={subjectId}
          onValueChange={setSubjectId}
          placeholder="Select a subject"
          options={subjectOptions}
        />
        <div>
          <label className={cn('label text-gray2 mb-2 block text-sm', poppins_400.className)}>
            Scheduled start
          </label>
          <input
            type="datetime-local"
            value={scheduledStart}
            onChange={(e) => setScheduledStart(e.target.value)}
            className="w-full h-11 rounded-lg border border-gray4 px-3 text-sm"
          />
        </div>
        <Input
          id="liveClassDuration"
          label="Duration (minutes)"
          type="number"
          labelClassName="label text-gray2 mb-0"
          className="h-11 rounded-lg"
          name="durationMinutes"
          value={durationMinutes}
          handleChange={(e) => setDurationMinutes(e.target.value)}
        />
      </div>

      <Button
        wide
        round
        className="h-12 mt-7"
        onClick={handleSubmit}
        loading={submitting}
        disabled={submitting}
      >
        Schedule
      </Button>
    </Modal>
  );
};

const LiveClassesPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [endingClass, setEndingClass] = React.useState<LiveClass | null>(null);
  const [isEnding, setIsEnding] = React.useState(false);
  const [joiningId, setJoiningId] = React.useState<string | null>(null);

  const { data, isLoading } = useSWR([LIVE_CLASSES_KEY], () => liveClassActions.listLiveClasses());
  const liveClasses = data?.data || [];

  const handleJoin = async (liveClass: LiveClass) => {
    setJoiningId(liveClass._id);
    try {
      await liveClassActions.joinLiveClass(liveClass._id);
      showToast(
        'Join token generated — video embedding requires the Dyte SDK integration (not yet added to this app).',
        'live-class-join-token',
        { type: 'success' }
      );
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setJoiningId(null);
    }
  };

  const confirmEnd = async () => {
    if (!endingClass) return;
    setIsEnding(true);
    try {
      await liveClassActions.endLiveClass(endingClass._id);
      showToast('Live class ended', 'live-class-ended', { type: 'success' });
      setEndingClass(null);
      mutate((key: unknown) => Array.isArray(key) && key[0] === LIVE_CLASSES_KEY);
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsEnding(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <BreadcrumbBox className="mb-0" crumbs={[{ label: 'Live classes', isActive: true }]} />
        <Button round className="h-11 px-6 flex gap-2" onClick={() => setOpenCreateModal(true)}>
          <AdditionIcon />
          <span className={cn('text-base', Inter_500.className)}>Schedule live class</span>
        </Button>
      </div>

      <div className="bg-white rounded-xl p-6 min-h-[60vh]">
        {!isLoading && liveClasses.length === 0 ? (
          <p className={cn('text-sm text-gray6 text-center py-12', poppins_400.className)}>
            No live classes scheduled yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {liveClasses.map((lc) => (
              <div
                key={lc._id}
                className="flex items-center justify-between border border-gray4 rounded-2xl p-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={cn(
                        'text-xs px-2.5 py-1 rounded-full capitalize',
                        STATUS_STYLES[lc.status],
                        Inter_500.className
                      )}
                    >
                      {lc.status}
                    </span>
                    <p className={cn('text-sm text-black1', Inter_500.className)}>{lc.title}</p>
                  </div>
                  <p className={cn('text-xs text-gray6', poppins_400.className)}>
                    {[displayName(lc.classGradeId), displayName(lc.subjectId)].filter(Boolean).join(' · ')}
                    {' — '}
                    {new Date(lc.scheduledStart).toLocaleString()} ({lc.durationMinutes} min)
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {(lc.status === LiveClassStatus.SCHEDULED || lc.status === LiveClassStatus.LIVE) && (
                    <>
                      <Button
                        round
                        className="h-9 px-4 text-xs"
                        onClick={() => handleJoin(lc)}
                        loading={joiningId === lc._id}
                        disabled={joiningId === lc._id}
                      >
                        Join
                      </Button>
                      <Button
                        flat
                        round
                        className="h-9 px-4 text-xs border border-r2 text-r2"
                        onClick={() => setEndingClass(lc)}
                      >
                        End
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateLiveClassModal isOpen={openCreateModal} setIsOpen={setOpenCreateModal} />

      <ConfirmModal
        open={!!endingClass}
        close={() => setEndingClass(null)}
        title="End live class"
        body={`End "${endingClass?.title}"? Participants will be disconnected.`}
        isLoading={isEnding}
        confirmText="End class"
        confirmClassName="bg-r text-white"
        onConfirm={confirmEnd}
      />
    </div>
  );
};

export default LiveClassesPage;
