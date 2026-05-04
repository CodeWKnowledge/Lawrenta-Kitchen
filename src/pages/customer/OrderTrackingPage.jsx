import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import { motion } from 'framer-motion';

const OrderTrackingPage = () => {
  const { id } = useParams();
  const { orders } = useApp();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-24 text-center">Order not found</div>;

  const steps = [
    { id: 'pending', label: 'Order Placed', icon: 'NoteIcon', time: 'Just now' },
    { id: 'accepted', label: 'Accepted', icon: 'Tick01Icon', time: '1 min ago' },
    { id: 'preparing', label: 'Preparing', icon: 'ChefHatIcon', time: '5 mins ago' },
    { id: 'packaged', label: 'Packaged', icon: 'ShoppingBag01Icon', time: 'In progress' },
    { id: 'delivery', label: 'Out for Delivery', icon: 'DeliveryTruck01Icon', time: 'Soon' },
    { id: 'delivered', label: 'Delivered', icon: 'Home01Icon', time: 'Wait for it' },
  ];

  const statusToStep = {
    'pending': 0,
    'accepted': 1,
    'preparing': 2,
    'packaged': 3,
    'delivery': 4,
    'delivered': 5,
    'rejected': -1
  };

  const activeIndex = statusToStep[order.status] ?? 0;

  const getEstimatedArrival = () => {
    switch(order.status) {
      case 'pending': return '45 mins';
      case 'accepted': return '40 mins';
      case 'preparing': return '25 mins';
      case 'packaged': return '15 mins';
      case 'delivery': return '5 mins';
      case 'delivered': return 'Arrived';
      case 'rejected': return 'N/A';
      default: return 'Unknown';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-primary p-4 md:p-8 text-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-primary-light font-bold text-xs uppercase tracking-widest mb-1">Ongoing Order</p>
              <h1 className="text-sm font-heading font-black">#{order.id}</h1>
            </div>
            <div className="text-right">
              <p className="text-primary-light text-xs mb-1">Estimated Arrival</p>
              <p className="text-sm font-black font-heading">{getEstimatedArrival()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-md">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-primary flex-shrink-0">
              <Icon name={order.status === 'delivered' ? 'Home01Icon' : "DeliveryTruck01Icon"} size={12} />
            </div>
            <div>
              <p className="text-xs font-bold">
                {order.status === 'delivered' ? 'Your order has been delivered!' : 
                 order.status === 'delivery' ? 'Your courier is on the way' : 
                 order.status === 'packaged' ? 'Your order is packaged and waiting for pickup' :
                 'Your order is being processed'}
              </p>
              <p className="text-xs text-primary-light">
                {order.status === 'delivered' ? 'Enjoy your meal from Lawrenta Kitchen' : 
                 order.status === 'delivery' ? 'Alex is delivering your order via Bicycle' : 
                 'We are preparing everything with care'}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-4 md:p-8">
          {order.status === 'rejected' ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-md flex items-center justify-center mx-auto mb-4">
                <Icon name="Cancel01Icon" size={20} />
              </div>
              <h2 className="text-xs font-bold text-red-600 mb-1">Order Rejected</h2>
              <p className="text-xs text-muted">We're sorry, but the restaurant cannot fulfill your order at this time. A refund has been initiated.</p>
            </div>
          ) : (
            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-2 bottom-2 w-1 bg-slate-100 -z-0" />
              <div 
                className="absolute left-4 top-2 w-1 bg-primary transition-all duration-1000 -z-0" 
                style={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step, index) => {
                const isActive = index <= activeIndex;
                const isCurrent = index === activeIndex;

                return (
                  <div key={step.id} className="flex gap-4 relative z-10">
                    <div className={`
                      w-8 h-8 rounded-md flex items-center justify-center transition-all duration-500 border-2 border-white
                      ${isActive ? 'bg-primary text-white shadow-sm shadow-primary/30 scale-110' : 'bg-slate-100 text-slate-400'}
                      ${isCurrent ? 'animate-pulse' : ''}
                    `}>
                      <Icon name={step.icon} size={12} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className={`font-bold text-xs ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.label}
                      </h3>
                      <p className={`text-xs ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                        {isActive ? step.time : 'Pending...'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="border-t border-border p-4 bg-slate-50 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Delivery Address</h4>
            <p className="font-bold text-xs text-slate-700">{order.customer.address}</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Order Summary</h4>
            <p className="font-bold text-xs text-slate-700">
              {order.items.length} Items • ₦{order.total.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
              <Icon name="CallIcon" size={12} />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
