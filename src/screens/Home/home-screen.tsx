import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getProviders } from '@/api/booking-service';
import { ProviderCard } from '@/components/ProviderCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { SERVICE_CATEGORIES } from '@/constants';
import { Provider } from '@/types';

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { session, profile } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load providers when service is selected
  useEffect(() => {
    if (!selectedService) return;

    const loadProviders = async () => {
      setLoading(true);
      setError(null);
      const { data, error: loadError } = await getProviders(selectedService);

      if (loadError) {
        setError(loadError);
      } else {
        setProviders(data || []);
      }
      setLoading(false);
    };

    loadProviders();
  }, [selectedService]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome to Ayuda</h1>
          <p className="text-base text-slate-600 mb-8">
            The calm in the chaos of home maintenance.
          </p>
          <button
            onClick={() => navigation?.navigate?.('Login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">What do you need?</h1>
        <p className="text-base text-slate-600">Select a service to get started</p>
      </div>

      {/* Service Categories */}
      <div className="px-6 flex flex-wrap gap-3 mb-6">
        {SERVICE_CATEGORIES.map((service: any) => (
          <button
            key={service.id}
            onClick={() =>
              setSelectedService(
                selectedService === service.id ? null : service.id
              )
            }
            className={`flex-1 min-w-40 py-3 px-3 rounded-lg border-2 text-center transition ${
              selectedService === service.id
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="text-2xl mb-2">{service.icon}</div>
            <div className="text-sm font-semibold">{service.name}</div>
          </button>
        ))}
      </div>

      {/* Providers List */}
      {selectedService && (
        <div className="px-6 pb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Professionals</h2>

          {error && <ErrorMessage message={error} />}

          {loading ? (
            <LoadingSpinner />
          ) : providers.length > 0 ? (
            <div className="space-y-4">
              {providers.map((item: Provider) => (
                <button
                  key={item.id}
                  onClick={() =>
                    navigation?.navigate?.('BookingFlow', { provider: item })
                  }
                  className="w-full text-left"
                >
                  <ProviderCard provider={item} />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600 my-6">
              No professionals available for this service yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
