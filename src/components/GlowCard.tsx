import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple';
  hover?: boolean;
}

export function GlowCard({ children, className = '', glowColor = 'blue', hover = true }: GlowCardProps) {
  const borderClass = glowColor === 'blue' ? 'neon-border-blue' : 'neon-border-purple';
  const hoverClass = hover ? (glowColor === 'blue' ? 'hover:neon-glow-blue' : 'hover:neon-glow-purple') : '';

  return (
    <div
      className={`bg-dark-bg ${borderClass} ${hoverClass} transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
