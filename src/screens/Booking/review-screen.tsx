import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { submitReview } from '@/api/booking-service';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StarRating } from '@/components/StarRating';

interface ReviewScreenProps {
  navigation?: any;
  route?: any;
}

/**
 * FR-003: Rating & Review System
 * Post-job screen for customers to leave ratings and feedback
 */
export const ReviewScreen: React.FC<ReviewScreenProps> = ({ navigation, route }) => {
  const { session } = useAuth();
  const { bookingId, booking } = route?.params || {};
  
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!session || !booking) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
        <p className="text-slate-900 font-semibold">Invalid booking information</p>
      </div>
    );
  }

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setError('Please select a rating before submitting');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: submitError } = await submitReview(
      bookingId,
      session.user.id,
      booking.provider_id,
      rating,
      comment || undefined
    );

    if (submitError) {
      setError(submitError);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigation?.navigate?.('MyJobs');
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Leave a Review</h1>
        <p className="text-base text-slate-600 mt-2">
          Help us maintain quality service by sharing your experience
        </p>
      </div>

      {/* Success message */}
      {success && (
        <Card>
          <div className="text-center py-8 bg-green-50 border-l-4 border-green-600">
            <p className="text-lg font-semibold text-green-900">Thank you for your review!</p>
            <p className="text-sm text-green-700 mt-2">Redirecting to your bookings...</p>
          </div>
        </Card>
      )}

      {error && <ErrorMessage message={error} />}

      {/* Booking Summary */}
      <Card marginVertical={24}>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Service</p>
          <p className="text-lg font-semibold text-slate-900 capitalize">
            {booking.service_type}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase text-slate-600 mb-1">Location</p>
          <p className="text-base text-slate-900">{booking.location}</p>
        </div>
        {booking.price_paid && (
          <div className="mt-3 border-t border-slate-200 pt-3">
            <p className="text-sm text-slate-600">
              Amount paid:{' '}
              <span className="font-semibold text-slate-900">
                ₱{booking.price_paid.toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </Card>

      {/* Rating Selection */}
      <Card marginVertical={24}>
        <p className="text-base font-semibold text-slate-900 mb-4">How was your experience?</p>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl transition-transform transform hover:scale-110 ${
                star <= rating ? 'opacity-100' : 'opacity-30'
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-600 mt-4">
          {rating > 0 ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Tap to rate'}
        </p>
      </Card>

      {/* Comment Section */}
      <Card marginVertical={24}>
        <label className="block text-base font-semibold text-slate-900 mb-3">
          Tell us more (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience... What went well? Anything we could improve?"
          className="w-full border-2 border-slate-200 rounded-lg p-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-900 min-h-32 resize-none"
        />
        <p className="text-xs text-slate-600 mt-2">{comment.length}/500 characters</p>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          title={loading ? 'Submitting Review...' : 'Submit Review'}
          onPress={handleSubmitReview}
          disabled={loading}
        />
        <Button
          title="Skip Review"
          variant="secondary"
          onPress={() => navigation?.navigate?.('MyJobs')}
          disabled={loading}
        />
      </div>
    </div>
  );
};
