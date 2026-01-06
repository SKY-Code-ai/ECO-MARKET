import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronDown,
  Package,
  Recycle,
  Clock,
  ArrowUpDown
} from 'lucide-react'

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Plastic Bottles Bundle (50 pcs)',
    category: 'waste',
    price: 150,
    originalPrice: 200,
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&h=300&fit=crop',
    seller: 'EcoCollect Mumbai',
    location: 'Mumbai, MH',
    rating: 4.5,
    reviews: 124,
    type: 'C2B',
    eco_points: 30
  },
  {
    id: 2,
    name: 'Recycled Paper Notebooks (Set of 5)',
    category: 'recycled',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=300&fit=crop',
    seller: 'Green Paper Co.',
    location: 'Delhi, DL',
    rating: 4.8,
    reviews: 89,
    type: 'B2C',
    eco_points: 50
  },
  {
    id: 3,
    name: 'Vintage Wooden Chair',
    category: 'vintage',
    price: 2500,
    originalPrice: 3500,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
    seller: 'RetroFinds',
    location: 'Pune, MH',
    rating: 4.9,
    reviews: 45,
    type: 'C2C',
    eco_points: 100
  },
  {
    id: 4,
    name: 'Electronic Waste (5 kg)',
    category: 'waste',
    price: 800,
    originalPrice: 1000,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop',
    seller: 'TechRecycle India',
    location: 'Bangalore, KA',
    rating: 4.6,
    reviews: 67,
    type: 'B2B',
    eco_points: 80
  },
  {
    id: 5,
    name: 'Upcycled Denim Bag',
    category: 'recycled',
    price: 450,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    seller: 'Stitch & Style',
    location: 'Chennai, TN',
    rating: 4.7,
    reviews: 156,
    type: 'B2C',
    eco_points: 45
  },
  {
    id: 6,
    name: 'Vintage Brass Lamp',
    category: 'vintage',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    seller: 'Antique Paradise',
    location: 'Jaipur, RJ',
    rating: 4.9,
    reviews: 32,
    type: 'C2C',
    eco_points: 75
  },
  {
    id: 7,
    name: 'Cardboard Boxes (20 pcs)',
    category: 'waste',
    price: 100,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    seller: 'PackRecycle',
    location: 'Hyderabad, TG',
    rating: 4.3,
    reviews: 78,
    type: 'C2B',
    eco_points: 20
  },
  {
    id: 8,
    name: 'Bamboo Cutlery Set',
    category: 'recycled',
    price: 350,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=300&fit=crop',
    seller: 'BambooLife',
    location: 'Kerala, KL',
    rating: 4.8,
    reviews: 203,
    type: 'B2C',
    eco_points: 40
  }
]

const categories = [
  { id: 'all', name: 'All Items', icon: Package },
  { id: 'waste', name: 'Waste', icon: Recycle },
  { id: 'recycled', name: 'Recycled Products', icon: Package },
  { id: 'vintage', name: 'Vintage', icon: Clock }
]

const businessTypes = ['All', 'B2B', 'B2C', 'C2C', 'C2B']

function MarketplacePage() {
  const [category, setCategory] = useState('all')
  const [businessType, setBusinessType] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])

  const filteredProducts = mockProducts.filter(product => {
    if (category !== 'all' && product.category !== category) return false
    if (businessType !== 'All' && product.type !== businessType) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const addToCart = (product) => {
    setCart(prev => [...prev, product])
  }

  return (
    <div className="marketplace-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Marketplace</h1>
          <p className="text-muted">Discover sustainable products and give waste a new life</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-filter-bar card">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products, sellers, categories..."
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
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
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

        {/* Business Type Filter */}
        <div className="business-type-filter">
          {businessTypes.map(type => (
            <button
              key={type}
              className={`type-btn ${businessType === type ? 'active' : ''}`}
              onClick={() => setBusinessType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="extended-filters card animate-fadeIn">
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <select className="form-input form-select">
                <option value="">All Locations</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Rating</label>
              <div className="rating-filter">
                {[4, 3, 2, 1].map(rating => (
                  <button key={rating} className="rating-btn">
                    {rating}+ <Star size={14} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="results-info">
          <span>{filteredProducts.length} products found</span>
        </div>

        {/* Products Grid */}
        <div className={`products-${viewMode}`}>
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card card animate-fadeInUp">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badges">
                  <span className="badge">{product.type}</span>
                  {product.eco_points && (
                    <span className="badge badge-success">+{product.eco_points} pts</span>
                  )}
                </div>
                <button 
                  className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart size={20} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-seller">
                  <span>{product.seller}</span>
                  <span className="seller-location">
                    <MapPin size={14} />
                    {product.location}
                  </span>
                </div>

                <div className="product-rating">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                  <span className="review-count">({product.reviews} reviews)</span>
                </div>

                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="original-price">₹{product.originalPrice}</span>
                      <span className="discount">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>

                <div className="product-actions">
                  <button className="btn btn-secondary btn-sm">
                    <Eye size={16} />
                    View
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <Package size={64} />
            <h3>No products found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      <style>{`
        .marketplace-page {
          padding: var(--space-6) 0;
        }

        .page-header {
          margin-bottom: var(--space-8);
        }

        .page-header h1 {
          margin-bottom: var(--space-2);
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
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .category-tab.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .business-type-filter {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }

        .type-btn {
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-gray-100);
          transition: all var(--transition-fast);
        }

        .type-btn:hover,
        .type-btn.active {
          background: var(--color-primary-100);
          color: var(--color-primary);
        }

        .extended-filters {
          display: flex;
          gap: var(--space-6);
          padding: var(--space-6);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
        }

        .filter-group {
          min-width: 200px;
        }

        .filter-group label {
          display: block;
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: var(--space-2);
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .price-inputs input {
          width: 100px;
          padding: var(--space-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }

        .rating-filter {
          display: flex;
          gap: var(--space-2);
        }

        .rating-btn {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-2) var(--space-3);
          background: var(--color-gray-100);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          color: var(--color-accent);
        }

        .results-info {
          margin-bottom: var(--space-4);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 900px) {
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

        .wishlist-btn {
          position: absolute;
          top: var(--space-3);
          right: var(--space-3);
          width: 36px;
          height: 36px;
          background: white;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-400);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-fast);
        }

        .wishlist-btn:hover,
        .wishlist-btn.active {
          color: var(--color-error);
          transform: scale(1.1);
        }

        .product-info {
          padding: var(--space-4);
        }

        .product-category {
          font-size: var(--text-xs);
          text-transform: uppercase;
          color: var(--color-primary);
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

        .product-seller {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-2);
        }

        .seller-location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          margin-top: var(--space-1);
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-accent);
          margin-bottom: var(--space-3);
        }

        .review-count {
          color: var(--color-text-secondary);
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
      `}</style>
    </div>
  )
}

export default MarketplacePage
