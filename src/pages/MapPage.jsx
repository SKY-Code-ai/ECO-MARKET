import { useState, useMemo, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapPin,
  Filter,
  Users,
  Gift,
  ShoppingBag,
  DollarSign,
  X,
  ChevronDown,
  Leaf,
  TrendingUp
} from 'lucide-react'

// Indian cities with coordinates
const cityCoordinates = {
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Bangalore': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Hyderabad': [17.3850, 78.4867],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Jaipur': [26.9124, 75.7873],
  'Lucknow': [26.8467, 80.9462],
  'Surat': [21.1702, 72.8311],
  'Chandigarh': [30.7333, 76.7794],
  'Nagpur': [21.1458, 79.0882],
  'Indore': [22.7196, 75.8577],
  'Coimbatore': [11.0168, 76.9558]
}

// Mock user data with locations
const mockUsers = [
  // Donators
  { id: 1, name: 'Priya Sharma', type: 'donator', city: 'Mumbai', avatar: '👩‍🌾', donations: 45, ecoPoints: 12450 },
  { id: 2, name: 'Vikram Singh', type: 'donator', city: 'Delhi', avatar: '👨‍🌾', donations: 38, ecoPoints: 9870 },
  { id: 3, name: 'Sneha Gupta', type: 'donator', city: 'Kolkata', avatar: '👩‍⚕️', donations: 32, ecoPoints: 8200 },
  { id: 4, name: 'Arjun Nair', type: 'donator', city: 'Pune', avatar: '👨‍💼', donations: 28, ecoPoints: 8750 },
  { id: 5, name: 'Neha Verma', type: 'donator', city: 'Mumbai', avatar: '👩‍🏫', donations: 25, ecoPoints: 6500 },
  { id: 6, name: 'Raj Patel', type: 'donator', city: 'Ahmedabad', avatar: '👨‍🔧', donations: 22, ecoPoints: 5800 },
  { id: 7, name: 'Kavita Das', type: 'donator', city: 'Bangalore', avatar: '👩‍💻', donations: 19, ecoPoints: 4900 },
  
  // Buyers
  { id: 8, name: 'Rahul Patel', type: 'buyer', city: 'Delhi', avatar: '👨‍💻', purchases: 67, ecoPoints: 11890 },
  { id: 9, name: 'Anita Desai', type: 'buyer', city: 'Bangalore', avatar: '👩‍🔬', purchases: 54, ecoPoints: 10450 },
  { id: 10, name: 'Meera Krishnan', type: 'buyer', city: 'Hyderabad', avatar: '👩‍🎨', purchases: 48, ecoPoints: 9200 },
  { id: 11, name: 'Karan Malhotra', type: 'buyer', city: 'Mumbai', avatar: '👨‍🔧', purchases: 42, ecoPoints: 7800 },
  { id: 12, name: 'Divya Reddy', type: 'buyer', city: 'Bangalore', avatar: '👩‍💻', purchases: 36, ecoPoints: 7350 },
  { id: 13, name: 'Suresh Iyer', type: 'buyer', city: 'Chennai', avatar: '👨‍🏭', purchases: 31, ecoPoints: 5600 },
  { id: 14, name: 'Pooja Das', type: 'buyer', city: 'Kolkata', avatar: '👩‍🔧', purchases: 28, ecoPoints: 5300 },
  
  // Sellers
  { id: 15, name: 'Aditya Sharma', type: 'seller', city: 'Delhi', avatar: '👨‍🎓', sales: 89, ecoPoints: 6900 },
  { id: 16, name: 'Anjali Mehta', type: 'seller', city: 'Delhi', avatar: '👩‍🎤', sales: 76, ecoPoints: 5900 },
  { id: 17, name: 'Rohit Kumar', type: 'seller', city: 'Chennai', avatar: '👨‍🍳', sales: 64, ecoPoints: 6200 },
  { id: 18, name: 'Lakshmi Nair', type: 'seller', city: 'Hyderabad', avatar: '👩‍🌾', sales: 58, ecoPoints: 7100 },
  { id: 19, name: 'Sanjay Gupta', type: 'seller', city: 'Jaipur', avatar: '👨‍💼', sales: 52, ecoPoints: 4800 },
  { id: 20, name: 'Rina Singh', type: 'seller', city: 'Lucknow', avatar: '👩‍🔬', sales: 45, ecoPoints: 4200 },
  { id: 21, name: 'Amit Verma', type: 'seller', city: 'Pune', avatar: '👨‍🎨', sales: 41, ecoPoints: 5500 },
  { id: 22, name: 'Priyanka Joshi', type: 'seller', city: 'Mumbai', avatar: '👩‍💼', sales: 38, ecoPoints: 6800 },
  { id: 23, name: 'Deepak Reddy', type: 'seller', city: 'Bangalore', avatar: '👨‍💻', sales: 35, ecoPoints: 5100 }
]

