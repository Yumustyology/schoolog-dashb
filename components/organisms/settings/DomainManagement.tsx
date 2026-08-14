"use client";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import showToast from '@/app/lib/utils/toast';
import * as actions from '@/app/lib/actions/domains.action';
import DomainDetailsDrawer from './DomainDetailsDrawer';
import { validateCustomDomainInput } from '@/app/lib/utils/reservedDomains';

const PURPOSE_LABEL: Record<actions.DomainPurpose, string> = {
  website: 'Website',
  portal: 'Portal',
};

export default function DomainManagement() {
  const [domains, setDomains] = useState<actions.Domain[]>([]);
  const [loading, setLoading] = useState(false);
  // loading state omitted for now
  const [addOpen, setAddOpen] = useState(false);
  const [hostname, setHostname] = useState('');
  const [purpose, setPurpose] = useState<actions.DomainPurpose>('portal');
  const [hostnameError, setHostnameError] = useState<string | null>(null);
  const [selected, setSelected] = useState<actions.Domain | null>(null);

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
    try {
      const created = await actions.createDomain({ hostname, type: purpose });
      if (created.data) setDomains((s) => [created.data as actions.Domain, ...s]);
      setAddOpen(false);
      setHostname('');
      setPurpose('portal');
      showToast('Domain added. Follow the DNS instructions and click Verify when ready.', 'domain-add', { type: 'success' });
    } catch {
      showToast('Failed to add domain', 'domain-add-failed', { type: 'error' });
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
    if (!confirm('Remove domain? This will unbind the domain from your school.')) return;
    try {
      await actions.removeDomain(id);
      setDomains((s) => s.filter((d) => d._id !== id));
      showToast('Domain removed', 'domain-removed', { type: 'success' });
    } catch {
      showToast('Failed to remove domain', 'domain-remove-failed', { type: 'error' });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Custom Domains</h3>
          <p className="text-sm text-neutral-500">Connect a custom domain so students and staff can access your tenant at your address.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddOpen(true)}>Add domain</Button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-sm text-neutral-500">Loading domains...</div>
      ) : (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hostname</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>DNS Target</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((d) => (
            <TableRow key={d._id}>
              <TableCell>
                <button className="text-left text-sm text-primary" onClick={() => setSelected(d)}>{d.hostname}</button>
              </TableCell>
              <TableCell><Badge variant={d.type === 'website' ? 'default' : 'secondary'}>{PURPOSE_LABEL[d.type] ?? d.type}</Badge></TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${d.status === 'verified' ? 'bg-green-100 text-green-700' : d.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{d.status}</span>
              </TableCell>
              <TableCell>{d.dnsTarget ?? '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleVerify(d._id)}>Verify</Button>
                  <Button size="sm" variant="ghost" onClick={() => setSelected(d)}>Details</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleRemove(d._id)}>Remove</Button>
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
            <DialogTitle>Add domain</DialogTitle>
            <DialogDescription>Enter the hostname you want to verify.</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm mb-1">Hostname</label>
              <Input
                value={hostname}
                onChange={(e) => { setHostname(e.target.value); if (hostnameError) setHostnameError(null); }}
                placeholder="myschool.example.com"
              />
              {hostnameError && <p className="text-sm text-red-600 mt-1">{hostnameError}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">What is this domain for?</label>
              <Select value={purpose} onValueChange={(v) => setPurpose(v as actions.DomainPurpose)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Public website (visitors see your school's site)</SelectItem>
                  <SelectItem value="portal">Portal (staff/students/parents sign in here)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add domain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DomainDetailsDrawer domain={selected} open={!!selected} onClose={() => setSelected(null)} onVerify={handleVerify} onRemove={handleRemove} />
        )}
      </Dialog>
    </div>
  );
}
