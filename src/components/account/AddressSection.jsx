'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import AddressModal from './AddressModal';
import { fetchUserData } from '@/redux/slices/userSlice';
import { axiosInstance } from '@/utils/axiosInstance';

export default function AddressSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize addresses from user data
  useEffect(() => {
    if (user?.addresses && Array.isArray(user.addresses)) {
      // Map API address structure to component structure
      const mappedAddresses = user.addresses.map((addr) => ({
        id: addr.id,
        label: addr.label,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postal_code,
        country: addr.country,
        phone: addr.phone,
        isDefaultBilling: addr.is_default_billing,
        isDefaultShipping: addr.is_default_shipping,
        addressType: addr.address_type,
      }));
      console.log('Mapped Addresses:', mappedAddresses);
      setAddresses(mappedAddresses);
    }
  }, [user]);

  const handleAddAddress = async (newAddress) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('label', newAddress.label);
      formData.append('street', newAddress.street);
      formData.append('city', newAddress.city);
      formData.append('state', newAddress.state);
      formData.append('postal_code', newAddress.postalCode);
      formData.append('country', newAddress.country);
      formData.append('phone', newAddress.phone);
      formData.append('address_type', newAddress.addressType || 'billing');

      if (editingAddress) {
        // Update existing address
        const response = await axiosInstance.patch(
          `/auth/addresses/${editingAddress.id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.status) {
          await dispatch(fetchUserData());
          setShowModal(false);
          setEditingAddress(null);
          toast.success(response.data.message || 'Address updated successfully!');
        }
      } else {
        // Add new address
        const response = await axiosInstance.post(
          '/auth/addresses/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.status) {
          await dispatch(fetchUserData());
          setShowModal(false);
          toast.success(response.data.message || 'Address added successfully!');
        }
      }
    } catch (error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        toast.error(message || `Failed to ${editingAddress ? 'update' : 'add'} address`);
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.delete(`/auth/addresses/${id}/`);

      if (response.data.status) {
        await dispatch(fetchUserData());
        toast.success(response.data.message || 'Address deleted successfully!');
      }
    } catch (error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        toast.error(message || 'Failed to delete address');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id, type) => {
    console.log('Setting default:', { id, type });
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (type === 'billing') {
        formData.append('is_default_billing', true);
      } else if (type === 'shipping') {
        formData.append('is_default_shipping', true);
      }

      console.log('FormData entries:', Array.from(formData.entries()));

      const response = await axiosInstance.patch(`/auth/addresses/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Set default response:', response.data);

      if (response.data.status) {
        await dispatch(fetchUserData());
        toast.success(response.data.message || `Default ${type} address updated!`);
      } else {
        toast.error(response.data.message || 'Failed to update default address');
      }
    } catch (error) {
      console.error('Set default error:', error.response?.data || error);
      if (error.response?.data) {
        const { message } = error.response.data;
        toast.error(message || 'Failed to update default address');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Addresses</h1>
          <p className="text-gray-600 mt-2">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors w-fit"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {/* Address Grid */}
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Header with Label and Default Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-orange-600">{address.label}</h3>
                  {address.addressType && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {address.addressType}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {address.addressType === 'billing' && address.isDefaultBilling && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                      Default
                    </span>
                  )}
                  {address.addressType === 'shipping' && address.isDefaultShipping && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2 mb-6 text-gray-700">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="text-sm text-gray-600">Phone: {address.phone}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Actions */}
              <div className="flex gap-3 justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">{isLoading ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
                
                {/* Set Default Button based on address type */}
                {address.addressType === 'billing' && !address.isDefaultBilling && (
                  <button
                    onClick={() => handleSetDefault(address.id, 'billing')}
                    disabled={isLoading}
                    className="px-3 py-2 text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Setting...' : 'Set Default'}
                  </button>
                )}
                {address.addressType === 'shipping' && !address.isDefaultShipping && (
                  <button
                    onClick={() => handleSetDefault(address.id, 'shipping')}
                    disabled={isLoading}
                    className="px-3 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Setting...' : 'Set Default'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-600 mb-4">No addresses yet</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Modal */}
      <AddressModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleAddAddress}
        initialData={editingAddress}
      />
    </div>
  );
}
