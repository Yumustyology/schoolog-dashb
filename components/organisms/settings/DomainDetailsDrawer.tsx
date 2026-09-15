"use client";
import * as React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Button from '@/components/atoms/form/Button';
import { Domain } from '@/app/lib/actions/domains.action';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import { Copy, Check, X, CircleAlert } from 'lucide-react';
import showToast from '@/app/lib/utils/toast';

type Props = {
  domain: Domain | null;
  open: boolean;
  onClose: () => void;
  onVerify: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
};

const STATUS_STYLE: Record<Domain['status'], string> = {
  verified: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

const STATUS_DOT: Record<Domain['status'], string> = {
  verified: 'bg-green-500',
  pending: 'bg-amber-500',
  failed: 'bg-red-500',
};

function DnsRecordRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E0E0E0] px-4 py-3">
      <div>
        <div className={cn(Inter_400.className, 'text-xs text-gray3')}>{label}</div>
        <div className={cn(Inter_500.className, 'text-sm text-gray1 break-all')}>{value}</div>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value);
          showToast('Copied', `copy-${label}`, { type: 'success' });
        }}
        className="flex-shrink-0 text-gray3 hover:text-primary"
        aria-label={`Copy ${label}`}
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function DomainDetailsDrawer({ domain, onClose, onVerify, onRemove }: Props) {
  const [checking, setChecking] = React.useState(false);

  if (!domain) return null;

  const target = domain.dnsTarget ?? (domain.type === 'website' ? 'website.schoolog.app' : 'portal.schoolog.app');
  const recordName = domain.hostname === domain.hostname.split('.').slice(-2).join('.') ? '@' : domain.hostname.split('.')[0];
  const purposeCopy =
    domain.type === 'website'
      ? {
          heading: "Visitors will see your school's public website here",
        }
      : {
          heading: 'Staff, students and parents will sign in here',
        };

  const handleCheckConnection = async () => {
    setChecking(true);
    try {
      await onVerify(domain._id);
    } finally {
      setChecking(false);
    }
  };

  return (
    <DialogContent className="w-full max-w-lg">
      <DialogHeader>
        <DialogTitle className={cn(Inter_600.className, 'text-black1 text-lg')}>Domain setup</DialogTitle>
        <DialogDescription className={cn(Inter_400.className, 'text-[#475467] text-sm')}>{domain.hostname}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-2 max-h-[65vh] overflow-y-auto">
        {/* Status card */}
        <div className="flex items-center justify-between rounded-lg bg-gray7 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={cn('h-2 w-2 rounded-full', STATUS_DOT[domain.status], domain.status === 'pending' && 'animate-pulse')} />
            <span className={cn(Inter_500.className, 'px-2.5 py-0.5 rounded-full text-xs', STATUS_STYLE[domain.status])}>
              {domain.status === 'verified' ? 'Connected' : domain.status === 'pending' ? 'Not yet connected' : 'Connection failed'}
            </span>
          </div>
          <div className="text-right">
            {domain.lastChecked && (
              <div className={cn(Inter_400.className, 'text-xs text-gray3')}>
                Last checked {new Date(domain.lastChecked).toLocaleString()}
              </div>
            )}
            {typeof domain.verificationAttempts === 'number' && domain.verificationAttempts > 0 && (
              <div className={cn(Inter_400.className, 'text-xs text-gray3')}>
                {domain.verificationAttempts} check{domain.verificationAttempts === 1 ? '' : 's'} so far
              </div>
            )}
          </div>
        </div>

        {domain.status === 'failed' && domain.lastError && (
          <div className="flex gap-2 rounded-lg bg-red-50 px-4 py-3">
            <CircleAlert className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className={cn(Inter_400.className, 'text-sm text-red-700')}>{domain.lastError}</p>
          </div>
        )}

        {/* Step 1 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(Inter_600.className, 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[11px]')}>1</span>
            <h4 className={cn(Inter_600.className, 'text-sm text-black1')}>Add a DNS record</h4>
          </div>
          <p className={cn(Inter_400.className, 'text-sm text-gray3 mb-3')}>{purposeCopy.heading}. Add this CNAME record with your domain provider.</p>
          <div className="space-y-2">
            <DnsRecordRow label="Type" value="CNAME" />
            <DnsRecordRow label="Name" value={recordName} />
            <DnsRecordRow label="Value" value={target} />
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(Inter_600.className, 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[11px]')}>2</span>
            <h4 className={cn(Inter_600.className, 'text-sm text-black1')}>Wait for DNS to propagate</h4>
          </div>
          <p className={cn(Inter_400.className, 'text-sm text-gray3')}>
            This usually takes a few minutes, but can take up to 48 hours depending on your provider.
          </p>
        </div>

        {/* Step 3 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(Inter_600.className, 'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[11px]')}>3</span>
            <h4 className={cn(Inter_600.className, 'text-sm text-black1')}>Check the connection</h4>
          </div>
          <p className={cn(Inter_400.className, 'text-sm text-gray3 mb-3')}>
            Once you've added the record, check the connection. If it fails, double-check the record above and try again.
          </p>
          <Button
            type="button"
            onClick={handleCheckConnection}
            loading={checking}
            disabled={checking}
            className="text-white text-sm rounded-full gap-2"
          >
            {domain.status === 'verified' ? (
              <>
                <Check className="w-4 h-4" /> Re-check connection
              </>
            ) : domain.status === 'failed' ? (
              <>
                <X className="w-4 h-4" /> Retry connection check
              </>
            ) : (
              'Check connection'
            )}
          </Button>
        </div>
      </div>

      <DialogFooter className="mt-4">
        <Button type="button" flat onClick={onClose} className="text-sm rounded-full">
          Close
        </Button>
        <Button
          type="button"
          onClick={() => onRemove(domain._id)}
          className="text-sm rounded-full !bg-red-50 !text-red-600"
        >
          Remove domain
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
