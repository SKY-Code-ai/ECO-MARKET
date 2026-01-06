import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Package,
  MapPin,
  DollarSign,
  Tag,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Recycle,
  Shirt,
  Cpu,
  BookOpen,
  Sofa,
  Utensils,
  Car,
  Leaf,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Filter,
  Grid,
  List,
  Search,
  ArrowUpDown,
  Truck,
  MapPinned,
  ShoppingBag,
  Gem,
  Home,
  Watch,
  Smartphone,
  Camera,
  Music,
  Bike
} from 'lucide-react'

// Mock selling products data (user's listed items)
const mockSellingProducts = [
  {
    id: 1,
    name: 'Old Samsung Galaxy S21',
    category: 'electronics',
    price: 8500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'good',
    views: 245,
    likes: 18,
    status: 'active',
    listedDate: '2024-01-02',
    eco_points: 50
  },
  {
    id: 2,
    name: 'Vintage Wooden Coffee Table',
    category: 'furniture',
    price: 3500,
    originalPrice: 5000,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'like-new',
    views: 189,
    likes: 32,
    status: 'active',
    listedDate: '2024-01-01',
    eco_points: 75
  },
  {
    id: 3,
    name: 'Plastic Bottles Bundle (100 pcs)',
    category: 'plastic',
    price: 200,
    originalPrice: 300,
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'fair',
    views: 56,
    likes: 5,
    status: 'active',
    listedDate: '2024-01-03',
    eco_points: 30
  },
  {
    id: 4,
    name: 'Collection of Novels (10 Books)',
    category: 'books',
    price: 450,
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'good',
    views: 120,
    likes: 22,
    status: 'sold',
    listedDate: '2023-12-28',
    eco_points: 40
  },
  {
    id: 5,
    name: 'Vintage Denim Jacket',
    category: 'clothes',
    price: 1200,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'like-new',
    views: 310,
    likes: 45,
    status: 'active',
    listedDate: '2023-12-30',
    eco_points: 35
  },
  {
    id: 6,
    name: 'Metal Scrap (10 kg)',
    category: 'metal',
    price: 650,
    originalPrice: 800,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    location: 'Mumbai, MH',
    condition: 'for-parts',
    views: 78,
    likes: 8,
    status: 'active',
    listedDate: '2024-01-04',
    eco_points: 60
  }
]

// Mock tracking orders
const mockTrackingOrders = [
  {
    id: 'ECO-87654321',
    item: 'Vintage Denim Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
    buyer: 'Rahul Patel',
    price: 1200,
    status: 'shipped',
    statusHistory: [
      { status: 'ordered', date: '2026-01-02', time: '10:30 AM', completed: true },
      { status: 'confirmed', date: '2026-01-02', time: '02:15 PM', completed: true },
      { status: 'shipped', date: '2026-01-03', time: '09:00 AM', completed: true },
      { status: 'out_for_delivery', date: '2026-01-05', time: '', completed: false },
      { status: 'delivered', date: '', time: '', completed: false }
    ],
    estimatedDelivery: '2026-01-07'
  },
  {
    id: 'ECO-87654322',
    item: 'Samsung Galaxy S21',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
    buyer: 'Priya Sharma',
    price: 8500,
    status: 'processing',
    statusHistory: [
      { status: 'ordered', date: '2026-01-04', time: '03:45 PM', completed: true },
      { status: 'confirmed', date: '2026-01-05', time: '10:00 AM', completed: true },
      { status: 'shipped', date: '', time: '', completed: false },
      { status: 'out_for_delivery', date: '', time: '', completed: false },
      { status: 'delivered', date: '', time: '', completed: false }
    ],
    estimatedDelivery: '2026-01-10'
  },
  {
    id: 'ECO-87654320',
    item: 'Collection of Novels',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=100&fit=crop',
    buyer: 'Anita Desai',
    price: 450,
    status: 'delivered',
    statusHistory: [
      { status: 'ordered', date: '2025-12-28', time: '11:00 AM', completed: true },
      { status: 'confirmed', date: '2025-12-28', time: '04:30 PM', completed: true },
      { status: 'shipped', date: '2025-12-29', time: '08:00 AM', completed: true },
      { status: 'out_for_delivery', date: '2025-12-31', time: '09:30 AM', completed: true },
      { status: 'delivered', date: '2025-12-31', time: '02:15 PM', completed: true }
    ],
    estimatedDelivery: '2025-12-31'
  }
]

