import { useState } from 'react'
import {
  Clock,
  Heart,
  ShoppingCart,
  Star,
  MapPin,
  Eye,
  Filter,
  Search,
  Sparkles
} from 'lucide-react'

// Mock vintage items
const vintageItems = [
  {
    id: 1,
    name: 'Antique Brass Telescope',
    era: '1920s',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400&h=400&fit=crop',
    seller: 'Vintage Vault',
    location: 'Mumbai',
    rating: 4.9,
    story: 'This beautiful brass telescope was found in a colonial-era mansion in South Mumbai.',
    condition: 'Excellent'
  },
  {
    id: 2,
    name: 'Victorian Writing Desk',
    era: '1880s',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
    seller: 'Heritage Finds',
    location: 'Delhi',
    rating: 5.0,
    story: 'A stunning Victorian writing desk with original brass hardware and leather inlay.',
    condition: 'Good'
  },
  {
    id: 3,
    name: 'Art Deco Wall Mirror',
    era: '1930s',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1521227889351-bf6f5b2e4e37?w=400&h=400&fit=crop',
    seller: 'Retro Room',
    location: 'Bangalore',
    rating: 4.8,
    story: 'An elegant Art Deco mirror with geometric patterns and beveled glass.',
    condition: 'Excellent'
  },
  {
    id: 4,
    name: 'Vintage Gramophone',
    era: '1910s',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    seller: 'Music of Ages',
    location: 'Kolkata',
    rating: 4.9,
    story: 'A working HMV gramophone from the early 1900s, complete with original horn.',
    condition: 'Working'
  },
  {
    id: 5,
    name: 'Persian Silk Carpet',
    era: '1950s',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    seller: 'Eastern Treasures',
    location: 'Jaipur',
    rating: 5.0,
    story: 'Hand-knotted Persian carpet with intricate floral patterns.',
    condition: 'Excellent'
  },
  {
    id: 6,
    name: 'Vintage Leather Suitcase',
    era: '1940s',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1565619632666-377e76a1afd5?w=400&h=400&fit=crop',
    seller: 'Travel Tales',
    location: 'Chennai',
    rating: 4.7,
    story: 'A travel companion from the golden age of train journeys.',
    condition: 'Good'
  }
]

