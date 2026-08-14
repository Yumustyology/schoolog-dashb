"use client";
import { useState, useCallback } from 'react';
import subjectsActions from '@/app/lib/actions/subjects.action';
import showToast from '@/app/lib/utils/toast';
import { mutate } from 'swr';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { DeleteModalIcon } from '@/components/atoms/icons/Icons';

export default function useDeleteSubject(subjectId?: string, opts?: { onSuccess?: () => void }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDelete = useCallback(() => setShowDeleteModal(true), []);
  const closeDelete = useCallback(() => setShowDeleteModal(false), []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const id = subjectId || '';
      const response = await subjectsActions.deleteSubject(String(id));

      if (response?.status === 'success') {
        showToast('Subject deleted successfully', `delete-${id}`, { type: 'success' });
        setShowDeleteModal(false);
        // Refresh subject lists
        mutate((key) => {
          if (typeof key === 'string') return key.includes('/subjects/school');
          if (Array.isArray(key)) return key[0] === 'subjects/school';
          return false;
        });
        if (opts?.onSuccess) opts.onSuccess();
      } else {
        showToast('Failed to delete subject', `delete-fail-${id}`, { type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      const id = subjectId || '';
      showToast('An error occurred while deleting the subject', `delete-error-${id}`, { type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  }, [subjectId, opts]);

  const DeleteConfirmModal = (
    <ConfirmModal
      open={showDeleteModal}
      close={closeDelete}
      title="Delete Subject"
      body="Are you sure you want to delete this subject? This action cannot be undone."
      icon={<DeleteModalIcon />}
      onConfirm={handleConfirmDelete}
      confirmText="Delete"
      cancelText="Cancel"
      confirmClassName="bg-r text-white"
      isLoading={isDeleting}
    />
  );

  return {
    showDeleteModal,
    openDelete,
    closeDelete,
    isDeleting,
    handleConfirmDelete,
    DeleteConfirmModal,
  } as const;
}
