import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import Button from '../common/Button';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.name || '');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [instructions, setInstructions] = useState('');

  if (!product) return null;

  const variantPrice = product.variants?.find(v => v.name === selectedVariant)?.price || 0;
  const addonsPrice = selectedAddons.reduce((sum, addonName) => {
    const addon = product.addons.find(a => a.name === addonName);
    return sum + (addon?.price || 0);
  }, 0);
  
  const totalPrice = (product.price + variantPrice + addonsPrice) * quantity;

  const toggleAddon = (name) => {
    setSelectedAddons(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleAdd = () => {
    onAddToCart({
      ...product,
      quantity,
      variant: selectedVariant,
      addons: selectedAddons,
      specialInstructions: instructions,
      totalPrice: totalPrice / quantity // price per unit for the cart
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-lg shadow-sm overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header with image */}
            <div className="relative h-64 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-md hover:bg-white/40 transition-all"
              >
                <Icon name="Cancel01Icon" size={14} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                  <p className="text-muted">{product.description}</p>
                </div>
                <div className="text-sm font-black text-primary">₦{product.price.toLocaleString()}</div>
              </div>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Choose Variant</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v) => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-4 py-2 rounded-md border-2 transition-all font-medium ${
                          selectedVariant === v.name 
                            ? 'border-primary bg-primary-light text-primary' 
                            : 'border-border hover:border-slate-300'
                        }`}
                      >
                        {v.name} {v.price > 0 && `(+₦${v.price.toLocaleString()})`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {product.addons?.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Add-ons</h4>
                  <div className="space-y-3">
                    {product.addons.map((addon) => (
                      <label 
                        key={addon.name}
                        className={`flex items-center justify-between p-4 rounded-md border-2 cursor-pointer transition-all ${
                          selectedAddons.includes(addon.name) ? 'border-primary bg-primary-light' : 'border-border hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 accent-primary" 
                            checked={selectedAddons.includes(addon.name)}
                            onChange={() => toggleAddon(addon.name)}
                          />
                          <span className="font-medium">{addon.name}</span>
                        </div>
                        <span className="text-primary font-bold">+₦{addon.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Special Instructions</h4>
                <textarea 
                  className="w-full p-4 rounded-md border-2 border-border focus:border-primary focus:ring-0 outline-none transition-all resize-none h-24 text-sm"
                  placeholder="E.g. No onions, extra spicy, etc."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-md">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:text-primary transition-colors"
                  >
                    <Icon name="MinusSignIcon" size={16} />
                  </button>
                  <span className="font-black w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:text-primary transition-colors"
                  >
                    <Icon name="PlusSignIcon" size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAdd}
                  className="flex-grow ml-6 py-4 shadow-sm shadow-primary/20"
                >
                  Add to Cart • ₦{totalPrice.toLocaleString()}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
