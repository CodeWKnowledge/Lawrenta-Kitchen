import React from 'react';
import Icon from '../common/Icon';
import Button from '../common/Button';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-sm border border-border overflow-hidden group hover:shadow-sm transition-all cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-slate-900 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-primary font-black whitespace-nowrap ml-2">
            ₦{product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-muted text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <Button 
          variant="outline" 
          className="w-full py-2 text-xs border-slate-200 text-slate-600 group-hover:border-primary group-hover:text-primary"
          disabled={!product.available}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
