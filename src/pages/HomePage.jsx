import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Gift,
  DollarSign,
  ShoppingBag,
  Clock,
  Trophy,
  Users,
  Leaf,
  TrendingUp,
  ArrowRight,
  Recycle,
  Heart,
  Sparkles,
  Zap,
  Target
} from 'lucide-react'

// Mock sustainability tips
const ecoTips = [
  "Reduce single-use plastics by carrying a reusable water bottle",
  "Compost food scraps to reduce landfill waste by up to 30%",
  "Donate old electronics instead of throwing them away",
  "Buy second-hand furniture to save trees and money",
  "Use cloth bags for shopping to reduce plastic consumption"
]

// Mock leaderboard data
const topUsers = [
  { name: 'Priya Sharma', score: 4520, avatar: '👩‍🌾', badge: '🥇' },
  { name: 'Rahul Patel', score: 3890, avatar: '👨‍💻', badge: '🥈' },
  { name: 'Anita Desai', score: 3450, avatar: '👩‍🔬', badge: '🥉' }
]

// Impact stats
const impactStats = [
  { label: 'Waste Recycled', value: '10.5M', unit: 'kg', icon: Recycle },
  { label: 'Items Donated', value: '1.2M', unit: 'items', icon: Heart },
  { label: 'CO₂ Saved', value: '5.8K', unit: 'tons', icon: Leaf },
  { label: 'Trees Saved', value: '52K', unit: 'trees', icon: Target }
]