const collections = [
  { name: 'Art Deco Elegance', count: 24, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop' },
  { name: 'Colonial Heritage', count: 36, image: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=300&h=200&fit=crop' },
  { name: 'Retro Electronics', count: 18, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop' },
  { name: 'Vintage Jewelry', count: 42, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop' }
]

function VintagePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEra, setSelectedEra] = useState('all')
  const [wishlist, setWishlist] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const eras = ['all', '1800s', '1900s', '1920s', '1930s', '1940s', '1950s', '1960s+']

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="vintage-page">
      <div className="container">
        {/* Hero Section */}
        <div className="vintage-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <Sparkles size={32} className="hero-icon" />
            <h1>Vintage Treasures</h1>
            <p>Discover unique pieces with timeless stories</p>
          </div>
        </div>

        {/* Featured Collections */}
        <section className="collections-section">
          <h2>Curated Collections</h2>
          <div className="collections-grid">
            {collections.map((collection, index) => (
              <div key={index} className="collection-card">
                <img src={collection.image} alt={collection.name} />
                <div className="collection-overlay">
                  <h3>{collection.name}</h3>
                  <span>{collection.count} items</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search & Filter */}
        <div className="vintage-filters card">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search vintage items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="era-filters">
            {eras.map(era => (
              <button
                key={era}
                className={`era-btn ${selectedEra === era ? 'active' : ''}`}
                onClick={() => setSelectedEra(era)}
              >
                {era === 'all' ? 'All Eras' : era}
              </button>
            ))}
          </div>
        </div>

        {/* Vintage Items Grid */}
        <div className="vintage-grid">
          {vintageItems.map(item => (
            <div key={item.id} className="vintage-card card">
              <div className="vintage-image">
                <img src={item.image} alt={item.name} />
                <span className="era-badge">{item.era}</span>
                <button 
                  className={`wishlist-btn ${wishlist.includes(item.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(item.id)}
                >
                  <Heart size={20} fill={wishlist.includes(item.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="vintage-info">
                <h3>{item.name}</h3>
                
                <div className="vintage-meta">
                  <span className="seller">{item.seller}</span>
                  <span className="location">
                    <MapPin size={14} />
                    {item.location}
                  </span>
                </div>

                <p className="vintage-story">{item.story}</p>

                <div className="vintage-footer">
                  <div className="vintage-price">
                    <span className="price">₹{item.price.toLocaleString()}</span>
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      {item.rating}
                    </div>
                  </div>

                  <div className="vintage-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Item Modal */}
        {selectedItem && (
          <div className="vintage-modal" onClick={() => setSelectedItem(null)}>
            <div className="modal-content card animate-scaleIn" onClick={e => e.stopPropagation()}>
              <img src={selectedItem.image} alt={selectedItem.name} />
              <div className="modal-info">
                <span className="era-badge">{selectedItem.era}</span>
                <h2>{selectedItem.name}</h2>
                <p className="story">{selectedItem.story}</p>
                
                <div className="modal-details">
                  <div className="detail">
                    <span className="label">Condition</span>
                    <span className="value">{selectedItem.condition}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Seller</span>
                    <span className="value">{selectedItem.seller}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Location</span>
                    <span className="value">{selectedItem.location}</span>
                  </div>
                </div>

                <div className="modal-footer">
                  <span className="modal-price">₹{selectedItem.price.toLocaleString()}</span>
                  <button className="btn btn-primary btn-lg">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .vintage-page {
          padding-bottom: var(--space-16);
        }

        .vintage-hero {
          position: relative;
          height: 300px;
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          border-radius: var(--radius-2xl);
          margin-bottom: var(--space-12);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-content {
          position: relative;
          text-align: center;
          color: white;
        }

        .hero-icon {
          margin-bottom: var(--space-4);
          opacity: 0.8;
        }

        .vintage-hero h1 {
          color: white;
          font-size: var(--text-5xl);
          margin-bottom: var(--space-2);
        }

        .vintage-hero p {
          font-size: var(--text-lg);
          opacity: 0.9;
        }

        .collections-section {
          margin-bottom: var(--space-12);
        }

        .collections-section h2 {
          margin-bottom: var(--space-6);
        }

        .collections-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 900px) {
          .collections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .collection-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          aspect-ratio: 3/2;
          cursor: pointer;
        }

        .collection-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-base);
        }

        .collection-card:hover img {
          transform: scale(1.1);
        }

        .collection-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: var(--space-4);
          color: white;
        }

        .collection-overlay h3 {
          color: white;
          font-size: var(--text-base);
          margin-bottom: var(--space-1);
        }

        .collection-overlay span {
          font-size: var(--text-sm);
          opacity: 0.8;
        }

        .vintage-filters {
          padding: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-4);
        }

        .search-box input {
          flex: 1;
          border: none;
          background: none;
          font-size: var(--text-base);
          outline: none;
        }

        .era-filters {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .era-btn {
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-secondary);
          background: var(--color-gray-100);
          transition: all var(--transition-fast);
        }

        .era-btn:hover,
        .era-btn.active {
          background: #8b5cf6;
          color: white;
        }

        .vintage-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 900px) {
          .vintage-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .vintage-grid {
            grid-template-columns: 1fr;
          }
        }

        .vintage-card {
          overflow: hidden;
        }

        .vintage-image {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
        }

        .vintage-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-base);
        }

        .vintage-card:hover .vintage-image img {
          transform: scale(1.05);
        }

        .era-badge {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          padding: var(--space-1) var(--space-3);
          background: rgba(139, 92, 246, 0.9);
          color: white;
          font-size: var(--text-xs);
          font-weight: 600;
          border-radius: var(--radius-full);
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
          color: #8b5cf6;
        }

        .vintage-info {
          padding: var(--space-4);
        }

        .vintage-info h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }

        .vintage-meta {
          display: flex;
          justify-content: space-between;
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-3);
        }

        .location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .vintage-story {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-4);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .vintage-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--color-border);
        }

        .vintage-price .price {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text);
          display: block;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--color-accent);
          font-size: var(--text-sm);
        }

        .vintage-actions {
          display: flex;
          gap: var(--space-2);
        }

        .vintage-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          padding: var(--space-4);
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 800px;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 700px) {
          .modal-content {
            grid-template-columns: 1fr;
          }
        }

        .modal-content img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info {
          padding: var(--space-8);
        }

        .modal-info h2 {
          margin: var(--space-3) 0;
        }

        .modal-info .story {
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: var(--space-6);
        }

        .modal-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .detail .label {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-1);
        }

        .detail .value {
          font-weight: 600;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .modal-price {
          font-size: var(--text-2xl);
          font-weight: 700;
        }

        .modal-close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          width: 36px;
          height: 36px;
          background: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  )
}

export default VintagePage
