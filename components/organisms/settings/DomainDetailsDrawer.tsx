"use client";
import * as React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Domain } from '@/app/lib/actions/domains.action';
import { Copy } from 'lucide-react';
// ...existing code...

type Props = {
  domain: Domain | null;
  open: boolean;
  onClose: () => void;
  onVerify: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
};

export default function DomainDetailsDrawer({ domain, onClose, onVerify, onRemove }: Props) {
  if (!domain) return null;
  const instructions = domain.dnsTarget
    ? `Add a TXT record: Name: ${domain.hostname} or @ (see provider docs). Value: ${domain.dnsTarget}`
    : 'Follow the provider instructions to add CNAME or A record as instructed.';

  return (
    <DialogContent className="w-full max-w-lg">
      <DialogHeader>
        <DialogTitle>Domain details</DialogTitle>
        <DialogDescription>{domain.hostname}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500">Status</div>
            <div className="text-base font-semibold">{domain.status}</div>
          </div>
          <div className="text-sm text-neutral-500">Added</div>
        </div>

        <div>
          <h4 className="text-sm font-medium">How to configure DNS</h4>
          <p className="text-sm text-neutral-600 mt-2">{instructions}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(instructions)}>
              <Copy className="w-4 h-4" /> Copy instructions
            </Button>
            <Button size="sm" onClick={() => onVerify(domain._id)}>Verify</Button>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>Close</Button>
        <Button variant="destructive" onClick={() => onRemove(domain._id)}>Remove domain</Button>
      </DialogFooter>
    </DialogContent>
  );
}
