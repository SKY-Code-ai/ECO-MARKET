import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Store,
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
  Loader,
  Eye,
  Users,
  BarChart3
} from 'lucide-react'

const plans = [
  {
    id: 'starter',
    name: 'Starter Seller',
    price: 149,
    duration: '/month',
    color: '#6b7280',
    features: [
      'Up to 20 Active Listings',
      'Basic Seller Badge',
      'Standard Support',
      'Weekly Analytics Report',
      'Featured in Category'
    ],
    badge: '🏪'
  },
  {
    id: 'pro',
    name: 'Pro Seller',
    price: 399,
    duration: '/month',
    color: '#8b5cf6',
    popular: true,
    features: [
      'Up to 100 Active Listings',
      'Pro Seller Badge',
      'Priority Support',
      'Daily Analytics Report',
      'Homepage Featured Spots',
      'Boost 5 Listings/month',
      'Reduced Commission (8%)'
    ],
    badge: '⭐'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Seller',
    price: 999,
    duration: '/month',
    color: '#f59e0b',
    features: [
      'Unlimited Active Listings',
      'Verified Business Badge',
      'Dedicated Account Manager',
      'Real-time Analytics',
      'Priority Homepage Placement',
      'Unlimited Listing Boosts',
      'Lowest Commission (5%)',
      'API Access',
      'White-label Options'
    ],
    badge: '👑'
  }
]

const stats = [
  { icon: Eye, value: '10x', label: 'More Visibility', description: 'Than regular sellers' },
  { icon: Users, value: '50K+', label: 'Active Buyers', description: 'Looking for products' },
  { icon: BarChart3, value: '3x', label: 'Sales Boost', description: 'Average increase' },
  { icon: TrendingUp, value: '₹2L+', label: 'Monthly Earning', description: 'Top seller average' }
]

function EliteSellerPage() {
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
      <div className="elite-seller-page">
        <div className="success-container">
          <div className="success-icon">
            <Store size={48} />
          </div>
          <h1>Welcome, Elite Seller! 🚀</h1>
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

          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <div className="actions-grid">
              <button className="action-card">
                <Package size={24} />
                <span>Add Listing</span>
              </button>
              <button className="action-card">
                <Zap size={24} />
                <span>Boost Product</span>
              </button>
              <button className="action-card">
                <BarChart3 size={24} />
                <span>View Analytics</span>
              </button>
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
    <div className="elite-seller-page">
      <div className="page-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <Store size={24} />
            <span>ELITE SELLER</span>
          </div>
          <h1>Grow Your Business with <span className="highlight">Elite Tools</span></h1>
          <p>Get more visibility, sell faster, and earn more with premium seller features</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="plans-section">
          <h2>Choose Your Seller Plan</h2>
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
                    Best for Growth
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

        {/* Comparison Table */}
        <div className="comparison-section">
          <h3>Why Go Elite?</h3>
          <div className="comparison-table">
            <div className="comparison-row header">
              <div className="feature-name">Feature</div>
              <div className="regular">Regular</div>
              <div className="elite">Elite</div>
            </div>
            <div className="comparison-row">
              <div className="feature-name">Active Listings</div>
              <div className="regular">5</div>
              <div className="elite">100+</div>
            </div>
            <div className="comparison-row">
              <div className="feature-name">Commission Rate</div>
              <div className="regular">15%</div>
              <div className="elite">5-8%</div>
            </div>
            <div className="comparison-row">
              <div className="feature-name">Homepage Visibility</div>
              <div className="regular">—</div>
              <div className="elite"><Check size={18} /></div>
            </div>
            <div className="comparison-row">
              <div className="feature-name">Seller Badge</div>
              <div className="regular">—</div>
              <div className="elite"><Check size={18} /></div>
            </div>
            <div className="comparison-row">
              <div className="feature-name">Analytics Dashboard</div>
              <div className="regular">Basic</div>
              <div className="elite">Advanced</div>
            </div>
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
                  <Store size={20} />
                  Become Elite Seller
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h3>Trusted by Top Sellers</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">RS</div>
                <div>
                  <strong>Rahul Sharma</strong>
                  <span>Recycler Pro</span>
                </div>
              </div>
              <p>"Sales increased 3x after becoming an Elite Seller. The visibility boost is incredible!"</p>
              <div className="stars">★★★★★</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">PM</div>
                <div>
                  <strong>Priya Mehta</strong>
                  <span>Vintage Collector</span>
                </div>
              </div>
              <p>"The reduced commission alone pays for the subscription. Best investment for my shop."</p>
              <div className="stars">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .elite-seller-page {
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
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b5cf6;
          margin: 0 auto 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--text-tertiary);
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
          margin-bottom: 3rem;
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
          white-space: nowrap;
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

        .comparison-section {
          background: var(--bg-secondary);
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .comparison-section h3 {
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .comparison-table {
          max-width: 600px;
          margin: 0 auto;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .comparison-row.header {
          font-weight: 600;
          color: var(--text-primary);
        }

        .feature-name {
          color: var(--text-secondary);
        }

        .comparison-row .regular {
          text-align: center;
          color: var(--text-tertiary);
        }

        .comparison-row .elite {
          text-align: center;
          color: var(--eco-primary);
          font-weight: 600;
        }

        .comparison-row .elite svg {
          color: var(--eco-primary);
        }

        .cta-section {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
          color: #8b5cf6;
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

        .testimonials-section {
          text-align: center;
        }

        .testimonials-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .testimonial-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: left;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .testimonial-header .avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
        }

        .testimonial-header strong {
          display: block;
          color: var(--text-primary);
        }

        .testimonial-header span {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .testimonial-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .stars {
          color: #f59e0b;
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
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
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
          color: #8b5cf6;
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

        .quick-actions h4 {
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border: none;
          border-radius: 0.75rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-card:hover {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
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
          .elite-seller-page {
            padding: 1rem;
          }

          .hero-section h1 {
            font-size: 1.75rem;
          }

          .stats-grid {
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

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default EliteSellerPage
