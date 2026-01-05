import React from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <div className="bg-red-100 text-red-800 p-3 rounded-lg my-2">
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
