import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../common/Icon';

const Sidebar = () => {
  const links = [
    { to: '/admin', icon: 'DashboardCircleIcon', label: 'Overview', end: true },
    { to: '/admin/orders', icon: 'ShoppingBasket01Icon', label: 'Orders' },
    { to: '/admin/products', icon: 'PackageIcon', label: 'Products' },
    { to: '/admin/categories', icon: 'Tag01Icon', label: 'Categories' },
    { to: '/admin/customers', icon: 'UserGroupIcon', label: 'Customers' },
    { to: '/admin/analytics', icon: 'ChartPieIcon', label: 'Analytics' },
    { to: '/admin/settings', icon: 'Settings01Icon', label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 overflow-y-auto flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <Icon name="ChefHatIcon" size={16} />
        </div>
        <span className="text-base font-bold font-heading text-slate-900">Admin</span>
      </div>
      
      <nav className="flex-grow p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-medium text-sm font-medium transition-all
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
          className="flex items-center gap-3 px-4 py-3 rounded-medium text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
        >
          <Icon name="ArrowLeft01Icon" size={16} />
          Back to Site
        </NavLink>
      </div>
    </aside>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-grow p-4 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
export { Sidebar };
