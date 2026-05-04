import React from 'react';
import Icon from '../../components/common/Icon';

const PlaceholderPage = ({ title, description, icon }) => (
  <div className="py-8">
    <header className="mb-12">
      <h1 className="text-sm mb-2">{title}</h1>
      <p className="text-muted text-sm">{description}</p>
    </header>
    
    <div className="bg-white rounded-lg border border-border border-dashed p-24 text-center">
      <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-md flex items-center justify-center mx-auto mb-6">
        <Icon name={icon} size={28} />
      </div>
      <h3 className="text-base font-bold text-slate-400 mb-2">{title} Module</h3>
      <p className="text-slate-400">This section is ready for data integration and extended functionality.</p>
    </div>
  </div>
);

export const Categories = () => (
  <PlaceholderPage 
    title="Categories" 
    description="Organize your menu items into logical groups."
    icon="Tag01Icon"
  />
);

export const Customers = () => (
  <PlaceholderPage 
    title="Customers" 
    description="View and manage your customer database and their history."
    icon="UserGroupIcon"
  />
);

export const Analytics = () => (
  <PlaceholderPage 
    title="Analytics" 
    description="Detailed insights into your restaurant's performance."
    icon="ChartPieIcon"
  />
);

export const Settings = () => (
  <PlaceholderPage 
    title="Settings" 
    description="Configure your restaurant's profile and preferences."
    icon="Settings01Icon"
  />
);