// Product categories for selling
const productCategories = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone, description: 'Phones, laptops, gadgets', color: '#3b82f6' },
  { id: 'clothing', name: 'Clothing', icon: Shirt, description: 'Fashion & accessories', color: '#ec4899' },
  { id: 'books', name: 'Books', icon: BookOpen, description: 'Novels, textbooks, magazines', color: '#8b5cf6' },
  { id: 'furniture', name: 'Furniture', icon: Sofa, description: 'Home & office furniture', color: '#f59e0b' },
  { id: 'vintage', name: 'Vintage', icon: Watch, description: 'Antiques & collectibles', color: '#6366f1' },
  { id: 'home', name: 'Home & Living', icon: Home, description: 'Decor & appliances', color: '#10b981' },
  { id: 'camera', name: 'Cameras', icon: Camera, description: 'DSLRs, lenses, accessories', color: '#ef4444' },
  { id: 'sports', name: 'Sports & Hobby', icon: Bike, description: 'Equipment & gear', color: '#14b8a6' }
]

const categories = [
  { id: 'all', name: 'All Items', icon: Package },
  { id: 'plastic', name: 'Plastic', icon: Recycle },
  { id: 'electronics', name: 'Electronics', icon: Cpu },
  { id: 'clothes', name: 'Clothes', icon: Shirt },
  { id: 'books', name: 'Books', icon: BookOpen },
  { id: 'furniture', name: 'Furniture', icon: Sofa },
  { id: 'metal', name: 'Metal/Scrap', icon: Package }
]

const statusFilters = ['All', 'Active', 'Sold', 'Pending']

const mainTabs = [
  { id: 'listings', name: 'My Listings', icon: Package },
  { id: 'track', name: 'Track Orders', icon: Truck },
  { id: 'products', name: 'Sell Products', icon: ShoppingBag }
]

function SellPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('listings')
  const [category, setCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredProducts = mockSellingProducts.filter(product => {
    if (category !== 'all' && product.category !== category) return false
    if (statusFilter !== 'All' && product.status.toLowerCase() !== statusFilter.toLowerCase()) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.listedDate) - new Date(a.listedDate)
      case 'oldest':
        return new Date(a.listedDate) - new Date(b.listedDate)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  const totalEarnings = mockSellingProducts
    .filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + p.price, 0)

  const activeListings = mockSellingProducts.filter(p => p.status === 'active').length
  const soldItems = mockSellingProducts.filter(p => p.status === 'sold').length

  const getConditionLabel = (condition) => {
    const labels = {
      'new': 'New',
      'like-new': 'Like New',
      'good': 'Good',
      'fair': 'Fair',
      'for-parts': 'For Parts'
    }
    return labels[condition] || condition
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'badge-success'
      case 'sold':
        return 'badge-primary'
      case 'pending':
        return 'badge-warning'
      default:
        return ''
    }
  }

  const getOrderStatusInfo = (status) => {
    const statusMap = {
      'ordered': { label: 'Ordered', icon: ShoppingBag, color: '#6366f1' },
      'confirmed': { label: 'Confirmed', icon: CheckCircle, color: '#8b5cf6' },
      'shipped': { label: 'Shipped', icon: Truck, color: '#3b82f6' },
      'out_for_delivery': { label: 'Out for Delivery', icon: MapPinned, color: '#f59e0b' },
      'delivered': { label: 'Delivered', icon: CheckCircle, color: '#22c55e' },
      'processing': { label: 'Processing', icon: Clock, color: '#f59e0b' }
    }
    return statusMap[status] || { label: status, icon: Package, color: '#6b7280' }
  }

  const renderListingsTab = () => (
    <>
      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon active-icon">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{activeListings}</span>
            <span className="stat-label">Active Listings</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon sold-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{soldItems}</span>
            <span className="stat-label">Items Sold</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon earnings-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">₹{totalEarnings.toLocaleString()}</span>
            <span className="stat-label">Total Earnings</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon points-icon">
            <Leaf size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{mockSellingProducts.reduce((sum, p) => sum + p.eco_points, 0)}</span>
            <span className="stat-label">Eco Points Earned</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="search-filter-bar card">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search your listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-actions">
          <button 
            className={`filter-toggle btn btn-secondary ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
          </button>

          <div className="sort-dropdown">
            <ArrowUpDown size={18} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="views">Most Views</option>
            </select>
          </div>

          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${category === cat.id ? 'active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            <cat.icon size={18} />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="status-filter">
        {statusFilters.map(status => (
          <button
            key={status}
            className={`status-btn ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>{sortedProducts.length} items found</span>
      </div>

      {/* Products Grid */}
      <div className={`products-${viewMode}`}>
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card card animate-fadeInUp">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-badges">
                <span className={`badge ${getStatusBadgeClass(product.status)}`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
                {product.eco_points && (
                  <span className="badge badge-eco">+{product.eco_points} pts</span>
                )}
              </div>
              <div className="product-stats-overlay">
                <span className="stat-item">
                  <Eye size={14} />
                  {product.views}
                </span>
              </div>
            </div>

            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-meta">
                <span className="condition-badge">{getConditionLabel(product.condition)}</span>
                <span className="listing-date">
                  <Clock size={14} />
                  {new Date(product.listedDate).toLocaleDateString()}
                </span>
              </div>

              <div className="product-location">
                <MapPin size={14} />
                {product.location}
              </div>

              <div className="product-price">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="discount">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </>
                )}
              </div>

              <div className="product-actions">
                <button className="btn btn-secondary btn-sm">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="btn btn-primary btn-sm">
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-results">
          <Package size={64} />
          <h3>No items found</h3>
          <p>You haven't listed any items yet or try adjusting your filters</p>
          <Link to="/sell/new" className="btn btn-primary">
            <Plus size={18} />
            List Your First Item
          </Link>
        </div>
      )}
    </>
  )

  const renderTrackOrdersTab = () => (
    <div className="track-orders-section">
      <div className="track-header">
        <h2>Track Your Sold Items</h2>
        <p className="text-muted">Monitor delivery status of items you've sold</p>
      </div>

      <div className="orders-summary">
        <div className="summary-card card">
          <div className="summary-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Truck size={24} />
          </div>
          <div className="summary-info">
            <span className="summary-value">{mockTrackingOrders.filter(o => o.status === 'shipped').length}</span>
            <span className="summary-label">In Transit</span>
          </div>
        </div>
        <div className="summary-card card">
          <div className="summary-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="summary-info">
            <span className="summary-value">{mockTrackingOrders.filter(o => o.status === 'processing').length}</span>
            <span className="summary-label">Processing</span>
          </div>
        </div>
        <div className="summary-card card">
          <div className="summary-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <CheckCircle size={24} />
          </div>
          <div className="summary-info">
            <span className="summary-value">{mockTrackingOrders.filter(o => o.status === 'delivered').length}</span>
            <span className="summary-label">Delivered</span>
          </div>
        </div>
      </div>

      <div className="orders-list">
        {mockTrackingOrders.map(order => (
          <div 
            key={order.id} 
            className={`order-track-card card ${selectedOrder === order.id ? 'expanded' : ''}`}
            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
          >
            <div className="order-track-header">
              <div className="order-item-preview">
                <img src={order.image} alt={order.item} />
                <div className="order-item-info">
                  <h4>{order.item}</h4>
                  <span className="order-id">{order.id}</span>
                  <span className="order-buyer">Buyer: {order.buyer}</span>
                </div>
              </div>
              <div className="order-track-status">
                <span 
                  className="status-badge"
                  style={{ 
                    background: `${getOrderStatusInfo(order.status).color}20`,
                    color: getOrderStatusInfo(order.status).color 
                  }}
                >
                  {getOrderStatusInfo(order.status).label}
                </span>
                <span className="order-price">₹{order.price.toLocaleString()}</span>
              </div>
              <ArrowRight 
                size={20} 
                className={`expand-icon ${selectedOrder === order.id ? 'rotated' : ''}`}
              />
            </div>

            {selectedOrder === order.id && (
              <div className="order-timeline">
                <div className="timeline-container">
                  {order.statusHistory.map((step, index) => (
                    <div 
                      key={step.status} 
                      className={`timeline-step ${step.completed ? 'completed' : ''}`}
                    >
                      <div 
                        className="timeline-dot"
                        style={{ 
                          background: step.completed ? getOrderStatusInfo(step.status).color : '#e5e7eb'
                        }}
                      >
                        {step.completed && <CheckCircle size={14} />}
                      </div>
                      {index < order.statusHistory.length - 1 && (
                        <div 
                          className="timeline-line"
                          style={{ 
                            background: step.completed ? getOrderStatusInfo(step.status).color : '#e5e7eb'
                          }}
                        />
                      )}
                      <div className="timeline-content">
                        <span className="timeline-label">{getOrderStatusInfo(step.status).label}</span>
                        {step.date && (
                          <span className="timeline-date">{step.date} {step.time}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="estimated-delivery">
                  <MapPinned size={18} />
                  <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="/my-orders" className="view-all-orders btn btn-secondary">
        View All Orders
        <ArrowRight size={18} />
      </Link>
    </div>
  )

  const renderSellProductsTab = () => (
    <div className="sell-products-section">
      <div className="sell-products-header">
        <div className="header-text">
          <h2>Sell Your Products</h2>
          <p className="text-muted">List items you want to sell and earn money while helping the environment</p>
        </div>
        <Link to="/sell/new" className="btn btn-primary btn-lg">
          <Plus size={20} />
          List New Product
        </Link>
      </div>

      <div className="selling-tips card">
        <div className="tips-header">
          <Sparkles size={24} />
          <h3>Tips for Faster Sales</h3>
        </div>
        <div className="tips-grid">
          <div className="tip-item">
            <Camera size={20} />
            <span>Add clear, high-quality photos</span>
          </div>
          <div className="tip-item">
            <Tag size={20} />
            <span>Set competitive prices</span>
          </div>
          <div className="tip-item">
            <Edit size={20} />
            <span>Write detailed descriptions</span>
          </div>
          <div className="tip-item">
            <Clock size={20} />
            <span>Respond quickly to buyers</span>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <h3>Choose a Category</h3>
        <p className="text-muted">Select what you want to sell</p>
        
        <div className="product-categories-grid">
          {productCategories.map(cat => (
            <Link 
              to={`/sell/new?category=${cat.id}`}
              key={cat.id} 
              className="product-category-card card"
              style={{ '--cat-color': cat.color }}
            >
              <div className="cat-icon" style={{ background: `${cat.color}15`, color: cat.color }}>
                <cat.icon size={28} />
              </div>
              <h4>{cat.name}</h4>
              <p>{cat.description}</p>
              <ArrowRight size={18} className="arrow-icon" />
            </Link>
          ))}
        </div>
      </div>

      <div className="featured-listings">
        <div className="featured-header">
          <h3>Popular Product Listings</h3>
          <span className="text-muted">See what others are selling</span>
        </div>
        <div className="featured-grid">
          <div className="featured-item card">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" alt="Watch" />
            <div className="featured-info">
              <span className="featured-category">Vintage</span>
              <h4>Classic Wristwatch</h4>
              <span className="featured-price">₹4,500</span>
            </div>
          </div>
          <div className="featured-item card">
            <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop" alt="Camera" />
            <div className="featured-info">
              <span className="featured-category">Camera</span>
              <h4>Canon DSLR</h4>
              <span className="featured-price">₹25,000</span>
            </div>
          </div>
          <div className="featured-item card">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Furniture" />
            <div className="featured-info">
              <span className="featured-category">Furniture</span>
              <h4>Wooden Chair Set</h4>
              <span className="featured-price">₹8,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="sell-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <DollarSign size={48} className="header-icon" />
            <div>
              <h1>Sell & Earn</h1>
              <p className="text-muted">Manage listings, track orders, and sell products</p>
            </div>
          </div>
          <Link to="/sell/new" className="btn btn-primary btn-lg">
            <Plus size={20} />
            List New Item
          </Link>
        </div>

        {/* Main Tabs */}
        <div className="main-tabs">
          {mainTabs.map(tab => (
            <button
              key={tab.id}
              className={`main-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'listings' && renderListingsTab()}
          {activeTab === 'track' && renderTrackOrdersTab()}
          {activeTab === 'products' && renderSellProductsTab()}
        </div>
      </div>

      <style>{`
        .sell-page {
          padding: var(--space-6) 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .header-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: var(--radius-xl);
          padding: var(--space-3);
          color: white;
        }

        .page-header h1 {
          margin-bottom: var(--space-1);
        }

        /* Main Tabs */
        .main-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          background: var(--color-bg-secondary);
          padding: var(--space-2);
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
        }

        .main-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          font-weight: 600;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .main-tab:hover {
          background: var(--color-gray-100);
          color: var(--color-text);
        }

        .main-tab.active {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          color: white;
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 600px) {
          .main-tab span {
            display: none;
          }
          .main-tab {
            padding: var(--space-3);
          }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr; }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.active-icon {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .stat-icon.sold-icon {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .stat-icon.earnings-icon {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .stat-icon.points-icon {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-text);
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .search-filter-bar {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          margin-bottom: var(--space-6);
        }

        @media (max-width: 768px) {
          .search-filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
        }

        .search-box input {
          flex: 1;
          border: none;
          background: none;
          font-size: var(--text-base);
          outline: none;
        }

        .search-box svg {
          color: var(--color-gray-400);
        }

        .filter-actions {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .filter-toggle.active {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
        }

        .sort-dropdown select {
          border: none;
          background: none;
          font-size: var(--text-sm);
          cursor: pointer;
        }

        .view-toggle {
          display: flex;
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .view-toggle button {
          padding: var(--space-2) var(--space-3);
          color: var(--color-gray-500);
        }

        .view-toggle button.active {
          background: var(--color-primary);
          color: white;
        }

        .category-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          overflow-x: auto;
          padding-bottom: var(--space-2);
        }

        .category-tab {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-xl);
          font-weight: 500;
          color: var(--color-text-secondary);
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .category-tab:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .category-tab.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: white;
        }

        .status-filter {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }

        .status-btn {
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-gray-100);
          transition: all var(--transition-fast);
        }

        .status-btn:hover,
        .status-btn.active {
          background: var(--color-accent-100);
          color: var(--color-accent);
        }

        .results-info {
          margin-bottom: var(--space-4);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .products-grid { grid-template-columns: 1fr; }
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .products-list .product-card {
          display: flex;
          flex-direction: row;
        }

        .products-list .product-image {
          width: 200px;
          flex-shrink: 0;
        }

        .product-card {
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .product-card:hover {
          transform: translateY(-4px);
        }

        .product-image {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-base);
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-badges {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .badge-success {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }

        .badge-primary {
          background: rgba(59, 130, 246, 0.9);
          color: white;
        }

        .badge-warning {
          background: rgba(245, 158, 11, 0.9);
          color: white;
        }

        .badge-eco {
          background: rgba(16, 185, 129, 0.9);
          color: white;
        }

        .product-stats-overlay {
          position: absolute;
          bottom: var(--space-3);
          right: var(--space-3);
          display: flex;
          gap: var(--space-2);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-sm);
          font-size: var(--text-xs);
        }

        .product-info {
          padding: var(--space-4);
        }

        .product-category {
          font-size: var(--text-xs);
          text-transform: uppercase;
          color: var(--color-accent);
          font-weight: 600;
          margin-bottom: var(--space-1);
        }

        .product-name {
          font-size: var(--text-base);
          font-weight: 600;
          margin-bottom: var(--space-2);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-meta {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-2);
          flex-wrap: wrap;
        }

        .condition-badge {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-2);
          background: var(--color-gray-100);
          border-radius: var(--radius-sm);
          color: var(--color-text-secondary);
        }

        .listing-date {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .product-location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
        }

        .current-price {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text);
        }

        .original-price {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          text-decoration: line-through;
        }

        .discount {
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-success);
          background: rgba(34, 197, 94, 0.1);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-sm);
        }

        .product-actions {
          display: flex;
          gap: var(--space-2);
        }

        .product-actions .btn {
          flex: 1;
        }

        .no-results {
          text-align: center;
          padding: var(--space-16) 0;
          color: var(--color-text-secondary);
        }

        .no-results svg {
          margin-bottom: var(--space-4);
          opacity: 0.3;
        }

        .no-results .btn {
          margin-top: var(--space-4);
        }

        /* Track Orders Tab */
        .track-orders-section {
          padding: var(--space-4) 0;
        }

        .track-header {
          margin-bottom: var(--space-6);
        }

        .track-header h2 {
          margin-bottom: var(--space-2);
        }

        .orders-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        @media (max-width: 768px) {
          .orders-summary {
            grid-template-columns: 1fr;
          }
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
        }

        .summary-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-info {
          display: flex;
          flex-direction: column;
        }

        .summary-value {
          font-size: var(--text-2xl);
          font-weight: 700;
        }

        .summary-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .order-track-card {
          padding: var(--space-4);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .order-track-card:hover {
          border-color: var(--color-primary);
        }

        .order-track-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .order-item-preview {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex: 1;
        }

        .order-item-preview img {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-lg);
          object-fit: cover;
        }

        .order-item-info h4 {
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .order-id {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .order-buyer {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-primary);
        }

        .order-track-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--space-2);
        }

        .status-badge {
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .order-price {
          font-weight: 700;
          font-size: var(--text-lg);
        }

        .expand-icon {
          color: var(--color-gray-400);
          transition: transform var(--transition-fast);
        }

        .expand-icon.rotated {
          transform: rotate(90deg);
        }

        .order-timeline {
          margin-top: var(--space-6);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .timeline-container {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: var(--space-6);
        }

        @media (max-width: 768px) {
          .timeline-container {
            flex-direction: column;
            gap: var(--space-4);
          }
        }

        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
        }

        .timeline-dot {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 1;
        }

        .timeline-line {
          position: absolute;
          top: 16px;
          left: calc(50% + 16px);
          width: calc(100% - 32px);
          height: 3px;
        }

        @media (max-width: 768px) {
          .timeline-line {
            display: none;
          }
        }

        .timeline-content {
          text-align: center;
          margin-top: var(--space-2);
        }

        .timeline-label {
          display: block;
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .timeline-date {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .estimated-delivery {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          color: var(--color-text-secondary);
        }

        .view-all-orders {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          width: 100%;
        }

        /* Sell Products Tab */
        .sell-products-section {
          padding: var(--space-4) 0;
        }

        .sell-products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .header-text h2 {
          margin-bottom: var(--space-1);
        }

        .selling-tips {
          padding: var(--space-5);
          margin-bottom: var(--space-8);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid var(--color-primary-100);
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          color: var(--color-primary);
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 768px) {
          .tips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .tip-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .tip-item svg {
          color: var(--color-primary);
        }

        .categories-section {
          margin-bottom: var(--space-8);
        }

        .categories-section h3 {
          margin-bottom: var(--space-1);
        }

        .categories-section > p {
          margin-bottom: var(--space-6);
        }

        .product-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 1024px) {
          .product-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .product-categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .product-category-card {
          padding: var(--space-5);
          text-align: center;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .product-category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--cat-color);
          transform: scaleX(0);
          transition: transform var(--transition-fast);
        }

        .product-category-card:hover {
          transform: translateY(-4px);
          border-color: var(--cat-color);
        }

        .product-category-card:hover::before {
          transform: scaleX(1);
        }

        .cat-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto var(--space-3);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-category-card h4 {
          margin-bottom: var(--space-1);
        }

        .product-category-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }

        .arrow-icon {
          color: var(--color-gray-400);
          transition: transform var(--transition-fast);
        }

        .product-category-card:hover .arrow-icon {
          transform: translateX(4px);
          color: var(--cat-color);
        }

        .featured-listings {
          margin-top: var(--space-8);
        }

        .featured-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-6);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }

        .featured-item {
          display: flex;
          gap: var(--space-4);
          padding: var(--space-4);
          transition: all var(--transition-fast);
        }

        .featured-item:hover {
          transform: translateY(-2px);
        }

        .featured-item img {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-lg);
          object-fit: cover;
        }

        .featured-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-category {
          font-size: var(--text-xs);
          color: var(--color-primary);
          font-weight: 600;
          text-transform: uppercase;
        }

        .featured-info h4 {
          font-size: var(--text-base);
          margin: var(--space-1) 0;
        }

        .featured-price {
          font-weight: 700;
          color: var(--color-accent);
        }
      `}</style>
    </div>
  )
}

export default SellPage
