'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance } from '@/utils/axiosInstance';
import { fetchUserData } from '@/redux/slices/userSlice';
import { toast } from 'react-toastify';

export default function ProfileSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Format date_joined to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateJoined: formatDate(user?.date_joined),
  });

  const [editData, setEditData] = useState({
    name: formData.name,
    phone: formData.phone,
  });

  // Update formData when user data changes
  useEffect(() => {
    if (user) {
      const updatedFormData = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateJoined: formatDate(user.date_joined),
      };
      setFormData(updatedFormData);
      setEditData({
        name: updatedFormData.name,
        phone: updatedFormData.phone,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('phone', editData.phone);

      const response = await axiosInstance.patch('/auth/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        // Update local state
        setFormData((prev) => ({
          ...prev,
          name: editData.name,
          phone: editData.phone,
        }));
        
        // Refresh user data in Redux
        dispatch(fetchUserData());
        
        setIsEditing(false);
        toast.success(response.data.message || 'Profile updated successfully!');
      }
    } catch (error) {
      if (error.response?.data) {
        const { status, status_code, message, data } = error.response.data;
        
        if (!status) {
          // Handle field-specific errors (400)
          if (status_code === 400 && data?.errors) {
            setErrors(data.errors);
            toast.error(message || 'Please fix the errors below');
          } else {
            toast.error(message || 'Failed to update profile');
          }
        }
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: formData.name,
      phone: formData.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-orange-600">Profile Information</h1>
        <p className="text-gray-600 mt-2">View and manage your account details</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        {!isEditing ? (
          <div className="space-y-6">
            {/* Display Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-2">
                  Full Name
                </label>
                <p className="text-lg text-orange-600 font-semibold">{formData.name}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-2">
                  Email Address
                </label>
                <p className="text-lg text-orange-600 font-semibold">{formData.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-2">
                  Phone Number
                </label>
                <p className="text-lg text-orange-600 font-semibold">{formData.phone}</p>
              </div>

              {/* Date Joined */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-2">
                  Member Since
                </label>
                <p className="text-lg text-orange-600 font-semibold">{formData.dateJoined}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Edit Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-orange-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
                )}
              </div>

              {/* Email Display (Non-editable) */}
              <div>
                <label className="block text-sm font-medium text-orange-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-orange-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone[0]}</p>
                )}
              </div>

              {/* Date Joined Display (Non-editable) */}
              <div>
                <label className="block text-sm font-medium text-orange-700 mb-2">
                  Member Since
                </label>
                <input
                  type="text"
                  value={formData.dateJoined}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-end mt-8">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-orange-600 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
