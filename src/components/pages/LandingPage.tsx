'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { PageRegistryEntry } from "@/types/navigation";
import { useCart } from '@/hooks/useCart'; // Import our cart hook

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

// Simple scroll tracking hook
const useScrollY = () => {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Throttle scroll events for performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', throttledScroll);
    }, []);

    return scrollY;
};

// Main component with clean Longines-style parallax
export function LandingPage({ page, params }: PageComponentProps): React.ReactElement {
    const scrollY = useScrollY();

    return (
        <div className="min-h-screen">
            {/* Hero Video Section - Normal document flow */}
            <section className="relative h-screen overflow-hidden">
                {/* Video background with parallax effect */}
                <div 
                    className="absolute inset-0"
                    style={{ 
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                >
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
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>

                {/* Hero Content - fades out as you scroll */}
                <div 
                    className="relative z-10 h-full flex items-end text-white px-8 pb-16 md:px-20 md:pb-20"
                    style={{
                        // Simple fade out based on scroll progress
                        opacity: Math.max(0, 1 - (scrollY / (window.innerHeight * 0.8)))
                    }}
                >
                    <div className="max-w-2xl">
                        <FadeInUp delay={200}>
                            <h1 className="text-3xl md:text-6xl font-light mb-4 leading-tight">
                                DISCOVER THE WORLD OF <br />
                                <span className="text-3xl md:text-6xl font-light text-orange-400">LUXURY FIREPLACES</span>
                            </h1>
                        </FadeInUp>
                        
                        <FadeInUp delay={400}>
                            <p className="text-base md:text-lg mb-8 font-light opacity-90 leading-relaxed">
                                Expert guidance, bespoke solutions, and smokeless fireplaces.
                            </p>
                        </FadeInUp>
                        
                        <FadeInUp delay={600}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-white text-gray-900 px-6 py-2.5 text-sm font-medium hover:bg-gray-100 transition-all duration-300">
                                    Discover more
                                </button>
                                <button className="border border-white text-white px-6 py-2.5 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all duration-300">
                                    Shop the collection
                                </button>
                            </div>
                        </FadeInUp>
                    </div>
                </div>

                {/* Scroll indicator - fades out early */}
                <FadeInUp delay={1000} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div 
                        className="animate-bounce"
                        style={{
                            // Fade out earlier in the scroll
                            opacity: Math.max(0, 1 - (scrollY / (window.innerHeight * 0.6)))
                        }}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </FadeInUp>
            </section>

            {/* Second Hero Image Section - Normal document flow */}
            <section className="relative h-screen overflow-hidden">
                {/* Image background with parallax effect */}
                <div 
                    className="absolute inset-0"
                    style={{ 
                        transform: `translateY(${(scrollY - window.innerHeight) * 0.3}px)`,
                    }}
                >
                    <img
                        src="/images/Planika_hero.webp"
                        alt="Luxury Fireplace Collection"
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                </div>

                {/* Content - fades out as you scroll past this section */}
                <div 
                    className="relative z-10 h-full flex items-center text-white px-8 md:px-20"
                    style={{
                        // Fade out as you scroll past the image section
                        opacity: scrollY < window.innerHeight ? 0 : 
                                Math.max(0, 1 - ((scrollY - window.innerHeight) / (window.innerHeight * 0.8)))
                    }}
                >
                    <div className="max-w-2xl">
                        <FadeInUp delay={200}>
                            <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
                                CRAFTSMANSHIP<br />
                                <span className="text-orange-400">MEETS INNOVATION</span>
                            </h2>
                        </FadeInUp>
                        
                        <FadeInUp delay={400}>
                            <p className="text-lg md:text-xl mb-8 font-light opacity-90 leading-relaxed">
                                Every fireplace is meticulously designed and engineered to deliver 
                                exceptional performance while creating an unforgettable ambiance.
                            </p>
                        </FadeInUp>
                        
                        <FadeInUp delay={600}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-orange-500 text-white px-8 py-3 text-sm font-medium hover:bg-orange-600 transition-all duration-300">
                                    Explore Innovation
                                </button>
                                <button className="border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all duration-300">
                                    View Craftsmanship
                                </button>
                            </div>
                        </FadeInUp>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/20 rounded-full hidden lg:block"></div>
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border border-orange-400/30 rounded-full hidden lg:block"></div>
            </section>

            {/* Longines-Inspired Navigation Indicator */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
                <div className="space-y-6">
                    {/* Section 1 - Hero Video */}
                    <div className="group cursor-pointer relative">
                        <div 
                            className={`
                                w-3 h-3 rounded-full transition-all duration-500 ease-out
                                ${scrollY < window.innerHeight * 0.5
                                    ? 'bg-white shadow-lg scale-125' 
                                    : 'bg-white/40 hover:bg-white/70 hover:scale-110'
                                }
                            `}
                        ></div>
                        {/* Progress line */}
                        <div className="absolute left-1/2 top-3 w-px h-6 bg-white/20 transform -translate-x-1/2"></div>
                        {/* Tooltip */}
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
                            <div className="font-medium">01</div>
                            <div className="text-xs opacity-80">Luxury Collection</div>
                            {/* Arrow */}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                        </div>
                    </div>

                    {/* Section 2 - Innovation */}
                    <div className="group cursor-pointer relative">
                        <div 
                            className={`
                                w-3 h-3 rounded-full transition-all duration-500 ease-out
                                ${scrollY >= window.innerHeight * 0.5 && scrollY < window.innerHeight * 1.5
                                    ? 'bg-orange-400 shadow-lg shadow-orange-400/30 scale-125' 
                                    : 'bg-white/40 hover:bg-orange-400/70 hover:scale-110'
                                }
                            `}
                        ></div>
                        {/* Progress line */}
                        <div className="absolute left-1/2 top-3 w-px h-6 bg-white/20 transform -translate-x-1/2"></div>
                        {/* Tooltip */}
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
                            <div className="font-medium">02</div>
                            <div className="text-xs opacity-80">Innovation & Craft</div>
                            {/* Arrow */}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                        </div>
                    </div>

                    {/* Section 3 - Features */}
                    <div className="group cursor-pointer relative">
                        <div 
                            className={`
                                w-3 h-3 rounded-full transition-all duration-500 ease-out
                                ${scrollY >= window.innerHeight * 1.5
                                    ? 'bg-white shadow-lg scale-125' 
                                    : 'bg-white/40 hover:bg-white/70 hover:scale-110'
                                }
                            `}
                        ></div>
                        {/* Tooltip */}
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1.5 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap backdrop-blur-sm">
                            <div className="font-medium">03</div>
                            <div className="text-xs opacity-80">Features & Benefits</div>
                            {/* Arrow */}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Scroll progress indicator */}
                <div className="absolute -left-8 top-0 bottom-0 w-px bg-white/20">
                    <div 
                        className="w-full bg-gradient-to-b from-white to-orange-400 transition-all duration-300 ease-out"
                        style={{ 
                            height: `${Math.min(100, (scrollY / (window.innerHeight * 2)) * 100)}%`,
                            opacity: 0.6
                        }}
                    ></div>
                </div>
            </div>

            {/* Features Section - Normal document flow */}
            <section className="py-20 bg-white relative z-30">
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