'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { BsCheckCircleFill, BsXCircle } from 'react-icons/bs';
import BreadcrumbBox from '@/components/atoms/dashboard/subjects/Breadcrumb';
import Button from '@/components/atoms/form/Button';
import { Inter_400, Inter_500, poppins_400, poppins_600, poppins_700 } from '@/app/lib/config/font.config';
import { cn, formatCurrency } from '@/app/lib/utils';
import paymentsActions, { PaymentProvider, SubscriptionStatus } from '@/app/lib/actions/payments.action';
import billingActions from '@/app/lib/actions/billing.action';
import showToast from '@/app/lib/utils/toast';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-primary1 text-primary',
  past_due: 'bg-[#F2994A14] text-[#F2994A]',
  cancelled: 'bg-[#EB575714] text-[#EB5757]',
};

const UsageBar = ({ used, included }: { used: number; included: number }) => {
  const pct = included > 0 ? Math.min(100, Math.round((used / included) * 100)) : 0;
  const isNearLimit = pct >= 90;
  return (
    <div>
      <div className="w-full h-3 bg-[#F1F1F1] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full', isNearLimit ? 'bg-[#EB5757]' : 'bg-primary')}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={cn('text-xs text-gray6 mt-2', poppins_400.className)}>
        {used.toLocaleString()} / {included.toLocaleString()} minutes used this period ({pct}%)
      </p>
    </div>
  );
};

