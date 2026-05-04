import React from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-4 rounded-lg border border-border shadow-sm hover:shadow-sm transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-md ${color}`}>
        <Icon name={icon} size={14} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-md ${trend >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h4 className="text-muted text-sm font-medium mb-1">{title}</h4>
    <p className="text-base font-black font-heading text-slate-900">{value}</p>
  </div>
);

const Dashboard = () => {
  const { orders, products } = useApp();
  
  const todayOrders = orders.filter(o => {
    const today = new Date().toISOString().split('T')[0];
    return o.createdAt.startsWith(today);
  });

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-sm mb-2">Dashboard Overview</h1>
        <p className="text-muted text-sm">Welcome back! Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₦${revenue.toLocaleString()}`} 
          icon="Money01Icon" 
          trend={12} 
          color="bg-primary-light text-primary"
        />
        <StatCard 
          title="Total Orders" 
          value={orders.length} 
          icon="ShoppingBasket01Icon" 
          trend={8} 
          color="bg-blue-50 text-blue-500"
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders.length} 
          icon="Clock01Icon" 
          trend={-5} 
          color="bg-orange-50 text-orange-500"
        />
        <StatCard 
          title="Active Products" 
          value={products.length} 
          icon="PackageIcon" 
          trend={0} 
          color="bg-purple-50 text-purple-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="text-base font-bold">Recent Orders</h3>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{order.customer.name}</div>
                      <div className="text-xs text-muted">{order.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                        ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                          'bg-blue-100 text-blue-600'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black">₦{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-all">
                        <Icon name="ViewIcon" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">#{order.id}</span>
                  <span className="font-black text-slate-900 text-sm">₦{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-700 text-sm">{order.customer.name}</div>
                    <div className="text-xs text-muted mt-0.5">{order.customer.phone}</div>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider
                    ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                      'bg-blue-100 text-blue-600'}
                  `}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-border p-4">
          <h3 className="text-base font-bold mb-6">Best Selling</h3>
          <div className="space-y-6">
            {products.slice(0, 4).map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img src={p.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-muted">₦{p.price.toLocaleString()} • 124 orders</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-primary">#0{i+1}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 rounded-md border border-border text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
