"use client";
import { useState, useCallback } from 'react';
import subjectsActions from '@/app/lib/actions/subjects.action';
import showToast from '@/app/lib/utils/toast';
import { mutate } from 'swr';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { UnarchiveIcon } from '@/components/atoms/icons/Icons';

export default function useUnarchiveSubject(subjectId?: string) {
  const [showUnarchiveModal, setShowUnarchiveModal] = useState(false);
  const [isUnarchiving, setIsUnarchiving] = useState(false);

  const openUnarchive = useCallback(() => setShowUnarchiveModal(true), []);
  const closeUnarchive = useCallback(() => setShowUnarchiveModal(false), []);

  const handleConfirmUnarchive = useCallback(async () => {
    setIsUnarchiving(true);
    try {
      const id = subjectId || '';
      const response = await subjectsActions.unarchiveSubject(String(id));

      if (response?.status === 'success') {
        showToast('Subject unarchived successfully', `unarchive-${id}`, { type: 'success' });
        setShowUnarchiveModal(false);

        // Refresh subject lists (active & archived)
        mutate((key) => {
          if (typeof key === 'string') return key.includes('/subjects/school');
          if (Array.isArray(key)) return key[0] === 'subjects/school';
          return false;
        });
      } else {
        showToast('Failed to unarchive subject', `unarchive-fail-${id}`, { type: 'error' });
      }
    } catch (error) {
      console.error('Error unarchiving subject:', error);
      const id = subjectId || '';
      showToast('An error occurred while unarchiving the subject', `unarchive-error-${id}`, { type: 'error' });
    } finally {
      setIsUnarchiving(false);
    }
  }, [subjectId]);

  return {
    showUnarchiveModal,
    openUnarchive,
    closeUnarchive,
    isUnarchiving,
    handleConfirmUnarchive,
    UnarchiveConfirmModal: (
      <ConfirmModal
        open={showUnarchiveModal}
        close={closeUnarchive}
        title="Unarchive Subject"
        body="Are you sure you want to unarchive this subject? It will be visible to students and teachers again."
        icon={<UnarchiveIcon />}
        onConfirm={handleConfirmUnarchive}
        confirmText="Unarchive"
        cancelText="Cancel"
        confirmClassName="bg-r text-white"
        isLoading={isUnarchiving}
      />
    ),
  } as const;
}
