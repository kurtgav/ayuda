import React from 'react';

interface VettedBadgeProps {
  isVetted: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Trust-first component: Prominently displays Vetted status
 * Core to FR-001 and FR-005
 */
export const VettedBadge: React.FC<VettedBadgeProps> = ({
  isVetted,
  size = 'medium',
}) => {
  if (!isVetted) return null;

  const sizeClass = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base',
  }[size];

  return (
    <div
      className={`${sizeClass} bg-green-100 text-green-800 font-semibold rounded`}
    >
      ✓ VETTED
    </div>
  );
};
