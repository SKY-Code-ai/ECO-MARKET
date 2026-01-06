import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Camera,
  Edit2,
  Save,
  X,
  Award,
  Trophy,
  Gift,
  ShoppingCart,
  DollarSign,
  Users,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Star,
  Target,
  Zap
} from 'lucide-react'

function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    location: user?.location || '',
    language: user?.language || 'en'
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    await updateProfile(formData)
    setIsEditing(false)
  }

  // Mock activity data
  const activities = {
    donations: [
      { item: 'Old Clothes Bundle', date: '2025-12-28', points: 50, status: 'completed' },
      { item: 'Electronic Waste', date: '2025-12-25', points: 100, status: 'completed' },
      { item: 'Books Collection', date: '2025-12-20', points: 30, status: 'completed' }
    ],
    sales: [
      { item: 'Scrap Metal', amount: 450, date: '2025-12-27', status: 'completed' },
      { item: 'Plastic Bottles', amount: 120, date: '2025-12-22', status: 'completed' }
    ],
    purchases: [
      { item: 'Recycled Notebook Set', amount: 199, date: '2025-12-29', status: 'delivered' },
      { item: 'Eco-Friendly Bag', amount: 299, date: '2025-12-26', status: 'delivered' },
      { item: 'Vintage Lamp', amount: 850, date: '2025-12-18', status: 'delivered' }
    ]
  }

  const badges = [
    { name: 'Early Adopter', icon: '🌟', description: 'Joined in the first month', earned: true },
    { name: 'Recycler Pro', icon: '♻️', description: 'Recycled 100+ kg waste', earned: true },
    { name: 'Community Leader', icon: '👑', description: 'Top 10 in your community', earned: true },
    { name: 'Eco Champion', icon: '🏆', description: 'Reached Level 10', earned: user?.level >= 10 },
    { name: 'Donation Hero', icon: '💝', description: '50+ donations made', earned: user?.donations >= 50 },
    { name: 'Green Warrior', icon: '🌿', description: '1000+ eco points', earned: user?.ecoScore >= 1000 }
  ]

  const levelProgress = ((user?.ecoScore || 0) % 200) / 200 * 100
  const pointsToNextLevel = 200 - ((user?.ecoScore || 0) % 200)

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-card card">
              <div className="profile-avatar-section">
                <div className="profile-avatar-wrapper">
                  <div className="profile-avatar-lg">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt={user.fullName} />
                    ) : (
                      <User size={48} />
                    )}
                  </div>
                  <button className="avatar-edit-btn">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="profile-name">{user?.fullName || 'User'}</h2>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-level-badge">
                  <Trophy size={16} />
                  <span>Level {user?.level || 1} Eco Warrior</span>
                </div>
              </div>

              <div className="eco-score-section">
                <div className="eco-score-header">
                  <span>Eco Score</span>
                  <span className="eco-score-value">{user?.ecoScore || 0}</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="level-progress-text">
                  {pointsToNextLevel} points to Level {(user?.level || 1) + 1}
                </p>
              </div>

              <div className="profile-stats-grid">
                <div className="stat-item">
                  <Gift className="stat-icon" />
                  <span className="stat-value">{user?.donations || 0}</span>
                  <span className="stat-label">Donations</span>
                </div>
                <div className="stat-item">
                  <DollarSign className="stat-icon" />
                  <span className="stat-value">{user?.sales || 0}</span>
                  <span className="stat-label">Sales</span>
                </div>
                <div className="stat-item">
                  <ShoppingCart className="stat-icon" />
                  <span className="stat-value">{user?.purchases || 0}</span>
                  <span className="stat-label">Purchases</span>
                </div>
              </div>
            </div>

            <nav className="profile-nav card">
              <button 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <User size={20} />
                <span>Overview</span>
                <ChevronRight size={16} />
              </button>
              <button 
                className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                <Zap size={20} />
                <span>Activity</span>
                <ChevronRight size={16} />
              </button>
              <button 
                className={`nav-item ${activeTab === 'badges' ? 'active' : ''}`}
                onClick={() => setActiveTab('badges')}
              >
                <Award size={20} />
                <span>Badges</span>
                <ChevronRight size={16} />
              </button>
              <button 
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={20} />
                <span>Settings</span>
                <ChevronRight size={16} />
              </button>
              <div className="nav-divider"></div>
              <button className="nav-item logout" onClick={logout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="profile-main">
            {activeTab === 'overview' && (
              <div className="profile-content animate-fadeIn">
                <div className="content-header">
                  <h2>Profile Details</h2>
                  {!isEditing ? (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button 
                        className="btn btn-ghost"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            fullName: user?.fullName || '',
                            email: user?.email || '',
                            mobile: user?.mobile || '',
                            location: user?.location || '',
                            language: user?.language || 'en'
                          })
                        }}
                      >
                        <X size={18} />
                        Cancel
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={handleSave}
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="card">
                  <div className="details-grid">
                    <div className="detail-item">
                      <label>
                        <User size={18} />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          className="form-input"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{user?.fullName || 'Not set'}</p>
                      )}
                    </div>

                    <div className="detail-item">
                      <label>
                        <Mail size={18} />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <p>{user?.email}</p>
                      )}
                    </div>

                    <div className="detail-item">
                      <label>
                        <Phone size={18} />
                        Mobile Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="mobile"
                          className="form-input"
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{user?.mobile || 'Not set'}</p>
                      )}
                    </div>

                    <div className="detail-item">
                      <label>
                        <MapPin size={18} />
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          className="form-input"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{user?.location || 'Not set'}</p>
                      )}
                    </div>

                    <div className="detail-item">
                      <label>
                        <Calendar size={18} />
                        Date of Birth
                      </label>
                      <p>{user?.dob || 'Not set'}</p>
                    </div>

                    <div className="detail-item">
                      <label>
                        <Globe size={18} />
                        Language
                      </label>
                      {isEditing ? (
                        <select
                          name="language"
                          className="form-input form-select"
                          value={formData.language}
                          onChange={handleChange}
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="mr">Marathi</option>
                        </select>
                      ) : (
                        <p>{formData.language === 'en' ? 'English' : formData.language === 'hi' ? 'Hindi' : 'Marathi'}</p>
                      )}
                    </div>

                    <div className="detail-item">
                      <label>
                        <Users size={18} />
                        Community
                      </label>
                      <p>{user?.communityId ? 'Mumbai Central' : 'Not joined'}</p>
                    </div>

                    <div className="detail-item">
                      <label>
                        <Calendar size={18} />
                        Member Since
                      </label>
                      <p>{user?.joinedAt || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="profile-content animate-fadeIn">
                <div className="content-header">
                  <h2>Activity History</h2>
                </div>

                <div className="activity-tabs">
                  <button className="activity-tab active">
                    <Gift size={18} />
                    Donations
                  </button>
                  <button className="activity-tab">
                    <DollarSign size={18} />
                    Sales
                  </button>
                  <button className="activity-tab">
                    <ShoppingCart size={18} />
                    Purchases
                  </button>
                </div>

                <div className="card">
                  <div className="activity-list">
                    {activities.donations.map((item, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon donation">
                          <Gift size={20} />
                        </div>
                        <div className="activity-info">
                          <h4>{item.item}</h4>
                          <p>{item.date}</p>
                        </div>
                        <div className="activity-meta">
                          <span className="points">+{item.points} pts</span>
                          <span className={`status ${item.status}`}>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="profile-content animate-fadeIn">
                <div className="content-header">
                  <h2>Badges & Achievements</h2>
                </div>

                <div className="badges-grid">
                  {badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className={`badge-card card ${badge.earned ? 'earned' : 'locked'}`}
                    >
                      <div className="badge-icon">{badge.icon}</div>
                      <h4>{badge.name}</h4>
                      <p>{badge.description}</p>
                      {badge.earned ? (
                        <span className="badge badge-success">Earned</span>
                      ) : (
                        <span className="badge">Locked</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="profile-content animate-fadeIn">
                <div className="content-header">
                  <h2>Settings</h2>
                </div>

                <div className="settings-section card">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <Bell size={20} />
                      <div>
                        <h4>Push Notifications</h4>
                        <p>Receive notifications about orders and updates</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <Mail size={20} />
                      <div>
                        <h4>Email Updates</h4>
                        <p>Receive weekly eco tips and community updates</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-section card">
                  <h3>Privacy & Security</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <Shield size={20} />
                      <div>
                        <h4>Profile Visibility</h4>
                        <p>Allow others to see your profile</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <MapPin size={20} />
                      <div>
                        <h4>Location Sharing</h4>
                        <p>Share location for better matches</p>
                      </div>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-error w-full">
                  <LogOut size={18} />
                  Logout from all devices
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        .profile-page {
          padding: var(--space-8) 0;
        }

        .profile-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: var(--space-6);
        }

        @media (max-width: 968px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }
        }

        .profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .profile-card {
          text-align: center;
        }

        .profile-avatar-section {
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-6);
        }

        .profile-avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto var(--space-4);
        }

        .profile-avatar-lg {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-full);
          background: var(--color-primary-100);
          border: 4px solid var(--color-primary);
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

        .avatar-edit-btn {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 36px;
          height: 36px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-md);
          transition: all var(--transition-fast);
        }

        .avatar-edit-btn:hover {
          transform: scale(1.1);
        }

        .profile-name {
          font-size: var(--text-xl);
          margin-bottom: var(--space-1);
        }

        .profile-email {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }

        .profile-level-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .eco-score-section {
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-6);
        }

        .eco-score-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2);
        }

        .eco-score-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-primary);
        }

        .level-progress-text {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-2);
        }

        .profile-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }

        .stat-item {
          text-align: center;
        }

        .stat-item .stat-icon {
          color: var(--color-primary);
          margin-bottom: var(--space-2);
        }

        .stat-item .stat-value {
          display: block;
          font-size: var(--text-xl);
          font-weight: 700;
        }

        .stat-item .stat-label {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .profile-nav {
          padding: var(--space-2);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .nav-item span {
          flex: 1;
          text-align: left;
        }

        .nav-item:hover {
          background: var(--color-gray-100);
          color: var(--color-text);
        }

        .nav-item.active {
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .nav-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-error);
        }

        .nav-divider {
          height: 1px;
          background: var(--color-border);
          margin: var(--space-2) 0;
        }

        .profile-main {
          min-height: 600px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-6);
        }

        .edit-actions {
          display: flex;
          gap: var(--space-2);
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 600px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }

        .detail-item label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }

        .detail-item p {
          font-weight: 500;
        }

        .activity-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .activity-tab {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .activity-tab.active {
          background: var(--color-primary);
          color: white;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
        }

        .activity-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .activity-icon.donation {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        }

        .activity-info {
          flex: 1;
        }

        .activity-info h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .activity-info p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .activity-meta {
          text-align: right;
        }

        .activity-meta .points {
          display: block;
          font-weight: 600;
          color: var(--color-primary);
        }

        .activity-meta .status {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          text-transform: capitalize;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 768px) {
          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .badges-grid {
            grid-template-columns: 1fr;
          }
        }

        .badge-card {
          text-align: center;
          padding: var(--space-6);
        }

        .badge-card.locked {
          opacity: 0.5;
          filter: grayscale(0.5);
        }

        .badge-icon {
          font-size: 3rem;
          margin-bottom: var(--space-3);
        }

        .badge-card h4 {
          margin-bottom: var(--space-2);
        }

        .badge-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }

        .settings-section {
          margin-bottom: var(--space-4);
        }

        .settings-section h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--color-border);
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--color-border);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-info {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .setting-info svg {
          color: var(--color-gray-400);
        }

        .setting-info h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .setting-info p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .toggle {
          position: relative;
          width: 52px;
          height: 28px;
          cursor: pointer;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          inset: 0;
          background: var(--color-gray-300);
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          background: white;
          border-radius: var(--radius-full);
          left: 3px;
          top: 3px;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .toggle input:checked + .toggle-slider {
          background: var(--color-primary);
        }

        .toggle input:checked + .toggle-slider::before {
          transform: translateX(24px);
        }

        .btn-error {
          background: var(--color-error);
          color: white;
          margin-top: var(--space-4);
        }

        .btn-error:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage
