import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  marginVertical?: number;
  backgroundColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 16,
  marginVertical = 8,
  backgroundColor = '#FFFFFF',
}) => {
  const paddingClass = `p-${Math.round(padding / 4)}`;
  const marginClass = `my-${Math.round(marginVertical / 4)}`;

  return (
    <div
      className={`rounded-lg shadow-sm border border-slate-200 ${marginClass}`}
      style={{ padding: `${padding}px`, backgroundColor }}
    >
      {children}
    </div>
  );
};
