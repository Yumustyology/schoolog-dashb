'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { useEntity } from 'simpler-state';
import {
  closeTemplateCheckoutModal,
  checkoutTemplateState,
  templateCheckoutOpenState,
} from '@/app/lib/entities/template-checkout.entity';
import Modal from '../Modal';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Button from '@/components/atoms/form/Button';
import MasterCardIcon from '@/components/atoms/icons/MasterCardIcon';
import VisaIcon from '@/components/atoms/icons/VisaIcon';
import { Trash2Icon, UncheckedRadioIcon } from '@/components/atoms/icons/Icons';
import { IoIosAdd } from 'react-icons/io';
import { cn, formatCurrency } from '@/app/lib/utils';
import { Inter_500, poppins_400 } from '@/app/lib/config/font.config';
import paymentsActions, {
  PaymentProvider,
} from '@/app/lib/actions/payments.action';
import showToast from '@/app/lib/utils/toast';
import StripePaymentForm from '../Payment/StripePaymentForm';

const NEW_STRIPE = 'new:stripe';
const NEW_PAYSTACK = 'new:paystack';
const savedKey = (id: string) => `saved:${id}`;

const cardIcon = (brand?: string | null) => {
  if (brand?.toLowerCase().includes('visa')) return <VisaIcon />;
  return <MasterCardIcon />;
};

const TemplateCheckoutModal: React.FC<{ onPurchased?: () => void }> = ({
  onPurchased,
}) => {
  const isOpen = useEntity(templateCheckoutOpenState);
  const template = useEntity(checkoutTemplateState);

  const { data: methodsResp, mutate: mutateMethods } = useSWR(
    isOpen ? ['payments-methods'] : null,
    () => paymentsActions.listSavedMethods()
  );
  const savedMethods = methodsResp?.data || [];

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setSelectedKey(null);
    setClientSecret(null);
    setProcessing(false);
  };

  const handleClose = () => {
    reset();
    closeTemplateCheckoutModal();
  };

  const handlePurchaseSucceeded = () => {
    showToast('Template purchased successfully', 'template-purchase-success', {
      type: 'success',
    });
    mutateMethods();
    onPurchased?.();
    handleClose();
  };

  const handleDeleteMethod = async (id: string) => {
    try {
      await paymentsActions.deleteSavedMethod(id);
      showToast('Card removed', 'card-removed', { type: 'success' });
      if (selectedKey === savedKey(id)) {
        setSelectedKey(null);
      }
      mutateMethods();
    } catch {
      // handleRequest already surfaces a toast for API errors
    }
  };

  const handleProceed = async () => {
    if (!template || !selectedKey) return;
    setProcessing(true);
    try {
      if (selectedKey.startsWith('saved:')) {
        const paymentMethodId = selectedKey.slice('saved:'.length);
        const res = await paymentsActions.chargeSavedMethod({
          templateId: template.templateId,
          paymentMethodId,
          idempotencyKey: paymentsActions.newIdempotencyKey(),
        });
        if (res.data?.status === 'failed') {
          showToast('Payment was declined by your bank', 'charge-failed', {
            type: 'error',
          });
        } else {
          handlePurchaseSucceeded();
        }
        return;
      }

      const provider =
        selectedKey === NEW_PAYSTACK
          ? PaymentProvider.PAYSTACK
          : PaymentProvider.STRIPE;

      const res = await paymentsActions.checkout({
        templateId: template.templateId,
        provider,
        idempotencyKey: paymentsActions.newIdempotencyKey(),
        saveCard: true,
      });

      if (provider === PaymentProvider.PAYSTACK) {
        if (res.data?.authorizationUrl) {
          window.location.href = res.data.authorizationUrl;
        } else {
          showToast('Could not start Paystack checkout', 'paystack-init-failed', {
            type: 'error',
          });
        }
        return;
      }

      if (res.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        showToast('Could not start Stripe checkout', 'stripe-init-failed', {
          type: 'error',
        });
      }
    } catch {
      // handleRequest already surfaces a toast for API errors
    } finally {
      setProcessing(false);
    }
  };

  if (!template) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Make payment">
      <div className="grid gap-4 mt-2">
        <div className="rounded-lg bg-[#F8F8F8] p-4">
          <p className={cn('text-sm text-gray6', poppins_400.className)}>
            {template.name}
          </p>
          <p className={cn('text-lg text-gray1', Inter_500.className)}>
            {formatCurrency(template.amount, template.currency)}
          </p>
        </div>

        {clientSecret ? (
          <StripePaymentForm
            clientSecret={clientSecret}
            onSuccess={handlePurchaseSucceeded}
          />
        ) : (
          <>
            <RadioGroup
              value={selectedKey}
              onChange={setSelectedKey}
              className="space-y-4"
            >
              {savedMethods.map((method) => (
                <RadioGroup.Option
                  key={method._id}
                  value={savedKey(method._id)}
                  className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-[#F8F8F8] p-4 text-black transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-gray-400 data-[checked]:bg-gray-100"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{cardIcon(method.brand)}</div>
                      <div className="flex flex-col">
                        <span
                          className={cn('text-sm font-medium capitalize', Inter_500.className)}
                        >
                          {method.brand || method.provider} · **** {method.last4 || '····'}
                        </span>
                        <span
                          className={cn(
                            'text-xs font-normal text-gray6 capitalize',
                            poppins_400.className
                          )}
                        >
                          via {method.provider}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteMethod(method._id);
                        }}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove card"
                      >
                        <Trash2Icon size={18} />
                      </button>
                      <UncheckedRadioIcon className="h-7 w-7 text-gray-400 transition group-data-[checked]:hidden" />
                      <CheckCircleIcon className="h-6 w-6 fill-green-500 hidden transition group-data-[checked]:block" />
                    </div>
                  </div>
                </RadioGroup.Option>
              ))}

              <RadioGroup.Option
                value={NEW_STRIPE}
                className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-[#F8F8F8] p-4 text-black transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-gray-400 data-[checked]:bg-gray-100"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl bg-gray7 h-10 w-10 border border-gray1 flex items-center justify-center rounded-full">
                      <IoIosAdd />
                    </div>
                    <span className={cn('text-sm font-medium', Inter_500.className)}>
                      Pay with new card (Stripe)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <UncheckedRadioIcon className="h-7 w-7 text-gray-400 transition group-data-[checked]:hidden" />
                    <CheckCircleIcon className="h-6 w-6 fill-green-500 hidden transition group-data-[checked]:block" />
                  </div>
                </div>
              </RadioGroup.Option>

              <RadioGroup.Option
                value={NEW_PAYSTACK}
                className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-[#F8F8F8] p-4 text-black transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-gray-400 data-[checked]:bg-gray-100"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl bg-gray7 h-10 w-10 border border-gray1 flex items-center justify-center rounded-full">
                      <IoIosAdd />
                    </div>
                    <span className={cn('text-sm font-medium', Inter_500.className)}>
                      Pay with Paystack
                    </span>
                  </div>
                  <div className="flex items-center">
                    <UncheckedRadioIcon className="h-7 w-7 text-gray-400 transition group-data-[checked]:hidden" />
                    <CheckCircleIcon className="h-6 w-6 fill-green-500 hidden transition group-data-[checked]:block" />
                  </div>
                </div>
              </RadioGroup.Option>
            </RadioGroup>

            <Button
              className="w-full py-3 rounded-full mt-8"
              disabled={!selectedKey || processing}
              loading={processing}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default TemplateCheckoutModal;
