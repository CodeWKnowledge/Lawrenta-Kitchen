import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const Orders = () => {
  const { orders, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = ['pending', 'accepted', 'preparing', 'packaged', 'delivery', 'delivered', 'rejected'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-orange-100 text-orange-600';
      case 'accepted': return 'bg-blue-100 text-blue-600';
      case 'preparing': return 'bg-purple-100 text-purple-600';
      case 'packaged': return 'bg-pink-100 text-pink-600';
      case 'delivery': return 'bg-cyan-100 text-cyan-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-sm mb-2">Orders Management</h1>
          <p className="text-muted text-sm">Track and manage all incoming restaurant orders.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" icon={() => <Icon name="FilterIcon" size={16} />}>Filter</Button>
          <Button variant="outline" icon={() => <Icon name="Download01Icon" size={16} />}>Export</Button>
        </div>
      </header>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-5">Order ID</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Items</th>
              <th className="px-6 py-5">Total</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-black text-slate-900">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{order.customer.name}</div>
                  <div className="text-xs text-muted mt-1">{order.customer.address}</div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`
                      px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider outline-none cursor-pointer border-2 border-transparent focus:border-white transition-all
                      ${getStatusColor(order.status)}
                    `}
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-white text-slate-900">{opt}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 font-black text-primary">₦{order.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-3 hover:bg-white border border-transparent hover:border-border rounded-md text-slate-400 hover:text-primary transition-all"
                  >
                    <Icon name="ViewIcon" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-border p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-black text-slate-900">#{order.id}</span>
              <span className="font-black text-primary">₦{order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-800 text-sm">{order.customer.name}</div>
                <div className="text-xs text-muted mt-1">{order.customer.address}</div>
              </div>
              <div className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md flex-shrink-0">
                {order.items.length} items
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 gap-2">
              <select 
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className={`
                  flex-grow px-2 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer border-2 border-transparent transition-all
                  ${getStatusColor(order.status)}
                `}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-white text-slate-900">{opt}</option>
                ))}
              </select>
              <button 
                onClick={() => setSelectedOrder(order)}
                className="p-2 border border-border rounded-md text-slate-600 hover:text-primary transition-all flex items-center justify-center flex-shrink-0"
              >
                <Icon name="ViewIcon" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal (Simple) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-sm p-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-base font-heading">Order #{selectedOrder.id}</h2>
                <p className="text-muted">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-100 rounded-md transition-all">
                <Icon name="Cancel01Icon" size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 p-4 rounded-md">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Customer Info</h4>
                <p className="font-bold text-sm mb-1">{selectedOrder.customer.name}</p>
                <p className="text-sm text-slate-600 mb-1">{selectedOrder.customer.phone}</p>
                <p className="text-sm text-slate-600">{selectedOrder.customer.email || 'No email provided'}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Delivery Details</h4>
                <p className="text-sm font-bold text-slate-700">{selectedOrder.customer.address}</p>
                <p className="text-sm text-slate-600 mt-2 uppercase font-black text-[10px] tracking-widest">{selectedOrder.deliveryType}</p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Order Items</h4>
            <div className="space-y-4 mb-10">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <span className="font-bold">{item.quantity}x</span> {item.name}
                    <div className="text-xs text-muted">{item.variant} {item.addons?.length > 0 && `• ${item.addons.join(', ')}`}</div>
                  </div>
                  <span className="font-black">₦{(item.totalPrice * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center p-4 bg-primary-light rounded-md border border-primary/10">
              <span className="font-bold text-slate-700">Order Total</span>
              <span className="text-sm font-black text-primary">₦{selectedOrder.total.toLocaleString()}</span>
            </div>
            
            <div className="mt-10 flex gap-4">
              <Button 
                variant="primary" 
                className="flex-grow"
                onClick={() => {
                  updateOrderStatus(selectedOrder.id, 'accepted');
                  setSelectedOrder(null);
                }}
              >
                Accept Order
              </Button>
              <Button 
                variant="outline" 
                className="text-red-500 hover:bg-red-50 hover:border-red-100"
                onClick={() => {
                  updateOrderStatus(selectedOrder.id, 'rejected');
                  setSelectedOrder(null);
                }}
              >
                Reject Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
