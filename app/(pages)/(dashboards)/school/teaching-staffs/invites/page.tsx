'use client';

import React from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';
import { formatDate } from '@/app/lib/utils/dateUtils';
import { AdditionIcon, Trash2Icon } from '@/components/atoms/icons/Icons';
import { FiCopy } from 'react-icons/fi';
import staffInvitesActions, {
  StaffInvite,
  StaffInviteStatus,
} from '@/app/lib/actions/staff-invites.action';
import showToast from '@/app/lib/utils/toast';
import { openInviteTutorModal } from '@/app/lib/entities/staff.entity';
import InviteTutorModal from '@/components/atoms/dashboard/staff/modal/InviteTutorModal';
import ConfirmModal from '@/components/molecules/ConfirmModal';

const statusStyles: Record<StaffInviteStatus, string> = {
  pending: 'bg-blue-50 text-blue-600',
  used: 'bg-green-50 text-green-600',
  revoked: 'bg-red-50 text-red-600',
  expired: 'bg-gray-100 text-gray-500',
};

const InviteRow: React.FC<{ invite: StaffInvite; onRevoked: () => void }> = ({
  invite,
  onRevoked,
}) => {
  const [revoking, setRevoking] = React.useState(false);
  const [showRevokeModal, setShowRevokeModal] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(invite.link);
    showToast('Invite link copied', 'invite-link-copied', { type: 'success' });
  };

  const handleRevoke = async () => {
    setRevoking(true);
    try {
      await staffInvitesActions.revokeStaffInvite(invite._id);
      showToast('Invite revoked', 'invite-revoked', { type: 'success' });
      setShowRevokeModal(false);
      onRevoked();
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setRevoking(false);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray4 rounded-2xl p-4">
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs px-2.5 py-1 rounded-full capitalize',
              statusStyles[invite.status],
              Inter_500.className
            )}
          >
            {invite.status}
          </span>
          <span className={cn('text-xs text-gray6', poppins_400.className)}>
            {invite.role}
            {invite.email ? ` · ${invite.email}` : ''}
          </span>
        </div>
        <p className="text-xs text-gray6 truncate">{invite.link}</p>
        <p className={cn('text-xs text-gray6', poppins_400.className)}>
          Created {formatDate(invite.createdAt)} · Expires{' '}
          {formatDate(invite.expiresAt)}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <button
          type="button"
          onClick={handleCopy}
          className="text-gray-500 hover:text-primary"
          aria-label="Copy link"
        >
          <FiCopy size={18} />
        </button>
        {invite.status === 'pending' && (
          <button
            type="button"
            onClick={() => setShowRevokeModal(true)}
            disabled={revoking}
            className="text-gray-400 hover:text-red-500"
            aria-label="Revoke invite"
          >
            <Trash2Icon size={18} />
          </button>
        )}
      </div>

      <ConfirmModal
        open={showRevokeModal}
        close={() => setShowRevokeModal(false)}
        title="Revoke invite"
        body="Are you sure you want to revoke this invite link? Anyone holding it will no longer be able to use it to register."
        isLoading={revoking}
        confirmText="Revoke"
        confirmClassName="bg-r text-white"
        onConfirm={handleRevoke}
      />
    </div>
  );
};

const InvitesPage = () => {
  const { data, isLoading, mutate } = useSWR(['staff-invites'], () =>
    staffInvitesActions.listStaffInvites()
  );
  const invites = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <BreadcrumbBox
          className="mb-0"
          crumbs={[
            { label: 'Staff', isActive: false, href: '/school/teaching-staffs' },
            { label: 'Invite links', isActive: true },
          ]}
        />
        <Button onClick={openInviteTutorModal} round className="h-[44px] py-3 px-6">
          <AdditionIcon />
          <span className={cn('text-base', Inter_500.className)}>
            Invite tutor
          </span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-xl min-h-[60vh]">
        {!isLoading && invites.length === 0 && (
          <p className={cn('text-sm text-gray6 text-center py-12', poppins_400.className)}>
            No invite links yet — generate one to onboard a tutor.
          </p>
        )}
        <div className="flex flex-col gap-3">
          {invites.map((invite) => (
            <InviteRow key={invite._id} invite={invite} onRevoked={() => mutate()} />
          ))}
        </div>
      </div>

      <InviteTutorModal onCreated={() => mutate()} />
    </div>
  );
};

export default InvitesPage;
