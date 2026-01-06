import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Crown,
  Star,
  Check,
  Zap,
  Shield,
  TrendingUp,
  Package,
  Gift,
  Award,
  ChevronRight,
  Sparkles,
  BadgeCheck,
  Clock,
  Loader
} from 'lucide-react'

const plans = [
  {
    id: 'basic',
    name: 'Basic Buyer',
    price: 99,
    duration: '/month',
    color: '#6b7280',
    features: [
      'Priority Customer Support',
      'Early Access to Deals',
      '5% Cashback on purchases',
      'Free Delivery on orders above ₹500'
    ],
    badge: '🛒'
  },
  {
    id: 'pro',
    name: 'Pro Buyer',
    price: 249,
    duration: '/month',
    color: '#8b5cf6',
    popular: true,
    features: [
      'Everything in Basic',
      '10% Cashback on all purchases',
      'Exclusive Buyer Badge',
      'Free Delivery on all orders',
      'Access to Flash Sales',
      'Priority Dispute Resolution'
    ],
    badge: '💎'
  },
  {
    id: 'premium',
    name: 'Premium Buyer',
    price: 499,
    duration: '/month',
    color: '#f59e0b',
    features: [
      'Everything in Pro',
      '15% Cashback on all purchases',
      'Premium Gold Badge',
      'Personal Account Manager',
      'Bulk Purchase Discounts',
      'VIP Access to Limited Items',
      'Extended Return Window'
    ],
    badge: '👑'
  }
]

const benefits = [
  { icon: TrendingUp, title: 'Priority Access', description: 'Get early access to new listings and flash sales' },
  { icon: Shield, title: 'Buyer Protection', description: 'Enhanced protection with faster refunds' },
  { icon: Gift, title: 'Exclusive Rewards', description: 'Unlock special gifts and reward points' },
  { icon: Package, title: 'Free Shipping', description: 'Free delivery on eligible orders' }
]

function EliteBuyerPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubscribed(true)
    setLoading(false)
  }

  if (subscribed) {
    return (
      <div className="elite-page">
        <div className="success-container">
          <div className="success-icon">
            <Crown size={48} />
          </div>
          <h1>Welcome to Elite Buyer! 🎉</h1>
          <p>You're now a {plans.find(p => p.id === selectedPlan)?.name}</p>
          
          <div className="subscription-card">
            <div className="plan-badge" style={{ background: plans.find(p => p.id === selectedPlan)?.color }}>
              {plans.find(p => p.id === selectedPlan)?.badge}
            </div>
            <h3>{plans.find(p => p.id === selectedPlan)?.name}</h3>
            <p className="plan-price">
              ₹{plans.find(p => p.id === selectedPlan)?.price}
              <span>/month</span>
            </p>
            <div className="renewal-info">
              <Clock size={16} />
              <span>Next renewal: February 3, 2026</span>
            </div>
          </div>

          <div className="active-benefits">
            <h4>Your Active Benefits</h4>
            {plans.find(p => p.id === selectedPlan)?.features.map((feature, idx) => (
              <div key={idx} className="benefit-item">
                <Check size={16} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="elite-page">
      <div className="page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <Crown size={24} />
            <span>ELITE BUYER</span>
          </div>
          <h1>Shop Smarter with <span className="highlight">Elite Benefits</span></h1>
          <p>Unlock exclusive discounts, priority access, and premium buyer perks</p>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">
                <benefit.icon size={24} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="plans-section">
          <h2>Choose Your Plan</h2>
          <div className="plans-grid">
            {plans.map(plan => (
              <div 
                key={plan.id}
                className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Sparkles size={14} />
                    Most Popular
                  </div>
                )}
                
                <div className="plan-header">
                  <span className="plan-emoji">{plan.badge}</span>
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    <span className="duration">{plan.duration}</span>
                  </div>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`select-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
                  style={{ '--plan-color': plan.color }}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <BadgeCheck size={18} />
                      Selected
                    </>
                  ) : (
                    <>Select Plan</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <div className="selected-plan">
              <span>Selected:</span>
              <strong>{plans.find(p => p.id === selectedPlan)?.name}</strong>
              <span className="price">₹{plans.find(p => p.id === selectedPlan)?.price}/month</span>
            </div>
            <button 
              className="subscribe-btn"
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spinner" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown size={20} />
                  Subscribe Now
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-item">
            <strong>Can I cancel anytime?</strong>
            <p>Yes, you can cancel your subscription anytime. You'll continue to have access until the end of your billing period.</p>
          </div>
          <div className="faq-item">
            <strong>How does cashback work?</strong>
            <p>Cashback is credited to your Eco Wallet within 24 hours of order delivery confirmation.</p>
          </div>
          <div className="faq-item">
            <strong>Can I upgrade my plan?</strong>
            <p>Yes! You can upgrade anytime. The price difference will be prorated for the remaining days.</p>
          </div>
        </div>
      </div>

      <style>{`
        .elite-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 2rem;
        }

        .page-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .hero-section {
          text-align: center;
          padding: 3rem 1rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .hero-section h1 .highlight {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-section p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .benefit-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }

        .benefit-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f59e0b;
          margin: 0 auto 1rem;
        }

        .benefit-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .benefit-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .plans-section h2 {
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .plan-card {
          position: relative;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        .plan-card.selected {
          border-color: var(--eco-primary);
        }

        .plan-card.popular {
          border-color: #8b5cf6;
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          padding: 0.375rem 0.875rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .plan-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .plan-emoji {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .plan-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .plan-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
        }

        .plan-price .currency {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .plan-price .amount {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .plan-price .duration {
          font-size: 1rem;
          color: var(--text-tertiary);
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
        }

        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          padding: 0.5rem 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .plan-features li svg {
          color: var(--eco-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .select-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border: 2px solid var(--border-color);
          border-radius: 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .select-btn:hover {
          border-color: var(--eco-primary);
          color: var(--eco-primary);
        }

        .select-btn.selected {
          background: var(--eco-primary);
          border-color: var(--eco-primary);
          color: white;
        }

        .cta-section {
          background: linear-gradient(135deg, var(--eco-primary), var(--eco-secondary));
          border-radius: 1.5rem;
          padding: 1.5rem 2rem;
          margin-bottom: 3rem;
        }

        .cta-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .selected-plan {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .selected-plan strong {
          color: white;
          font-size: 1.25rem;
        }

        .selected-plan .price {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
        }

        .subscribe-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: white;
          color: var(--eco-primary);
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .subscribe-btn:hover {
          transform: scale(1.02);
        }

        .subscribe-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .faq-section {
          background: var(--bg-secondary);
          border-radius: 1.5rem;
          padding: 2rem;
        }

        .faq-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .faq-item {
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-item strong {
          display: block;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .faq-item p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Success State */
        .success-container {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          padding: 3rem 1rem;
        }

        .success-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.5rem;
        }

        .success-container h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .success-container > p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .subscription-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .subscription-card .plan-badge {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 0.75rem;
        }

        .subscription-card h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .subscription-card .plan-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--eco-primary);
        }

        .subscription-card .plan-price span {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .renewal-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-tertiary);
          font-size: 0.85rem;
          margin-top: 1rem;
        }

        .active-benefits {
          text-align: left;
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .active-benefits h4 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0;
          color: var(--text-secondary);
        }

        .benefit-item svg {
          color: var(--eco-primary);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .elite-page {
            padding: 1rem;
          }

          .hero-section h1 {
            font-size: 1.75rem;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .plans-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .subscribe-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default EliteBuyerPage
