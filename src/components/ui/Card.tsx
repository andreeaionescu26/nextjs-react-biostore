import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'hover' | 'interactive';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
}

const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    className
}: CardProps) => {
    return (
        <div className={cn(
            'card',
            variant === 'hover' && 'card-hover',
            variant === 'interactive' && 'card-interactive',
            {
                'p-0': padding === 'none',
                'p-4' : padding === 'sm',
                'p-6' : padding === 'md',
                'p-8' : padding === 'lg',
            },
            className
        )}>
            {children}
        </div>
    );
};

export default Card;