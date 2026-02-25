'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-(--accent-orange) text-center mb-2">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-center text-gray-600">
              {isLoginMode
                ? 'Sign in to your account'
                : 'Join us and start shopping'}
            </p>
          </div>

          {/* Form Container with Transition */}
          <div className="relative">
            {/* Login Form */}
            <div
              className={`transition-all duration-300 ${
                isLoginMode
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible absolute inset-0'
              }`}
            >
              {isLoginMode && <LoginForm />}
            </div>

            {/* Registration Form */}
            <div
              className={`transition-all duration-300 ${
                !isLoginMode
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible absolute inset-0'
              }`}
            >
              {!isLoginMode && <RegisterForm />}
            </div>
          </div>

          {/* Toggle Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors underline"
              >
                {isLoginMode ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
