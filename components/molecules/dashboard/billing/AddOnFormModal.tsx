'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useEntity } from 'simpler-state';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import {
  isAddOnFormOpen,
  selectedAddOnId,
  closeAddOnForm,
} from '@/app/lib/entities/billing.entity';
import billingActions, { CreateAddOnPayload } from '@/app/lib/actions/billing.action';
import showToast from '@/app/lib/utils/toast';
import type { AddOnBillingType } from '@/app/lib/types/billing.types';
import { poppins_400 } from '@/app/lib/config/font.config';
import { cn } from '@/app/lib/utils';

const emptyForm: CreateAddOnPayload = {
  name: '',
  billingType: 'recurring',
  price: 0,
  currency: 'NGN',
  description: '',
};

export const AddOnFormModal = () => {
  const isOpen = useEntity(isAddOnFormOpen);
  const addOnId = useEntity(selectedAddOnId);
  const { data } = useSWR(['add-ons'], billingActions.fetchAddOns);
  const [form, setForm] = useState<CreateAddOnPayload>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (!addOnId) {
      setForm(emptyForm);
      return;
    }
    const existing = data?.data?.find((a) => a._id === addOnId);
    if (existing) setForm(existing);
  }, [isOpen, addOnId, data]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setIsSaving(true);
    try {
      if (addOnId) {
        await billingActions.updateAddOn(addOnId, form);
      } else {
        await billingActions.createAddOn(form);
      }
      mutate(['add-ons']);
      showToast('Add-on saved successfully', 'add-on-saved', { theme: 'light', type: 'success' });
      closeAddOnForm();
    } catch (error) {
      showToast('Failed to save add-on', 'add-on-save-error', { theme: 'light', type: 'error' });
      console.error('Error saving add-on:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAddOnForm} title={addOnId ? 'Edit Add-on' : 'New Add-on'}>
      <div className="flex flex-col gap-5">
        <Input
          label="Add-on name"
          value={form.name}
          handleChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Brainy AI"
          className="w-full"
        />

        <div>
          <p className={cn('text-sm text-gray1 mb-2', poppins_400.className)}>
            Billing type
          </p>
          <select
            value={form.billingType}
            onChange={(e) => setForm({ ...form, billingType: e.target.value as AddOnBillingType })}
            className="w-full h-12 rounded-md border border-gray4 px-3 text-sm"
          >
            <option value="recurring">Recurring (per term)</option>
            <option value="one_time">One-time purchase</option>
          </select>
        </div>

        <Input
          label="Price (smallest currency unit)"
          type="number"
          value={String(form.price)}
          handleChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })}
          className="w-full"
        />

        <Input
          label="Description"
          value={form.description}
          handleChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full"
        />
      </div>

      <Button
        wide
        round
        className="h-12 mt-8"
        onClick={handleSave}
        disabled={!form.name.trim() || isSaving}
        loading={isSaving}
      >
        Save Add-on
      </Button>
    </Modal>
  );
};
