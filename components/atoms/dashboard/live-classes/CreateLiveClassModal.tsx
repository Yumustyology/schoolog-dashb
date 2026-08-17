import React, { useState } from 'react';
import { useEntity } from 'simpler-state';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import { DatePicker } from '@/components/atoms/form/DatePicker';
import { ClassGradeDropdown } from '@/components/atoms/dashboard/classes/ClassGradeDropdown';
import {
  isCreateLiveClassOpen,
  closeCreateLiveClassModal,
} from '@/app/lib/entities/liveClass.entity';
import liveClassActions from '@/app/lib/actions/liveClass.action';
import showToast from '@/app/lib/utils/toast';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { mutate } from 'swr';

export const CreateLiveClassModal = () => {
  const isOpen = useEntity(isCreateLiveClassOpen);
  const [title, setTitle] = useState('');
  const [classGradeId, setClassGradeId] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('09:00');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [isCreating, setIsCreating] = useState(false);

  const resetState = () => {
    setTitle('');
    setClassGradeId('');
    setDate(undefined);
    setTime('09:00');
    setDurationMinutes(60);
    setIsCreating(false);
  };

  const handleClose = () => {
    resetState();
    closeCreateLiveClassModal();
  };

  const buildScheduledStart = (): string | null => {
    if (!date) return null;
    const [hours, minutes] = time.split(':').map(Number);
    const scheduled = new Date(date);
    scheduled.setHours(hours || 0, minutes || 0, 0, 0);
    return scheduled.toISOString();
  };

  const handleSubmit = async () => {
    const scheduledStart = buildScheduledStart();
    if (!title.trim() || !scheduledStart) return;

    setIsCreating(true);
    try {
      await liveClassActions.createLiveClass({
        title: title.trim(),
        classGradeId: classGradeId || undefined,
        scheduledStart,
        durationMinutes,
      });
      showToast('Live class created successfully', 'live-class-created', {
        theme: 'light',
        type: 'success',
      });
      mutate((key) => Array.isArray(key) && key[0] === 'live-classes');
      handleClose();
    } catch (error) {
      showToast('Failed to create live class', 'live-class-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error creating live class:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Live Class">
      <div className="flex flex-col gap-5">
        <Input
          id="liveClassTitle"
          label="Title"
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. JSS1 Mathematics — Chapter 4"
          className="w-full"
        />

        <div>
          <p className={cn('text-sm text-gray1 mb-2', poppins_400.className)}>
            Class (optional)
          </p>
          <ClassGradeDropdown
            value={classGradeId}
            onValueChange={(v) => setClassGradeId(Array.isArray(v) ? v[0] : v)}
            placeholder="Select class/level"
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <DatePicker
              label="Date"
              value={date}
              onChange={setDate}
              placeholder="Select date"
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <p className={cn('text-sm text-gray1 mb-2', poppins_400.className)}>
              Time
            </p>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-12 rounded-md border border-gray4 px-3 text-sm"
            />
          </div>
        </div>

        <Input
          id="liveClassDuration"
          label="Duration (minutes)"
          type="number"
          value={String(durationMinutes)}
          handleChange={(e) => setDurationMinutes(Number(e.target.value) || 60)}
          className="w-full"
        />
      </div>

      <Button
        wide
        round
        className="h-12 mt-8"
        onClick={handleSubmit}
        disabled={!title.trim() || !date || isCreating}
        loading={isCreating}
      >
        Create Live Class
      </Button>
    </Modal>
  );
};
