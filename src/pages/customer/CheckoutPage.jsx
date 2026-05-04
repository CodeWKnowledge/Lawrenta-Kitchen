import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Icon from '../../components/common/Icon';
import Button from '../../components/common/Button';

const CheckoutPage = () => {
  const { cart, updateCartQuantity, removeFromCart, settings, placeOrder } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryType: 'delivery', // 'delivery' or 'pickup'
    paymentMethod: 'card'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
  const deliveryFee = formData.deliveryType === 'delivery' ? settings.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const order = placeOrder({
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.deliveryType === 'delivery' ? formData.address : 'Store Pickup'
      },
      items: cart,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: formData.paymentMethod,
      deliveryType: formData.deliveryType
    });

    navigate(`/order-confirmation/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="w-24 h-24 bg-primary-light rounded-md flex items-center justify-center mx-auto mb-8 text-primary">
          <Icon name="ShoppingBasket01Icon" size={14} />
        </div>
        <h2 className="text-sm mb-4 font-heading">Your cart is empty</h2>
        <p className="text-muted text-sm mb-10 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our delicious menu!
        </p>
        <Button onClick={() => navigate('/menu')} className="px-12 py-4">
          Go to Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-sm mb-12 font-heading">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-12">
          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-12">
            {/* Delivery Toggle */}
            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="text-base mb-6 flex items-center gap-2">
                <Icon name="Location01Icon" className="text-primary" /> 
                Delivery Method
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, deliveryType: 'delivery' }))}
                  className={`p-4 rounded-md border-2 transition-all text-left ${
                    formData.deliveryType === 'delivery' ? 'border-primary bg-primary-light' : 'border-border'
                  }`}
                >
                  <div className="font-bold mb-1">Delivery</div>
                  <div className="text-sm text-muted">Direct to your door</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, deliveryType: 'pickup' }))}
                  className={`p-4 rounded-md border-2 transition-all text-left ${
                    formData.deliveryType === 'pickup' ? 'border-primary bg-primary-light' : 'border-border'
                  }`}
                >
                  <div className="font-bold mb-1">Pickup</div>
                  <div className="text-sm text-muted">Collect from restaurant</div>
                </button>
              </div>
            </section>

            {/* Customer Info */}
            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="text-base mb-6 flex items-center gap-2">
                <Icon name="UserIcon" className="text-primary" /> 
                Contact Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">FULL NAME</label>
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">PHONE NUMBER</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g. +1 234 567 890"
                    className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-400 mb-2">EMAIL (OPTIONAL)</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all"
                  />
                </div>
                {formData.deliveryType === 'delivery' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-400 mb-2">DELIVERY ADDRESS</label>
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, Apartment, Suite, etc."
                      className="w-full p-4 rounded-md border border-border focus:border-primary outline-none transition-all h-24 resize-none"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-4 rounded-lg border border-border">
              <h3 className="text-base mb-6 flex items-center gap-2">
                <Icon name="CreditCardIcon" className="text-primary" /> 
                Payment Method
              </h3>
              <div className="space-y-4">
                {['card', 'transfer', 'cash'].map(method => (
                  <label 
                    key={method}
                    className={`flex items-center justify-between p-5 rounded-md border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method ? 'border-primary bg-primary-light' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        className="w-5 h-5 accent-primary"
                        checked={formData.paymentMethod === method}
                        onChange={() => setFormData(p => ({ ...p, paymentMethod: method }))}
                      />
                      <span className="font-bold capitalize">{method === 'card' ? 'Credit / Debit Card' : method === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}</span>
                    </div>
                    <Icon name={method === 'card' ? 'CreditCardIcon' : method === 'transfer' ? 'Bank01Icon' : 'Money01Icon'} className="text-slate-400" />
                  </label>
                ))}
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg border border-border sticky top-32">
            <h3 className="text-base mb-8 font-heading">Order Summary</h3>
            
            <div className="space-y-6 mb-10 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between font-bold text-sm">
                      <span className="line-clamp-1">{item.name}</span>
                      <span>₦{(item.totalPrice * item.quantity).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted mb-2">
                      {item.variant} {item.addons.length > 0 && `• ${item.addons.join(', ')}`}
                    </p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateCartQuantity(index, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-100 hover:text-primary transition-colors"
                      >
                        <Icon name="MinusSignIcon" size={14} />
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(index, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-100 hover:text-primary transition-colors"
                      >
                        <Icon name="PlusSignIcon" size={14} />
                      </button>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Icon name="Delete02Icon" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-border border-dashed">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-4">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              className="w-full py-5 text-sm mt-10 shadow-sm shadow-primary/20"
            >
              Place Order
            </Button>
            
            <p className="text-center text-xs text-muted mt-6 px-4">
              By placing your order, you agree to Lawrenta Kitchen's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
