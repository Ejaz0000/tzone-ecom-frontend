'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import bkashImage from '../../../public/assets/bkash-logo.png';
import nagadImage from '../../../public/assets/nogod-logo.png';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    enabled: true,
    icon: '💵',
  },
  {
    id: 'bkash',
    label: 'bKash',
    description: 'Mobile payment service',
    enabled: false,
    icon: <Image src={bkashImage} alt="bKash Logo" width={48} height={34} />,
  },
  {
    id: 'nagad',
    label: 'Nagad',
    description: 'Digital payment service',
    enabled: false,
    icon: <Image src={nagadImage} alt="Nagad Logo" width={48} height={34} />,
  },
  {
    id: 'visa',
    label: 'Visa/Mastercard',
    description: 'Credit or debit card',
    enabled: false,
    icon: '💳',
  },
];

export default function CheckoutStep3({
  selectedPaymentMethod,
  onPaymentMethodChange,
  onPrevious,
  onSubmit,
  isSubmitting,
  loading,
}) {
  const [errors, setErrors] = useState({});

  const handlePaymentMethodSelect = (methodId) => {
    const method = PAYMENT_METHODS.find((m) => m.id === methodId);
    if (method && method.enabled) {
      onPaymentMethodChange(methodId);
      setErrors({});
    } else if (method && !method.enabled) {
      toast.info(`${method.label} is not available yet`);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please select a payment method');
      return;
    }

    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-orange-300">
      <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--primary-main)' }}>
        Step 3: Payment Method
      </h2>

      <div className="space-y-4">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.id)}
            disabled={!method.enabled}
            className="w-full p-4 border-2 rounded-lg transition-all text-left"
            style={{
              borderColor: selectedPaymentMethod === method.id ? 'var(--neutral-gray500)' : 'var(--neutral-gray400)',
              backgroundColor: selectedPaymentMethod === method.id ? 'var(--neutral-gray300)' : method.enabled ? 'var(--neutral-white)' : 'var(--neutral-gray300)',
              opacity: method.enabled ? 1 : 0.5,
              cursor: method.enabled ? 'pointer' : 'not-allowed',
            }}
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">{method.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: 'var(--primary-main)' }}>
                  {method.label}
                </h3>
                <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>
                  {method.description}
                </p>
                {!method.enabled && (
                  <p className="text-xs" style={{ color: 'var(--neutral-gray600)' }}>Coming Soon</p>
                )}
              </div>
              {selectedPaymentMethod === method.id && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-600">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {errors.paymentMethod && (
        <p className="text-sm mt-4" style={{ color: 'var(--error)' }}>{errors.paymentMethod}</p>
      )}

      {/* Summary Info */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--neutral-gray300)', borderLeft: `4px solid var(--neutral-gray500)` }}>
        <p className="text-sm" style={{ color: 'var(--primary-main)' }}>
          <span className="font-semibold">Note:</span> You will be able to proceed with{' '}
          <span className="font-semibold">
            {PAYMENT_METHODS.find((m) => m.id === selectedPaymentMethod)?.label}
          </span>{' '}
          for payment. Currently only Cash on Delivery is available.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 mt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting || loading}
          className="px-6 py-2 rounded-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--neutral-gray300)',
            color: 'var(--primary-main)',
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || loading || !selectedPaymentMethod}
          className="px-6 py-2 text-orange-600 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 gold-border bg-orange-50 hover:bg-orange-200"
        >
          {isSubmitting || loading ? (
            <span className="flex items-center">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Creating Order...
            </span>
          ) : (
            'Complete Order'
          )}
        </button>
      </div>
    </div>
  );
}
