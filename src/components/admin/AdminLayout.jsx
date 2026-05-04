import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../common/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const links = [
    { to: '/admin', icon: 'DashboardCircleIcon', label: 'Overview', end: true },
    { to: '/admin/orders', icon: 'ShoppingBasket01Icon', label: 'Orders' },
    { to: '/admin/products', icon: 'PackageIcon', label: 'Products' },
    { to: '/admin/categories', icon: 'Tag01Icon', label: 'Categories' },
    { to: '/admin/customers', icon: 'UserGroupIcon', label: 'Customers' },
    { to: '/admin/analytics', icon: 'ChartPieIcon', label: 'Analytics' },
    { to: '/admin/settings', icon: 'Settings01Icon', label: 'Settings' },
  ];

  const sidebarClasses = "w-64 bg-white border-r border-border h-screen flex flex-col";

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center justify-between gap-2 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
            <Icon name="ChefHatIcon" size={16} />
          </div>
          <span className="text-base font-bold font-heading text-slate-900">Admin</span>
        </div>
        <button onClick={() => setIsMobileOpen(false)} className="md:hidden p-2 text-slate-500 hover:text-primary">
          <Icon name="Cancel01Icon" size={20} />
        </button>
      </div>
      
      <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all
              ${isActive 
                ? 'bg-primary-light text-primary' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <Icon name={link.icon} size={16} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
        >
          <Icon name="ArrowLeft01Icon" size={16} />
          Back to Site
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${sidebarClasses} sticky top-0`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 left-0 z-50 ${sidebarClasses} md:hidden`}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <main className="flex-grow flex flex-col w-full md:w-auto overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">
              <Icon name="ChefHatIcon" size={16} />
            </div>
            <span className="text-base font-bold font-heading text-slate-900">Admin</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-slate-600 hover:text-primary transition-colors"
          >
            <Icon name="Menu01Icon" size={24} />
          </button>
        </div>

        <div className="p-4 md:p-8 overflow-x-hidden w-full">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
