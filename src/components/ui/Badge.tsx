import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Badge = ({
    children,
    variant='primary',
    size = 'md',
    className
}: BadgeProps) => {
    return (
       <span className={cn(
        'badge',
        {
            'badge-primary': variant === 'primary',
            'badge-success': variant === 'success',
            'badge-warning': variant === 'warning',
            'badge-error': variant === 'error',
            'bg-neutral-100 text-neutral-800': variant === 'neutral',
        },
        {
            'text-xs py-0.5': size === 'sm',
            'text-sm px-2.5 py-0.5': size === 'md',
            'text-base px-3 py-1': size === 'lg',
        },
        className
       )}>
        {children}
       </span>
    );
};

export default Badge;