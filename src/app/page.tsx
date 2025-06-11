// src/app/page.tsx
import React from 'react';
import LandingPage from '@/components/pages/LandingPage';

export default async function Home() {
  
  return (
    
    <main className="flex min-h-screen flex-col">
      <LandingPage
        page={{
          id: "home_main",
          title: "Home",
          slug: "",
          pageType: "static",
          status: "active",
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
          template: "home"
        }}
        params={{ slug: [] }}
      />

    </main>
  );
}