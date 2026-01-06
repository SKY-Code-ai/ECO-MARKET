import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home,
  Building2,
  CreditCard,
  Globe,
  Heart,
  Package,
  Share2,
  Users,
  Wallet,
  Settings,
  Star,
  FileText,
  HelpCircle,
  Gift,
  Crown,
  LogOut,
  X,
  ChevronRight,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react'

function Sidebar({ isOpen, onClose, darkMode, toggleDarkMode }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  const menuItems = [
    { section: 'Main', items: [
      { path: '/', label: 'Home', icon: Home },
      { path: '/marketplace', label: 'Marketplace', icon: Package },
    ]},
    { section: 'Financial', items: [
      { path: '/wallet', label: 'Wallet', icon: Wallet, badge: `₹${user?.walletBalance || 0}` },
      { path: '/bank', label: 'Bank & UPI', icon: Building2 },
      { path: '/payments', label: 'Payment & Refund', icon: CreditCard },
    ]},
    { section: 'My Items', items: [
      { path: '/wishlist', label: 'Wishlist', icon: Heart },
      { path: '/my-orders', label: 'My Orders', icon: Package },
      { path: '/shared', label: 'Shared Products', icon: Share2 },
      { path: '/my-ads', label: 'My Ads', icon: Sparkles },
    ]},
    { section: 'Social', items: [
      { path: '/following', label: 'Followed Users', icon: Users },
      { path: '/community', label: 'Community', icon: Users },
      { path: '/leaderboard', label: 'Leaderboard', icon: Star },
    ]},
    { section: 'Account', items: [
      { path: '/settings', label: 'Settings', icon: Settings },
      { path: '/language', label: 'Change Language', icon: Globe },
      { path: '/help', label: 'Help Centre', icon: HelpCircle },
    ]},
    { section: 'Premium', items: [
      { path: '/elite-buyer', label: 'Elite Buyer', icon: Crown, premium: true },
      { path: '/elite-seller', label: 'Elite Seller', icon: Crown, premium: true },
      { path: '/refer', label: 'Refer & Earn', icon: Gift },
    ]},
    { section: 'Other', items: [
      { path: '/rate', label: 'Rate Website', icon: Star },
      { path: '/policies', label: 'Legal & Policies', icon: FileText },
    ]}
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.fullName} />
              ) : (
                <span>{user?.fullName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className="user-details">
              <h3>{user?.fullName || 'User'}</h3>
              <span className="user-level">Level {user?.level || 1} • {user?.ecoScore || 0} pts</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="theme-toggle" onClick={toggleDarkMode}>
          <div className="toggle-track">
            <Sun size={16} className="toggle-icon sun" />
            <Moon size={16} className="toggle-icon moon" />
            <div className={`toggle-thumb ${darkMode ? 'dark' : ''}`}></div>
          </div>
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <span className="section-title">{section.section}</span>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${item.premium ? 'premium' : ''}`}
                      onClick={onClose}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                      {item.badge && <span className="nav-badge">{item.badge}</span>}
                      {item.premium && <Crown size={14} className="premium-icon" />}
                      <ChevronRight size={16} className="chevron" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-base);
          z-index: 998;
        }

        .sidebar-backdrop.open {
          opacity: 1;
          visibility: visible;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 320px;
          height: 100vh;
          background: var(--color-bg-primary);
          box-shadow: var(--shadow-2xl);
          transform: translateX(-100%);
          transition: transform var(--transition-base);
          z-index: 999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-6);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-size: var(--text-xl);
          font-weight: 700;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details h3 {
          color: white;
          font-size: var(--text-lg);
          margin-bottom: var(--space-1);
        }

        .user-level {
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .close-btn {
          color: white;
          opacity: 0.8;
          transition: opacity var(--transition-fast);
        }

        .close-btn:hover {
          opacity: 1;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          border-bottom: 1px solid var(--color-border);
          cursor: pointer;
        }

        .toggle-track {
          width: 56px;
          height: 28px;
          background: var(--color-gray-200);
          border-radius: var(--radius-full);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--space-2);
        }

        .toggle-icon {
          color: var(--color-gray-500);
          z-index: 1;
        }

        .toggle-icon.sun {
          color: var(--color-accent);
        }

        .toggle-thumb {
          position: absolute;
          width: 22px;
          height: 22px;
          background: white;
          border-radius: var(--radius-full);
          left: 3px;
          transition: transform var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .toggle-thumb.dark {
          transform: translateX(28px);
        }

        .theme-toggle span {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4) 0;
        }

        .nav-section {
          margin-bottom: var(--space-4);
        }

        .section-title {
          display: block;
          padding: var(--space-2) var(--space-6);
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          letter-spacing: 0.05em;
        }

        .nav-section ul {
          list-style: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-6);
          color: var(--color-text);
          transition: all var(--transition-fast);
        }

        .nav-link:hover {
          background: var(--color-gray-100);
        }

        .nav-link.active {
          background: var(--color-primary-50);
          color: var(--color-primary);
          border-right: 3px solid var(--color-primary);
        }

        .nav-link span:first-of-type {
          flex: 1;
        }

        .nav-badge {
          padding: var(--space-1) var(--space-2);
          background: var(--color-primary);
          color: white;
          font-size: var(--text-xs);
          font-weight: 600;
          border-radius: var(--radius-sm);
        }

        .nav-link.premium {
          color: var(--color-accent);
        }

        .premium-icon {
          color: var(--color-accent);
        }

        .chevron {
          color: var(--color-gray-400);
        }

        .sidebar-footer {
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-3);
          color: var(--color-error);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </>
  )
}

export default Sidebar
