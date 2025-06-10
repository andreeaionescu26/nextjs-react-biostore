import { type ClassValue, clsx } from 'clsx';

// utility function to merge class names
// combine clsx with tailwind css class merging

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// format currency for display 

export function formatCurrency(
    amount:number,
    currency: string = 'GBP',
    locale: string = 'en-UK'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}

// format date for display 

export function formatDate(
    date: string | Date,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
): string {
    return new Intl.DateTimeFormat('en-UK', options).format(new Date(date));
}

// debounce function for search inputs

export function debounce<T extends (...args: any[]) => any>(
    funct: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return(...args:Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => funct(...args), wait);
    };
}

// generate unique ID 

export function generateId(): string {
    return Math.random().toString(36).substr(2,9);
}
