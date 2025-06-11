'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();

    // Footer navigation links organised by sections
    const footerSections = {
        products: {
            title: "Products",
            links: [
                { label: "Wall-Mounted Fireplaces", href: "/fireplaces/wall-mounted " },
                { label: "Freestanding Fireplaces", href: "/fireplaces/freestanding" },
                { label: "Tabletop fireplaces", href: "/fireplaces/tabletop" },
                { label:  "Bioethanol Fuel", href: "/accessories/fuel" },
                { label: "All products", href:"/products"}
            ]
        },
        support: {
            title: "Support",
            links: [
                { label: "Installation Guide", href: "/guides/installation" },
                { label: "Safety Tips", href: "/guides/safety" },
                { label: "Maintenance", href: "/guides/maintenance" },
                { label: "FAQ", href: "/support/faq" },
                { label: "Conatct Us", href: "/contact" }
            ]
        },
        company: {
            title: "Company",
            links: [
                { label: "Abouts Us", href: "/about-us" },
                { label: "Sustainabilty", href: "/sustainabilty" },
                { label: "Careers", href: "/careers" },
                { label: "Press", href: "/press" },
                { label: "Blog", href: "/blog" }
            ]
        },
        legal: {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href:"/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Cookie Policy ", href: "/cookie-policy" },
                { label: "Returns", href: "/returns" },
                { label: "Warranty", href: "/warranty" }
            ]
        }       
    };

    //social media links
    const socialLinks = [
        { name: "Facebook", href: "https://facebook.com/bioethanolfireplaces", icon: "📘" },
        { name: "Instagram", href: "https://instagram.com/bioethanolfireplaces", icon: "📸" },
        { name: "YouTube", href: "https://youtube.com/bioethanolfireplaces", icon: "📺" },
        { name: "Pinterest", href: "https://pinterest.com/bioethanolfireplaces", icon: "📌" }
    ];

    return (
      <footer className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {/* Logo */}
              <div className="w-10 h-10 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-[#f58232]"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div>
                <div className="text-xl font-light tracking-wide">Bioethanol</div>
                <div className="text-xs tracking-[0.2em] uppercase text-neutral-400">Eco Fireplaces</div>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Premium bioethanol fireplaces for modern homes. Clean-burning, eco-friendly, 
              and designed to create the perfect ambiance in any space.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-neutral-400">
              <div>📧 hello@bioethanolfireplaces.com</div>
              <div>📞 +44 20 1234 5678</div>
              <div>📍 London, United Kingdom</div>
            </div>
          </div>

          {/* Footer Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Get the latest news about new products and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#f58232] focus:border-transparent"
              />
              <button className="px-6 py-2 bg-[#f58232] hover:bg-[#e6742d] text-white rounded-r-lg transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Bioethanol Fireplace Shop. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-neutral-800 hover:bg-[#f58232] rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 text-neutral-500 text-xs">
              <span>We accept:</span>
              <div className="flex space-x-1">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">VISA</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">MC</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">AMEX</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;