const BillingPage = () => {
  const searchParams = useSearchParams();
  const justCheckedOut = searchParams.get('paystack_checkout') === '1';
  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null);

  const { data: subResp, isLoading, mutate } = useSWR(['my-subscription'], () =>
    paymentsActions.getMySubscription()
  );
  const { data: plansResp } = useSWR(['public-plans'], () => billingActions.listPublicPlans());
  const { data: addOnsResp } = useSWR(['public-add-ons'], () => billingActions.listPublicAddOns());

  const sub = subResp?.data;
  const plans = plansResp?.data || [];
  const addOns = addOnsResp?.data || [];

  useEffect(() => {
    if (!justCheckedOut) return;
    showToast(
      'Payment received — finalizing your subscription, this can take a few seconds.',
      'plan-checkout-processing',
      { type: 'success' }
    );
    // Webhook-driven activation lands asynchronously — poll a few times.
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      mutate();
      if (attempts >= 5) clearInterval(interval);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justCheckedOut]);

  const handleUpgrade = async (planId: string) => {
    setUpgradingPlanId(planId);
    try {
      const res = await paymentsActions.checkoutPlan({
        planId,
        provider: PaymentProvider.PAYSTACK,
        idempotencyKey: paymentsActions.newIdempotencyKey(),
        saveCard: true,
      });
      if (res.data?.authorizationUrl) {
        window.location.href = res.data.authorizationUrl;
      } else {
        showToast('Could not start checkout', 'plan-checkout-failed', { type: 'error' });
      }
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setUpgradingPlanId(null);
    }
  };

  if (isLoading) {
    return <p className={cn('text-sm text-gray6 py-12 text-center', poppins_400.className)}>Loading...</p>;
  }

  return (
    <div>
      <BreadcrumbBox className="mb-6" crumbs={[{ label: 'Billing', isActive: true }]} />

      {/* Current plan + status */}
      <div className="bg-white rounded-xl p-6 mb-6 grid grid-cols-2 gap-6">
        <div>
          <p className={cn('text-xs text-gray6 mb-1', poppins_400.className)}>Current plan</p>
          <h2 className={cn('text-2xl text-black1 mb-3', poppins_700.className)}>
            {sub?.plan?.name || 'No active plan'}
          </h2>
          {sub?.plan && (
            <>
              <p className={cn('text-sm text-gray1 mb-4', Inter_500.className)}>
                {sub.plan.isCustomPricing
                  ? 'Custom pricing'
                  : `${formatCurrency(sub.plan.pricePerStudent, sub.plan.currency)} / student / term`}
              </p>
              <div className="flex flex-wrap gap-2">
                {sub.plan.features.map((f) => (
                  <span
                    key={f}
                    className={cn('text-xs px-3 py-1.5 rounded-full bg-[#F7F7F7] text-gray1', poppins_400.className)}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end justify-between">
          <span
            className={cn(
              'text-xs px-3 py-1.5 rounded-full capitalize',
              STATUS_STYLES[sub?.subscription?.status || sub?.planStatus || ''] || 'bg-[#F1F1F1] text-gray6',
              Inter_500.className
            )}
          >
            {sub?.subscription?.status || sub?.planStatus || 'No subscription'}
          </span>
          {sub?.subscription?.currentPeriodEnd && (
            <p className={cn('text-xs text-gray6 text-right', poppins_400.className)}>
              Renews {new Date(sub.subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Usage + access */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <h3 className={cn('text-base text-black1 mb-4', poppins_600.className)}>
          Usage &amp; access this period
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className={cn('text-sm text-gray1 mb-2', Inter_500.className)}>Live class minutes</p>
            <UsageBar
              used={sub?.usage.liveClassMinutesUsedThisMonth ?? 0}
              included={sub?.usage.liveClassMinutesIncluded ?? 0}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              {sub?.plan?.hasBrainyAI ? (
                <BsCheckCircleFill className="text-primary" size={18} />
              ) : (
                <BsXCircle className="text-gray6" size={18} />
              )}
              <span className={cn('text-sm text-gray1', Inter_400.className)}>
                Brainy AI {sub?.plan?.hasBrainyAI ? 'included on your plan' : 'not included — upgrade to unlock'}
              </span>
            </div>
            <div className={cn('text-sm text-gray1', Inter_400.className)}>
              Up to {sub?.plan?.maxParticipantsPerSession ?? 0} participants per live class session
            </div>
          </div>
        </div>
      </div>

      {/* Available plans */}
      <div className="bg-white rounded-xl p-6">
        <h3 className={cn('text-base text-black1 mb-4', poppins_600.className)}>Available plans</h3>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrent = sub?.plan?._id === plan._id;
            return (
              <div
                key={plan._id}
                className={cn(
                  'border rounded-xl p-5 flex flex-col',
                  isCurrent ? 'border-primary bg-primary1/20' : 'border-gray4'
                )}
              >
                <p className={cn('text-lg text-black1 mb-1', poppins_600.className)}>{plan.name}</p>
                <p className={cn('text-sm text-gray6 mb-4', poppins_400.className)}>
                  {plan.isCustomPricing
                    ? 'Contact sales'
                    : `${formatCurrency(plan.pricePerStudent, plan.currency)} / student / term`}
                </p>
                <div className="flex flex-col gap-1.5 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray1">
                    {plan.hasBrainyAI ? (
                      <BsCheckCircleFill className="text-primary" size={14} />
                    ) : (
                      <BsXCircle className="text-gray6" size={14} />
                    )}
                    Brainy AI
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray1">
                    <BsCheckCircleFill className="text-primary" size={14} />
                    {plan.includedLiveClassMinutes.toLocaleString()} live class minutes
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray1">
                    <BsCheckCircleFill className="text-primary" size={14} />
                    {plan.maxParticipantsPerSession} participants per session
                  </div>
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray1">
                      <BsCheckCircleFill className="text-primary" size={14} />
                      {f}
                    </div>
                  ))}
                </div>
                <Button
                  round
                  wide
                  disabled={isCurrent || plan.isCustomPricing || upgradingPlanId === plan._id}
                  loading={upgradingPlanId === plan._id}
                  onClick={() => handleUpgrade(plan._id)}
                  className={cn('h-10', isCurrent ? '!bg-[#F1F1F1] !text-gray6' : '')}
                >
                  {isCurrent ? 'Current plan' : plan.isCustomPricing ? 'Contact sales' : 'Upgrade'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add-ons */}
      {addOns.length > 0 && (
        <div className="bg-white rounded-xl p-6 mt-6">
          <h3 className={cn('text-base text-black1 mb-4', poppins_600.className)}>Add-ons</h3>
          <div className="grid grid-cols-3 gap-4">
            {addOns.map((addOn) => (
              <div key={addOn._id} className="border border-gray4 rounded-xl p-5">
                <p className={cn('text-lg text-black1 mb-1', poppins_600.className)}>{addOn.name}</p>
                <p className={cn('text-sm text-gray1 mb-2', Inter_500.className)}>
                  {formatCurrency(addOn.price, addOn.currency)}
                  {addOn.billingType === 'recurring' ? ' / term' : ' one-time'}
                </p>
                {addOn.description && (
                  <p className={cn('text-xs text-gray6', poppins_400.className)}>{addOn.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
