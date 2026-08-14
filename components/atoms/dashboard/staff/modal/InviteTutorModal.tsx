'use client';

import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { cn } from '@/app/lib/utils';
import { Inter_400 } from '@/app/lib/config/font.config';
import {
  closeInviteTutorModal,
  isInviteTutorModalOpen,
} from '@/app/lib/entities/staff.entity';
import { useEntity } from 'simpler-state';
import staffInvitesActions, {
  StaffInvite,
} from '@/app/lib/actions/staff-invites.action';
import showToast from '@/app/lib/utils/toast';

const InviteTutorModal: React.FC<{ onCreated?: () => void }> = ({
  onCreated,
}) => {
  const isOpen = useEntity(isInviteTutorModalOpen);
  const [email, setEmail] = useState('');
  const [expiresInDays, setExpiresInDays] = useState('7');
  const [submitting, setSubmitting] = useState(false);
  const [createdInvite, setCreatedInvite] = useState<StaffInvite | null>(null);

  const reset = () => {
    setEmail('');
    setExpiresInDays('7');
    setCreatedInvite(null);
  };

  const handleClose = () => {
    reset();
    closeInviteTutorModal();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await staffInvitesActions.createStaffInvite({
        email: email || undefined,
        expiresInDays: Number(expiresInDays) || 7,
      });
      if (res.data) {
        setCreatedInvite(res.data);
        onCreated?.();
      }
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!createdInvite) return;
    navigator.clipboard.writeText(createdInvite.link);
    showToast('Invite link copied', 'invite-link-copied', { type: 'success' });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Invite a tutor">
      <div className="flex flex-col gap-4 p-6">
        {createdInvite ? (
          <>
            <p className={cn('text-sm text-gray6', Inter_400.className)}>
              Share this link with the tutor. It expires{' '}
              {new Date(createdInvite.expiresAt).toLocaleDateString()}.
            </p>
            <div className="flex gap-2 items-center bg-[#F8F8F8] rounded-lg p-3 break-all text-xs">
              {createdInvite.link}
            </div>
            <Button
              type="button"
              round
              wide
              onClick={handleCopy}
              className="h-12 mt-2 bg-primary text-white"
            >
              Copy link
            </Button>
          </>
        ) : (
          <>
            <p className={cn('text-sm text-gray6', Inter_400.className)}>
              Generates an expiring link the tutor uses to create their own
              account — no need to fill in their details yourself.
            </p>
            <Input
              id="inviteEmail"
              label="Restrict to email (optional)"
              type="email"
              className="h-12 rounded-lg"
              name="inviteEmail"
              placeholder="tutor@example.com"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="expiresInDays"
              label="Expires in (days)"
              type="number"
              min={1}
              max={90}
              className="h-12 rounded-lg"
              name="expiresInDays"
              placeholder="7"
              value={expiresInDays}
              handleChange={(e) => setExpiresInDays(e.target.value)}
            />
            <Button
              type="button"
              round
              wide
              onClick={handleSubmit}
              loading={submitting}
              disabled={submitting}
              className="h-12 mt-2 bg-primary text-white"
            >
              Generate invite link
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default InviteTutorModal;
