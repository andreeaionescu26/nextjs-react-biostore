import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helpText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        error,
        helpText,
        leftIcon,
        rightIcon,
        fullWidth = false,
        className,
        ...props
    }, ref) => {
        return (
            <div className={cn('space-y-1', fullWidth && 'w-full')}>
                {/* Label */}
                {label && (
                    <label
                        htmlFor={props.id}
                        className='block text-sm font-medium text-neutral-700'
                    >
                        {label}
                    </label>
                )}

                {/* Input Container */}
                <div className='relative'>
                    {/* Left Icon */}
                    {leftIcon && (
                        <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400'>
                            {leftIcon}
                        </div>
                    )}

                    {/* Input */}
                    <input
                        ref={ref}
                        className={cn(
                            'input',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            error && 'input-error',
                            className
                        )}
                        {...props}
                    />

                    {/* Right Icon */}
                    {rightIcon && (
                       <div className='absoluite right-3 top-1/2 transform -translate-y-1/2 text-neutral-400'>
                          {rightIcon}
                       </div>
                    )}
                </div>

                {/* Help text / Error */}
                {(helpText || error ) && (
                    <p className={cn(
                        'text-xs',
                        error ? 'text-error-600' : 'text-neutral-500'
                    )}>
                       {error || helpText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;