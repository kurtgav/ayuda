import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getCustomerBookings } from '@/api/booking-service';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Booking } from '@/types';

interface MyJobsScreenProps {
  navigation?: any;
}

/**
 * FR-006: Show customer's current and past bookings
 */
export const MyJobsScreen: React.FC<MyJobsScreenProps> = ({ navigation }) => {
  const { session } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    const loadBookings = async () => {
      setLoading(true);
      setError(null);
      const { data, error: loadError } = await getCustomerBookings(session.user.id);

      if (loadError) {
        setError(loadError);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    loadBookings();
  }, [session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
        <p className="text-slate-900 font-semibold">Sign in to view your bookings</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900">My Bookings</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-96">
          <p className="text-xl font-semibold text-slate-900">No bookings yet</p>
          <p className="text-slate-600 mt-2">
            Start by booking a service from the home screen
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookings.map((item: Booking) => (
            <Card key={item.id}>
              <div className="flex justify-between items-start mb-3">
                <p className="text-lg font-semibold text-slate-900">{item.service_type}</p>
                <span
                  className={`px-3 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-slate-700 font-medium mb-1">{item.location}</p>
              <p className="text-xs text-slate-600 mb-2">
                {new Date(item.start_time).toLocaleDateString()} •{' '}
                {new Date(item.start_time).toLocaleTimeString()}
              </p>
              {item.description && (
                <p className="text-sm text-slate-600 italic mt-2">{item.description}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
