'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { axiosInstance } from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

export default function ChangePasswordSection() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setErrors({});
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Frontend validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'New passwords do not match' });
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setErrors({ newPassword: 'Password must be at least 8 characters' });
      toast.error('Password must be at least 8 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await axiosInstance.post('/auth/change-password/', {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      });

      if (response.data.status) {
        toast.success('Password changed successfully!');
        // Clear form
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Password change error:', error);
      
      // Handle backend errors
      if (error.response?.data?.data?.errors) {
        const backendErrors = error.response.data.data.errors;
        const formattedErrors = {};
        
        if (backendErrors.old_password) {
          formattedErrors.oldPassword = backendErrors.old_password[0];
        }
        if (backendErrors.new_password) {
          formattedErrors.newPassword = backendErrors.new_password[0];
        }
        
        setErrors(formattedErrors);
        toast.error(error.response.data.message || 'Password change failed');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to change password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--primary-main)' }}>
          Change Password
        </h1>
        <p style={{ color: 'var(--neutral-gray600)' }} className="mt-2">
          Update your password to keep your account secure
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border shadow-sm p-8 max-w-2xl" style={{ borderColor: 'var(--neutral-gray400)' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--primary-main)' }}>
              Current Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showPasswords.oldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-12"
                style={{
                  borderColor: errors.oldPassword ? 'var(--error)' : 'var(--neutral-gray400)',
                  '--tw-ring-color': 'var(--accent-brown)',
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('oldPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: 'var(--neutral-gray500)' }}
              >
                {showPasswords.oldPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--primary-main)' }}>
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPasswords.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-12"
                style={{
                  borderColor: errors.newPassword ? 'var(--error)' : 'var(--neutral-gray400)',
                  '--tw-ring-color': 'var(--accent-brown)',
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: 'var(--neutral-gray500)' }}
              >
                {showPasswords.newPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs mt-1" style={{ color: errors.newPassword ? 'var(--error)' : 'var(--neutral-gray500)' }}>
              {errors.newPassword || 'Minimum 8 characters required'}
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--primary-main)' }}>
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all pr-12"
                style={{
                  borderColor: errors.confirmPassword ? 'var(--error)' : 'var(--neutral-gray400)',
                  '--tw-ring-color': 'var(--accent-brown)',
                }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: 'var(--neutral-gray500)' }}
              >
                {showPasswords.confirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-white"
            style={{
              backgroundColor: isSubmitting ? 'var(--neutral-gray400)' : 'var(--accent-brown)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
