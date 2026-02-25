import React from 'react';

export default function GuestAddressForm({ 
  addressData, 
  onAddressChange, 
  errors = {},
  title = "Address",
  showTitle = true
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddressChange({
      ...addressData,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border" style={{ borderColor: 'var(--neutral-gray400)' }}>
      {showTitle && (
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-main)' }}>
          {title}
        </h3>
      )}
      
      <div className="space-y-4">
        {/* Address Label */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Address Label (e.g., Home, Office)
          </label>
          <input
            type="text"
            name="label"
            value={addressData.label || ''}
            onChange={handleChange}
            placeholder="Office"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.label ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
          />
          {errors.label && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.label}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Street Address
          </label>
          <input
            type="text"
            name="address_line1"
            value={addressData.address_line1 || ''}
            onChange={handleChange}
            placeholder="Office Road"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.address_line1 ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
          />
          {errors.address_line1 && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.address_line1}</p>
          )}
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
              City
            </label>
            <input
              type="text"
              name="city"
              value={addressData.city || ''}
              onChange={handleChange}
              placeholder="Dhaka"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{
                borderColor: errors.city ? 'var(--error)' : 'var(--neutral-gray400)',
                '--tw-ring-color': 'var(--accent-brown)',
              }}
            />
            {errors.city && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
              State / Province
            </label>
            <input
              type="text"
              name="state"
              value={addressData.state || ''}
              onChange={handleChange}
              placeholder="Dhaka"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{
                borderColor: errors.state ? 'var(--error)' : 'var(--neutral-gray400)',
                '--tw-ring-color': 'var(--accent-brown)',
              }}
            />
            {errors.state && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.state}</p>
            )}
          </div>
        </div>

        {/* Postal Code and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
              Postal Code
            </label>
            <input
              type="text"
              name="postal_code"
              value={addressData.postal_code || ''}
              onChange={handleChange}
              placeholder="1212"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{
                borderColor: errors.postal_code ? 'var(--error)' : 'var(--neutral-gray400)',
                '--tw-ring-color': 'var(--accent-brown)',
              }}
            />
            {errors.postal_code && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.postal_code}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
              Country
            </label>
            <input
              type="text"
              name="country"
              value={addressData.country || ''}
              onChange={handleChange}
              placeholder="Bangladesh"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{
                borderColor: errors.country ? 'var(--error)' : 'var(--neutral-gray400)',
                '--tw-ring-color': 'var(--accent-brown)',
              }}
            />
            {errors.country && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.country}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--primary-main)' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={addressData.phone || ''}
            onChange={handleChange}
            placeholder="01819146163"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{
              borderColor: errors.phone ? 'var(--error)' : 'var(--neutral-gray400)',
              '--tw-ring-color': 'var(--accent-brown)',
            }}
          />
          {errors.phone && (
            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}
