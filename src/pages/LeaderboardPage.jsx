import { useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  MapPin,
  Users,
  Leaf,
  ChevronDown
} from 'lucide-react'

// Mock leaderboard data with different time-based scores
const mockLeaderboard = [
  { id: 1, name: 'Priya Sharma', avatar: '👩‍🌾', allTimeScore: 12450, monthlyScore: 2340, weeklyScore: 580, level: 25, city: 'Mumbai', badges: ['🏆', '🌟', '♻️'] },
  { id: 2, name: 'Rahul Patel', avatar: '👨‍💻', allTimeScore: 11890, monthlyScore: 2890, weeklyScore: 720, level: 24, city: 'Delhi', badges: ['🥈', '🌿', '💚'] },
  { id: 3, name: 'Anita Desai', avatar: '👩‍🔬', allTimeScore: 10450, monthlyScore: 1980, weeklyScore: 490, level: 22, city: 'Bangalore', badges: ['🥉', '🌱', '⭐'] },
  { id: 4, name: 'Vikram Singh', avatar: '👨‍🌾', allTimeScore: 9870, monthlyScore: 2100, weeklyScore: 650, level: 21, city: 'Chennai', badges: ['🌿', '♻️'] },
  { id: 5, name: 'Meera Krishnan', avatar: '👩‍🎨', allTimeScore: 9200, monthlyScore: 1750, weeklyScore: 420, level: 20, city: 'Hyderabad', badges: ['🌱', '⭐'] },
  { id: 6, name: 'Arjun Nair', avatar: '👨‍💼', allTimeScore: 8750, monthlyScore: 3200, weeklyScore: 890, level: 19, city: 'Pune', badges: ['💚', '♻️'] },
  { id: 7, name: 'Sneha Gupta', avatar: '👩‍⚕️', allTimeScore: 8200, monthlyScore: 2450, weeklyScore: 560, level: 18, city: 'Kolkata', badges: ['🌿'] },
  { id: 8, name: 'Karan Malhotra', avatar: '👨‍🔧', allTimeScore: 7800, monthlyScore: 1890, weeklyScore: 380, level: 17, city: 'Mumbai', badges: ['🌱', '⭐'] },
  { id: 9, name: 'Divya Reddy', avatar: '👩‍💻', allTimeScore: 7350, monthlyScore: 2780, weeklyScore: 810, level: 17, city: 'Bangalore', badges: ['♻️'] },
  { id: 10, name: 'Aditya Sharma', avatar: '👨‍🎓', allTimeScore: 6900, monthlyScore: 1560, weeklyScore: 340, level: 16, city: 'Delhi', badges: ['🌿'] },
  { id: 11, name: 'Neha Verma', avatar: '👩‍🏫', allTimeScore: 6500, monthlyScore: 2100, weeklyScore: 620, level: 15, city: 'Mumbai', badges: ['🌱'] },
  { id: 12, name: 'Rohit Kumar', avatar: '👨‍🍳', allTimeScore: 6200, monthlyScore: 1340, weeklyScore: 280, level: 14, city: 'Chennai', badges: ['♻️'] },
  { id: 13, name: 'Anjali Mehta', avatar: '👩‍🎤', allTimeScore: 5900, monthlyScore: 2560, weeklyScore: 750, level: 14, city: 'Delhi', badges: ['🌿', '⭐'] },
  { id: 14, name: 'Suresh Iyer', avatar: '👨‍🏭', allTimeScore: 5600, monthlyScore: 1120, weeklyScore: 190, level: 13, city: 'Bangalore', badges: ['💚'] },
  { id: 15, name: 'Pooja Das', avatar: '👩‍🔧', allTimeScore: 5300, monthlyScore: 1890, weeklyScore: 480, level: 12, city: 'Kolkata', badges: ['🌱'] }
]

// Get score based on time range
const getScoreByTimeRange = (user, timeRange) => {
  switch(timeRange) {
    case 'this-week': return user.weeklyScore
    case 'this-month': return user.monthlyScore
    default: return user.allTimeScore
  }
}

function LeaderboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('national')
  const [selectedCity, setSelectedCity] = useState('Mumbai')
  const [timeRange, setTimeRange] = useState('all-time')

  const tabs = [
    { id: 'national', label: 'National', icon: Trophy },
    { id: 'city', label: 'City', icon: MapPin },
    { id: 'community', label: 'Community', icon: Users }
  ]

  // Compute filtered and sorted leaderboard based on active filters
  const filteredLeaderboard = useMemo(() => {
    let data = [...mockLeaderboard]
    
    // Filter by city if on city tab
    if (activeTab === 'city') {
      data = data.filter(u => u.city === selectedCity)
    }
    
    // Sort by the appropriate score based on time range
    data = data.map(u => ({
      ...u,
      score: getScoreByTimeRange(u, timeRange)
    }))
    
    // Sort by score descending
    data.sort((a, b) => b.score - a.score)
    
    // Assign ranks
    return data.map((u, idx) => ({
      ...u,
      rank: idx + 1
    }))
  }, [activeTab, selectedCity, timeRange])

  // Get top 3 for podium
  const topThree = filteredLeaderboard.slice(0, 3)

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="rank-icon gold" size={24} />
      case 2: return <Medal className="rank-icon silver" size={24} />
      case 3: return <Medal className="rank-icon bronze" size={24} />
      default: return <span className="rank-number">{rank}</span>
    }
  }

  const getUserRank = () => {
    // Mock user rank
    return {
      rank: 156,
      percentile: 12
    }
  }

  const userRank = getUserRank()

  return (
    <div className="leaderboard-page">
      <div className="container">
        {/* Hero Section */}
        <div className="leaderboard-hero">
          <Trophy size={48} className="hero-icon" />
          <h1>Eco Leaderboard</h1>
          <p>See how you rank among eco-warriors across India</p>
        </div>

        {/* User's Rank Card */}
        <div className="user-rank-card card-gradient">
          <div className="user-info">
            <div className="user-avatar">{user?.fullName?.charAt(0) || 'U'}</div>
            <div>
              <h3>{user?.fullName || 'User'}</h3>
              <p>Level {user?.level || 1} Eco Warrior</p>
            </div>
          </div>
          <div className="user-stats">
            <div className="stat">
              <span className="value">#{userRank.rank}</span>
              <span className="label">Your Rank</span>
            </div>
            <div className="stat">
              <span className="value">{user?.ecoScore || 0}</span>
              <span className="label">Eco Points</span>
            </div>
            <div className="stat">
              <span className="value">Top {userRank.percentile}%</span>
              <span className="label">Percentile</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="leaderboard-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="leaderboard-filters">
          {activeTab === 'city' && (
            <div className="filter-group">
              <MapPin size={18} />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          )}

          <div className="filter-group">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
            </select>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="podium">
          {topThree.map((leader) => (
            <div 
              key={leader.id}
              className={`podium-item rank-${leader.rank}`}
              style={{ order: leader.rank === 1 ? 2 : leader.rank === 2 ? 1 : 3 }}
            >
              <div className="podium-avatar">
                <span className="avatar-emoji">{leader.avatar}</span>
                {leader.rank === 1 && <Crown className="crown" size={24} />}
              </div>
              <div className="podium-info">
                <h4>{leader.name}</h4>
                <p className="podium-score">{leader.score.toLocaleString()} pts</p>
                <div className="podium-badges">
                  {leader.badges.map((badge, i) => (
                    <span key={i}>{badge}</span>
                  ))}
                </div>
              </div>
              <div className="podium-stand">
                <span className="rank-label">
                  {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : '🥉'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="leaderboard-table card">
          <div className="table-header">
            <span>Rank</span>
            <span>Eco Warrior</span>
            <span className="hide-mobile">Level</span>
            <span className="hide-mobile">City</span>
            <span>Score</span>
          </div>

          {filteredLeaderboard.length === 0 ? (
            <div className="no-data">
              <p>No eco warriors found in {selectedCity}. Be the first! 🌱</p>
            </div>
          ) : (
            filteredLeaderboard.map((leader) => (
              <div key={leader.id} className="table-row">
                <div className="rank-cell">
                  {getRankIcon(leader.rank)}
                </div>
                <div className="user-cell">
                  <span className="avatar">{leader.avatar}</span>
                  <div className="user-details">
                    <span className="name">{leader.name}</span>
                    <div className="badges">
                      {leader.badges.map((badge, i) => (
                        <span key={i}>{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="level-cell hide-mobile">
                  <Leaf size={14} />
                  Level {leader.level}
                </div>
                <div className="city-cell hide-mobile">
                  <MapPin size={14} />
                  {leader.city}
                </div>
                <div className="score-cell">
                  <TrendingUp size={14} />
                  {leader.score.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Motivation Section */}
        <div className="motivation-section">
          <div className="motivation-card card">
            <Star className="motivation-icon" size={32} />
            <h3>Keep Going!</h3>
            <p>You need <strong>{1000 - (user?.ecoScore % 1000 || 0)}</strong> more points to reach the next milestone!</p>
          </div>
        </div>
      </div>

      <style>{`
        .leaderboard-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .leaderboard-hero {
          text-align: center;
          padding: var(--space-12) 0;
          background: linear-gradient(135deg, var(--color-accent), #d97706);
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-8);
        }

        .hero-icon {
          margin-bottom: var(--space-4);
        }

        .leaderboard-hero h1 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .leaderboard-hero p {
          opacity: 0.9;
        }

        .user-rank-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
          gap: var(--space-6);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .user-avatar {
          width: 64px;
          height: 64px;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--text-2xl);
          font-weight: 700;
          color: white;
        }

        .user-info h3 {
          margin-bottom: var(--space-1);
        }

        .user-info p {
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        .user-stats {
          display: flex;
          gap: var(--space-8);
        }

        .user-stats .stat {
          text-align: center;
        }

        .user-stats .value {
          display: block;
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-primary);
        }

        .user-stats .label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .leaderboard-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          justify-content: center;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-full);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border);
          transition: all var(--transition-fast);
        }

        .tab-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .tab-btn.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: white;
        }

        .leaderboard-filters {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .filter-group select {
          border: none;
          background: none;
          font-size: var(--text-sm);
          cursor: pointer;
        }

        .podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: var(--space-4);
          margin-bottom: var(--space-12);
          padding: var(--space-8) 0;
        }

        .podium-item {
          text-align: center;
          width: 180px;
        }

        .podium-item.rank-1 {
          transform: translateY(-20px);
        }

        .podium-avatar {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto var(--space-3);
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rank-1 .podium-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #ffd700, #ffb700);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
        }

        .rank-2 .podium-avatar {
          background: linear-gradient(135deg, #c0c0c0, #a0a0a0);
        }

        .rank-3 .podium-avatar {
          background: linear-gradient(135deg, #cd7f32, #a06020);
        }

        .avatar-emoji {
          font-size: 2.5rem;
        }

        .rank-1 .avatar-emoji {
          font-size: 3rem;
        }

        .crown {
          position: absolute;
          top: -10px;
          color: #ffd700;
        }

        .podium-info h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .podium-score {
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: var(--space-2);
        }

        .podium-badges {
          display: flex;
          justify-content: center;
          gap: var(--space-1);
        }

        .podium-stand {
          height: 60px;
          background: linear-gradient(to bottom, var(--color-gray-100), var(--color-gray-200));
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: var(--space-4);
        }

        .rank-1 .podium-stand {
          height: 80px;
          background: linear-gradient(to bottom, #ffd700, #e6c200);
        }

        .rank-2 .podium-stand {
          height: 60px;
          background: linear-gradient(to bottom, #c0c0c0, #a8a8a8);
        }

        .rank-3 .podium-stand {
          height: 40px;
          background: linear-gradient(to bottom, #cd7f32, #b87333);
        }

        .rank-label {
          font-size: 1.5rem;
        }

        .leaderboard-table {
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 80px 1fr 100px 120px 120px;
          padding: var(--space-4);
          background: var(--color-gray-50);
          font-weight: 600;
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        @media (max-width: 768px) {
          .table-header {
            grid-template-columns: 60px 1fr 100px;
          }
          .hide-mobile {
            display: none;
          }
        }

        .table-row {
          display: grid;
          grid-template-columns: 80px 1fr 100px 120px 120px;
          padding: var(--space-4);
          border-bottom: 1px solid var(--color-border);
          align-items: center;
          transition: background var(--transition-fast);
        }

        @media (max-width: 768px) {
          .table-row {
            grid-template-columns: 60px 1fr 100px;
          }
        }

        .table-row:hover {
          background: var(--color-gray-50);
        }

        .rank-cell {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rank-icon {
          padding: var(--space-2);
          border-radius: var(--radius-full);
        }

        .rank-icon.gold { color: #ffd700; }
        .rank-icon.silver { color: #c0c0c0; }
        .rank-icon.bronze { color: #cd7f32; }

        .rank-number {
          width: 32px;
          height: 32px;
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .user-cell .avatar {
          font-size: 1.5rem;
        }

        .user-details .name {
          font-weight: 600;
          display: block;
        }

        .user-details .badges {
          display: flex;
          gap: var(--space-1);
          margin-top: var(--space-1);
        }

        .level-cell,
        .city-cell,
        .score-cell {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .score-cell {
          font-weight: 600;
          color: var(--color-primary);
        }

        .motivation-section {
          margin-top: var(--space-12);
        }

        .motivation-card {
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
          padding: var(--space-8);
        }

        .motivation-icon {
          color: var(--color-accent);
          margin-bottom: var(--space-4);
        }

        .motivation-card h3 {
          margin-bottom: var(--space-2);
        }

        .motivation-card p {
          color: var(--color-text-secondary);
        }

        .no-data {
          padding: var(--space-8);
          text-align: center;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  )
}

export default LeaderboardPage
