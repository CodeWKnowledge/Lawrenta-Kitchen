import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Icon from '../common/Icon';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, settings, orders } = useApp();
  const location = useLocation();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders?.find(o => !['delivered', 'rejected'].includes(o.status));

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white">
              <Icon name="ChefHatIcon" size={14} />
            </div>
            <span className="text-sm font-bold font-heading tracking-tight text-slate-900">
              {settings.restaurantName}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/home" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/home' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/menu' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Menu
            </Link>
            {activeOrder && (
              <Link 
                to={`/track-order/${activeOrder.id}`} 
                className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <Icon name="DeliveryTruck01Icon" size={16} />
                Track Order
              </Link>
            )}
            <Link 
              to="/admin" 
              className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Link to="/checkout" className="relative p-2 text-slate-600 hover:text-primary transition-colors">
              <Icon name="ShoppingCart01Icon" size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-md border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "Cancel01Icon" : "Menu01Icon"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-border shadow-md"
            >
              <div className="flex flex-col p-6 space-y-6">
                <Link 
                  to="/home" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-bold transition-colors ${location.pathname === '/home' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                >
                  Home
                </Link>
                <Link 
                  to="/menu" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-bold transition-colors ${location.pathname === '/menu' ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                >
                  Menu
                </Link>
                {activeOrder && (
                  <Link 
                    to={`/track-order/${activeOrder.id}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2"
                  >
                    <Icon name="DeliveryTruck01Icon" size={18} />
                    Track Order
                  </Link>
                )}
                <Link 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-slate-400 hover:text-primary transition-colors"
                >
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
