import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useBookingStore } from '@/hooks/use-booking-store';
import { createBooking } from '@/api/booking-service';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ProviderCard } from '@/components/ProviderCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { TIME_SLOTS } from '@/constants';

interface BookingFlowProps {
  navigation?: any;
  route?: any;
}

/**
 * FR-002: Instant Booking Flow
 * Guide user through: Service -> Provider -> Time -> Location -> Confirm
 */
export const BookingFlowScreen: React.FC<BookingFlowProps> = ({
  navigation,
  route,
}) => {
  const { session } = useAuth();
  const {
    selectedService,
    selectedProvider,
    preferredTime,
    description,
    location,
    setSelectedService,
    setSelectedProvider,
    setPreferredTime,
    setLocation,
    setDescription,
    resetBooking,
  } = useBookingStore();

  const [step, setStep] = useState<'service' | 'provider' | 'details' | 'confirm'>(
    'service'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const provider = route?.params?.provider || selectedProvider;

  const handleBooking = async () => {
    if (!session || !provider || !selectedService || !preferredTime || !location) {
      alert('Missing Information: Please complete all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: bookingError } = await createBooking(
      session.user.id,
      selectedService,
      preferredTime,
      location,
      description
    );

    if (bookingError) {
      setError(bookingError);
      setLoading(false);
      return;
    }

    // Success
    resetBooking();
    alert('Booking Confirmed!\nYour booking has been created successfully.');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const steps: Array<'service' | 'provider' | 'details' | 'confirm'> = [
    'service',
    'provider',
    'details',
    'confirm',
  ];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {error && <ErrorMessage message={error} />}

      {/* Step Indicator */}
      <div className="flex justify-between mb-8">
        {['Service', 'Provider', 'Details', 'Confirm'].map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold mb-2 ${
                step === steps[index]
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {index + 1}
            </div>
            <p className="text-xs text-slate-600">{label}</p>
          </div>
        ))}
      </div>

      {/* Provider Card (if selected) */}
      {provider && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Selected Professional</h3>
          <ProviderCard provider={provider} />
        </div>
      )}

      {/* Details Section */}
      {step === 'details' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Details</h3>

          {/* Time Slot Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Preferred Time
            </label>
            <div className="space-y-2">
              {TIME_SLOTS.map((slot: string) => (
                <button
                  key={slot}
                  onClick={() => setPreferredTime(slot)}
                  className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition ${
                    preferredTime === slot
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Service Location
            </label>
            <input
              type="text"
              placeholder="e.g., 123 Main St, Apartment 4B"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900"
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-900 mb-2">
              What needs to be done?
            </label>
            <textarea
              placeholder="Describe the issue or service needed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900 h-24 resize-none"
            />
          </div>
        </div>
      )}

      {/* Confirm Section */}
      {step === 'confirm' && (
        <div className="mb-6">
          <Card>
            <div className="flex justify-between py-3 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-600">Service</p>
              <p className="text-sm font-semibold text-slate-900">{selectedService}</p>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-600">Professional</p>
              <p className="text-sm font-semibold text-slate-900">
                {provider?.full_name || 'Unknown'}
              </p>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-600">Time</p>
              <p className="text-sm font-semibold text-slate-900">{preferredTime}</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-sm font-medium text-slate-600">Location</p>
              <p className="text-sm font-semibold text-slate-900">{location}</p>
            </div>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        {step !== 'service' && (
          <button
            onClick={() => setStep(steps[currentStepIndex - 1])}
            className="flex-1 py-3 px-4 bg-white border-2 border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Back
          </button>
        )}

        <button
          onClick={() => {
            if (step === 'confirm') {
              handleBooking();
            } else {
              setStep(steps[currentStepIndex + 1]);
            }
          }}
          className="flex-1 py-3 px-4 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700"
        >
          {step === 'confirm' ? 'Confirm Booking' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
