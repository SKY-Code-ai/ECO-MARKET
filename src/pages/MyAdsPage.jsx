import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Megaphone,
  Plus,
  Package,
  User,
  FileText,
  Edit2,
  Trash2,
  Eye,
  Pause,
  Play,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  X,
  Upload,
  Camera,
  Loader
} from 'lucide-react'

// Mock ads data
const mockAds = [
  {
    id: 1,
    type: 'product',
    title: 'Plastic Bottles Bundle',
    description: '50 clean plastic bottles ready for recycling',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&h=300&fit=crop',
    status: 'active',
    views: 234,
    clicks: 45,
    createdAt: '2026-01-01',
    expiresAt: '2026-01-15'
  },
  {
    id: 2,
    type: 'product',
    title: 'Vintage Wooden Chair',
    description: 'Antique wooden chair from 1960s',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop',
    status: 'pending',
    views: 0,
    clicks: 0,
    createdAt: '2026-01-03',
    expiresAt: '2026-01-17'
  },
  {
    id: 3,
    type: 'profile',
    title: 'Eco Warrior - Recycler Pro',
    description: 'Connecting with buyers for bulk waste materials',
    status: 'expired',
    views: 567,
    clicks: 89,
    createdAt: '2025-12-01',
    expiresAt: '2025-12-15'
  }
]

const adTypes = [
  { id: 'product', label: 'Product Ad', icon: Package, description: 'Promote a product listing' },
  { id: 'profile', label: 'Profile Ad', icon: User, description: 'Boost your seller profile' },
  { id: 'other', label: 'Custom Ad', icon: FileText, description: 'Create custom advertisement' }
]

