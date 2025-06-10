import React from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import Badge from './Badge'

interface PriceDisplayProps {
    price: number;
    compareAtPrice?: number;
    currency?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const PriceDisplay = ({
    price,
    compareAtPrice,
    currency = 'GBP',
    size = 'md',
    className
}: PriceDisplayProps) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <span className={cn(
                'font-bolda text-neutral-900',
                {
                    'text-sm': size === 'sm',
                    'text-lg': size === 'md',
                    'text-2xl': size === 'lg',
                }
            )}>
                {formatCurrency(price, currency)}
            </span>

            {compareAtPrice && compareAtPrice > price && (
                <>
                  <span className={cn(
                    'text-neutral-500 line-through',
                    {
                        'text-xs': size === 'sm',
                        'text-sm': size === 'md',
                        'text-lg': size === 'lg',
                    }
                  )}>
                    {formatCurrency(compareAtPrice, currency)}
                  </span>

                  <Badge variant='error' size='sm'>
                    {Math.round((1 - price / compareAtPrice) * 100)}%off
                  </Badge>
                </>
            )}
        </div>
    );
};

export default PriceDisplay;

