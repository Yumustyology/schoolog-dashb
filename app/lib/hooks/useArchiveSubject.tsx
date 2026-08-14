"use client";
import { useState, useCallback } from 'react';
import subjectsActions from '@/app/lib/actions/subjects.action';
import showToast from '@/app/lib/utils/toast';
import { mutate } from 'swr';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { ArchiveIcon } from '@/components/atoms/icons/Icons';

export default function useArchiveSubject(subjectId?: string) {
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const openArchive = useCallback(() => setShowArchiveModal(true), []);
  const closeArchive = useCallback(() => setShowArchiveModal(false), []);

  const handleConfirmArchive = useCallback(async () => {
    setIsArchiving(true);
    try {
      const id = subjectId || '';
      const response = await subjectsActions.archiveSubject(String(id));

      if (response?.status === 'success') {
        showToast('Subject archived successfully', `archive-${id}`, { type: 'success' });
        setShowArchiveModal(false);

        // Refresh subject lists (active & archived)
        mutate((key) => {
          if (typeof key === 'string') return key.includes('/subjects/school');
          if (Array.isArray(key)) return key[0] === 'subjects/school';
          return false;
        });
      } else {
        showToast('Failed to archive subject', `archive-fail-${id}`, { type: 'error' });
      }
    } catch (error) {
      console.error('Error archiving subject:', error);
      const id = subjectId || '';
      showToast('An error occurred while archiving the subject', `archive-error-${id}`, { type: 'error' });
    } finally {
      setIsArchiving(false);
    }
  }, [subjectId]);

  return {
    showArchiveModal,
    openArchive,
    closeArchive,
    isArchiving,
    handleConfirmArchive,
    ArchiveConfirmModal: (
      <ConfirmModal
        open={showArchiveModal}
        close={closeArchive}
        title="Archive Subject"
        body="Are you sure you want to archive this subject? You can restore it later from archived subjects."
        icon={<ArchiveIcon />}
        onConfirm={handleConfirmArchive}
        confirmText="Archive"
        cancelText="Cancel"
        confirmClassName="bg-r text-white"
        isLoading={isArchiving}
      />
    ),
  } as const;
}
