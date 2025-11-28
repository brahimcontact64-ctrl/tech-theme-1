import { ButtonHTMLAttributes } from 'react';

interface RGBButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function RGBButton({ variant = 'primary', children, className = '', ...props }: RGBButtonProps) {
  const baseClasses = 'px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 font-orbitron font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-auto max-w-full';

  const variantClasses = variant === 'primary'
    ? 'rgb-gradient-hover text-white neon-glow-blue hover:neon-glow-purple'
    : 'bg-transparent neon-border-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
