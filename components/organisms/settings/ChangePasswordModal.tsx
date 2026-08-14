'use client';

import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { cn } from '@/app/lib/utils';
import { Inter_400 } from '@/app/lib/config/font.config';
import adminActions from '@/app/lib/actions/admin.action';
import showToast from '@/app/lib/utils/toast';

const ChangePasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('All fields are required', 'error', { type: 'error' });
      return;
    }
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error', {
        type: 'error',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New password and confirmation do not match', 'error', {
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await adminActions.changePassword({ currentPassword, newPassword });
      showToast('Password changed successfully', 'success', {
        type: 'success',
      });
      handleClose();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Change password">
      <div className="flex flex-col gap-4 p-6">
        <p className={cn('text-sm text-gray6', Inter_400.className)}>
          Choose a strong password you haven&apos;t used before.
        </p>
        <Input
          id="currentPassword"
          label="Current password"
          type="password"
          className="h-12 rounded-lg"
          name="currentPassword"
          placeholder="Enter current password"
          value={currentPassword}
          handleChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          id="newPassword"
          label="New password"
          type="password"
          className="h-12 rounded-lg"
          name="newPassword"
          placeholder="Enter new password"
          value={newPassword}
          handleChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          id="confirmPassword"
          label="Confirm new password"
          type="password"
          className="h-12 rounded-lg"
          name="confirmPassword"
          placeholder="Re-enter new password"
          value={confirmPassword}
          handleChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="button"
          round
          wide
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          className="h-12 mt-2 bg-primary text-white"
        >
          Update password
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
