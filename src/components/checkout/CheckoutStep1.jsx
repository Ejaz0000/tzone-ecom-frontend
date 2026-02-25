'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/utils/axiosInstance';

export default function CheckoutStep1({
  user,
  isAuthenticated,
  formData,
  onFormDataChange,
  onNext,
  loading,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      if (isAuthenticated) {
        // Update profile for authenticated users
        const updatePayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };

        await axiosInstance.patch('/auth/profile/', updatePayload);
        toast.success('Profile updated successfully');
      }

      onNext();
    } catch (error) {
      console.error('Profile update error:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error('Please check the form for errors');
      } else if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-orange-300">
      <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--primary-main)' }}>
        Step 1: Your Details
      </h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Full Name
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) =>
              onFormDataChange({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.name ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) =>
              onFormDataChange({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.email ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) =>
              onFormDataChange({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.phone ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
            placeholder="+1 (555) 000-0000"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting || loading}
          className="px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 bg-orange-400"
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
