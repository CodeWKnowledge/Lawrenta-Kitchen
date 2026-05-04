import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: IconComponent, 
  iconPosition = 'left',
  loading = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'border-2 border-primary text-primary hover:bg-primary-light',
    ghost: 'text-primary hover:bg-primary-light',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-border text-slate-600 hover:bg-slate-50'
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-medium font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-md animate-spin" />
      ) : (
        <>
          {IconComponent && iconPosition === 'left' && <IconComponent size={16} />}
          {children}
          {IconComponent && iconPosition === 'right' && <IconComponent size={16} />}
        </>
      )}
    </button>
  );
};

export default Button;
