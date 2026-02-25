'use client';

import React from 'react';

/**
 * VariantSelector Component
 * Displays available product attributes (Color, Size, Material, etc.) and allows users to select them
 * 
 * @param {Array} availableAttributes - Array of attribute objects with type and values
 * @param {Array} variants - Array of all product variants to check availability
 * @param {Object} selectedAttributes - Currently selected attributes {type: value}
 * @param {Function} onAttributeChange - Callback when an attribute is selected
 */
const VariantSelector = ({ availableAttributes, variants, selectedAttributes, onAttributeChange }) => {
  
  return (
    <div className="space-y-6">
      {availableAttributes.map((attribute) => (
        <div key={attribute.type}>
          <h3 className="text-sm font-semibold capitalize mb-3 text-(--primary-gold)">
            Select {attribute.type}
          </h3>
          <div className="flex flex-wrap gap-3">
            {attribute.values.map((value) => {
              const isSelected = selectedAttributes[attribute.type] === value;
              
              return (
                <button
                  key={value}
                  onClick={() => onAttributeChange(attribute.type, value)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--primary-gold)' : 'inherit',
                    backgroundColor: isSelected ? 'rgba(255, 107, 53, 0.1)' : 'inherit',
                    color: isSelected ? 'var(--primary-gold)' : 'var(--neutral-gray600)',
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
