import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const HomePage = () => {
  const { products, categories } = useApp();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[200px] flex items-center overflow-hidden bg-primary-light/30">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >

            <h1 className="text-3xl font-heading font-black text-slate-900 leading-tight mb-2">
              Exquisite Dining <br /> 
              <span className="text-primary underline decoration-primary-light decoration-8 underline-offset-8">Delivered</span> to You.
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-10 max-w-lg">
              Experience the finest gourmet cuisine from the comfort of your home. 
              Freshly prepared by our master chefs.
            </p>

          </motion.div>
          <div className="flex flex-col justify-center items-center sm:flex-row gap-4 ">
              <Link to="/menu">
                <Button variant="secondary" color="primary" className="px-6 py-2 text-sm shadow-sm shadow-primary/20">
                  Explore Menu
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="secondary" className="px-6 py-2 text-sm">
                  Order Now
                </Button>
              </Link>
            </div>
        </div>
      </section>



      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl mb-4">Chef's Recommendations</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Hand-picked dishes that represent our culinary philosophy of fresh, seasonal, and bold flavors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-sm border border-border overflow-hidden group hover:shadow-sm transition-all"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base">{product.name}</h3>
                  <span className="text-primary font-black text-base">${product.price}</span>
                </div>
                <p className="text-muted text-sm line-clamp-2 mb-8">
                  {product.description}
                </p>
                <Link to="/menu">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
