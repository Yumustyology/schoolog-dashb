'use client';
import React, { useState } from 'react';
import { useEntity } from 'simpler-state';
import { mutate } from 'swr';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { DeleteIcon } from '@/components/atoms/icons/Icons';
import {
  closeDeleteFeeCategoryModal,
  deleteFeeCategoryOpenState,
  selectedFeeCategoryId,
  setSelectedFeeCategoryId,
} from '@/app/lib/entities/payment.entity';
import feeCategoryActions from '@/app/lib/actions/feeCategory.action';
import showToast from '@/app/lib/utils/toast';

const DeleteFeeModal = () => {
  const deleteFeeCategoryOpen = useEntity(deleteFeeCategoryOpenState);
  const feeCategoryId = useEntity(selectedFeeCategoryId);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setSelectedFeeCategoryId(null);
    closeDeleteFeeCategoryModal();
  };

  const handleConfirmDelete = async () => {
    if (!feeCategoryId) return;
    setIsDeleting(true);
    try {
      await feeCategoryActions.deleteFeeCategory(feeCategoryId);
      mutate(['fee-categories']);
      showToast('Fee category deleted successfully', 'fee-category-deleted', {
        theme: 'light',
        type: 'success',
      });
      handleClose();
    } catch (error) {
      showToast('Failed to delete fee category', 'fee-category-delete-error', {
        theme: 'light',
        type: 'error',
      });
      console.error('Error deleting fee category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ConfirmModal
      open={deleteFeeCategoryOpen}
      close={handleClose}
      title="Delete fee category"
      body="Are you sure you want to delete this fee? all students under this category will no longer be under any fee category"
      icon={<DeleteIcon size={24} />}
      onConfirm={handleConfirmDelete}
      confirmText="Delete category"
      confirmClassName="bg-r text-white"
      isLoading={isDeleting}
    />
  );
};

export default DeleteFeeModal;
