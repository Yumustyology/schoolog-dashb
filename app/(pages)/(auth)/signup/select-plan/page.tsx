'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import AuthWrapper from '@/components/atoms/form/auth/AuthWrapper';
import billingActions from '@/app/lib/actions/billing.action';
import { PlanCheckoutPanel } from '@/components/molecules/billing/PlanCheckoutPanel';
import { cn, formatCurrency } from '@/app/lib/utils';
import { Inter_400, poppins_400, poppins_600 } from '@/app/lib/config/font.config';
import type { Plan } from '@/app/lib/types/billing.types';

function SelectPlanPage(): JSX.Element {
  const navigate = useRouter();
  const { data, isLoading } = useSWR(['public-plans'], billingActions.fetchPublicPlans);
  const plans = data?.data || [];
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSubscribed = () => {
    navigate.push('/school/');
  };

  return (
    <div className="w-full pb-10 px-14 mt-[80px] mx-auto max-w-3xl">
      <div
        className={cn('pt-8 mx-auto text-center mb-8', poppins_400.className)}
      >
        <h1 className={cn('text-[26px] mb-2', poppins_600.className)}>
          Choose your <span className="text-primary">plan</span>
        </h1>
        <p className={cn('text-gray text-sm max-w-md mx-auto', Inter_400.className)}>
          Every plan is paid up front — pick the one that fits your school and add
          a card to activate your account.
        </p>
      </div>

      <AuthWrapper>
        {!selectedPlan ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isLoading && <p className="text-center col-span-3 text-gray">Loading plans…</p>}
            {!isLoading && plans.length === 0 && (
              <p className="text-center col-span-3 text-gray">
                No plans are available right now — please contact support.
              </p>
            )}
            {plans.map((plan) => (
              <button
                key={plan._id}
                type="button"
                onClick={() => !plan.isCustomPricing && setSelectedPlan(plan)}
                disabled={plan.isCustomPricing}
                className={cn(
                  'text-left border border-gray4 rounded-xl p-5 hover:border-primary transition-colors',
                  plan.isCustomPricing && 'opacity-60 cursor-not-allowed'
                )}
              >
                <h3 className={cn('text-base text-black1 mb-2', poppins_600.className)}>
                  {plan.name}
                </h3>
                <p className={cn('text-lg text-primary mb-3', poppins_600.className)}>
                  {plan.isCustomPricing
                    ? 'Contact Sales'
                    : `${formatCurrency(plan.pricePerStudent, plan.currency)} / student`}
                </p>
                <ul className="text-xs text-gray1 list-disc list-inside space-y-1">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        ) : (
          <div className="mx-auto w-full xxs:px-2 tablet:px-10 laptop:px-10 desktop:px-28">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="text-sm text-primary mb-4"
            >
              ← Choose a different plan
            </button>
            <PlanCheckoutPanel plan={selectedPlan} onSubscribed={handleSubscribed} />
          </div>
        )}
      </AuthWrapper>
    </div>
  );
}

export default SelectPlanPage;