function HomePage() {
  const { user } = useAuth()
  const [currentTip, setCurrentTip] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({})

  useEffect(() => {
    // Rotate tips
    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % ecoTips.length)
    }, 5000)

    return () => clearInterval(tipInterval)
  }, [])

  const actionCards = [
    {
      title: 'DONATE',
      description: 'Give your waste a new purpose. Help communities in need.',
      icon: Gift,
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e, #10b981)',
      link: '/donate',
      stats: '45K+ donations this month'
    },
    {
      title: 'SELL',
      description: 'Turn your trash into cash. Sell recyclables & more.',
      icon: DollarSign,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      link: '/sell',
      stats: 'Earn ₹500+ average'
    },
    {
      title: 'BUY ',
      description: 'Shop eco-friendly products made from recycled materials.',
      icon: ShoppingBag,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      link: '/marketplace',
      stats: '10K+ products available'
    },
    {
      title: 'VINTAGE ',
      description: 'Discover unique vintage treasures with a story.',
      icon: Clock,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      link: '/vintage',
      stats: 'Curated collections'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fadeInDown">
              <Sparkles size={16} />
              <span>Join 500K+ Eco Warriors</span>
            </div>
            
            <h1 className="hero-title animate-fadeInUp">
              Transform <span className="text-gradient">Waste</span> into{' '}
              <span className="text-accent">Worth</span>
            </h1>
            
            <p className="hero-subtitle animate-fadeInUp stagger-1">
              Welcome back, <strong>{user?.fullName?.split(' ')[0] || 'Eco Warrior'}</strong>! 
              Your eco-journey continues. Every action counts towards a sustainable future.
            </p>

            <div className="hero-stats animate-fadeInUp stagger-2">
              <div className="hero-stat">
                <Leaf className="stat-icon" />
                <div>
                  <span className="stat-value">{user?.ecoScore || 0}</span>
                  <span className="stat-label">Eco Points</span>
                </div>
              </div>
              <div className="hero-stat">
                <Trophy className="stat-icon" />
                <div>
                  <span className="stat-value">Level {user?.level || 1}</span>
                  <span className="stat-label">Eco Warrior</span>
                </div>
              </div>
              <div className="hero-stat">
                <TrendingUp className="stat-icon" />
                <div>
                  <span className="stat-value">{user?.donations || 0}</span>
                  <span className="stat-label">Donations</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-globe-container">
              <img 
                src="/eco-earth-globe.png" 
                alt="Eco Earth Globe" 
                className="hero-globe-image"
              />
            </div>
            <div className="floating-icons">
              <div className="float-icon" style={{ '--delay': '0s' }}>🌱</div>
              <div className="float-icon" style={{ '--delay': '0.5s' }}>♻️</div>
              <div className="float-icon" style={{ '--delay': '1s' }}>🌍</div>
              <div className="float-icon" style={{ '--delay': '1.5s' }}>💚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="action-section">
        <div className="container">
          <div className="section-header">
            <h2>What would you like to do today?</h2>
            <p className="text-muted">Choose an action to make an impact</p>
          </div>

          <div className="action-grid">
            {actionCards.map((card, index) => (
              <Link 
                to={card.link} 
                key={index}
                className="action-card animate-fadeInUp"
                style={{ 
                  '--delay': `${index * 0.1}s`,
                  '--card-color': card.color 
                }}
              >
                <div className="action-icon" style={{ background: card.gradient }}>
                  <card.icon size={28} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="action-footer">
                  <span className="action-stats">{card.stats}</span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2>Community Impact</h2>
            <p className="text-muted">Together, we're making a difference</p>
          </div>

          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div 
                key={index} 
                className="impact-card animate-scaleIn"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="impact-icon">
                  <stat.icon size={28} />
                </div>
                <div className="impact-value">{stat.value}</div>
                <div className="impact-unit">{stat.unit}</div>
                <div className="impact-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="leaderboard-section">
        <div className="container">
          <div className="leaderboard-grid">
            <div className="leaderboard-card card">
              <div className="card-header">
                <Trophy className="header-icon" />
                <h3>Top Eco Warriors</h3>
                <Link to="/leaderboard" className="view-all">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="leaderboard-list">
                {topUsers.map((user, index) => (
                  <div key={index} className="leaderboard-item">
                    <span className="rank">{user.badge}</span>
                    <span className="avatar">{user.avatar}</span>
                    <div className="user-info">
                      <span className="name">{user.name}</span>
                      <span className="score">{user.score.toLocaleString()} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Tip Card */}
            <div className="eco-tip-card card-gradient">
              <div className="tip-header">
                <Zap className="tip-icon" />
                <span>AI Eco Tip</span>
              </div>
              <p className="tip-content">{ecoTips[currentTip]}</p>
              <div className="tip-dots">
                {ecoTips.map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${index === currentTip ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="container">
          <div className="community-banner">
            <div className="banner-content">
              <Users size={48} className="banner-icon" />
              <h2>Join Your Local Eco Community</h2>
              <p>Connect with neighbors, participate in challenges, and make a collective impact</p>
              <Link to="/community" className="btn btn-primary btn-lg">
                Explore Communities
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="banner-visual">
              <div className="community-avatars">
                <span>👨‍🌾</span>
                <span>👩‍🔬</span>
                <span>👨‍💻</span>
                <span>👩‍🎨</span>
                <span>+5K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          padding-bottom: var(--space-16);
        }

        /* Hero Section */
        .hero-section {
          padding: var(--space-12) 0 var(--space-16);
          position: relative;
          overflow: hidden;
        }

        .hero-section .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          align-items: center;
        }

        @media (max-width: 968px) {
          .hero-section .container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-visual {
            display: none;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-primary-100);
          color: var(--color-primary-dark);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-4);
        }

        .hero-title {
          font-size: var(--text-6xl);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: var(--space-6);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: var(--text-4xl);
          }
        }

        .hero-subtitle {
          font-size: var(--text-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-8);
          max-width: 500px;
        }

        @media (max-width: 968px) {
          .hero-subtitle {
            margin: 0 auto var(--space-8);
          }
        }

        .hero-stats {
          display: flex;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        @media (max-width: 968px) {
          .hero-stats {
            justify-content: center;
          }
        }

        .hero-stat {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
        }

        .hero-stat .stat-icon {
          color: var(--color-primary);
        }

        .hero-stat .stat-value {
          display: block;
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text);
        }

        .hero-stat .stat-label {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .hero-visual {
          position: relative;
          height: 400px;
        }

        .hero-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-full);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.2;
        }

        .hero-globe-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(220,252,231,0.8));
          padding: 15px;
          box-shadow: 
            0 0 60px rgba(34, 197, 94, 0.3),
            0 0 100px rgba(34, 197, 94, 0.15),
            0 25px 50px rgba(0, 0, 0, 0.15),
            inset 0 0 30px rgba(255, 255, 255, 0.5);
          border: 3px solid rgba(34, 197, 94, 0.3);
          animation: floatGlobe 4s ease-in-out infinite;
        }

        .hero-globe-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
        }

        @keyframes floatGlobe {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
            box-shadow: 
              0 0 60px rgba(34, 197, 94, 0.3),
              0 0 100px rgba(34, 197, 94, 0.15),
              0 25px 50px rgba(0, 0, 0, 0.15),
              inset 0 0 30px rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
            box-shadow: 
              0 0 80px rgba(34, 197, 94, 0.4),
              0 0 120px rgba(34, 197, 94, 0.2),
              0 40px 60px rgba(0, 0, 0, 0.1),
              inset 0 0 40px rgba(255, 255, 255, 0.6);
          }
        }

        .floating-icons {
          position: absolute;
          inset: 0;
        }

        .float-icon {
          position: absolute;
          font-size: 3rem;
          animation: float 3s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .float-icon:nth-child(1) { top: 10%; left: 20%; }
        .float-icon:nth-child(2) { top: 20%; right: 20%; }
        .float-icon:nth-child(3) { bottom: 20%; left: 30%; }
        .float-icon:nth-child(4) { bottom: 30%; right: 30%; }

        /* Action Section */
        .action-section {
          padding: var(--space-12) 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: var(--space-10);
        }

        .section-header h2 {
          margin-bottom: var(--space-2);
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 1024px) {
          .action-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .action-grid {
            grid-template-columns: 1fr;
          }
        }

        .action-card {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          border: 2px solid var(--color-border);
          transition: all var(--transition-base);
          animation-delay: var(--delay);
          position: relative;
          overflow: hidden;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-color);
          transform: scaleX(0);
          transition: transform var(--transition-base);
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--card-color);
        }

        .action-card:hover::before {
          transform: scaleX(1);
        }

        .action-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: var(--space-4);
        }

        .action-card h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-2);
        }

        .action-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
          line-height: 1.6;
        }

        .action-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .action-stats {
          font-size: var(--text-xs);
          color: var(--color-primary);
          font-weight: 600;
        }

        .action-footer svg {
          color: var(--color-gray-400);
          transition: transform var(--transition-fast);
        }

        .action-card:hover .action-footer svg {
          transform: translateX(4px);
          color: var(--card-color);
        }

        /* Impact Section */
        .impact-section {
          padding: var(--space-12) 0;
          background: var(--color-bg-tertiary);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 768px) {
          .impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .impact-card {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          border: 1px solid var(--color-border);
          animation-delay: var(--delay);
        }

        .impact-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto var(--space-4);
          background: var(--color-primary-100);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }

        .impact-value {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 800;
          color: var(--color-text);
        }

        .impact-unit {
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 600;
        }

        .impact-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }

        /* Leaderboard Section */
        .leaderboard-section {
          padding: var(--space-12) 0;
        }

        .leaderboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-6);
        }

        @media (max-width: 768px) {
          .leaderboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .leaderboard-card {
          padding: var(--space-6);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }

        .header-icon {
          color: var(--color-accent);
        }

        .card-header h3 {
          flex: 1;
          font-size: var(--text-lg);
        }

        .view-all {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 500;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
        }

        .leaderboard-item .rank {
          font-size: var(--text-xl);
        }

        .leaderboard-item .avatar {
          font-size: var(--text-2xl);
        }

        .leaderboard-item .user-info {
          flex: 1;
        }

        .leaderboard-item .name {
          display: block;
          font-weight: 600;
        }

        .leaderboard-item .score {
          display: block;
          font-size: var(--text-sm);
          color: var(--color-primary);
        }

        .eco-tip-card {
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          color: var(--color-primary);
          font-weight: 600;
        }

        .tip-icon {
          color: var(--color-accent);
        }

        .tip-content {
          font-size: var(--text-lg);
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: var(--space-6);
        }

        .tip-dots {
          display: flex;
          gap: var(--space-2);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-gray-300);
          transition: all var(--transition-fast);
        }

        .dot.active {
          background: var(--color-primary);
          width: 24px;
        }

        /* Community Section */
        .community-section {
          padding: var(--space-12) 0;
        }

        .community-banner {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 768px) {
          .community-banner {
            flex-direction: column;
            text-align: center;
            gap: var(--space-8);
          }
        }

        .banner-icon {
          margin-bottom: var(--space-4);
          opacity: 0.9;
        }

        .banner-content h2 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .banner-content p {
          opacity: 0.9;
          margin-bottom: var(--space-6);
          max-width: 400px;
        }

        .banner-content .btn {
          background: white;
          color: var(--color-primary);
        }

        .banner-content .btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }

        .community-avatars {
          display: flex;
          gap: var(--space-1);
        }

        .community-avatars span {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-2xl);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .community-avatars span:last-child {
          font-size: var(--text-sm);
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

export default HomePage
