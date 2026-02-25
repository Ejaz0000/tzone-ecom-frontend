'use client';

export default function StepIndicator({ currentStep, totalSteps = 3 }) {
  const steps = [
    { number: 1, label: 'User Details' },
    { number: 2, label: 'Address' },
    { number: 3, label: 'Payment' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg mb-6 border border-orange-300">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all"
              style={{
                backgroundColor:
                  step.number < currentStep
                    ? 'var(--accent-green)'
                    : step.number === currentStep
                    ? 'var(--accent-brown)'
                    : 'var(--neutral-gray400)',
                color: step.number <= currentStep ? 'white' : 'var(--neutral-gray600)',
              }}
            >
              {step.number < currentStep ? (
                <span className="text-lg">✓</span>
              ) : (
                step.number
              )}
            </div>

            {/* Step Label */}
            <div className="ml-3">
              <p className="text-xs font-medium" style={{ color: 'var(--neutral-gray600)' }}>
                Step {step.number}
              </p>
              <p
                className="text-sm font-semibold"
                style={{
                  color: step.number === currentStep ? 'var(--accent-brown)' : 'var(--neutral-gray600)',
                }}
              >
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-1 mx-4 rounded transition-all"
                style={{
                  backgroundColor:
                    step.number < currentStep ? 'var(--accent-green)' : 'var(--neutral-gray400)',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
