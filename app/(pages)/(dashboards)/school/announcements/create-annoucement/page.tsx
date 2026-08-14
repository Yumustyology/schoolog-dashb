'use client';
import {
  createAnnoucementNextStep,
  createAnnoucementPreviousStep,
  createAnnoucementProgessState,
  selectedAnnouncementPreference,
  announcementFormState,
  resetAnnouncementForm,
} from '@/app/lib/entities/annoucement.entity';
import Button from '@/components/atoms/form/Button';
import Step1 from '@/components/molecules/dashboard/announcement/Step1';
import Step2 from '@/components/molecules/dashboard/announcement/Step2';
import ProgressPageNumber from '@/components/molecules/dashboard/students/add-new-student/PageNumber';
import { useEntity } from 'simpler-state';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import notificationsActions, {
  AudienceFilter,
  NotificationChannel,
} from '@/app/lib/actions/notifications.action';
import showToast from '@/app/lib/utils/toast';

const audienceFilterMap: Record<string, AudienceFilter> = {
  all: AudienceFilter.ALL_USERS,
  students: AudienceFilter.ALL_STUDENTS,
  staff: AudienceFilter.ALL_STAFF,
  parents: AudienceFilter.ALL_GUARDIANS,
};

const channelMap: Record<string, NotificationChannel> = {
  inApp: NotificationChannel.IN_APP,
  email: NotificationChannel.EMAIL,
  sms: NotificationChannel.SMS,
};

export default function TopSteps() {
  const steps = [<Step1 key={1} />, <Step2 key={2} />];
  const currentStep = useEntity(createAnnoucementProgessState);
  const selectedAnnouncement = useEntity(selectedAnnouncementPreference);
  const form = useEntity(announcementFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      showToast('Title and description are required', 'error', {
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const hasClasses =
        selectedAnnouncement === 'students' && form.classIds.length > 0;

      const created = await notificationsActions.createNotification({
        title: form.title.trim(),
        message: form.message.trim(),
        channels: [channelMap[form.channel] ?? NotificationChannel.IN_APP],
        targetAudience: {
          filter: hasClasses
            ? AudienceFilter.SPECIFIC_CLASS
            : audienceFilterMap[selectedAnnouncement] ?? AudienceFilter.ALL_USERS,
          classIds: hasClasses ? form.classIds : undefined,
        },
        metadata: form.expiresAt ? { expiresAt: form.expiresAt } : undefined,
      });

      const notificationId = created?.data?._id;
      if (notificationId) {
        // Publish immediately — the backend always creates in DRAFT status,
        // and a draft is invisible to recipients until sent/scheduled.
        await notificationsActions.sendNotificationNow(notificationId);
      }

      showToast('Announcement published', 'success', { type: 'success' });
      mutate(
        (key) => Array.isArray(key) && key[0] === 'notifications',
        undefined,
        { revalidate: true }
      );
      resetAnnouncementForm();
      router.push('/school/announcements');
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 min-h-[100dvh] bg-white flex flex-col justify-between rounded-lg">
      <div className="w-[600px] mx-auto">
        <div className="">
          <ProgressPageNumber />
          {steps[currentStep]}
        </div>
      </div>
      <div className="mt-[20dvh--] flex justify-end gap-6">
        {currentStep > 0 && (
          <Button
            round
            onClick={createAnnoucementPreviousStep}
            className="w-[120px] h-[40px]  text-primary bg-white border border-primary"
          >
            Previous
          </Button>
        )}
        <Button
          round
          disabled={isSubmitting}
          onClick={() => {
            if (currentStep === steps.length - 1) {
              handleSubmit();
            } else {
              createAnnoucementNextStep();
            }
          }}
          className={`w-[120px] h-[40px] bg-primary text-white ${
            currentStep === steps.length - 1
              ? 'cursor-pointer'
              : 'hover:bg-primary'
          }`}
        >
          {currentStep === steps.length - 1
            ? isSubmitting
              ? 'Submitting...'
              : 'Submit'
            : 'Next'}
        </Button>
      </div>
    </div>
  );
}
