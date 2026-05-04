import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { orders } = useApp();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-24 text-center">Order not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-32 h-32 bg-primary rounded-md flex items-center justify-center mx-auto mb-10 text-white shadow-sm shadow-primary/30"
      >
        <Icon name="CheckmarkCircle02Icon" size={64} />
      </motion.div>

      <h1 className="text-base font-heading mb-4">Order Confirmed!</h1>
      <p className="text-muted text-base mb-12">
        Thank you for choosing Lawrenta Kitchen. Your order <span className="font-bold text-slate-900">#{order.id}</span> has been received and is being prepared with care.
      </p>

      <div className="bg-white border border-border rounded-lg p-4 mb-12 text-left space-y-6">
        <h3 className="font-bold text-base pb-4 border-b border-border">Order Details</h3>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="text-muted">Total Paid</div>
          <div className="text-right font-black text-primary">₦{order.total.toLocaleString()}</div>
          
          <div className="text-muted">Delivery To</div>
          <div className="text-right font-medium">{order.customer.address}</div>
          
          <div className="text-muted">Payment Method</div>
          <div className="text-right font-medium capitalize">{order.paymentMethod}</div>

          <div className="text-muted">Estimated Delivery</div>
          <div className="text-right font-medium text-green-600">35 - 45 Minutes</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to={`/track-order/${order.id}`} className="flex-grow max-w-xs">
          <Button className="w-full py-4 text-sm">Track Order</Button>
        </Link>
        <Link to="/menu" className="flex-grow max-w-xs">
          <Button variant="outline" className="w-full py-4 text-sm">Order More</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
