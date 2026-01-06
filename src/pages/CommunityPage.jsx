import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Users,
  MapPin,
  Trophy,
  Target,
  MessageCircle,
  Calendar,
  ChevronRight,
  Star,
  Leaf,
  TrendingUp,
  Plus,
  Check
} from 'lucide-react'

// Mock community data
const communities = [
  {
    id: 1,
    name: 'Mumbai Central Eco Warriors',
    location: 'Mumbai Central, Mumbai',
    members: 1250,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=200&fit=crop',
    monthlyGoal: 5000,
    currentProgress: 3750,
    rank: 3,
    joined: true
  },
  {
    id: 2,
    name: 'Green Bandra Collective',
    location: 'Bandra, Mumbai',
    members: 890,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    monthlyGoal: 4000,
    currentProgress: 2800,
    rank: 7,
    joined: false
  },
  {
    id: 3,
    name: 'Andheri Sustainability Hub',
    location: 'Andheri, Mumbai',
    members: 2100,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop',
    monthlyGoal: 8000,
    currentProgress: 6200,
    rank: 1,
    joined: false
  }
]

const challenges = [
  {
    id: 1,
    title: 'Zero Plastic Week',
    description: 'Avoid single-use plastics for 7 days',
    reward: 200,
    participants: 456,
    daysLeft: 5,
    progress: 60,
    joined: true
  },
  {
    id: 2,
    title: 'Donate 5 Items',
    description: 'Donate any 5 items from your home',
    reward: 150,
    participants: 892,
    daysLeft: 12,
    progress: 40,
    joined: true
  },
  {
    id: 3,
    title: 'Community Cleanup',
    description: 'Join the weekend cleanup drive',
    reward: 300,
    participants: 234,
    daysLeft: 3,
    progress: 0,
    joined: false
  }
]

const recentActivity = [
  { user: 'Priya S.', action: 'donated 10 items', time: '2 hours ago', avatar: '👩‍🌾' },
  { user: 'Rahul P.', action: 'completed Zero Plastic Week', time: '4 hours ago', avatar: '👨‍💻' },
  { user: 'Anita D.', action: 'earned 500 eco-points', time: '5 hours ago', avatar: '👩‍🔬' },
  { user: 'Vikram S.', action: 'joined the community', time: '1 day ago', avatar: '👨‍🌾' }
]

function CommunityPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('discover')
  const [selectedCommunity, setSelectedCommunity] = useState(null)

  return (
    <div className="community-page">
      <div className="container">
        {/* Hero Section */}
        <div className="community-hero">
          <div className="hero-content">
            <Users size={48} className="hero-icon" />
            <h1>Eco Communities</h1>
            <p>Connect with like-minded eco-warriors in your area</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="community-tabs">
          <button 
            className={`tab ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            Discover Communities
          </button>
          <button 
            className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            Active Challenges
          </button>
          <button 
            className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Community Activity
          </button>
        </div>

        {/* Discover Communities Tab */}
        {activeTab === 'discover' && (
          <div className="tab-content animate-fadeIn">
            <div className="communities-grid">
              {communities.map(community => (
                <div key={community.id} className="community-card card">
                  <div className="community-image">
                    <img src={community.image} alt={community.name} />
                    <div className="community-rank">
                      <Trophy size={14} />
                      #{community.rank}
                    </div>
                  </div>
                  
                  <div className="community-info">
                    <h3>{community.name}</h3>
                    <div className="community-location">
                      <MapPin size={14} />
                      {community.location}
                    </div>
                    
                    <div className="community-stats">
                      <div className="stat">
                        <Users size={16} />
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                    </div>

                    <div className="community-progress">
                      <div className="progress-header">
                        <span>Monthly Goal</span>
                        <span>{Math.round(community.currentProgress / community.monthlyGoal * 100)}%</span>
                      </div>
                      <div className="progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${community.currentProgress / community.monthlyGoal * 100}%` }}
                        ></div>
                      </div>
                      <div className="progress-labels">
                        <span>{community.currentProgress} kg</span>
                        <span>{community.monthlyGoal} kg</span>
                      </div>
                    </div>

                    <button 
                      className={`btn ${community.joined ? 'btn-secondary' : 'btn-primary'} w-full`}
                    >
                      {community.joined ? (
                        <>
                          <Check size={18} />
                          Joined
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          Join Community
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="tab-content animate-fadeIn">
            <div className="challenges-list">
              {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-card card">
                  <div className="challenge-icon">
                    <Target size={28} />
                  </div>
                  
                  <div className="challenge-content">
                    <div className="challenge-header">
                      <h3>{challenge.title}</h3>
                      <div className="challenge-reward">
                        <Leaf size={16} />
                        +{challenge.reward} pts
                      </div>
                    </div>
                    
                    <p className="challenge-desc">{challenge.description}</p>
                    
                    <div className="challenge-meta">
                      <span>
                        <Users size={14} />
                        {challenge.participants} participants
                      </span>
                      <span>
                        <Calendar size={14} />
                        {challenge.daysLeft} days left
                      </span>
                    </div>

                    {challenge.joined && (
                      <div className="challenge-progress">
                        <div className="progress-header">
                          <span>Your Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="challenge-action">
                    <button 
                      className={`btn ${challenge.joined ? 'btn-secondary' : 'btn-primary'}`}
                    >
                      {challenge.joined ? 'View Details' : 'Join Challenge'}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Activity Tab */}
        {activeTab === 'activity' && (
          <div className="tab-content animate-fadeIn">
            <div className="activity-feed card">
              <h3>Recent Activity</h3>
              
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span className="activity-avatar">{activity.avatar}</span>
                    <div className="activity-details">
                      <p>
                        <strong>{activity.user}</strong> {activity.action}
                      </p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="community-chat-preview card">
              <div className="chat-header">
                <MessageCircle size={20} />
                <h3>Community Chat</h3>
              </div>
              <div className="chat-preview">
                <p className="chat-placeholder">
                  💬 Join a community to participate in discussions and collaborate with other eco-warriors!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .community-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .community-hero {
          text-align: center;
          padding: var(--space-12) 0;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-8);
        }

        .hero-icon {
          margin-bottom: var(--space-4);
        }

        .community-hero h1 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .community-hero p {
          opacity: 0.9;
        }

        .community-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-8);
          justify-content: center;
          flex-wrap: wrap;
        }

        .tab {
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-full);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border);
          transition: all var(--transition-fast);
        }

        .tab:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .tab.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .communities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 1024px) {
          .communities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .communities-grid {
            grid-template-columns: 1fr;
          }
        }

        .community-card {
          overflow: hidden;
        }

        .community-image {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .community-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .community-rank {
          position: absolute;
          top: var(--space-3);
          right: var(--space-3);
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-3);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .community-rank svg {
          color: var(--color-accent);
        }

        .community-info {
          padding: var(--space-4);
        }

        .community-info h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }

        .community-location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }

        .community-stats {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .community-stats .stat {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .community-progress {
          margin-bottom: var(--space-4);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-1);
        }

        .challenges-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .challenge-card {
          display: flex;
          gap: var(--space-4);
          padding: var(--space-5);
          align-items: flex-start;
        }

        @media (max-width: 768px) {
          .challenge-card {
            flex-direction: column;
          }
        }

        .challenge-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .challenge-content {
          flex: 1;
        }

        .challenge-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-2);
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .challenge-header h3 {
          font-size: var(--text-lg);
        }

        .challenge-reward {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-3);
          background: var(--color-primary-100);
          color: var(--color-primary);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .challenge-desc {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }

        .challenge-meta {
          display: flex;
          gap: var(--space-4);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .challenge-meta span {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .challenge-progress {
          margin-top: var(--space-4);
          max-width: 300px;
        }

        .challenge-action {
          flex-shrink: 0;
        }

        .activity-feed {
          padding: var(--space-6);
          margin-bottom: var(--space-6);
        }

        .activity-feed h3 {
          margin-bottom: var(--space-4);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--color-border);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-avatar {
          font-size: 1.5rem;
        }

        .activity-details p {
          margin-bottom: var(--space-1);
        }

        .activity-time {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .community-chat-preview {
          padding: var(--space-6);
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }

        .chat-header h3 {
          margin: 0;
        }

        .chat-preview {
          padding: var(--space-8);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .chat-placeholder {
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  )
}

export default CommunityPage
