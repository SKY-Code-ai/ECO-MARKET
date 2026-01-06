import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Leaf,
  Search,
  Mic,
  Camera,
  Home,
  ShoppingCart,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Award,
  Trophy,
  Users,
  Package,
  DollarSign,
  ShoppingBag,
  Plus
} from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications] = useState([
    { id: 1, type: 'follow', message: 'Priya Sharma started following you', time: '2 hours ago', read: false },
    { id: 2, type: 'sale', message: 'Your item "Plastic Bottles" was sold!', time: '5 hours ago', read: false },
    { id: 3, type: 'donation', message: 'Thank you for donating! +50 Eco Points', time: '1 day ago', read: true }
  ])
  
  const searchRef = useRef(null)
  const profileRef = useRef(null)
  const notificationRef = useRef(null)
  const fileInputRef = useRef(null)

  // Mock search suggestions
  const suggestions = [
    'Plastic bottles',
    'Electronic waste',
    'Vintage furniture',
    'Recycled paper',
    'Metal scrap',
    'Old clothes'
  ].filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Voice search
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        setShowSuggestions(true)
      }
      
      recognition.start()
    } else {
      alert('Voice search is not supported in your browser')
    }
  }

  // Image search
  const handleImageSearch = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Mock image search - in real app, this would use AI
      setSearchQuery('Similar items to uploaded image')
      setShowSuggestions(true)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <Leaf size={24} />
          </div>
          <span className="logo-text">
            Waste<span className="text-accent">2</span>Worth
          </span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search" ref={searchRef}>
          <form onSubmit={handleSearch} className="search-form">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search waste, vintage items, recycled products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              className="search-input"
            />
            
            <div className="search-actions">
              <button
                type="button"
                className={`search-btn ${isListening ? 'listening' : ''}`}
                onClick={startVoiceSearch}
                title="Voice Search"
              >
                <Mic size={18} />
              </button>
              
              <button
                type="button"
                className="search-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Image Search"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSearch}
                hidden
              />
            </div>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions animate-fadeIn">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(suggestion)
                    setShowSuggestions(false)
                    navigate(`/marketplace?search=${encodeURIComponent(suggestion)}`)
                  }}
                >
                  <Search size={16} />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div className={`navbar-links ${showMobileMenu ? 'show' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link 
            to="/marketplace" 
            className={`nav-link ${isActive('/marketplace') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <Package size={20} />
            <span>Marketplace</span>
          </Link>

          <Link 
            to="/sell" 
            className={`nav-link ${isActive('/sell') || isActive('/sell/new') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <DollarSign size={20} />
            <span>Sell</span>
          </Link>

          <Link 
            to="/sell/new" 
            className={`nav-link sell-new-link ${isActive('/sell/new') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <Plus size={20} />
            <span>List Item</span>
          </Link>

          <Link 
            to="/my-orders" 
            className={`nav-link ${isActive('/my-orders') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </Link>

          <Link 
            to="/cart" 
            className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            <span className="cart-badge">2</span>
          </Link>

          <Link 
            to="/help" 
            className={`nav-link ${isActive('/help') ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            <HelpCircle size={20} />
            <span>Help</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Notifications */}
          <div className="notification-dropdown" ref={notificationRef}>
            <button 
              className="nav-btn notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={22} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-menu animate-fadeInDown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <button className="mark-read-btn">Mark all read</button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="empty-notifications">
                      <Bell size={32} />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
                        <div className={`notif-icon ${notif.type}`}>
                          {notif.type === 'follow' && <User size={16} />}
                          {notif.type === 'sale' && <Package size={16} />}
                          {notif.type === 'donation' && <Award size={16} />}
                        </div>
                        <div className="notif-content">
                          <p>{notif.message}</p>
                          <span className="notif-time">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Link to="/notifications" className="view-all-link" onClick={() => setShowNotifications(false)}>
                  View All Notifications
                </Link>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown" ref={profileRef}>
            <button 
              className="profile-trigger"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.fullName} />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="profile-info hide-mobile">
                <span className="profile-name">{user?.fullName?.split(' ')[0] || 'User'}</span>
                <span className="profile-level">Level {user?.level || 1}</span>
              </div>
              <ChevronDown size={16} className="hide-mobile" />
            </button>

            {showProfileMenu && (
              <div className="profile-menu animate-fadeInDown">
                <div className="profile-menu-header">
                  <div className="profile-avatar-lg">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt={user.fullName} />
                    ) : (
                      <User size={32} />
                    )}
                  </div>
                  <div>
                    <p className="profile-menu-name">{user?.fullName || 'User'}</p>
                    <p className="profile-menu-email">{user?.email}</p>
                  </div>
                </div>

                <div className="profile-menu-stats">
                  <div className="stat">
                    <Award className="stat-icon" size={18} />
                    <span>{user?.ecoScore || 0} Points</span>
                  </div>
                  <div className="stat">
                    <Trophy className="stat-icon" size={18} />
                    <span>Level {user?.level || 1}</span>
                  </div>
                </div>

                <div className="profile-menu-divider"></div>

                <Link 
                  to="/profile" 
                  className="profile-menu-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User size={18} />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/leaderboard" 
                  className="profile-menu-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Trophy size={18} />
                  <span>Leaderboard</span>
                </Link>
                <Link 
                  to="/community" 
                  className="profile-menu-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                <div className="profile-menu-divider"></div>

                <button 
                  className="profile-menu-item logout-item"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
          padding: var(--space-3) 0;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-4);
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-shrink: 0;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text);
        }

        .navbar-search {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .search-form {
          display: flex;
          align-items: center;
          background: var(--color-gray-100);
          border: 2px solid transparent;
          border-radius: var(--radius-xl);
          padding: var(--space-2) var(--space-4);
          transition: all var(--transition-fast);
        }

        .search-form:focus-within {
          background: white;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
        }

        .search-icon {
          color: var(--color-gray-400);
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          border: none;
          background: none;
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-sm);
          outline: none;
        }

        .search-actions {
          display: flex;
          gap: var(--space-1);
        }

        .search-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-500);
          transition: all var(--transition-fast);
        }

        .search-btn:hover {
          background: var(--color-gray-200);
          color: var(--color-text);
        }

        .search-btn.listening {
          background: var(--color-error);
          color: white;
          animation: pulse 1s infinite;
        }

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          margin-top: var(--space-2);
          overflow: hidden;
          z-index: var(--z-dropdown);
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-3) var(--space-4);
          text-align: left;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .suggestion-item:hover {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
          position: relative;
        }

        .nav-link:hover {
          background: var(--color-gray-100);
          color: var(--color-text);
        }

        .nav-link.active {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .cart-link {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--color-error);
          color: white;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sell-new-link {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white !important;
          font-weight: 600;
        }

        .sell-new-link:hover {
          background: linear-gradient(135deg, #d97706, #b45309);
          color: white !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          position: relative;
          transition: all var(--transition-fast);
        }

        .nav-btn:hover {
          background: var(--color-gray-100);
          color: var(--color-text);
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: var(--color-error);
          color: white;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-dropdown {
          position: relative;
        }

        .notification-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 360px;
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          margin-top: var(--space-2);
          overflow: hidden;
          z-index: var(--z-dropdown);
        }

        .notification-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4);
          border-bottom: 1px solid var(--color-border);
        }

        .notification-header h4 {
          font-weight: 600;
          margin: 0;
        }

        .mark-read-btn {
          font-size: var(--text-xs);
          color: var(--color-primary);
          background: none;
          border: none;
          cursor: pointer;
        }

        .notification-list {
          max-height: 320px;
          overflow-y: auto;
        }

        .empty-notifications {
          text-align: center;
          padding: var(--space-8);
          color: var(--color-text-secondary);
        }

        .notification-item {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border-bottom: 1px solid var(--color-border);
          transition: background var(--transition-fast);
        }

        .notification-item:hover {
          background: var(--color-gray-50);
        }

        .notification-item.unread {
          background: var(--color-primary-50);
        }

        .notif-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-icon.follow {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .notif-icon.sale {
          background: rgba(16, 185, 129, 0.1);
          color: var(--color-primary);
        }

        .notif-icon.donation {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .notif-content p {
          font-size: var(--text-sm);
          margin: 0 0 var(--space-1);
          color: var(--color-text);
        }

        .notif-time {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .view-all-link {
          display: block;
          text-align: center;
          padding: var(--space-3);
          color: var(--color-primary);
          font-size: var(--text-sm);
          font-weight: 600;
          border-top: 1px solid var(--color-border);
        }

        .view-all-link:hover {
          background: var(--color-gray-50);
        }

        .profile-dropdown {
          position: relative;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-1);
          padding-right: var(--space-3);
          border-radius: var(--radius-xl);
          transition: all var(--transition-fast);
        }

        .profile-trigger:hover {
          background: var(--color-gray-100);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-primary-100);
          border: 2px solid var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: var(--color-primary);
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-info {
          text-align: left;
        }

        .profile-name {
          display: block;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text);
        }

        .profile-level {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-primary);
        }

        .profile-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          margin-top: var(--space-2);
          overflow: hidden;
          z-index: var(--z-dropdown);
        }

        .profile-menu-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-primary-50);
        }

        .profile-avatar-lg {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background: white;
          border: 2px solid var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: var(--color-primary);
        }

        .profile-avatar-lg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-menu-name {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--space-1);
        }

        .profile-menu-email {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .profile-menu-stats {
          display: flex;
          padding: var(--space-3) var(--space-4);
          gap: var(--space-4);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .stat-icon {
          color: var(--color-primary);
        }

        .profile-menu-divider {
          height: 1px;
          background: var(--color-border);
        }

        .profile-menu-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
          transition: all var(--transition-fast);
          width: 100%;
        }

        .profile-menu-item:hover {
          background: var(--color-gray-50);
          color: var(--color-text);
        }

        .logout-item:hover {
          background: rgba(239, 68, 68, 0.05);
          color: var(--color-error);
        }

        .mobile-menu-btn {
          display: none;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          color: var(--color-text);
        }

        @media (max-width: 1024px) {
          .navbar-links span,
          .hide-mobile {
            display: none;
          }

          .nav-link {
            padding: var(--space-2);
          }
        }

        @media (max-width: 768px) {
          .navbar-search {
            display: none;
          }

          .navbar-links {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: var(--space-4);
            border-bottom: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
          }

          .navbar-links.show {
            display: flex;
          }

          .navbar-links span {
            display: inline;
          }

          .nav-link {
            width: 100%;
            padding: var(--space-3) var(--space-4);
          }

          .mobile-menu-btn {
            display: flex;
          }

          .notification-btn {
            display: none;
          }
        }

        .main-content {
          padding-top: var(--space-4);
          min-height: calc(100vh - 70px);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
