import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-surface 
        border border-border 
        rounded-lg 
        p-5 
        shadow-sm 
        hover:border-zinc-600 
        hover:shadow-md 
        transition-all 
        duration-200 
        ease-in-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};