import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'avatar' | 'rectangular';
    width?: string;
    height?: string;
}

const Skeleton = ({
    className,
    variant='rectangular',
    width,
    height
}: SkeletonProps) => {
    return(
        <div
          className={cn(
            'skeleton',
            {
                'skeleton-text': variant === 'text',
                'skeleton-avatar': variant === 'avatar',
                'h-4': variant === 'text',
                'w-10 h-10 rounded-full': variant === 'avatar',
            }, 
            className
          )}
          style={{
            width: width || (variant === 'avatar' ? '2.5rem' : undefined),
            height: height || (variant === 'avatar' ? '2.5rem' : undefined)
          }}
        />
    );
};

export default Skeleton;