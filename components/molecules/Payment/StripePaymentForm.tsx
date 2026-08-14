'use client';

import React, { useState } from 'react';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { getStripe } from '@/app/lib/config/stripe.config';
import Button from '@/components/atoms/form/Button';
import showToast from '@/app/lib/utils/toast';

const InnerForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    setSubmitting(false);

    if (error) {
      showToast(error.message || 'Payment failed', 'error', { type: 'error' });
      return;
    }
    if (
      paymentIntent &&
      (paymentIntent.status === 'succeeded' ||
        paymentIntent.status === 'processing')
    ) {
      onSuccess();
    }
  };

  return (
    <div className="grid gap-4">
      <PaymentElement />
      <Button
        type="button"
        className="w-full py-3 rounded-full mt-2"
        onClick={handleSubmit}
        loading={submitting}
        disabled={!stripe || submitting}
      >
        Pay now
      </Button>
    </div>
  );
};

const StripePaymentForm: React.FC<{
  clientSecret: string;
  onSuccess: () => void;
}> = ({ clientSecret, onSuccess }) => {
  return (
    <Elements stripe={getStripe()} options={{ clientSecret }}>
      <InnerForm onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripePaymentForm;
