'use client';
import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useEntity } from 'simpler-state';
import Modal from '@/components/molecules/Modal';
import Input from '@/components/atoms/form/Input';
import Button from '@/components/atoms/form/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/app/lib/utils';
import { poppins_400 } from '@/app/lib/config/font.config';
import {
  isPlanFormOpen,
  selectedPlanId,
  closePlanForm,
} from '@/app/lib/entities/billing.entity';
import billingActions, { CreatePlanPayload } from '@/app/lib/actions/billing.action';
import showToast from '@/app/lib/utils/toast';

const emptyForm: CreatePlanPayload = {
  name: '',
  pricePerStudent: 0,
  currency: 'NGN',
  annualDiscountPercent: 15,
  includedLiveClassMinutes: 0,
  maxParticipantsPerSession: 0,
  hasBrainyAI: false,
  isCustomPricing: false,
  features: [],
};

export const PlanFormModal = () => {
  const isOpen = useEntity(isPlanFormOpen);
  const planId = useEntity(selectedPlanId);
  const { data } = useSWR(['plans'], billingActions.fetchPlans);
  const [form, setForm] = useState<CreatePlanPayload>(emptyForm);
  const [featuresText, setFeaturesText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (!planId) {
      setForm(emptyForm);
      setFeaturesText('');
      return;
    }
    const existing = data?.data?.find((p) => p._id === planId);
    if (existing) {
      setForm(existing);
      setFeaturesText(existing.features.join('\n'));
    }
  }, [isOpen, planId, data]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setIsSaving(true);
    try {
      const payload: CreatePlanPayload = {
        ...form,
        features: featuresText.split('\n').map((f) => f.trim()).filter(Boolean),
      };
      if (planId) {
        await billingActions.updatePlan(planId, payload);
      } else {
        await billingActions.createPlan(payload);
      }
      mutate(['plans']);
      showToast('Plan saved successfully', 'plan-saved', { theme: 'light', type: 'success' });
      closePlanForm();
    } catch (error) {
      showToast('Failed to save plan', 'plan-save-error', { theme: 'light', type: 'error' });
      console.error('Error saving plan:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closePlanForm} title={planId ? 'Edit Plan' : 'New Plan'}>
      <div className="flex flex-col gap-5">
        <Input
          label="Plan name"
          value={form.name}
          handleChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Growth"
          className="w-full"
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="isCustomPricing"
            checked={form.isCustomPricing}
            onCheckedChange={(checked: boolean) => setForm({ ...form, isCustomPricing: !!checked })}
          />
          <label htmlFor="isCustomPricing" className="text-sm">
            Custom pricing (hide price, show &quot;Contact Sales&quot;)
          </label>
        </div>

        {!form.isCustomPricing && (
          <Input
            label="Price per student (per term, smallest currency unit)"
            type="number"
            value={String(form.pricePerStudent)}
            handleChange={(e) => setForm({ ...form, pricePerStudent: Number(e.target.value) || 0 })}
            className="w-full"
          />
        )}

        <Input
          label="Annual discount (%)"
          type="number"
          value={String(form.annualDiscountPercent)}
          handleChange={(e) => setForm({ ...form, annualDiscountPercent: Number(e.target.value) || 0 })}
          className="w-full"
        />

        <Input
          label="Included live-class minutes / month"
          type="number"
          value={String(form.includedLiveClassMinutes)}
          handleChange={(e) => setForm({ ...form, includedLiveClassMinutes: Number(e.target.value) || 0 })}
          className="w-full"
        />

        <Input
          label="Max participants per live-class session"
          type="number"
          value={String(form.maxParticipantsPerSession)}
          handleChange={(e) => setForm({ ...form, maxParticipantsPerSession: Number(e.target.value) || 0 })}
          className="w-full"
        />

        <div className="flex items-center gap-2">
          <Checkbox
            id="hasBrainyAI"
            checked={form.hasBrainyAI}
            onCheckedChange={(checked: boolean) => setForm({ ...form, hasBrainyAI: !!checked })}
          />
          <label htmlFor="hasBrainyAI" className="text-sm">
            Includes Brainy AI
          </label>
        </div>

        <div>
          <p className={cn('text-sm text-gray1 mb-2', poppins_400.className)}>
            Features (one per line)
          </p>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray4 p-3 text-sm"
            placeholder={'Unlimited students\nPriority support'}
          />
        </div>
      </div>

      <Button
        wide
        round
        className="h-12 mt-8"
        onClick={handleSave}
        disabled={!form.name.trim() || isSaving}
        loading={isSaving}
      >
        Save Plan
      </Button>
    </Modal>
  );
};
