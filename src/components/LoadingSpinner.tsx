import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#3B82F6',
}) => {
  const sizeClass = size === 'large' ? 'w-8 h-8' : 'w-5 h-5';
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`${sizeClass} border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin`} />
    </div>
  );
};