// Create custom marker icons
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  })
}

const getTypeColor = (type) => {
  switch (type) {
    case 'donator': return '#22c55e'
    case 'buyer': return '#3b82f6'
    case 'seller': return '#f59e0b'
    default: return '#6b7280'
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case 'donator': return 'Donator'
    case 'buyer': return 'Buyer'
    case 'seller': return 'Seller'
    default: return type
  }
}

const getStatLabel = (user) => {
  switch (user.type) {
    case 'donator': return `${user.donations} Donations`
    case 'buyer': return `${user.purchases} Purchases`
    case 'seller': return `${user.sales} Sales`
    default: return ''
  }
}

function MapPage() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  
  const [filters, setFilters] = useState({
    donators: true,
    buyers: true,
    sellers: true
  })
  const [selectedCity, setSelectedCity] = useState('all')

  // Filter users based on type and city
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      const typeMatch = (
        (user.type === 'donator' && filters.donators) ||
        (user.type === 'buyer' && filters.buyers) ||
        (user.type === 'seller' && filters.sellers)
      )
      const cityMatch = selectedCity === 'all' || user.city === selectedCity
      return typeMatch && cityMatch
    }).map(user => ({
      ...user,
      coordinates: cityCoordinates[user.city]
    }))
  }, [filters, selectedCity])

  // Get counts
  const counts = useMemo(() => ({
    donators: mockUsers.filter(u => u.type === 'donator').length,
    buyers: mockUsers.filter(u => u.type === 'buyer').length,
    sellers: mockUsers.filter(u => u.type === 'seller').length,
    total: mockUsers.length
  }), [])

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5)
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current)
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers when filtered users change
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    filteredUsers.forEach(user => {
      const marker = L.marker(user.coordinates, {
        icon: createMarkerIcon(getTypeColor(user.type))
      })
      
      const popupContent = `
        <div style="min-width: 180px; font-family: inherit;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.8rem;">${user.avatar}</span>
            <div>
              <div style="font-weight: 600; font-size: 14px;">${user.name}</div>
              <span style="
                display: inline-block;
                padding: 2px 8px;
                border-radius: 20px;
                font-size: 11px;
                font-weight: 600;
                background: ${getTypeColor(user.type)}20;
                color: ${getTypeColor(user.type)};
              ">${getTypeLabel(user.type)}</span>
            </div>
          </div>
          <div style="font-size: 13px; color: #666;">
            <div style="margin-bottom: 4px;">📍 ${user.city}</div>
            <div style="margin-bottom: 4px;">📊 ${getStatLabel(user)}</div>
            <div>🌿 ${user.ecoPoints.toLocaleString()} Eco Points</div>
          </div>
        </div>
      `
      
      marker.bindPopup(popupContent)
      marker.addTo(mapInstanceRef.current)
      markersRef.current.push(marker)
    })
  }, [filteredUsers])

  return (
    <div className="map-page">
      <div className="container">
        {/* Header */}
        <div className="map-header">
          <div className="header-content">
            <MapPin size={36} className="header-icon" />
            <div>
              <h1>Community Map</h1>
              <p>Explore donators, buyers, and sellers across India</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card donator">
            <Gift size={24} />
            <div className="stat-info">
              <span className="stat-value">{counts.donators}</span>
              <span className="stat-label">Donators</span>
            </div>
          </div>
          <div className="stat-card buyer">
            <ShoppingBag size={24} />
            <div className="stat-info">
              <span className="stat-value">{counts.buyers}</span>
              <span className="stat-label">Buyers</span>
            </div>
          </div>
          <div className="stat-card seller">
            <DollarSign size={24} />
            <div className="stat-info">
              <span className="stat-value">{counts.sellers}</span>
              <span className="stat-label">Sellers</span>
            </div>
          </div>
          <div className="stat-card total">
            <Users size={24} />
            <div className="stat-info">
              <span className="stat-value">{counts.total}</span>
              <span className="stat-label">Total Users</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="map-controls">
          <div className="filter-toggles">
            <button
              className={`filter-toggle ${filters.donators ? 'active donator' : ''}`}
              onClick={() => setFilters(f => ({ ...f, donators: !f.donators }))}
            >
              <Gift size={16} />
              <span>Donators</span>
            </button>
            <button
              className={`filter-toggle ${filters.buyers ? 'active buyer' : ''}`}
              onClick={() => setFilters(f => ({ ...f, buyers: !f.buyers }))}
            >
              <ShoppingBag size={16} />
              <span>Buyers</span>
            </button>
            <button
              className={`filter-toggle ${filters.sellers ? 'active seller' : ''}`}
              onClick={() => setFilters(f => ({ ...f, sellers: !f.sellers }))}
            >
              <DollarSign size={16} />
              <span>Sellers</span>
            </button>
          </div>

          <div className="city-filter">
            <MapPin size={16} />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Cities</option>
              {Object.keys(cityCoordinates).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Container */}
        <div className="map-container">
          <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

          {/* Map Legend */}
          <div className="map-legend">
            <h4>Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-marker donator"></span>
                <span>Donators</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker buyer"></span>
                <span>Buyers</span>
              </div>
              <div className="legend-item">
                <span className="legend-marker seller"></span>
                <span>Sellers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Showing count */}
        <div className="showing-count">
          Showing <strong>{filteredUsers.length}</strong> users on the map
        </div>
      </div>

      <style>{`
        .map-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .map-header {
          margin-bottom: var(--space-8);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-8);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-2xl);
          color: white;
        }

        .header-icon {
          padding: var(--space-3);
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
        }

        .header-content h1 {
          color: white;
          margin-bottom: var(--space-1);
        }

        .header-content p {
          opacity: 0.9;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-5);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
        }

        .stat-card svg {
          padding: var(--space-3);
          border-radius: var(--radius-lg);
        }

        .stat-card.donator svg {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .stat-card.buyer svg {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .stat-card.seller svg {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .stat-card.total svg {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
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

        /* Map Controls */
        .map-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .filter-toggles {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          background: var(--color-bg-secondary);
          border: 2px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .filter-toggle:hover {
          border-color: var(--color-gray-400);
        }

        .filter-toggle.active.donator {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
          color: #22c55e;
        }

        .filter-toggle.active.buyer {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .filter-toggle.active.seller {
          background: rgba(245, 158, 11, 0.1);
          border-color: #f59e0b;
          color: #f59e0b;
        }

        .city-filter {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
        }

        .city-filter select {
          border: none;
          background: none;
          font-size: var(--text-sm);
          cursor: pointer;
          padding-right: var(--space-4);
        }

        /* Map Container */
        .map-container {
          position: relative;
          height: 600px;
          border-radius: var(--radius-2xl);
          overflow: hidden;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .map-container {
            height: 450px;
          }
        }

        /* Map Legend */
        .map-legend {
          position: absolute;
          bottom: var(--space-4);
          left: var(--space-4);
          background: white;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 1000;
        }

        .map-legend h4 {
          font-size: var(--text-sm);
          margin-bottom: var(--space-3);
          color: var(--color-text);
        }

        .legend-items {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .legend-marker {
          width: 12px;
          height: 12px;
          border-radius: var(--radius-full);
        }

        .legend-marker.donator {
          background: #22c55e;
        }

        .legend-marker.buyer {
          background: #3b82f6;
        }

        .legend-marker.seller {
          background: #f59e0b;
        }

        /* Showing count */
        .showing-count {
          text-align: center;
          margin-top: var(--space-4);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        /* Leaflet customizations */
        .leaflet-container {
          font-family: var(--font-primary);
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }

        .leaflet-popup-content {
          margin: 12px !important;
        }

        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  )
}

export default MapPage
