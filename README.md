# E- commerce Platform Modernisation 

## Overview

This project transitions our e-commerce platform from a monolithic PHP application to a headless architecture. The exisiting PHP backend remains as a CMS and API provider, while a new Next.js frontend delivers a modern user experience. 

## Tech Stack 

### Frontend (New)

- Next.js, React, Typescript
- Tailwind CSS
- API client for backend communication

### Backend (Existing)

- PHP Backend(unchanged)
- Existing database
- RESTful API endpoints

## Getting Started

### 1.Install dependencies
npm install

### 2.Set up environment
cp .env.example .env.local
! Edit .env.local with your API endpoints

### 3.Start development server
npm run dev

## API Integration

The frontend communicates with the PHP backend through a service layer:
typescript// Example of a service that fetches products
export const getProducts = async (params) => {
  const response = await fetch(`${API_URL}/products?${new URLSearchParams(params)}`);
  return response.json();
};

## Key Features

- Headless architecture: Separation of concerns between frontend and backend
- Modern UI: Built with React components and Tailwind CSS
- Improved performance: Leverages Next.js for SSR and static generation
- Seamless integration: Connects to existing PHP API endpoints
- Responsive design: Mobile-first approach for all device sizes

## Migration Approach

- Develop core frontend functionality
- Test against existing API endpoints
- Deploy to staging for validation
- Gradually shift traffic from old to new frontend

## Deployment

Deploy to Vercel/Netlify for optimal Next.js performance, or export as static files for traditional hosting.