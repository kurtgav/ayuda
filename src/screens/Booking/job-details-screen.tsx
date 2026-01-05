import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { updateBookingStatus, getProviderById } from '@/api/booking-service';
import { supabase } from '@/api/supabase-client';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { VettedBadge } from '@/components/VettedBadge';
import { StarRating } from '@/components/StarRating';
import { Booking, Provider } from '@/types';

interface JobDetailsScreenProps {
  navigation?: any;
  route?: any;
}

/**
 * Detailed view of a single booking with provider info and status updates
 */
export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = ({ navigation, route }) => {
  const { session } = useAuth();
  const { bookingId, booking: initialBooking } = route?.params || {};

  const [booking, setBooking] = useState<Booking | null>(initialBooking || null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(!initialBooking);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadBookingDetails = async () => {
    if (!bookingId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (fetchError) throw fetchError;

      setBooking(data);
      if (data.provider_id) {
        await loadProvider(data.provider_id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialBooking) {
      loadProvider(initialBooking.provider_id);
    } else if (bookingId) {
      loadBookingDetails();
    }
  }, [bookingId]);

  const loadProvider = async (providerId: string) => {
    try {
      const { data, error: providerError } = await getProviderById(providerId);
      if (!providerError && data) {
        setProvider(data);
      }
    } catch (err: any) {
      console.error('Failed to load provider:', err);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!booking) return;

    setUpdating(true);
    setError(null);

    const { data, error: updateError } = await updateBookingStatus(booking.id, newStatus as any);

    if (updateError) {
      setError(updateError);
    } else if (data) {
      setBooking(data);
    }
    setUpdating(false);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-900';
      case 'confirmed':
        return 'bg-blue-100 text-blue-900';
      case 'in_progress':
        return 'bg-purple-100 text-purple-900';
      case 'completed':
        return 'bg-green-100 text-green-900';
      case 'cancelled':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-slate-100 text-slate-900';
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
        <p className="text-slate-900 font-semibold">Sign in required</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!booking) {
    return (
      <div className="bg-slate-50 min-h-screen p-6">
        <ErrorMessage message={error || 'Booking not found'} />
      </div>
    );
  }

  const timelineSteps = [
    { status: 'pending', label: 'Pending' },
    { status: 'confirmed', label: 'Confirmed' },
    { status: 'in_progress', label: 'In Progress' },
    { status: 'completed', label: 'Completed' },
  ];

  const currentStepIndex = timelineSteps.findIndex((step) => step.status === booking.status);

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigation?.goBack?.()}
          className="text-blue-600 font-medium mb-4"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-slate-900 capitalize">{booking.service_type}</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Status Badge */}
      <Card marginVertical={24}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold text-slate-900">Status</p>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ')}
          </span>
        </div>

        {/* Timeline */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            {timelineSteps.map((step, index) => (
              <div key={step.status} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index <= currentStepIndex
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-xs text-slate-600 mt-2 text-center">{step.label}</p>
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-2 ${
                      index < currentStepIndex ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Service Details */}
      <Card marginVertical={24}>
        <p className="text-base font-semibold text-slate-900 mb-3">Service Details</p>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Location</p>
            <p className="text-base text-slate-900">{booking.location}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Scheduled Date & Time</p>
            <p className="text-base text-slate-900">
              {new Date(booking.start_time).toLocaleDateString()} at{' '}
              {new Date(booking.start_time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {booking.description && (
            <div>
              <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Description</p>
              <p className="text-base text-slate-900">{booking.description}</p>
            </div>
          )}

          {booking.price_paid && (
            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Amount</p>
              <p className="text-lg font-bold text-slate-900">₱{booking.price_paid.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Provider Information */}
      {provider && (
        <Card marginVertical={24}>
          <p className="text-base font-semibold text-slate-900 mb-4">Service Professional</p>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">{provider.full_name}</h3>
                {provider.is_vetted && <VettedBadge isVetted size="small" />}
              </div>
              <p className="text-sm text-slate-600">{provider.specialties.join(' • ')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-200">
            <div>
              <p className="text-xs text-slate-600 mb-1">Rating</p>
              <StarRating rating={provider.avg_rating} showText={true} />
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Jobs Completed</p>
              <p className="text-lg font-bold text-slate-900">{provider.job_count}</p>
            </div>
          </div>

          {provider.bio && (
            <p className="text-sm text-slate-600 italic mt-4 pt-4 border-t border-slate-200">
              "{provider.bio}"
            </p>
          )}
        </Card>
      )}

      {/* Action Buttons */}
      {booking.status === 'completed' && (
        <Card>
          <p className="text-base font-semibold text-slate-900 mb-4">Next Steps</p>
          <Button
            title="Leave a Review"
            onPress={() =>
              navigation?.navigate?.('Review', {
                bookingId: booking.id,
                booking,
              })
            }
          />
        </Card>
      )}
    </div>
  );
};
