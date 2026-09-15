'use client';

import React, { useState } from 'react';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import Switch from '@/components/atoms/form/Switch';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500 } from '@/app/lib/config/font.config';
import {
  closeInviteTutorModal,
  isInviteTutorModalOpen,
} from '@/app/lib/entities/staff.entity';
import { useEntity } from 'simpler-state';
import staffInvitesActions, {
  StaffInvite,
} from '@/app/lib/actions/staff-invites.action';
import showToast from '@/app/lib/utils/toast';
import { FaWhatsapp, FaRegEnvelope, FaRegCopy } from 'react-icons/fa';

const InviteTutorModal: React.FC<{ onCreated?: () => void }> = ({
  onCreated,
}) => {
  const isOpen = useEntity(isInviteTutorModalOpen);
  const [email, setEmail] = useState('');
  const [expiresInDays, setExpiresInDays] = useState('7');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createdInvite, setCreatedInvite] = useState<StaffInvite | null>(null);

  const reset = () => {
    setEmail('');
    setExpiresInDays('7');
    setSendEmail(true);
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
        sendEmail: email ? sendEmail : false,
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

  const shareMessage = createdInvite
    ? `You're invited to join as a tutor. Use this link to set up your account: ${createdInvite.link}`
    : '';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Invite a tutor">
      <div className="flex flex-col gap-4">
        {createdInvite ? (
          <>
            <p className={cn('text-sm text-gray6', Inter_400.className)}>
              {createdInvite.email && sendEmail
                ? `We've emailed this link to ${createdInvite.email}. It expires ${new Date(createdInvite.expiresAt).toLocaleDateString()}.`
                : `Share this link with the tutor. It expires ${new Date(createdInvite.expiresAt).toLocaleDateString()}.`}
            </p>

            <div className="flex gap-2 items-center bg-[#F8F8F8] rounded-lg px-3 py-2.5">
              <span className={cn('flex-1 break-all text-xs text-gray1', Inter_400.className)}>
                {createdInvite.link}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy invite link"
                className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-white text-gray3 hover:text-primary"
              >
                <FaRegCopy size={14} />
              </button>
            </div>

            <div className="flex gap-2">
              <a
                href={`mailto:${createdInvite.email ?? ''}?subject=${encodeURIComponent("You're invited to join as a tutor")}&body=${encodeURIComponent(shareMessage)}`}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-[#F8F8F8] text-gray1 text-sm hover:bg-gray4 transition-colors',
                  Inter_500.className
                )}
              >
                <FaRegEnvelope size={14} /> Email
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-[#F8F8F8] text-gray1 text-sm hover:bg-gray4 transition-colors',
                  Inter_500.className
                )}
              >
                <FaWhatsapp size={16} /> WhatsApp
              </a>
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
            {email && (
              <div className="flex items-center justify-between">
                <span className={cn('text-sm text-gray1', Inter_400.className)}>
                  Email the invite link to this address
                </span>
                <Switch
                  checked={sendEmail}
                  onChange={setSendEmail}
                  activeColor="bg-primary"
                  activeBorder="border-primary"
                />
              </div>
            )}
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
