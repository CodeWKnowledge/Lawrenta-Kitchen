import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted text-sm">
            © 2026 Lawrenta Kitchen. All rights reserved. Premium Dining Experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
