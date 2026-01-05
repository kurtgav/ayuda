import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { processPayment } from '@/api/payment-service';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Booking } from '@/types';

interface PaymentScreenProps {
  navigation?: any;
  route?: any;
}

/**
 * FR-004: Payment Processing
 * Secure checkout screen for GCash/Maya payments
 */
export const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation, route }) => {
  const { session } = useAuth();
  const { bookingId, booking, amount } = route?.params || {};

  const [selectedMethod, setSelectedMethod] = useState<'gcash' | 'maya' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!session || !booking || !bookingId) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
        <ErrorMessage message="Invalid booking information" />
      </div>
    );
  }

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: paymentError } = await processPayment(
      bookingId,
      amount || booking.price_paid || 0,
      selectedMethod
    );

    if (paymentError) {
      setError(paymentError);
      setLoading(false);
      return;
    }

    setSuccess(true);
    // Redirect to success screen after 2 seconds
    setTimeout(() => {
      navigation?.navigate?.('MyJobs');
    }, 2000);
  };

  const paymentAmount = amount || booking.price_paid || 0;

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <button
        onClick={() => navigation?.goBack?.()}
        className="text-blue-600 font-medium mb-6"
      >
        ← Back to Booking
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Secure Payment</h1>
        <p className="text-base text-slate-600 mt-2">Complete your booking by paying now</p>
      </div>

      {success && (
        <Card marginVertical={24}>
          <div className="text-center py-8 bg-green-50 border-l-4 border-green-600">
            <p className="text-2xl font-bold text-green-600">✓</p>
            <p className="text-lg font-semibold text-green-900 mt-2">Payment Successful!</p>
            <p className="text-sm text-green-700 mt-2">
              Your booking has been confirmed. Redirecting to your bookings...
            </p>
          </div>
        </Card>
      )}

      {error && <ErrorMessage message={error} />}

      {/* Booking Summary */}
      <Card marginVertical={24}>
        <p className="text-base font-semibold text-slate-900 mb-4">Booking Summary</p>

        <div className="space-y-3 border-b border-slate-200 pb-4 mb-4">
          <div className="flex justify-between">
            <p className="text-sm text-slate-600">Service</p>
            <p className="text-sm font-semibold text-slate-900 capitalize">
              {booking.service_type}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-slate-600">Location</p>
            <p className="text-sm font-semibold text-slate-900">{booking.location}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-slate-600">Date & Time</p>
            <p className="text-sm font-semibold text-slate-900">
              {new Date(booking.start_time).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-slate-900">Total Amount</p>
          <p className="text-2xl font-bold text-slate-900">₱{paymentAmount.toFixed(2)}</p>
        </div>
      </Card>

      {/* Payment Method Selection */}
      <Card marginVertical={24}>
        <p className="text-base font-semibold text-slate-900 mb-4">Select Payment Method</p>

        <div className="space-y-3">
          {/* GCash Option */}
          <button
            onClick={() => setSelectedMethod('gcash')}
            disabled={loading}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedMethod === 'gcash'
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📱</div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">GCash</p>
                  <p className="text-xs text-slate-600">Fast and secure</p>
                </div>
              </div>
              {selectedMethod === 'gcash' && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </button>

          {/* Maya Option */}
          <button
            onClick={() => setSelectedMethod('maya')}
            disabled={loading}
            className={`w-full p-4 border-2 rounded-lg transition-all ${
              selectedMethod === 'maya'
                ? 'border-blue-600 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">💳</div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">Maya</p>
                  <p className="text-xs text-slate-600">Credit/Debit card</p>
                </div>
              </div>
              {selectedMethod === 'maya' && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </Card>

      {/* Security Notice */}
      <Card marginVertical={24}>
        <div className="flex gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Secure Payment</p>
            <p className="text-xs text-slate-600 mt-1">
              Your payment information is encrypted and processed securely. We never store your payment details.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {!success && (
        <div className="space-y-3">
          <Button
            title={loading ? 'Processing Payment...' : `Pay ₱${paymentAmount.toFixed(2)}`}
            onPress={handlePayment}
            disabled={loading || !selectedMethod}
          />
          <Button
            title="Cancel"
            variant="secondary"
            onPress={() => navigation?.goBack?.()}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};
