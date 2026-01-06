import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Truck,
  CreditCard,
  Tag,
  Leaf,
  ArrowRight,
  Package,
  X,
  Wallet,
  Building2,
  Smartphone,
  CheckCircle,
  Loader
} from 'lucide-react'

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Recycled Paper Notebooks (Set of 5)',
    price: 299,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=100&h=100&fit=crop',
    seller: 'Green Paper Co.',
    eco_points: 50
  },
  {
    id: 2,
    name: 'Bamboo Cutlery Set',
    price: 350,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=100&h=100&fit=crop',
    seller: 'BambooLife',
    eco_points: 40
  }
]

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI ID' },
  { id: 'wallet', name: 'Eco Wallet', icon: Wallet, description: 'Balance: ₹1,250' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' }
]

function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1) // 1: Address, 2: Payment, 3: Confirm
  const [selectedPayment, setSelectedPayment] = useState('upi')
  const [processing, setProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  })

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'eco10') {
      setPromoApplied(true)
    }
  }

  // Save order to localStorage
  const saveOrder = (orderData) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('eco_market_orders') || '[]')
      existingOrders.unshift(orderData)
      localStorage.setItem('eco_market_orders', JSON.stringify(existingOrders))
    } catch (err) {
      console.error('Error saving order:', err)
    }
  }

  // Generate UPI deep link
  const generateUPILink = (amount) => {
    // UPI deep link format - opens payment apps
    const upiId = 'ecomarket@upi' // Merchant UPI ID
    const merchantName = 'EcoMarket'
    const transactionNote = `Order Payment`
    
    // This creates a UPI intent URL that opens installed UPI apps
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`
  }

  // Handle UPI payment
  const handleUPIPayment = () => {
    const upiLink = generateUPILink(total)
    
    // Try to open UPI app
    const link = document.createElement('a')
    link.href = upiLink
    link.click()
    
    // Also show alert for demo
    setTimeout(() => {
      if (confirm('Did you complete the UPI payment? Click OK to confirm payment.')) {
        completeOrder()
      }
    }, 1000)
  }

  const completeOrder = () => {
    const orderId = `ECO-${Date.now().toString().slice(-8)}`
    const orderData = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      total,
      address: `${address.street}, ${address.city} - ${address.pincode}`,
      ecoPoints: totalEcoPoints,
      paymentMethod: selectedPayment
    }
    
    saveOrder(orderData)
    setOrderPlaced(true)
  }

  const handlePlaceOrder = async () => {
    setProcessing(true)
    
    // If UPI selected, open payment app
    if (selectedPayment === 'upi') {
      handleUPIPayment()
      setProcessing(false)
      return
    }
    
    // For other payment methods, simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProcessing(false)
    completeOrder()
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + shipping
  const totalEcoPoints = cartItems.reduce((sum, item) => sum + item.eco_points * item.quantity, 0)

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <ShoppingCart size={32} />
            Shopping Cart
          </h1>
          <p className="text-muted">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart card">
            <Package size={64} />
            <h3>Your cart is empty</h3>
            <p>Explore our marketplace and add some eco-friendly products!</p>
            <Link to="/marketplace" className="btn btn-primary btn-lg">
              Browse Marketplace
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-seller">{item.seller}</p>
                    <div className="item-eco">
                      <Leaf size={14} />
                      +{item.eco_points * item.quantity} Eco Points
                    </div>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-price">
                    <span className="price">₹{(item.price * item.quantity).toLocaleString()}</span>
                    <span className="unit-price">₹{item.price} each</span>
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-card card">
                <h3>Order Summary</h3>

                <div className="promo-section">
                  <div className="promo-input">
                    <Tag size={18} />
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={applyPromo}
                      disabled={promoApplied}
                    >
                      {promoApplied ? 'Applied!' : 'Apply'}
                    </button>
                  </div>
                  <p className="promo-hint">Try: ECO10 for 10% off</p>
                </div>

                <div className="summary-lines">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="summary-line discount">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="summary-line">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="free-shipping-note">
                      Add ₹{500 - subtotal} more for free shipping!
                    </p>
                  )}
                  <div className="summary-divider"></div>
                  <div className="summary-line total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="eco-points-earned">
                  <Leaf size={20} />
                  <div>
                    <strong>You'll earn {totalEcoPoints} Eco Points</strong>
                    <p>with this purchase!</p>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-lg w-full"
                  onClick={() => setShowCheckout(true)}
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>

                <div className="delivery-info">
                  <div className="info-item">
                    <Truck size={18} />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={18} />
                    <span>Delivery to your saved address</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="modal-overlay">
            <div className="checkout-modal">
              <div className="modal-header">
                <h2>
                  {orderPlaced ? 'Order Confirmed!' : 
                   checkoutStep === 1 ? 'Delivery Address' : 
                   checkoutStep === 2 ? 'Payment Method' : 'Confirm Order'}
                </h2>
                {!orderPlaced && (
                  <button className="close-btn" onClick={() => {
                    setShowCheckout(false)
                    setCheckoutStep(1)
                    setOrderPlaced(false)
                  }}>
                    <X size={24} />
                  </button>
                )}
              </div>

              {orderPlaced ? (
                <div className="order-success">
                  <div className="success-icon">
                    <CheckCircle size={64} />
                  </div>
                  <h3>Thank You for Your Order!</h3>
                  <p>Order #ECO-{Date.now().toString().slice(-8)}</p>
                  <p className="eco-earned">You earned <strong>{totalEcoPoints} Eco Points</strong>!</p>
                  <div className="success-buttons">
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={() => navigate('/my-orders')}
                    >
                      <Package size={20} />
                      View My Orders
                    </button>
                    <button 
                      className="btn btn-secondary btn-lg"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step Indicator */}
                  <div className="step-indicator">
                    {[1, 2, 3].map(step => (
                      <div key={step} className={`step ${checkoutStep >= step ? 'active' : ''}`}>
                        <span className="step-number">{step}</span>
                        <span className="step-label">
                          {step === 1 ? 'Address' : step === 2 ? 'Payment' : 'Confirm'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="modal-body">
                    {checkoutStep === 1 && (
                      <div className="address-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter full name"
                            value={address.name}
                            onChange={(e) => setAddress({...address, name: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="Enter phone number"
                            value={address.phone}
                            onChange={(e) => setAddress({...address, phone: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Street Address</label>
                          <input 
                            type="text" 
                            placeholder="House/Flat No., Street, Area"
                            value={address.street}
                            onChange={(e) => setAddress({...address, street: e.target.value})}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>City</label>
                            <input 
                              type="text" 
                              placeholder="City"
                              value={address.city}
                              onChange={(e) => setAddress({...address, city: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Pincode</label>
                            <input 
                              type="text" 
                              placeholder="Pincode"
                              value={address.pincode}
                              onChange={(e) => setAddress({...address, pincode: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {checkoutStep === 2 && (
                      <div className="payment-methods">
                        {paymentMethods.map(method => (
                          <label 
                            key={method.id} 
                            className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}
                          >
                            <input 
                              type="radio" 
                              name="payment"
                              checked={selectedPayment === method.id}
                              onChange={() => setSelectedPayment(method.id)}
                            />
                            <div className="payment-icon">
                              <method.icon size={24} />
                            </div>
                            <div className="payment-info">
                              <strong>{method.name}</strong>
                              <span>{method.description}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}

                    {checkoutStep === 3 && (
                      <div className="order-summary-final">
                        <div className="summary-section">
                          <h4>Delivery Address</h4>
                          <p>{address.name}<br />
                          {address.street}<br />
                          {address.city} - {address.pincode}<br />
                          Phone: {address.phone}</p>
                        </div>
                        <div className="summary-section">
                          <h4>Payment Method</h4>
                          <p>{paymentMethods.find(m => m.id === selectedPayment)?.name}</p>
                        </div>
                        <div className="summary-section">
                          <h4>Order Total</h4>
                          <div className="total-line">
                            <span>Items ({cartItems.length})</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                          </div>
                          {discount > 0 && (
                            <div className="total-line discount">
                              <span>Discount</span>
                              <span>-₹{discount.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="total-line">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                          </div>
                          <div className="total-line grand-total">
                            <span>Grand Total</span>
                            <span>₹{total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="modal-footer">
                    {checkoutStep > 1 && (
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setCheckoutStep(checkoutStep - 1)}
                      >
                        Back
                      </button>
                    )}
                    {checkoutStep < 3 ? (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setCheckoutStep(checkoutStep + 1)}
                      >
                        Continue
                        <ArrowRight size={18} />
                      </button>
                    ) : (
                      <button 
                        className="btn btn-primary"
                        onClick={handlePlaceOrder}
                        disabled={processing}
                      >
                        {processing ? (
                          <>
                            <Loader size={18} className="spinner" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            Place Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .page-header {
          margin-bottom: var(--space-8);
        }

        .page-header h1 {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-2);
        }

        .empty-cart {
          text-align: center;
          padding: var(--space-16);
          max-width: 500px;
          margin: 0 auto;
        }

        .empty-cart svg {
          color: var(--color-gray-300);
          margin-bottom: var(--space-4);
        }

        .empty-cart h3 {
          margin-bottom: var(--space-2);
        }

        .empty-cart p {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--space-8);
          align-items: start;
        }

        @media (max-width: 968px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
        }

        @media (max-width: 600px) {
          .cart-item {
            flex-wrap: wrap;
          }
        }

        .item-image {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-lg);
          object-fit: cover;
          flex-shrink: 0;
        }

        .item-details {
          flex: 1;
          min-width: 200px;
        }

        .item-details h3 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .item-seller {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }

        .item-eco {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 600;
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: var(--color-gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .qty-btn:hover {
          background: var(--color-primary);
          color: white;
        }

        .item-quantity span {
          font-weight: 600;
          min-width: 24px;
          text-align: center;
        }

        .item-price {
          text-align: right;
          min-width: 100px;
        }

        .item-price .price {
          display: block;
          font-size: var(--text-lg);
          font-weight: 700;
        }

        .item-price .unit-price {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .remove-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          color: var(--color-gray-400);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-error);
        }

        .summary-card {
          padding: var(--space-6);
          position: sticky;
          top: 100px;
        }

        .summary-card h3 {
          margin-bottom: var(--space-6);
        }

        .promo-section {
          margin-bottom: var(--space-6);
        }

        .promo-input {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
        }

        .promo-input svg {
          color: var(--color-gray-400);
          margin-left: var(--space-2);
        }

        .promo-input input {
          flex: 1;
          border: none;
          background: none;
          padding: var(--space-2);
          font-size: var(--text-sm);
        }

        .promo-hint {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }

        .summary-lines {
          margin-bottom: var(--space-6);
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          padding: var(--space-2) 0;
        }

        .summary-line.discount {
          color: var(--color-success);
        }

        .summary-line.total {
          font-size: var(--text-xl);
          font-weight: 700;
        }

        .free-shipping-note {
          font-size: var(--text-xs);
          color: var(--color-accent);
          text-align: center;
          margin: var(--space-2) 0;
        }

        .summary-divider {
          height: 1px;
          background: var(--color-border);
          margin: var(--space-3) 0;
        }

        .eco-points-earned {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-primary-50);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
        }

        .eco-points-earned svg {
          color: var(--color-primary);
        }

        .eco-points-earned p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .delivery-info {
          margin-top: var(--space-6);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }

        /* Checkout Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--space-4);
        }

        .checkout-modal {
          background: var(--color-bg);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-6);
          border-bottom: 1px solid var(--color-border);
        }

        .modal-header h2 {
          font-size: var(--text-xl);
          margin: 0;
        }

        .close-btn {
          color: var(--color-text-secondary);
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          gap: var(--space-8);
          padding: var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
          opacity: 0.5;
        }

        .step.active {
          opacity: 1;
        }

        .step-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--color-gray-200);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: var(--text-sm);
        }

        .step.active .step-number {
          background: var(--color-primary);
          color: white;
        }

        .step-label {
          font-size: var(--text-xs);
        }

        .modal-body {
          padding: var(--space-6);
        }

        .address-form .form-group {
          margin-bottom: var(--space-4);
        }

        .address-form label {
          display: block;
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-2);
        }

        .address-form input {
          width: 100%;
          padding: var(--space-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .payment-option:hover {
          border-color: var(--color-primary);
        }

        .payment-option.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .payment-option input {
          display: none;
        }

        .payment-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-gray-100);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-info strong {
          display: block;
        }

        .payment-info span {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .order-summary-final .summary-section {
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-4);
        }

        .order-summary-final h4 {
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
        }

        .order-summary-final p {
          margin: 0;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .total-line {
          display: flex;
          justify-content: space-between;
          padding: var(--space-1) 0;
          font-size: var(--text-sm);
        }

        .total-line.discount {
          color: var(--color-success);
        }

        .total-line.grand-total {
          font-size: var(--text-lg);
          font-weight: 700;
          padding-top: var(--space-2);
          border-top: 1px solid var(--color-border);
          margin-top: var(--space-2);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        .order-success {
          text-align: center;
          padding: var(--space-8);
        }

        .success-icon {
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }

        .order-success h3 {
          margin-bottom: var(--space-2);
        }

        .eco-earned {
          color: var(--color-primary);
          margin-bottom: var(--space-6);
        }

        .success-buttons {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .success-buttons .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default CartPage
