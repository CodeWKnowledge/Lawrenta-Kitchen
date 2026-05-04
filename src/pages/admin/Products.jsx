import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const Products = () => {
  const { products, categories, updateProduct, addProduct, deleteProduct } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        available: product.available
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: categories[0]?.id || '',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
        available: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, data);
    } else {
      addProduct({ ...data, variants: [], addons: [] });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-sm mb-2">Products</h1>
          <p className="text-muted text-sm">Manage your restaurant's digital menu items.</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={() => <Icon name="PlusSignIcon" size={16} />}>
          Add Product
        </Button>
      </header>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-5">Product</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img src={product.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{product.name}</div>
                      <div className="text-xs text-muted line-clamp-1 max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600">
                    {categories.find(c => c.id === product.category)?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-6 py-4 font-black text-slate-900">₦{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => updateProduct(product.id, { available: !product.available })}
                    className={`
                      px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                      ${product.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                    `}
                  >
                    {product.available ? 'Available' : 'Out of Stock'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleOpenModal(product)}
                      className="p-3 hover:bg-white border border-transparent hover:border-border rounded-md text-slate-400 hover:text-primary transition-all"
                    >
                      <Icon name="Edit01Icon" size={16} />
                    </button>
                    <button 
                      onClick={() => { if(confirm('Delete this product?')) deleteProduct(product.id) }}
                      className="p-3 hover:bg-white border border-transparent hover:border-border rounded-md text-slate-400 hover:text-red-500 transition-all"
                    >
                      <Icon name="Delete02Icon" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-border p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-slate-100">
                <img src={product.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</div>
                <div className="text-xs text-muted mb-1 line-clamp-1">{categories.find(c => c.id === product.category)?.name || 'Uncategorized'}</div>
                <div className="font-black text-slate-900 text-sm">₦{product.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button 
                onClick={() => updateProduct(product.id, { available: !product.available })}
                className={`
                  px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors
                  ${product.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                `}
              >
                {product.available ? 'Available' : 'Out of Stock'}
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="p-2 border border-border rounded-md text-slate-500 hover:text-primary transition-all"
                >
                  <Icon name="Edit01Icon" size={16} />
                </button>
                <button 
                  onClick={() => { if(confirm('Delete this product?')) deleteProduct(product.id) }}
                  className="p-2 border border-border rounded-md text-slate-500 hover:text-red-500 transition-all"
                >
                  <Icon name="Delete02Icon" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-xl rounded-lg shadow-sm p-10 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-base mb-8 font-heading">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                  placeholder="Classic Burger"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Price ($)</label>
                  <input 
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                    placeholder="9.99"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all appearance-none bg-slate-50"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all h-24 resize-none"
                  placeholder="Describe your dish..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Image URL</label>
                <input 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                  className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData(p => ({ ...p, available: e.target.checked }))}
                  className="w-6 h-6 accent-primary"
                />
                <label htmlFor="available" className="font-bold text-slate-700 select-none">Available for Ordering</label>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <Button type="submit" className="flex-grow py-4">
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </Button>
              <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} className="px-6">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
