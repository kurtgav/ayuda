import React from 'react';
import { Provider } from '@/types';
import { Card } from './Card';
import { VettedBadge } from './VettedBadge';
import { StarRating } from './StarRating';

interface ProviderCardProps {
  provider: Provider;
  onPress?: () => void;
}

/**
 * Core component for FR-001 and FR-005
 * Displays provider profile with trust signals:
 * - Vetted badge (prominent)
 * - Name and specialties
 * - Rating and job count
 * - Elegant, minimal design
 */
export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onPress,
}) => {
  return (
    <Card marginVertical={12}>
      <div className="space-y-3">
        {/* Trust signals at top */}
        <div className="flex items-center justify-between">
          <VettedBadge isVetted={provider.is_vetted} size="medium" />
          <p className="text-sm text-slate-600 font-medium">{provider.job_count} jobs</p>
        </div>

        {/* Provider name and specialties */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{provider.full_name}</h3>
          <p className="text-sm text-slate-600">
            {provider.specialties.join(' • ')}
          </p>
        </div>

        {/* Rating */}
        <div className="mt-1">
          <StarRating rating={provider.avg_rating} showText={true} />
        </div>

        {/* Bio if available */}
        {provider.bio && (
          <p className="text-sm text-slate-600 italic mt-2 line-clamp-2">
            {provider.bio}
          </p>
        )}
      </div>
    </Card>
  );
};
