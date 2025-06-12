'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MainContentWrapperProps {
    children: ReactNode;
}

export default function MainContentWrapper({ children }: MainContentWrapperProps) {
    const pathname = usePathname();

    // define pages whre navbar should overlay (no tap padding)
    const overlayPages = ['/', '/landing'];
    const shouldOverlay = overlayPages.includes(pathname);

    return (
        <main className={shouldOverlay ? '' : 'pt-24 lg:pt-28'}>
            {children}
        </main>
    );
}