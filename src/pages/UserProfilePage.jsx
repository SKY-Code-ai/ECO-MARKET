import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  User,
  MapPin,
  Calendar,
  Star,
  Award,
  Package,
  Heart,
  ShoppingCart,
  DollarSign,
  Users,
  UserPlus,
  UserMinus,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Shield,
  CheckCircle,
  Leaf,
  Trophy,
  ChevronRight,
  ArrowLeft
} from 'lucide-react'

// Mock user profiles
const mockProfiles = {
  'user123': {
    id: 'user123',
    fullName: 'Priya Sharma',
    username: 'priyasharma',
    email: 'priya@eco.com',
    location: 'Mumbai, Maharashtra',
    joinedAt: '2025-06-15',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    isPublic: true,
    isVerified: true,
    bio: 'Passionate about sustainable living and recycling. 🌱 Vintage collector and eco-warrior.',
    ecoScore: 3450,
    level: 17,
    badges: ['Recycler Pro', 'Community Leader', 'Top Seller', 'Eco Champion'],
    stats: {
      donations: 78,
      sales: 45,
      purchases: 123,
      followers: 234,
      following: 89
    },
    listings: [
      { id: 1, title: 'Vintage Ceramic Vase', price: 850, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=200&h=200&fit=crop' },
      { id: 2, title: 'Recycled Paper Art', price: 450, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=200&h=200&fit=crop' },
      { id: 3, title: 'Upcycled Furniture', price: 2500, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop' }
    ],
    recentActivity: [
      { type: 'donation', text: 'Donated 10 plastic bottles', time: '2 hours ago' },
      { type: 'sale', text: 'Sold vintage lamp', time: '1 day ago' },
      { type: 'badge', text: 'Earned "Eco Champion" badge', time: '3 days ago' }
    ]
  },
  'user456': {
    id: 'user456',
    fullName: 'Rahul Verma',
    username: 'rahulverma',
    email: 'rahul@eco.com',
    location: 'Delhi, NCR',
    joinedAt: '2025-03-10',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    isPublic: true,
    isVerified: true,
    bio: 'Waste management enthusiast. Turning trash into treasure since 2020.',
    ecoScore: 5670,
    level: 24,
    badges: ['Elite Seller', 'Bulk Trader', 'Verified Business'],
    stats: {
      donations: 156,
      sales: 234,
      purchases: 89,
      followers: 567,
      following: 123
    },
    listings: [
      { id: 1, title: 'E-waste Bundle', price: 1200, image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=200&h=200&fit=crop' },
      { id: 2, title: 'Industrial Scrap Metal', price: 5000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' }
    ],
    recentActivity: []
  }
}

function UserProfilePage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('listings')

  useEffect(() => {
    // Simulate API call
    const loadProfile = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundProfile = mockProfiles[userId]
      if (foundProfile) {
        setProfile(foundProfile)
        setIsFollowing(false) // Check if current user follows this profile
      }
      setLoading(false)
    }
    
    loadProfile()
  }, [userId])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    if (profile) {
      setProfile({
        ...profile,
        stats: {
          ...profile.stats,
          followers: isFollowing ? profile.stats.followers - 1 : profile.stats.followers + 1
        }
      })
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile?.fullName} on EcoMarket`,
          text: `Check out ${profile?.fullName}'s profile on EcoMarket!`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Profile link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner-lg"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="profile-not-found">
        <User size={64} />
        <h2>Profile Not Found</h2>
        <p>This user doesn't exist or their profile is private.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === profile.id

  return (
    <div className="user-profile-page">
      <div className="page-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="cover-gradient"></div>
          </div>
          
          <div className="profile-info">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img src={profile.profilePicture} alt={profile.fullName} className="profile-avatar" />
                <span className="level-badge">Lv {profile.level}</span>
              </div>
            </div>

            <div className="info-section">
              <div className="name-row">
                <h1>{profile.fullName}</h1>
                {profile.isVerified && (
                  <span className="verified-badge">
                    <CheckCircle size={18} />
                  </span>
                )}
              </div>
              <p className="username">@{profile.username}</p>

              <div className="meta-row">
                <span className="meta-item">
                  <MapPin size={14} />
                  {profile.location}
                </span>
                <span className="meta-item">
                  <Calendar size={14} />
                  Joined {new Date(profile.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              <p className="bio">{profile.bio}</p>

              {/* Stats */}
              <div className="stats-row">
                <div className="stat">
                  <strong>{profile.stats.followers}</strong>
                  <span>Followers</span>
                </div>
                <div className="stat">
                  <strong>{profile.stats.following}</strong>
                  <span>Following</span>
                </div>
                <div className="stat">
                  <strong>{profile.stats.donations}</strong>
                  <span>Donations</span>
                </div>
                <div className="stat">
                  <strong>{profile.stats.sales}</strong>
                  <span>Sales</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="action-buttons">
                <button 
                  className={`btn-follow ${isFollowing ? 'following' : ''}`}
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus size={18} />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Follow
                    </>
                  )}
                </button>
                <button className="btn-message">
                  <MessageCircle size={18} />
                  Message
                </button>
                <button className="btn-share" onClick={handleShare}>
                  <Share2 size={18} />
                </button>
                <button className="btn-more">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Eco Score Card */}
        <div className="eco-score-card">
          <div className="eco-score-main">
            <div className="eco-icon">
              <Leaf size={24} />
            </div>
            <div>
              <span className="eco-label">Eco Score</span>
              <span className="eco-value">{profile.ecoScore.toLocaleString()}</span>
            </div>
          </div>
          <div className="eco-level">
            <Trophy size={18} />
            <span>Level {profile.level} Eco Warrior</span>
          </div>
        </div>

        {/* Badges */}
        <div className="badges-section">
          <h3>Badges & Achievements</h3>
          <div className="badges-grid">
            {profile.badges.map((badge, idx) => (
              <div key={idx} className="badge-item">
                <Award size={20} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <Package size={18} />
            Listings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <Star size={18} />
            Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div className="listings-grid">
            {profile.listings.length === 0 ? (
              <div className="empty-tab">
                <Package size={48} />
                <p>No active listings</p>
              </div>
            ) : (
              profile.listings.map(listing => (
                <div key={listing.id} className="listing-card">
                  <img src={listing.image} alt={listing.title} />
                  <div className="listing-info">
                    <h4>{listing.title}</h4>
                    <span className="listing-price">₹{listing.price.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-list">
            {profile.recentActivity.length === 0 ? (
              <div className="empty-tab">
                <Star size={48} />
                <p>No recent activity</p>
              </div>
            ) : (
              profile.recentActivity.map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'donation' && <Heart size={16} />}
                    {activity.type === 'sale' && <DollarSign size={16} />}
                    {activity.type === 'badge' && <Award size={16} />}
                  </div>
                  <div className="activity-content">
                    <p>{activity.text}</p>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        .user-profile-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-bottom: 2rem;
        }

        .page-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .back-btn:hover {
          color: var(--text-primary);
        }

        .profile-loading,
        .profile-not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          color: var(--text-secondary);
          text-align: center;
          gap: 1rem;
        }

        .profile-not-found svg {
          color: var(--text-tertiary);
        }

        .profile-not-found h2 {
          color: var(--text-primary);
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .profile-header {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .profile-cover {
          height: 180px;
          background: linear-gradient(135deg, var(--eco-primary), #0d9488, #0891b2);
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .cover-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }

        .profile-info {
          background: var(--bg-secondary);
          border-radius: 1.5rem;
          margin-top: -60px;
          margin-left: 1rem;
          margin-right: 1rem;
          padding: 1.5rem;
          position: relative;
        }

        .avatar-section {
          position: absolute;
          top: -50px;
          left: 1.5rem;
        }

        .avatar-wrapper {
          position: relative;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid var(--bg-secondary);
          background: var(--bg-tertiary);
        }

        .level-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: var(--eco-primary);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .info-section {
          margin-left: 120px;
          padding-top: 0.5rem;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .name-row h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .verified-badge {
          color: #3b82f6;
        }

        .username {
          color: var(--text-tertiary);
          font-size: 0.9rem;
          margin: 0.25rem 0 0.75rem;
        }

        .meta-row {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .bio {
          color: var(--text-primary);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .stats-row {
          display: flex;
          gap: 1.5rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat strong {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat span {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-follow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-follow.following {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .btn-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-share,
        .btn-more {
          width: 44px;
          height: 44px;
          border-radius: 0.75rem;
          border: none;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .eco-score-card {
          background: linear-gradient(135deg, var(--eco-primary), var(--eco-secondary));
          border-radius: 1rem;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          margin-bottom: 1.5rem;
        }

        .eco-score-main {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .eco-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .eco-label {
          display: block;
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .eco-value {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .eco-level {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .badges-section {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .badges-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .badges-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .profile-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          background: var(--bg-secondary);
          border: none;
          border-radius: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: var(--eco-primary);
          color: white;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .listing-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
        }

        .listing-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .listing-card img {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .listing-info {
          padding: 0.875rem;
        }

        .listing-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-price {
          font-weight: 700;
          color: var(--eco-primary);
        }

        .empty-tab {
          text-align: center;
          padding: 3rem;
          color: var(--text-tertiary);
        }

        .empty-tab svg {
          margin-bottom: 0.75rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 0.75rem;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activity-icon.donation {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .activity-icon.sale {
          background: rgba(16, 185, 129, 0.1);
          color: var(--eco-primary);
        }

        .activity-icon.badge {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .activity-content p {
          color: var(--text-primary);
          font-weight: 500;
          margin: 0 0 0.25rem;
        }

        .activity-content span {
          color: var(--text-tertiary);
          font-size: 0.8rem;
        }

        .spinner-lg {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top-color: var(--eco-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .profile-cover {
            height: 140px;
          }

          .info-section {
            margin-left: 0;
            margin-top: 60px;
          }

          .avatar-section {
            left: 50%;
            transform: translateX(-50%);
          }

          .name-row,
          .username,
          .meta-row {
            justify-content: center;
            text-align: center;
          }

          .meta-row {
            flex-wrap: wrap;
          }

          .bio {
            text-align: center;
          }

          .stats-row {
            justify-content: center;
          }

          .action-buttons {
            justify-content: center;
            flex-wrap: wrap;
          }

          .listings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default UserProfilePage
