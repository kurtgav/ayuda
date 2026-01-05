import React from 'react';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const handleClick = onClick || onPress || (() => {});

  const baseClasses = 'rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-blue-600 hover:bg-slate-200',
    ghost: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50',
  };

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-5 py-3 text-base',
    large: 'px-6 py-4 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} w-full`;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {title}
    </button>
  );
};
