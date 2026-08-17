'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import Modal from '@/components/molecules/Modal';
import { poppins_400, poppins_500, poppins_600 } from '@/app/lib/config/font.config';
import { cn, formatCurrency } from '@/app/lib/utils';
import { formatDate } from '@/app/lib/utils/dateUtils';
import paymentsActions from '@/app/lib/actions/payments.action';
import billingActions from '@/app/lib/actions/billing.action';
import { PlanCheckoutPanel } from '@/components/molecules/billing/PlanCheckoutPanel';
import MasterCardIcon from '@/components/atoms/icons/MasterCardIcon';
import VisaIcon from '@/components/atoms/icons/VisaIcon';
import { Trash2Icon } from '@/components/atoms/icons/Icons';
import showToast from '@/app/lib/utils/toast';
import type { Plan } from '@/app/lib/types/billing.types';

const cardIcon = (brand?: string | null) => {
  if (brand?.toLowerCase().includes('visa')) return <VisaIcon />;
  return <MasterCardIcon />;
};

const UsageMeter = ({ used, included }: { used: number; included: number }) => {
  const pct = included > 0 ? Math.min(100, Math.round((used / included) * 100)) : 0;
  const barColor = pct >= 90 ? 'bg-r' : pct >= 75 ? 'bg-orange-500' : 'bg-primary';
  return (
    <div>
      <div className="flex justify-between text-xs text-gray mb-1">
        <span>{used.toLocaleString()} min used</span>
        <span>{included.toLocaleString()} min included</span>
      </div>
      <div className="h-2 rounded-full bg-gray4 overflow-hidden">
        <div className={cn('h-full rounded-full', barColor)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Page = () => {
  const { data, isLoading, mutate } = useSWR(
    ['my-subscription'],
    paymentsActions.getMySubscription
  );
  const { data: methodsResp, mutate: mutateMethods } = useSWR(
    ['payments-methods'],
    () => paymentsActions.listSavedMethods()
  );
  const { data: plansResp } = useSWR(['public-plans'], billingActions.fetchPublicPlans);

  const subscription = data?.data;
  const savedMethods = methodsResp?.data || [];
  const plans = plansResp?.data || [];

  const [changePlanTarget, setChangePlanTarget] = useState<Plan | null>(null);

  const handleDeleteMethod = async (id: string) => {
    try {
      await paymentsActions.deleteSavedMethod(id);
      showToast('Card removed', 'card-removed', { type: 'success' });
      mutateMethods();
    } catch {
      // handleRequest already surfaces a toast for API errors
    }
  };

  const handleSubscribed = () => {
    setChangePlanTarget(null);
    mutate();
  };

  const handleExport = () => {
    if (!subscription) return;
    const rows = [
      ['Field', 'Value'],
      ['Plan', subscription.plan?.name || 'None'],
      ['Status', subscription.planStatus],
      [
        'Price per student',
        subscription.plan
          ? formatCurrency(subscription.plan.pricePerStudent, subscription.plan.currency)
          : '',
      ],
      ['Live-class minutes used this month', String(subscription.usage.liveClassMinutesUsedThisMonth)],
      ['Live-class minutes included', String(subscription.usage.liveClassMinutesIncluded)],
      ['Billing period start', formatDate(subscription.usage.periodStart)],
      ['Current period end', subscription.subscription ? formatDate(subscription.subscription.currentPeriodEnd) : ''],
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'billing-summary.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <BreadcrumbBox crumbs={[{ label: 'Billing', isActive: true }]} className="mb-0" />

      <div className="bg-white p-6 my-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn('text-lg text-black1', poppins_500.className)}>Current Plan</h2>
          <div className="flex gap-3">
            <Button flat round onClick={handleExport} className="px-5" disabled={!subscription}>
              Export
            </Button>
          </div>
        </div>

        {isLoading && <p className="text-gray text-sm">Loading…</p>}

        {!isLoading && subscription && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray4 rounded-xl p-5">
              <h3 className={cn('text-base text-black1 mb-1', poppins_600.className)}>
                {subscription.plan?.name || 'No plan yet'}
              </h3>
              <p className={cn('text-xs mb-3', poppins_400.className)}>
                Status:{' '}
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    subscription.planStatus === 'active'
                      ? 'bg-green-100 text-green-700'
                      : subscription.planStatus === 'past_due'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {subscription.planStatus}
                </span>
              </p>
              {subscription.plan && (
                <p className={cn('text-lg text-primary mb-3', poppins_600.className)}>
                  {subscription.plan.isCustomPricing
                    ? 'Contact Sales'
                    : `${formatCurrency(subscription.plan.pricePerStudent, subscription.plan.currency)} / student`}
                </p>
              )}
              {subscription.subscription && (
                <p className={cn('text-xs text-gray', poppins_400.className)}>
                  Renews {formatDate(subscription.subscription.currentPeriodEnd)}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {plans
                  .filter((p) => p._id !== subscription.plan?._id && !p.isCustomPricing)
                  .map((p) => (
                    <Button
                      key={p._id}
                      flat
                      round
                      className="px-4 text-xs"
                      onClick={() => setChangePlanTarget(p)}
                    >
                      Switch to {p.name}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="border border-gray4 rounded-xl p-5">
              <h3 className={cn('text-base text-black1 mb-4', poppins_600.className)}>
                Live-class usage this month
              </h3>
              <UsageMeter
                used={subscription.usage.liveClassMinutesUsedThisMonth}
                included={subscription.usage.liveClassMinutesIncluded}
              />
              <p className={cn('text-xs text-gray mt-3', poppins_400.className)}>
                Since {formatDate(subscription.usage.periodStart)}. Estimated from scheduled
                session durations.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 my-6">
        <h2 className={cn('text-lg text-black1 mb-6', poppins_500.className)}>Payment Methods</h2>
        <div className="flex flex-col gap-3">
          {savedMethods.length === 0 && (
            <p className="text-sm text-gray">No saved payment methods yet.</p>
          )}
          {savedMethods.map((method) => (
            <div
              key={method._id}
              className="flex items-center justify-between border border-gray4 rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{cardIcon(method.brand)}</div>
                <div>
                  <p className={cn('text-sm capitalize', poppins_500.className)}>
                    {method.brand || method.provider} · **** {method.last4 || '····'}
                  </p>
                  <p className={cn('text-xs text-gray capitalize', poppins_400.className)}>
                    via {method.provider}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteMethod(method._id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Remove card"
              >
                <Trash2Icon size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!changePlanTarget}
        onClose={() => setChangePlanTarget(null)}
        title={`Switch to ${changePlanTarget?.name || ''}`}
      >
        {changePlanTarget && (
          <PlanCheckoutPanel plan={changePlanTarget} onSubscribed={handleSubscribed} />
        )}
      </Modal>
    </main>
  );
};

export default Page;
