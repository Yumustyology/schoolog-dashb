"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/atoms/form/Button';
import Input from '@/components/atoms/form/Input';
import SelectComp from '@/components/atoms/form/Select';
import { cn } from '@/app/lib/utils';
import { Inter_400, Inter_500, Inter_600 } from '@/app/lib/config/font.config';
import showToast from '@/app/lib/utils/toast';
import * as actions from '@/app/lib/actions/domains.action';
import DomainDetailsDrawer from './DomainDetailsDrawer';
import { validateCustomDomainInput } from '@/app/lib/utils/reservedDomains';
import ConfirmModal from '@/components/molecules/ConfirmModal';

const PURPOSE_LABEL: Record<actions.DomainPurpose, string> = {
  website: 'Website',
  portal: 'Portal',
};

const PURPOSE_OPTIONS = [
  { id: 'website', name: "Public website (visitors see your school's site)" },
  { id: 'portal', name: 'Portal (staff/students/parents sign in here)' },
];

export default function DomainManagement() {
  const [domains, setDomains] = useState<actions.Domain[]>([]);
  const [loading, setLoading] = useState(false);
  // loading state omitted for now
  const [addOpen, setAddOpen] = useState(false);
  const [hostname, setHostname] = useState('');
  const [purpose, setPurpose] = useState<actions.DomainPurpose>('portal');
  const [hostnameError, setHostnameError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<actions.Domain | null>(null);
  const [domainToRemove, setDomainToRemove] = useState<actions.Domain | null>(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const list = await actions.listDomains();
      setDomains(list.data || []);
    } catch (error) {
      console.error(error);
      showToast('Failed to load domains', 'domains-load-failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    const validation = validateCustomDomainInput(hostname);
    if (!validation.valid) {
      setHostnameError(validation.error || 'Invalid domain');
      return;
    }
    setHostnameError(null);
    setAdding(true);
    try {
      const created = await actions.createDomain({ hostname, type: purpose });
      if (created.data) setDomains((s) => [created.data as actions.Domain, ...s]);
      setAddOpen(false);
      setHostname('');
      setPurpose('portal');
      showToast('Domain added. Follow the DNS instructions and click Verify when ready.', 'domain-add', { type: 'success' });
    } catch {
      showToast('Failed to add domain', 'domain-add-failed', { type: 'error' });
    } finally {
      setAdding(false);
    }
  }

  async function handleVerify(id: string) {
    try {
      const updated = await actions.verifyDomain(id);
      if (updated.data) {
        const updatedDomain = updated.data;
        setDomains((s) => s.map((d) => (d._id === id ? updatedDomain : d)));
      }
      showToast('Domain verification triggered', 'domain-verify', { type: 'success' });
    } catch {
      showToast('Verification failed', 'domain-verify-failed', { type: 'error' });
    }
  }

  async function handleRemove(id: string) {
    const domain = domains.find((d) => d._id === id) ?? null;
    setDomainToRemove(domain);
  }

  async function confirmRemove() {
    if (!domainToRemove) return;
    setRemoving(true);
    try {
      await actions.removeDomain(domainToRemove._id);
      setDomains((s) => s.filter((d) => d._id !== domainToRemove._id));
      showToast('Domain removed', 'domain-removed', { type: 'success' });
      setDomainToRemove(null);
      setSelected(null);
    } catch {
      showToast('Failed to remove domain', 'domain-remove-failed', { type: 'error' });
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between pb-4 border-b border-b-[#E5E5EA] mb-8">
        <div>
          <h2 className={cn(Inter_600.className, 'text-black1 mb-2 text-lg')}>
            Custom Domains
          </h2>
          <p className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
            Connect a custom domain so students and staff can access your tenant at your address.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setAddOpen(true)}
          className="text-white text-sm rounded-full"
        >
          Add domain
        </Button>
      </div>

      {loading ? (
        <div className="p-6 text-center text-sm text-gray3">Loading domains...</div>
      ) : domains.length === 0 ? (
        <div className={cn(Inter_400.className, 'p-10 text-center text-sm text-gray3 bg-gray7 rounded-lg')}>
          No custom domains yet — add one to get started.
        </div>
      ) : (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={Inter_500.className}>Hostname</TableHead>
            <TableHead className={Inter_500.className}>Type</TableHead>
            <TableHead className={Inter_500.className}>Status</TableHead>
            <TableHead className={Inter_500.className}>DNS Target</TableHead>
            <TableHead className={Inter_500.className}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((d) => (
            <TableRow key={d._id}>
              <TableCell>
                <button
                  type="button"
                  className={cn(Inter_500.className, 'text-left text-sm text-primary hover:underline')}
                  onClick={() => setSelected(d)}
                >
                  {d.hostname}
                </button>
              </TableCell>
              <TableCell><Badge variant={d.type === 'website' ? 'default' : 'secondary'}>{PURPOSE_LABEL[d.type] ?? d.type}</Badge></TableCell>
              <TableCell>
                <span
                  className={cn(
                    Inter_500.className,
                    'px-3 py-1 rounded-full text-xs',
                    d.status === 'verified'
                      ? 'bg-green-100 text-green-700'
                      : d.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                  )}
                >
                  {d.status}
                </span>
              </TableCell>
              <TableCell className={cn(Inter_400.className, 'text-sm text-gray3')}>{d.dnsTarget ?? '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    outlined
                    flat
                    onClick={() => handleVerify(d._id)}
                    className="!py-1.5 !px-4 text-xs rounded-full"
                  >
                    Check
                  </Button>
                  <Button
                    type="button"
                    flat
                    onClick={() => setSelected(d)}
                    className="!py-1.5 !px-4 text-xs rounded-full !bg-gray7"
                  >
                    Details
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleRemove(d._id)}
                    className="!py-1.5 !px-4 text-xs rounded-full !bg-red-50 !text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      )}

      <Dialog open={addOpen} onOpenChange={(open) => { setAddOpen(open); if (!open) setHostnameError(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn(Inter_600.className, 'text-black1 text-lg')}>Add domain</DialogTitle>
            <DialogDescription className={cn(Inter_400.className, 'text-[#475467] text-sm')}>
              Enter the hostname you want to verify.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-5">
            <Input
              inputClassName={cn(Inter_500.className, 'text-base text-gray1')}
              label="Hostname"
              type="text"
              className="input h-14 rounded-lg"
              value={hostname}
              handleChange={(e) => { setHostname(e.target.value); if (hostnameError) setHostnameError(null); }}
              placeholder="myschool.example.com"
              errMsg={hostnameError}
              required={false}
            />
            <SelectComp
              label="What is this domain for?"
              value={purpose}
              onValueChange={(v) => setPurpose(v as actions.DomainPurpose)}
              options={PURPOSE_OPTIONS}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              flat
              onClick={() => setAddOpen(false)}
              className="text-sm rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              loading={adding}
              disabled={adding}
              className="text-white text-sm rounded-full"
            >
              Add domain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DomainDetailsDrawer domain={selected} open={!!selected} onClose={() => setSelected(null)} onVerify={handleVerify} onRemove={handleRemove} />
        )}
      </Dialog>

      <ConfirmModal
        open={!!domainToRemove}
        close={() => setDomainToRemove(null)}
        title="Remove domain"
        body={`Remove ${domainToRemove?.hostname ?? 'this domain'}? This will unbind it from your school.`}
        isLoading={removing}
        confirmText="Remove"
        confirmClassName="bg-r text-white"
        onConfirm={confirmRemove}
      />
    </div>
  );
}
