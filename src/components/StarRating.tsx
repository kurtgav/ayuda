import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  count?: number; // Number of reviews
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'medium',
  showText = true,
  count,
}) => {
  const sizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  }[size];

  const stars = Array(5)
    .fill(0)
    .map((_, i) => (i < Math.floor(rating) ? '★' : '☆'));

  return (
    <div className="flex items-center gap-2">
      <p className={`${sizeClass} text-yellow-500`}>
        {stars.join('')}
      </p>
      {showText && (
        <p className="text-xs text-slate-600">
          {rating.toFixed(1)} {count && `(${count} reviews)`}
        </p>
      )}
    </div>
  );
};
