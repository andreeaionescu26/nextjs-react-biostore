'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { PageRegistryEntry } from "@/types/navigation";

// TypeScript interfaces
interface PageComponentProps {
    page: PageRegistryEntry;
    params: {
        slug: string[];
    };
}

interface IntersectionObserverOptions {
    threshold?: number;
    rootMargin?: string;
}

interface AnimationComponentProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

// Custom hook for Intersection Observer with proper TypeScript
const useIntersectionObserver = (
    options: IntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options
            }
        );

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
            observer.disconnect();
        };
    }, [options]);

    return [ref, isIntersecting];
};

// Animation Components with TypeScript
const FadeInUp: React.FC<AnimationComponentProps> = ({ 
    children, 
    delay = 0, 
    className = '' 
}) => {
    const [ref, isVisible] = useIntersectionObserver();
    
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
            } ${className}`}
            style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

const FadeInLeft: React.FC<AnimationComponentProps> = ({ 
    children, 
    delay = 0, 
    className = '' 
}) => {
    const [ref, isVisible] = useIntersectionObserver();
    
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
            } ${className}`}
            style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

const FadeInRight: React.FC<AnimationComponentProps> = ({ 
    children, 
    delay = 0, 
    className = '' 
}) => {
    const [ref, isVisible] = useIntersectionObserver();
    
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
            } ${className}`}
            style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

const ScaleIn: React.FC<AnimationComponentProps> = ({ 
    children, 
    delay = 0, 
    className = '' 
}) => {
    const [ref, isVisible] = useIntersectionObserver();
    
    return (
        <div
            ref={ref}
            className={`transition-all duration-600 ease-out ${
                isVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95'
            } ${className}`}
            style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

// Subtle parallax effect hook with TypeScript
const useSubtleParallax = (): number => {
    const [offset, setOffset] = useState<number>(0);
    
    useEffect(() => {
        const handleScroll = (): void => {
            // Very subtle parallax - only move 20% of scroll speed
            setOffset(window.pageYOffset * 0.2);
        };

        // Throttle scroll events for performance
        let ticking = false;
        const throttledScroll = (): void => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledScroll);
    }, []);

    return offset;
};

// Main component following your existing pattern
export function LandingPage({ page, params }: PageComponentProps): React.ReactElement {
    const parallaxOffset = useSubtleParallax();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Subtle Parallax */}
            <section className="relative h-screen overflow-hidden">
                {/* Background with subtle parallax */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900"
                    style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                    {/* Video Background - Your existing video code can go here */}
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/videos/hero-poster.jpg"
                    >
                        <source src="/videos/frontpage_hero_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
                    <div className="max-w-4xl">
                        <FadeInUp delay={200}>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                                Discover the world of <span className="text-orange-400">decorative luxury</span> fireplaces
                            </h1>
                        </FadeInUp>
                        
                        <FadeInUp delay={400}>
                            <p className="text-xl md:text-2xl mb-8 drop-shadow-md opacity-90">
                                Expert guidance, bespoke solutions, and smokeless fireplaces
                            </p>
                        </FadeInUp>
                        
                        <FadeInUp delay={600}>
                            <button className="bg-transparent text-white border-2 border-[#f58232] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gradient-to-r hover:from-[#f58232] hover:to-[#ff9500] hover:border-[#f58232] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Read more
                            </button>
                        </FadeInUp>
                    </div>
                </div>

                {/* Scroll indicator */}
                <FadeInUp delay={1000} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </FadeInUp>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeInUp>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Why Choose Our Fireplaces?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Combining traditional craftsmanship with modern innovation
                            </p>
                        </div>
                    </FadeInUp>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ScaleIn delay={200}>
                            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Smokeless Technology</h3>
                                <p className="text-gray-600">
                                    Advanced combustion systems ensure clean burning with minimal emissions
                                </p>
                            </div>
                        </ScaleIn>

                        <ScaleIn delay={400}>
                            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5l-1-1z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Custom Design</h3>
                                <p className="text-gray-600">
                                    Bespoke solutions tailored to your space and aesthetic preferences
                                </p>
                            </div>
                        </ScaleIn>

                        <ScaleIn delay={600}>
                            <div className="text-center p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                                <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4">Expert Installation</h3>
                                <p className="text-gray-600">
                                    Professional installation and ongoing support from certified technicians
                                </p>
                            </div>
                        </ScaleIn>
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <FadeInLeft>
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Featured Collection
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Our premium wall-mounted fireplaces combine elegant design with 
                                    cutting-edge technology. Each piece is crafted to be both a 
                                    heating solution and a stunning focal point.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-[#f58232] rounded-full mr-3"></div>
                                        <span className="text-gray-700">Zero clearance installation</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-[#f58232] rounded-full mr-3"></div>
                                        <span className="text-gray-700">Remote control operation</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-[#f58232] rounded-full mr-3"></div>
                                        <span className="text-gray-700">Multiple finish options</span>
                                    </div>
                                </div>
                                <button className="bg-[#f58232] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e5742c] transition-colors duration-300 shadow-lg hover:shadow-xl">
                                    View Collection
                                </button>
                            </div>
                        </FadeInLeft>

                        <FadeInRight>
                            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-lg">Product Showcase Image</p>
                                </div>
                            </div>
                        </FadeInRight>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#f58232] to-[#ff9500]">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <FadeInUp>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Transform Your Space?
                        </h2>
                    </FadeInUp>
                    
                    <FadeInUp delay={200}>
                        <p className="text-xl text-orange-100 mb-8">
                            Get a free consultation and personalized fireplace recommendation
                        </p>
                    </FadeInUp>
                    
                    <FadeInUp delay={400}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-[#f58232] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                                Schedule Consultation
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#f58232] transition-colors duration-300">
                                Download Catalog
                            </button>
                        </div>
                    </FadeInUp>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;