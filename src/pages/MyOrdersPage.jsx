import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ChevronRight,
  ShoppingBag,
  Filter,
  Search,
  Calendar,
  Star,
  RefreshCcw,
  X,
  Phone,
  User,
  MapPinned,
  Box,
  ArrowRight
} from 'lucide-react'

// Get orders from localStorage
const getStoredOrders = () => {
  try {
    const orders = localStorage.getItem('eco_market_orders')
    return orders ? JSON.parse(orders) : []
  } catch {
    return []
  }
}

// Mock orders for demonstration with tracking info
const mockOrders = [
  {
    id: 'ECO-87654321',
    date: '2026-01-03',
    status: 'delivered',
    items: [
      { name: 'Recycled Paper Notebooks (Set of 5)', quantity: 2, price: 299, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=100&h=100&fit=crop' }
    ],
    total: 648,
    address: 'Mumbai, Maharashtra',
    ecoPoints: 50,
    trackingId: 'TRK987654321',
    courier: 'EcoShip Express',
    courierPhone: '+91 9876543210',
    estimatedDelivery: '2026-01-05',
    actualDelivery: '2026-01-05',
    trackingHistory: [
      { status: 'ordered', date: '2026-01-03', time: '10:30 AM', location: 'Order Confirmed', completed: true },
      { status: 'processing', date: '2026-01-03', time: '02:15 PM', location: 'Warehouse - Mumbai', completed: true },
      { status: 'shipped', date: '2026-01-04', time: '09:00 AM', location: 'In Transit - Mumbai Hub', completed: true },
      { status: 'out_for_delivery', date: '2026-01-05', time: '08:30 AM', location: 'Out for Delivery - Local Area', completed: true },
      { status: 'delivered', date: '2026-01-05', time: '11:45 AM', location: 'Delivered - Mumbai, MH', completed: true }
    ]
  },
  {
    id: 'ECO-12345678',
    date: '2026-01-04',
    status: 'shipped',
    items: [
      { name: 'Bamboo Cutlery Set', quantity: 1, price: 350, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=100&h=100&fit=crop' }
    ],
    total: 350,
    address: 'Mumbai, Maharashtra',
    ecoPoints: 40,
    trackingId: 'TRK123456789',
    courier: 'GreenDelivery',
    courierPhone: '+91 9123456789',
    estimatedDelivery: '2026-01-08',
    trackingHistory: [
      { status: 'ordered', date: '2026-01-04', time: '03:45 PM', location: 'Order Confirmed', completed: true },
      { status: 'processing', date: '2026-01-04', time: '06:30 PM', location: 'Warehouse - Delhi', completed: true },
      { status: 'shipped', date: '2026-01-05', time: '10:00 AM', location: 'In Transit - Delhi Hub', completed: true },
      { status: 'out_for_delivery', date: '', time: '', location: 'Awaiting', completed: false },
      { status: 'delivered', date: '', time: '', location: 'Awaiting', completed: false }
    ]
  },
  {
    id: 'ECO-99887766',
    date: '2025-12-28',
    status: 'processing',
    items: [
      { name: 'Eco-Friendly Water Bottle', quantity: 2, price: 499, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop' }
    ],
    total: 998,
    address: 'Mumbai, Maharashtra',
    ecoPoints: 75,
    trackingId: 'TRK556677889',
    courier: 'EcoShip Express',
    courierPhone: '+91 9876543210',
    estimatedDelivery: '2026-01-10',
    trackingHistory: [
      { status: 'ordered', date: '2025-12-28', time: '11:00 AM', location: 'Order Confirmed', completed: true },
      { status: 'processing', date: '2025-12-29', time: '09:00 AM', location: 'Warehouse - Bengaluru', completed: true },
      { status: 'shipped', date: '', time: '', location: 'Awaiting', completed: false },
      { status: 'out_for_delivery', date: '', time: '', location: 'Awaiting', completed: false },
      { status: 'delivered', date: '', time: '', location: 'Awaiting', completed: false }
    ]
  }
]

const statusConfig = {
  pending: { label: 'Pending', color: '#f59e0b', icon: Clock },
  processing: { label: 'Processing', color: '#3b82f6', icon: Package },
  shipped: { label: 'Shipped', color: '#8b5cf6', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: '#f97316', icon: MapPinned },
  delivered: { label: 'Delivered', color: '#10b981', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: '#ef4444', icon: RefreshCcw }
}

function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [trackingModal, setTrackingModal] = useState(null)

  useEffect(() => {
    // Combine stored orders with mock orders
    const storedOrders = getStoredOrders()
    const allOrders = [...storedOrders, ...mockOrders]
    // Sort by date, newest first
    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
    setOrders(allOrders)
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const openTrackingModal = (order) => {
    setTrackingModal(order)
  }

  const closeTrackingModal = () => {
    setTrackingModal(null)
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <ShoppingBag size={32} />
            My Orders
          </h1>
          <p className="text-muted">{orders.length} orders placed</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${filter === 'processing' ? 'active' : ''}`}
              onClick={() => setFilter('processing')}
            >
              Processing
            </button>
            <button 
              className={`filter-tab ${filter === 'shipped' ? 'active' : ''}`}
              onClick={() => setFilter('shipped')}
            >
              Shipped
            </button>
            <button 
              className={`filter-tab ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="empty-orders card">
            <Package size={64} />
            <h3>No orders found</h3>
            <p>Start shopping to see your orders here!</p>
            <Link to="/marketplace" className="btn btn-primary">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => {
              const StatusIcon = statusConfig[order.status]?.icon || Package
              return (
                <div key={order.id} className="order-card card">
                  <div className="order-header">
                    <div className="order-info">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">
                        <Calendar size={14} />
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <div 
                      className="order-status"
                      style={{ '--status-color': statusConfig[order.status]?.color }}
                    >
                      <StatusIcon size={16} />
                      {statusConfig[order.status]?.label}
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <span>Qty: {item.quantity} × ₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <strong>₹{order.total.toLocaleString()}</strong>
                      {order.ecoPoints && (
                        <span className="eco-points">+{order.ecoPoints} Eco Points</span>
                      )}
                    </div>

                    <div className="order-actions">
                      {order.trackingId && order.status !== 'cancelled' && (
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => openTrackingModal(order)}
                        >
                          <Truck size={16} />
                          Track Order
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="btn btn-secondary btn-sm">
                          <Star size={16} />
                          Rate & Review
                        </button>
                      )}
                      <button className="btn btn-outline btn-sm">
                        View Details
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar for non-delivered orders */}
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="order-progress">
                      <div className={`progress-step ${['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <span>Ordered</span>
                      </div>
                      <div className={`progress-step ${['processing', 'shipped', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <span>Processing</span>
                      </div>
                      <div className={`progress-step ${['shipped', 'delivered'].indexOf(order.status) >= 0 ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <span>Shipped</span>
                      </div>
                      <div className={`progress-step ${order.status === 'delivered' ? 'active' : ''}`}>
                        <div className="step-dot"></div>
                        <span>Delivered</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Track Order Modal */}
      {trackingModal && (
        <div className="modal-overlay" onClick={closeTrackingModal}>
          <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <Truck size={24} />
                <div>
                  <h2>Track Order</h2>
                  <span className="tracking-id">Tracking ID: {trackingModal.trackingId}</span>
                </div>
              </div>
              <button className="close-btn" onClick={closeTrackingModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              {/* Order Summary */}
              <div className="order-summary-card">
                <div className="order-item-preview">
                  <img src={trackingModal.items[0].image} alt={trackingModal.items[0].name} />
                  <div>
                    <h4>{trackingModal.items[0].name}</h4>
                    <span className="order-num">Order #{trackingModal.id}</span>
                  </div>
                </div>
                <div 
                  className="current-status"
                  style={{ '--status-color': statusConfig[trackingModal.status]?.color }}
                >
                  {statusConfig[trackingModal.status]?.label}
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="delivery-info-card">
                <div className="delivery-dates">
                  <div className="date-item">
                    <Calendar size={18} />
                    <div>
                      <span className="label">Expected Delivery</span>
                      <span className="date">{formatDate(trackingModal.estimatedDelivery)}</span>
                    </div>
                  </div>
                  {trackingModal.actualDelivery && (
                    <div className="date-item delivered">
                      <CheckCircle size={18} />
                      <div>
                        <span className="label">Delivered On</span>
                        <span className="date">{formatDate(trackingModal.actualDelivery)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Courier Information */}
              <div className="courier-info-card">
                <h3><Box size={18} /> Courier Details</h3>
                <div className="courier-details">
                  <div className="courier-item">
                    <User size={16} />
                    <span>{trackingModal.courier}</span>
                  </div>
                  <div className="courier-item">
                    <Phone size={16} />
                    <a href={`tel:${trackingModal.courierPhone}`}>{trackingModal.courierPhone}</a>
                  </div>
                  <div className="courier-item">
                    <MapPin size={16} />
                    <span>{trackingModal.address}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="timeline-section">
                <h3>Shipment Progress</h3>
                <div className="timeline">
                  {trackingModal.trackingHistory?.map((step, index) => {
                    const StepIcon = statusConfig[step.status]?.icon || Package
                    const stepColor = statusConfig[step.status]?.color || '#9ca3af'
                    return (
                      <div 
                        key={index} 
                        className={`timeline-item ${step.completed ? 'completed' : 'pending'}`}
                      >
                        <div 
                          className="timeline-dot"
                          style={{ 
                            background: step.completed ? stepColor : '#e5e7eb',
                            borderColor: step.completed ? stepColor : '#e5e7eb'
                          }}
                        >
                          {step.completed && <StepIcon size={14} />}
                        </div>
                        {index < trackingModal.trackingHistory.length - 1 && (
                          <div 
                            className="timeline-line"
                            style={{ 
                              background: step.completed ? stepColor : '#e5e7eb'
                            }}
                          />
                        )}
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <span 
                              className="status-label"
                              style={{ color: step.completed ? stepColor : '#9ca3af' }}
                            >
                              {statusConfig[step.status]?.label || step.status}
                            </span>
                            {step.date && (
                              <span className="timeline-time">{step.date} • {step.time}</span>
                            )}
                          </div>
                          <p className="timeline-location">{step.location}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeTrackingModal}>
                Close
              </button>
              <a 
                href={`tel:${trackingModal.courierPhone}`} 
                className="btn btn-primary"
              >
                <Phone size={18} />
                Call Courier
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .orders-page {
          padding: var(--space-6) 0 var(--space-16);
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: var(--space-6);
        }

        .page-header h1 {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-2);
        }

        .filters-section {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          flex: 1;
          min-width: 200px;
        }

        .search-box input {
          border: none;
          background: none;
          outline: none;
          flex: 1;
          font-size: var(--text-sm);
        }

        .search-box svg {
          color: var(--color-text-secondary);
        }

        .filter-tabs {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-lg);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .filter-tab:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .filter-tab.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .empty-orders {
          text-align: center;
          padding: var(--space-16);
          max-width: 400px;
          margin: 0 auto;
        }

        .empty-orders svg {
          color: var(--color-gray-300);
          margin-bottom: var(--space-4);
        }

        .empty-orders h3 {
          margin-bottom: var(--space-2);
        }

        .empty-orders p {
          color: var(--color-text-secondary);
          margin-bottom: var(--space-6);
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .order-card {
          padding: var(--space-4);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
          flex-wrap: wrap;
          gap: var(--space-2);
        }

        .order-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .order-id {
          font-weight: 600;
          color: var(--color-text);
        }

        .order-date {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .order-status {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-3);
          background: color-mix(in srgb, var(--status-color) 15%, transparent);
          color: var(--status-color);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .order-items {
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          padding: var(--space-4) 0;
          margin-bottom: var(--space-4);
        }

        .order-item {
          display: flex;
          gap: var(--space-3);
          align-items: center;
        }

        .order-item img {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          object-fit: cover;
        }

        .order-item h4 {
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-1);
        }

        .order-item span {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-3);
        }

        .order-total {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .order-total strong {
          font-size: var(--text-lg);
          color: var(--color-text);
        }

        .eco-points {
          font-size: var(--text-xs);
          color: var(--color-primary);
          font-weight: 600;
        }

        .order-actions {
          display: flex;
          gap: var(--space-2);
        }

        .btn-outline {
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
        }

        .btn-outline:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .order-progress {
          display: flex;
          justify-content: space-between;
          margin-top: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
          position: relative;
        }

        .order-progress::before {
          content: '';
          position: absolute;
          top: calc(var(--space-4) + 8px);
          left: 10%;
          right: 10%;
          height: 2px;
          background: var(--color-border);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
          position: relative;
          z-index: 1;
        }

        .step-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-gray-200);
          border: 2px solid var(--color-bg);
        }

        .progress-step.active .step-dot {
          background: var(--color-primary);
        }

        .progress-step span {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .progress-step.active span {
          color: var(--color-primary);
          font-weight: 500;
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
          padding: var(--space-4);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tracking-modal {
          background: var(--color-bg);
          border-radius: var(--radius-2xl);
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-5);
          border-bottom: 1px solid var(--color-border);
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05));
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .modal-title svg {
          color: var(--color-primary);
        }

        .modal-title h2 {
          font-size: var(--text-lg);
          margin: 0;
        }

        .tracking-id {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .close-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .close-btn:hover {
          background: var(--color-gray-100);
          color: var(--color-text);
        }

        .modal-content {
          padding: var(--space-5);
          overflow-y: auto;
          flex: 1;
        }

        .order-summary-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-4);
        }

        .order-item-preview {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .order-item-preview img {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          object-fit: cover;
        }

        .order-item-preview h4 {
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-1);
        }

        .order-num {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .current-status {
          padding: var(--space-2) var(--space-4);
          background: color-mix(in srgb, var(--status-color) 15%, transparent);
          color: var(--status-color);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .delivery-info-card {
          background: linear-gradient(135deg, #fef3c7, #fef9c3);
          border-radius: var(--radius-xl);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .delivery-dates {
          display: flex;
          gap: var(--space-6);
        }

        .date-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-2);
        }

        .date-item svg {
          color: #d97706;
          margin-top: 2px;
        }

        .date-item.delivered svg {
          color: var(--color-primary);
        }

        .date-item .label {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .date-item .date {
          display: block;
          font-weight: 600;
          color: var(--color-text);
        }

        .courier-info-card {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .courier-info-card h3 {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-3);
          color: var(--color-text);
        }

        .courier-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .courier-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .courier-item svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .courier-item a {
          color: var(--color-primary);
          font-weight: 500;
        }

        .timeline-section h3 {
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-4);
        }

        .timeline {
          position: relative;
        }

        .timeline-item {
          display: flex;
          gap: var(--space-4);
          position: relative;
          padding-bottom: var(--space-4);
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-dot {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: white;
          border: 3px solid;
          z-index: 1;
        }

        .timeline-item.pending .timeline-dot {
          background: #f3f4f6;
          border-color: #e5e7eb;
        }

        .timeline-line {
          position: absolute;
          left: 15px;
          top: 32px;
          bottom: 0;
          width: 2px;
          z-index: 0;
        }

        .timeline-content {
          flex: 1;
          padding-top: var(--space-1);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: var(--space-2);
          margin-bottom: var(--space-1);
        }

        .status-label {
          font-weight: 600;
          font-size: var(--text-sm);
        }

        .timeline-time {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .timeline-location {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-5);
          border-top: 1px solid var(--color-border);
        }

        @media (max-width: 600px) {
          .order-actions {
            width: 100%;
            justify-content: flex-end;
          }

          .order-progress span {
            display: none;
          }

          .tracking-modal {
            max-height: 100vh;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          }

          .delivery-dates {
            flex-direction: column;
            gap: var(--space-3);
          }
        }
      `}</style>
    </div>
  )
}

export default MyOrdersPage

