'use client';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { poppins_400, poppins_500 } from '@/app/lib/config/font.config';
import { cn, formatCurrency } from '@/app/lib/utils';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import ConfirmModal from '@/components/molecules/ConfirmModal';
import { DeleteIcon, EditIcon } from '@/components/atoms/icons/Icons';
import billingActions from '@/app/lib/actions/billing.action';
import { openPlanForm, openAddOnForm } from '@/app/lib/entities/billing.entity';
import { PlanFormModal } from '@/components/molecules/dashboard/billing/PlanFormModal';
import { AddOnFormModal } from '@/components/molecules/dashboard/billing/AddOnFormModal';
import showToast from '@/app/lib/utils/toast';

const Page = () => {
  const { data: plansResp } = useSWR(['plans'], billingActions.fetchPlans);
  const { data: addOnsResp } = useSWR(['add-ons'], billingActions.fetchAddOns);
  const plans = plansResp?.data || [];
  const addOns = addOnsResp?.data || [];

  const [deletePlanId, setDeletePlanId] = useState<string | null>(null);
  const [deleteAddOnId, setDeleteAddOnId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePlan = async () => {
    if (!deletePlanId) return;
    setIsDeleting(true);
    try {
      await billingActions.deletePlan(deletePlanId);
      mutate(['plans']);
      showToast('Plan deleted successfully', 'plan-deleted', { theme: 'light', type: 'success' });
      setDeletePlanId(null);
    } catch (error) {
      showToast('Failed to delete plan', 'plan-delete-error', { theme: 'light', type: 'error' });
      console.error('Error deleting plan:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAddOn = async () => {
    if (!deleteAddOnId) return;
    setIsDeleting(true);
    try {
      await billingActions.deleteAddOn(deleteAddOnId);
      mutate(['add-ons']);
      showToast('Add-on deleted successfully', 'add-on-deleted', { theme: 'light', type: 'success' });
      setDeleteAddOnId(null);
    } catch (error) {
      showToast('Failed to delete add-on', 'add-on-delete-error', { theme: 'light', type: 'error' });
      console.error('Error deleting add-on:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main>
      <BreadcrumbBox crumbs={[{ label: 'Billing', isActive: true }]} className="mb-0" />

      <div className="bg-white p-6 my-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-lg text-black1', poppins_500.className)}>Pricing Plans</h2>
          <Button round onClick={() => openPlanForm()} className="px-6">
            + New Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan._id} className="border border-gray4 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className={cn('text-base text-black1', poppins_500.className)}>{plan.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openPlanForm(plan._id)}>
                    <EditIcon size={16} />
                  </button>
                  <button onClick={() => setDeletePlanId(plan._id)}>
                    <DeleteIcon size={16} />
                  </button>
                </div>
              </div>
              <p className={cn('text-xl text-primary mb-2', poppins_500.className)}>
                {plan.isCustomPricing ? 'Contact Sales' : `${formatCurrency(plan.pricePerStudent, plan.currency)} / student`}
              </p>
              <p className={cn('text-xs text-gray mb-1', poppins_400.className)}>
                {plan.includedLiveClassMinutes} live-class mins/mo · up to {plan.maxParticipantsPerSession} participants
              </p>
              <p className={cn('text-xs text-gray mb-3', poppins_400.className)}>
                {plan.hasBrainyAI ? 'Includes Brainy AI' : 'Brainy AI available as add-on'}
              </p>
              <ul className="text-xs text-gray1 list-disc list-inside">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {!plan.isActive && (
                <p className="text-xs text-r2 mt-2">Inactive</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 my-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-lg text-black1', poppins_500.className)}>Add-ons</h2>
          <Button round onClick={() => openAddOnForm()} className="px-6">
            + New Add-on
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {addOns.map((addOn) => (
            <div key={addOn._id} className="flex items-center justify-between border border-gray4 rounded-xl p-4">
              <div>
                <h3 className={cn('text-sm text-black1', poppins_500.className)}>{addOn.name}</h3>
                <p className={cn('text-xs text-gray', poppins_400.className)}>
                  {formatCurrency(addOn.price, addOn.currency)} · {addOn.billingType === 'recurring' ? 'per term' : 'one-time'}
                </p>
                {addOn.description && (
                  <p className={cn('text-xs text-gray mt-1', poppins_400.className)}>{addOn.description}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => openAddOnForm(addOn._id)}>
                  <EditIcon size={16} />
                </button>
                <button onClick={() => setDeleteAddOnId(addOn._id)}>
                  <DeleteIcon size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PlanFormModal />
      <AddOnFormModal />

      <ConfirmModal
        open={!!deletePlanId}
        close={() => setDeletePlanId(null)}
        title="Delete plan"
        body="Are you sure you want to delete this plan? Schools currently on it will need to be moved to another plan."
        icon={<DeleteIcon size={24} />}
        onConfirm={handleDeletePlan}
        confirmText="Delete"
        isLoading={isDeleting}
      />
      <ConfirmModal
        open={!!deleteAddOnId}
        close={() => setDeleteAddOnId(null)}
        title="Delete add-on"
        body="Are you sure you want to delete this add-on?"
        icon={<DeleteIcon size={24} />}
        onConfirm={handleDeleteAddOn}
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </main>
  );
};

export default Page;
