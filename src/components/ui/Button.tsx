import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline'; 
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary'
}) => {
    const baseClasses = "px-4 py-2 rounded font-medium transition-colors";

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        outline: "border border-gray-300 hover:bg-gray-50"
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;
// This code defines a reusable Button component in React with TypeScript.