function MyAdsPage() {
  const { user } = useAuth()
  const [ads, setAds] = useState(mockAds)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedAdType, setSelectedAdType] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    image: null,
    customFields: []
  })

  const filteredAds = ads.filter(ad => {
    if (activeFilter === 'all') return true
    return ad.status === activeFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active'
      case 'pending': return 'status-pending'
      case 'paused': return 'status-paused'
      case 'expired': return 'status-expired'
      default: return ''
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle size={14} />
      case 'pending': return <Clock size={14} />
      case 'paused': return <Pause size={14} />
      case 'expired': return <XCircle size={14} />
      default: return null
    }
  }

  const handleTogglePause = (id) => {
    setAds(ads.map(ad => {
      if (ad.id === id) {
        return { ...ad, status: ad.status === 'paused' ? 'active' : 'paused' }
      }
      return ad
    }))
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      setAds(ads.filter(ad => ad.id !== id))
    }
  }

  const handleCreateAd = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const ad = {
      id: Date.now(),
      type: selectedAdType,
      title: newAd.title,
      description: newAd.description,
      image: newAd.image,
      status: 'pending',
      views: 0,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    setAds([ad, ...ads])
    setShowCreateModal(false)
    setSelectedAdType(null)
    setNewAd({ title: '', description: '', image: null, customFields: [] })
    setLoading(false)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewAd({ ...newAd, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const stats = {
    active: ads.filter(a => a.status === 'active').length,
    pending: ads.filter(a => a.status === 'pending').length,
    totalViews: ads.reduce((sum, a) => sum + a.views, 0),
    totalClicks: ads.reduce((sum, a) => sum + a.clicks, 0)
  }

  return (
    <div className="ads-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <Megaphone size={28} />
              My Ads
            </h1>
            <p className="page-subtitle">Manage and track your advertisements</p>
          </div>
          <button className="btn-create" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Ad
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon active">
              <CheckCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.active}</span>
              <span className="stat-label">Active Ads</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon views">
              <Eye size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalViews.toLocaleString()}</span>
              <span className="stat-label">Total Views</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon clicks">
              <TrendingUp size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalClicks}</span>
              <span className="stat-label">Total Clicks</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          {['all', 'active', 'pending', 'paused', 'expired'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {filter !== 'all' && (
                <span className="filter-count">
                  {ads.filter(a => filter === 'all' || a.status === filter).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <div className="empty-state">
            <Megaphone size={48} className="empty-icon" />
            <h3>No ads found</h3>
            <p>Create your first ad to start promoting</p>
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={18} />
              Create Ad
            </button>
          </div>
        ) : (
          <div className="ads-list">
            {filteredAds.map(ad => (
              <div key={ad.id} className="ad-card">
                <div className="ad-image">
                  {ad.image ? (
                    <img src={ad.image} alt={ad.title} />
                  ) : (
                    <div className="ad-placeholder">
                      {ad.type === 'profile' ? <User size={32} /> : <Package size={32} />}
                    </div>
                  )}
                  <span className={`ad-type-badge ${ad.type}`}>
                    {ad.type.charAt(0).toUpperCase() + ad.type.slice(1)}
                  </span>
                </div>

                <div className="ad-content">
                  <div className="ad-header">
                    <h3>{ad.title}</h3>
                    <span className={`status-badge ${getStatusColor(ad.status)}`}>
                      {getStatusIcon(ad.status)}
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </span>
                  </div>
                  <p className="ad-description">{ad.description}</p>

                  <div className="ad-stats">
                    <div className="ad-stat">
                      <Eye size={14} />
                      <span>{ad.views.toLocaleString()} views</span>
                    </div>
                    <div className="ad-stat">
                      <TrendingUp size={14} />
                      <span>{ad.clicks} clicks</span>
                    </div>
                    <div className="ad-stat">
                      <Clock size={14} />
                      <span>Expires {ad.expiresAt}</span>
                    </div>
                  </div>
                </div>

                <div className="ad-actions">
                  <button className="action-btn" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  {ad.status === 'active' || ad.status === 'paused' ? (
                    <button 
                      className="action-btn"
                      title={ad.status === 'paused' ? 'Resume' : 'Pause'}
                      onClick={() => handleTogglePause(ad.id)}
                    >
                      {ad.status === 'paused' ? <Play size={18} /> : <Pause size={18} />}
                    </button>
                  ) : null}
                  <button 
                    className="action-btn delete"
                    title="Delete"
                    onClick={() => handleDelete(ad.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Ad Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => !loading && setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedAdType ? `Create ${selectedAdType.charAt(0).toUpperCase() + selectedAdType.slice(1)} Ad` : 'Choose Ad Type'}</h2>
              <button className="btn-close" onClick={() => {
                setShowCreateModal(false)
                setSelectedAdType(null)
              }}>
                <X size={24} />
              </button>
            </div>

            {!selectedAdType ? (
              <div className="ad-type-selection">
                {adTypes.map(type => (
                  <button
                    key={type.id}
                    className="ad-type-card"
                    onClick={() => setSelectedAdType(type.id)}
                  >
                    <div className="ad-type-icon">
                      <type.icon size={28} />
                    </div>
                    <h3>{type.label}</h3>
                    <p>{type.description}</p>
                    <ChevronRight size={20} className="arrow" />
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleCreateAd} className="ad-form">
                {/* Image Upload */}
                <div className="image-upload">
                  {newAd.image ? (
                    <div className="image-preview">
                      <img src={newAd.image} alt="Preview" />
                      <button type="button" className="remove-image" onClick={() => setNewAd({...newAd, image: null})}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="upload-area">
                      <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                      <Camera size={32} />
                      <span>Upload Image</span>
                    </label>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    {selectedAdType === 'product' ? 'Product Name' : 
                     selectedAdType === 'profile' ? 'Profile Title' : 'Headline'}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${selectedAdType === 'product' ? 'product name' : 
                                          selectedAdType === 'profile' ? 'profile title' : 'headline'}`}
                    value={newAd.title}
                    onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe your ad..."
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                    rows={3}
                    required
                  />
                </div>

                {selectedAdType === 'product' && (
                  <>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input type="number" placeholder="0" />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select>
                        <option value="">Select category</option>
                        <option value="waste">Waste Materials</option>
                        <option value="recycled">Recycled Products</option>
                        <option value="vintage">Vintage Items</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedAdType === 'other' && (
                  <div className="form-group">
                    <label>Call to Action</label>
                    <input type="text" placeholder="e.g., Contact Now, Learn More" />
                  </div>
                )}

                <div className="ad-pricing">
                  <h4>Ad Duration</h4>
                  <div className="pricing-options">
                    <label className="pricing-option selected">
                      <input type="radio" name="duration" defaultChecked />
                      <div className="option-content">
                        <span className="duration">7 Days</span>
                        <span className="price">₹49</span>
                      </div>
                    </label>
                    <label className="pricing-option">
                      <input type="radio" name="duration" />
                      <div className="option-content">
                        <span className="duration">14 Days</span>
                        <span className="price">₹89</span>
                      </div>
                    </label>
                    <label className="pricing-option">
                      <input type="radio" name="duration" />
                      <div className="option-content">
                        <span className="duration">30 Days</span>
                        <span className="price">₹149</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn-primary btn-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Create Ad
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .ads-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 2rem;
        }

        .page-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
        }

        .btn-create {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-create:hover {
          background: var(--eco-secondary);
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.active {
          background: rgba(16, 185, 129, 0.1);
          color: var(--eco-primary);
        }

        .stat-icon.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .stat-icon.views {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .stat-icon.clicks {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: var(--bg-secondary);
          border: none;
          border-radius: 2rem;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: var(--eco-primary);
          color: white;
        }

        .filter-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.125rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.75rem;
        }

        .filter-btn:not(.active) .filter-count {
          background: var(--bg-tertiary);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
        }

        .empty-icon {
          color: var(--text-tertiary);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .ads-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ad-card {
          display: flex;
          gap: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.25rem;
          transition: all 0.2s;
        }

        .ad-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .ad-image {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .ad-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.75rem;
        }

        .ad-placeholder {
          width: 100%;
          height: 100%;
          background: var(--bg-tertiary);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
        }

        .ad-type-badge {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .ad-type-badge.product {
          background: rgba(59, 130, 246, 0.9);
          color: white;
        }

        .ad-type-badge.profile {
          background: rgba(139, 92, 246, 0.9);
          color: white;
        }

        .ad-type-badge.other {
          background: rgba(245, 158, 11, 0.9);
          color: white;
        }

        .ad-content {
          flex: 1;
          min-width: 0;
        }

        .ad-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .ad-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.625rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-active {
          background: rgba(16, 185, 129, 0.1);
          color: var(--eco-primary);
        }

        .status-pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .status-paused {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .status-expired {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .ad-description {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ad-stats {
          display: flex;
          gap: 1.5rem;
        }

        .ad-stat {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--text-tertiary);
          font-size: 0.8rem;
        }

        .ad-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          border-radius: 0.5rem;
          border: none;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: var(--eco-primary);
          color: white;
        }

        .action-btn.delete:hover {
          background: #ef4444;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--bg-primary);
          border-radius: 1.5rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-close {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
        }

        .ad-type-selection {
          padding: 1rem;
        }

        .ad-type-card {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border: 2px solid transparent;
          border-radius: 1rem;
          cursor: pointer;
          text-align: left;
          margin-bottom: 0.75rem;
          transition: all 0.2s;
        }

        .ad-type-card:hover {
          border-color: var(--eco-primary);
        }

        .ad-type-icon {
          width: 56px;
          height: 56px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--eco-primary);
        }

        .ad-type-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .ad-type-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .ad-type-card .arrow {
          margin-left: auto;
          color: var(--text-tertiary);
        }

        .ad-form {
          padding: 1.5rem;
        }

        .image-upload {
          margin-bottom: 1.5rem;
        }

        .upload-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          height: 150px;
          background: var(--bg-secondary);
          border: 2px dashed var(--border-color);
          border-radius: 1rem;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-area:hover {
          border-color: var(--eco-primary);
          color: var(--eco-primary);
        }

        .image-preview {
          position: relative;
          height: 150px;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
        }

        .remove-image {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 28px;
          height: 28px;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-group input, 
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: 0.75rem;
          font-size: 1rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: all 0.2s;
          resize: none;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--eco-primary);
        }

        .ad-pricing {
          margin-bottom: 1.5rem;
        }

        .ad-pricing h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .pricing-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .pricing-option {
          position: relative;
          cursor: pointer;
        }

        .pricing-option input {
          position: absolute;
          opacity: 0;
        }

        .option-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 0.75rem;
          transition: all 0.2s;
        }

        .pricing-option input:checked + .option-content {
          border-color: var(--eco-primary);
          background: rgba(16, 185, 129, 0.05);
        }

        .option-content .duration {
          font-weight: 600;
          color: var(--text-primary);
        }

        .option-content .price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--eco-primary);
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--eco-secondary);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-full {
          width: 100%;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .ads-page {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-create {
            width: 100%;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ad-card {
            flex-direction: column;
          }

          .ad-image {
            width: 100%;
            height: 180px;
          }

          .ad-actions {
            flex-direction: row;
            justify-content: flex-end;
          }

          .pricing-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default MyAdsPage
