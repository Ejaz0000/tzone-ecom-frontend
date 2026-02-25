'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import StepIndicator from './StepIndicator';
import CheckoutStep1 from './CheckoutStep1';
import CheckoutStep2 from './CheckoutStep2';
import CheckoutStep3 from './CheckoutStep3';
import CheckoutSummary from './CheckoutSummary';
import { createOrder, clearOrder } from '@/redux/slices/orderSlice';
import { clearCart } from '@/redux/slices/cartSlice';

export default function CheckoutPage({ cart, user, loading: cartLoading }) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const isAuthenticated = !!user?.id;
  const orderState = useSelector((state) => state.order);

  // Step management
  const [currentStep, setCurrentStep] = useState(1);

  // Form state for Step 1
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Form state for Step 2
  const [billingAddress, setBillingAddress] = useState({
    label: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    label: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });

  const [useBillingAsShipping, setUseBillingAsShipping] = useState(true);

  // Form state for Step 3
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');

  // Initialize user details and addresses when user data loads
  useEffect(() => {
    if (user) {
      // Initialize user details
      setUserDetails({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });

      // Initialize billing address
      const defaultBilling = user.addresses?.find((a) => a.is_default_billing);
      if (defaultBilling) {
        setBillingAddress({
          label: defaultBilling.label || '',
          phone: defaultBilling.phone || '',
          address_line1: defaultBilling.street || '',
          address_line2: '',
          city: defaultBilling.city || '',
          state: defaultBilling.state || '',
          postal_code: defaultBilling.postal_code || '',
          country: defaultBilling.country || '',
        });
      }

      // Initialize shipping address
      const defaultShipping = user.addresses?.find((a) => a.is_default_shipping);
      if (defaultShipping) {
        setShippingAddress({
          label: defaultShipping.label || '',
          phone: defaultShipping.phone || '',
          address_line1: defaultShipping.street || '',
          address_line2: '',
          city: defaultShipping.city || '',
          state: defaultShipping.state || '',
          postal_code: defaultShipping.postal_code || '',
          country: defaultShipping.country || '',
        });
      }
    }
  }, [user]);

  // Update shipping address when "use billing as shipping" is checked
  useEffect(() => {
    if (useBillingAsShipping) {
      setShippingAddress({ ...billingAddress });
    }
  }, [useBillingAsShipping, billingAddress]);

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit order
  const handleSubmitOrder = async () => {
    try {
      const orderPayload = {
        payment_method: selectedPaymentMethod,
      };

      if (isAuthenticated) {
        // For authenticated users, use address IDs
        const defaultBilling = user?.addresses?.find((a) => a.is_default_billing);
        const defaultShipping = user?.addresses?.find((a) => a.is_default_shipping);

        orderPayload.billing_address_id = defaultBilling?.id;
        orderPayload.shipping_address_id = useBillingAsShipping
          ? defaultBilling?.id
          : defaultShipping?.id;
      } else {
        // For guest users, send address objects with correct field names
        orderPayload.guest_email = userDetails.email;
        orderPayload.guest_phone = userDetails.phone;
        
        // Transform address_line1 to street for backend
        orderPayload.guest_billing_address = {
          label: billingAddress.label,
          street: billingAddress.address_line1, // Backend expects 'street'
          city: billingAddress.city,
          state: billingAddress.state,
          postal_code: billingAddress.postal_code,
          country: billingAddress.country,
          phone: billingAddress.phone,
        };
        
        orderPayload.guest_shipping_address = useBillingAsShipping
          ? orderPayload.guest_billing_address
          : {
              label: shippingAddress.label,
              street: shippingAddress.address_line1, // Backend expects 'street'
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postal_code,
              country: shippingAddress.country,
              phone: shippingAddress.phone,
            };
      }

      const response = await dispatch(createOrder(orderPayload)).unwrap();

      toast.success('Order created successfully!');
      dispatch(clearCart());
      dispatch(clearOrder());

      // Prepare order data for confirmation page (use response.data)
      const orderData = {
        ...response.data,
        isGuest: !isAuthenticated, // Add guest flag
      };
      const encodedOrderData = encodeURIComponent(JSON.stringify(orderData));

      // Redirect to order confirmation with order data as search params
      setTimeout(() => {
        router.push(`/order-confirmation?order=${encodedOrderData}`);
      }, 500);
    } catch (error) {
      console.error('Order creation error:', error);

      if (error?.errors) {
        toast.error('Please check all fields and try again');
      } else if (error?.detail) {
        toast.error(error.detail);
      } else if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    }
  };

  if (cartLoading) {
    return (
      <div className="bg-orange-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64">
            <p style={{ color: 'var(--neutral-gray600)' }}>Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to cart if empty
  if (cart && (!cart.items || cart.items.length === 0)) {
    return (
      <div className="bg-orange-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex items-center justify-center h-64 flex-col">
            <p className="mb-4" style={{ color: 'var(--neutral-gray600)' }}>Your cart is empty</p>
            <a
              href="/cart"
              className="px-6 py-2 text-white rounded-lg transition"
              style={{ backgroundColor: 'var(--accent-brown)' }}
            >
              Back to Cart
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-normal text-(--primary-gold) mb-2">
            Checkout
          </h1>
          <p className='text-lg text-(--accent-gold)'>
            Complete your purchase securely
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: User Details */}
            {currentStep === 1 && (
              <CheckoutStep1
                user={user}
                isAuthenticated={isAuthenticated}
                formData={userDetails}
                onFormDataChange={setUserDetails}
                onNext={handleNextStep}
                loading={cartLoading}
              />
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <CheckoutStep2
                user={user}
                isAuthenticated={isAuthenticated}
                billingAddress={billingAddress}
                shippingAddress={shippingAddress}
                onBillingAddressChange={setBillingAddress}
                onShippingAddressChange={setShippingAddress}
                useBillingAsShipping={useBillingAsShipping}
                onUseBillingAsShipping={setUseBillingAsShipping}
                onNext={handleNextStep}
                onPrevious={handlePreviousStep}
                loading={cartLoading}
              />
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <CheckoutStep3
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={setSelectedPaymentMethod}
                onPrevious={handlePreviousStep}
                onSubmit={handleSubmitOrder}
                isSubmitting={orderState.loading}
                loading={cartLoading}
              />
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div>
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
