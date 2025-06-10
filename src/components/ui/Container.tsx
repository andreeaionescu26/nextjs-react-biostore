import React, { Children } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

const Container = ({
    children,
    size = 'lg',
    className
}: ContainerProps) => {
    return (
        <div className={cn(
            'mx-auto px-4 sm:px-6 lg:px-8',
            {
                'max-w-3xl': size === 'sm',
                'max-w-5xl': size === 'md',
                'max-w-7xl': size === 'lg',
                'max-w-9xl': size === 'xl',
                ',ax-w-none': size === 'full',
            },
            className
        )}>
            {children}
        </div>
    );
};

export default Container;