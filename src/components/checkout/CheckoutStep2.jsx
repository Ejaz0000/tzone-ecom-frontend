'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/utils/axiosInstance';
import { fetchUserData } from '@/redux/slices/userSlice';
import GuestAddressForm from './GuestAddressForm';

export default function CheckoutStep2({
  user,
  isAuthenticated,
  billingAddress,
  shippingAddress,
  onBillingAddressChange,
  onShippingAddressChange,
  useBillingAsShipping,
  onUseBillingAsShipping,
  onNext,
  onPrevious,
  loading,
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Get default addresses for authenticated users
  const defaultBillingAddress = user?.addresses?.find(
    (a) => a.is_default_billing
  );
  const defaultShippingAddress = user?.addresses?.find(
    (a) => a.is_default_shipping
  );

  const handleSyncAddress = () => {
    if (useBillingAsShipping) {
      onShippingAddressChange(billingAddress);
    }
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      if (isAuthenticated) {
        // Check if user has any addresses
        const hasAddresses = user?.addresses && user.addresses.length > 0;

        if (!hasAddresses) {
          // User has no addresses - create new addresses
          
          // Create billing address
          const billingFormData = new FormData();
          billingFormData.append('label', billingAddress.label || 'Billing Address');
          billingFormData.append('street', billingAddress.address_line1);
          billingFormData.append('city', billingAddress.city);
          billingFormData.append('state', billingAddress.state);
          billingFormData.append('postal_code', billingAddress.postal_code);
          billingFormData.append('country', billingAddress.country);
          billingFormData.append('phone', billingAddress.phone);
          billingFormData.append('address_type', 'billing');
          billingFormData.append('is_default_billing', 'true');

          const billingResponse = await axiosInstance.post(
            '/auth/addresses/',
            billingFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          if (billingResponse.data.status) {
            toast.success('Billing address created successfully');
          }

          // Create shipping address if not using billing as shipping
          if (!useBillingAsShipping) {
            const shippingFormData = new FormData();
            shippingFormData.append('label', shippingAddress.label || 'Shipping Address');
            shippingFormData.append('street', shippingAddress.address_line1);
            shippingFormData.append('city', shippingAddress.city);
            shippingFormData.append('state', shippingAddress.state);
            shippingFormData.append('postal_code', shippingAddress.postal_code);
            shippingFormData.append('country', shippingAddress.country);
            shippingFormData.append('phone', shippingAddress.phone);
            shippingFormData.append('address_type', 'shipping');
            shippingFormData.append('is_default_shipping', 'true');

            const shippingResponse = await axiosInstance.post(
              '/auth/addresses/',
              shippingFormData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            if (shippingResponse.data.status) {
              toast.success('Shipping address created successfully');
            }
          }

          // Refresh user data to get the newly created addresses
          await dispatch(fetchUserData());
        } else {
          // User has addresses - update existing default addresses
          
          // Update billing address if exists
          if (defaultBillingAddress) {
            const formData = new FormData();
            formData.append('label', billingAddress.label);
            formData.append('street', billingAddress.address_line1);
            formData.append('city', billingAddress.city);
            formData.append('state', billingAddress.state);
            formData.append('postal_code', billingAddress.postal_code);
            formData.append('country', billingAddress.country);
            formData.append('phone', billingAddress.phone);
            formData.append('address_type', 'billing');

            const billingResponse = await axiosInstance.patch(
              `/auth/addresses/${defaultBillingAddress.id}/`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            if (billingResponse.data.status) {
              toast.success('Billing address updated');
            }
          }

          // Update shipping address if not using billing as shipping
          if (!useBillingAsShipping && defaultShippingAddress) {
            const shippingFormData = new FormData();
            shippingFormData.append('label', shippingAddress.label);
            shippingFormData.append('street', shippingAddress.address_line1);
            shippingFormData.append('city', shippingAddress.city);
            shippingFormData.append('state', shippingAddress.state);
            shippingFormData.append('postal_code', shippingAddress.postal_code);
            shippingFormData.append('country', shippingAddress.country);
            shippingFormData.append('phone', shippingAddress.phone);
            shippingFormData.append('address_type', 'shipping');

            const shippingResponse = await axiosInstance.patch(
              `/auth/addresses/${defaultShippingAddress.id}/`,
              shippingFormData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );

            if (shippingResponse.data.status) {
              toast.success('Shipping address updated');
            }
          }
        }
      }

      onNext();
    } catch (error) {
      console.error('Address operation error:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please check the form for errors');
      } else if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to save address. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-orange-300">
      <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--primary-main)' }}>
        Step 2: Delivery Address
      </h2>

      {/* Show info message if user has no addresses */}
      {isAuthenticated && (!user?.addresses || user.addresses.length === 0) && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', borderLeft: '4px solid var(--accent-brown)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--primary-main)' }}>
            📍 Create Your First Address
          </p>
          <p className="text-sm" style={{ color: 'var(--neutral-gray600)' }}>
            You don't have any saved addresses yet. Please fill in your address details below, and we'll save them to your account for future orders.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Billing Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-main)' }}>
            Billing Address
          </h3>
          <GuestAddressForm
            addressData={billingAddress}
            onAddressChange={onBillingAddressChange}
            errors={errors}
            title=""
            showTitle={false}
          />
        </div>

        {/* Same Address Checkbox */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--neutral-gray300)' }}>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useBillingAsShipping}
              onChange={(e) => {
                onUseBillingAsShipping(e.target.checked);
                if (e.target.checked) {
                  handleSyncAddress();
                }
              }}
              className="w-4 h-4 rounded cursor-pointer"
              style={{ accentColor: 'var(--accent-brown)' }}
            />
            <span className="ml-3 font-medium" style={{ color: 'var(--primary-main)' }}>
              Use billing address as shipping address
            </span>
          </label>
        </div>

        {/* Shipping Address */}
        {!useBillingAsShipping && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-main)' }}>
                Shipping Address
              </h3>
              <GuestAddressForm
                addressData={shippingAddress}
                onAddressChange={onShippingAddressChange}
                errors={errors}
                title=""
                showTitle={false}
              />
            </div>
          </>
        )}
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
          onClick={handleNext}
          disabled={isSubmitting || loading}
          className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          style={{ backgroundColor: 'var(--accent-brown)' }}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Saving...
            </span>
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
}
