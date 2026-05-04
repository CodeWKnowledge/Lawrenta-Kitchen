import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/customer/ProductCard';
import ProductModal from '../../components/customer/ProductModal';
import Icon from '../../components/common/Icon';

const MenuPage = () => {
  const { products, categories, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      // Hide automatically when scrolled past 50px
      if (window.scrollY > 50) {
        setIsHeaderVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Menu Header */}
      <div className="bg-white border-b border-border sticky top-20 z-40 mb-10">
        <div className="max-w-7xl mx-auto px-4 relative">
          
          <div className={`transition-all duration-300 overflow-hidden ${isHeaderVisible ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <h1 className="text-base font-heading">Our Menu</h1>
              
              <div className="relative w-full md:w-96">
                <Icon name="Search01Icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Search for dishes..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-border rounded-md focus:border-primary focus:bg-white outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 pb-2">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap font-medium transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                    : 'bg-white border border-border text-slate-600 hover:border-primary hover:text-primary'
                }`}
              >
                All Items
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md whitespace-nowrap font-medium transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                      : 'bg-white border border-border text-slate-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon name={cat.icon} size={14} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-50">
            <button
              onClick={() => setIsHeaderVisible(!isHeaderVisible)}
              className="bg-white border border-border shadow-sm text-primary text-xs font-bold px-4 py-1.5 rounded-md hover:bg-slate-50 hover:shadow transition-all flex items-center gap-2"
            >
              {isHeaderVisible ? 'Hide Menu Filters' : 'Show Menu Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Icon name="Search01Icon" size={28} />
            </div>
            <h3 className="text-base font-bold mb-2">No items found</h3>
            <p className="text-muted">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default MenuPage;
