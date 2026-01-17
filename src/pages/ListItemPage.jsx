import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Package,
  Camera,
  Upload,
  MapPin,
  DollarSign,
  Tag,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Recycle,
  Shirt,
  Cpu,
  BookOpen,
  Sofa,
  Utensils,
  Car,
  Leaf,
  ImagePlus,
  AlertCircle,
  X
} from 'lucide-react'

const categories = [
  { id: 'plastic', name: 'Plastic', icon: Recycle, description: 'Bottles, containers, bags' },
  { id: 'metal', name: 'Metal/Scrap', icon: Package, description: 'Iron, aluminum, copper' },
  { id: 'electronics', name: 'Electronics', icon: Cpu, description: 'Phones, laptops, gadgets' },
  { id: 'clothes', name: 'Clothes', icon: Shirt, description: 'Shirts, pants, accessories' },
  { id: 'books', name: 'Books', icon: BookOpen, description: 'Novels, textbooks, magazines' },
  { id: 'furniture', name: 'Furniture', icon: Sofa, description: 'Chairs, tables, beds' },
  { id: 'kitchen', name: 'Kitchen', icon: Utensils, description: 'Utensils, appliances' },
  { id: 'vehicle', name: 'Vehicle Parts', icon: Car, description: 'Auto parts, accessories' },
  { id: 'other', name: 'Other', icon: Package, description: 'Miscellaneous items' }
]

const conditions = [
  { id: 'new', label: 'New', description: 'Unused, in original packaging', color: '#22c55e' },
  { id: 'like-new', label: 'Like New', description: 'Barely used, excellent condition', color: '#3b82f6' },
  { id: 'good', label: 'Good', description: 'Used but well maintained', color: '#f59e0b' },
  { id: 'fair', label: 'Fair', description: 'Shows signs of wear', color: '#f97316' },
  { id: 'for-parts', label: 'For Parts', description: 'May need repair or recycling', color: '#ef4444' }
]

// Mock AI detection
const detectProductFromImage = async (imageFile) => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Mock AI results
  const results = [
    { category: 'electronics', product: 'Old Smartphone', confidence: 0.92, suggestedPrice: 1500 },
    { category: 'clothes', product: 'Cotton T-Shirt', confidence: 0.88, suggestedPrice: 100 },
    { category: 'plastic', product: 'Plastic Bottles Bundle', confidence: 0.95, suggestedPrice: 50 },
    { category: 'furniture', product: 'Wooden Chair', confidence: 0.85, suggestedPrice: 800 }
  ]
  
  return results[Math.floor(Math.random() * results.length)]
}

function ListItemPage() {
  const { user, addEcoPoints } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  
  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    condition: '',
    price: '',
    quantity: '1',
    isVintage: false,
    isNegotiable: true,
    location: user?.location || '',
    images: []
  })

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...newPreviews])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))

    // AI Detection for first image
    if (files.length > 0 && !aiResult) {
      setIsAnalyzing(true)
      try {
        const result = await detectProductFromImage(files[0])
        setAiResult(result)
        setFormData(prev => ({
          ...prev,
          category: result.category,
          productName: result.product,
          price: result.suggestedPrice.toString()
        }))
      } catch (error) {
        console.error('AI detection failed:', error)
      }
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save item to localStorage for map display
    const newItem = {
      id: Date.now(),
      type: 'sell',
      name: formData.productName,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      condition: formData.condition,
      location: formData.location,
      description: formData.description,
      isVintage: formData.isVintage,
      isNegotiable: formData.isNegotiable,
      quantity: parseInt(formData.quantity) || 1,
      image: previewImages[0] || null,
      createdAt: new Date().toISOString(),
      user: {
        name: user?.name || 'Anonymous',
        avatar: '👤'
      }
    }
    
    // Get existing listings and add new one
    const existingListings = JSON.parse(localStorage.getItem('eco_market_listings') || '[]')
    existingListings.push(newItem)
    localStorage.setItem('eco_market_listings', JSON.stringify(existingListings))
    
    addEcoPoints(30)
    setSubmitted(true)
  }


  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  if (submitted) {
    return (
      <div className="list-item-page">
        <div className="container container-md">
          <div className="success-card card animate-scaleIn">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Product Listed Successfully! 🎉</h2>
            <p>Your product is now live on the marketplace. You've earned <strong>30 Eco Points!</strong></p>
            
            <div className="listing-summary">
              <h4>Listing Details</h4>
              <div className="summary-grid">
                {previewImages[0] && (
                  <div className="summary-image">
                    <img src={previewImages[0]} alt="Product" />
                  </div>
                )}
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Product:</span>
                    <span>{formData.productName}</span>
                  </div>
                  <div className="summary-item">
                    <span>Category:</span>
                    <span>{categories.find(c => c.id === formData.category)?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Price:</span>
                    <span className="price-text">₹{formData.price}</span>
                  </div>
                  <div className="summary-item">
                    <span>Condition:</span>
                    <span>{conditions.find(c => c.id === formData.condition)?.label}</span>
                  </div>
                  <div className="summary-item">
                    <span>Vintage:</span>
                    <span>{formData.isVintage ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/sell')}
              >
                View My Listings
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false)
                  setStep(1)
                  setAiResult(null)
                  setPreviewImages([])
                  setFormData({
                    category: '',
                    productName: '',
                    description: '',
                    condition: '',
                    price: '',
                    quantity: '1',
                    isVintage: false,
                    isNegotiable: true,
                    location: user?.location || '',
                    images: []
                  })
                }}
              >
                List Another Item
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="list-item-page">
      <div className="container">
        {/* Hero */}
        <div className="list-hero">
          <div className="hero-content">
            <div className="hero-icon-wrap">
              <DollarSign size={32} />
            </div>
            <div>
              <h1>Sell Your Items</h1>
              <p>Turn your unused items into cash. Our AI helps you price it right!</p>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">₹500+</span>
              <span className="stat-label">Avg. Earning</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">30</span>
              <span className="stat-label">Eco Points</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="form-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">{step > 1 ? <CheckCircle size={20} /> : '1'}</span>
            <span className="step-label">Upload Photos</span>
          </div>
          <div className={`progress-line ${step > 1 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">{step > 2 ? <CheckCircle size={20} /> : '2'}</span>
            <span className="step-label">Product Details</span>
          </div>
          <div className={`progress-line ${step > 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Set Price</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="list-form">
          {/* Step 1: Image Upload */}
          {step === 1 && (
            <div className="form-step animate-fadeIn">
              <div className="step-header">
                <h2>📸 Upload Product Photos</h2>
                <p className="text-muted">Add clear photos of your item. Our AI will analyze and suggest details!</p>
              </div>

              <div className="form-card card">
                <div className="image-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    id="image-upload"
                    hidden
                  />
                  <label htmlFor="image-upload" className="upload-trigger">
                    {isAnalyzing ? (
                      <>
                        <div className="analyzing-animation">
                          <Sparkles size={48} className="sparkle-icon" />
                        </div>
                        <span className="analyzing-text">AI is analyzing your product...</span>
                        <div className="progress-bar">
                          <div className="progress-fill"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="upload-icon-wrap">
                          <ImagePlus size={48} />
                        </div>
                        <span className="upload-text">Click or drag to upload photos</span>
                        <span className="upload-hint">JPG, PNG up to 10MB • Add up to 5 photos</span>
                      </>
                    )}
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="image-previews">
                    {previewImages.map((src, index) => (
                      <div key={index} className="preview-item">
                        <img src={src} alt={`Preview ${index + 1}`} />
                        <button 
                          type="button"
                          className="remove-image"
                          onClick={() => removeImage(index)}
                        >
                          <X size={14} />
                        </button>
                        {index === 0 && <span className="main-badge">Main</span>}
                      </div>
                    ))}
                    {previewImages.length < 5 && (
                      <label htmlFor="image-upload" className="add-more-btn">
                        <ImagePlus size={24} />
                        <span>Add More</span>
                      </label>
                    )}
                  </div>
                )}

                {aiResult && (
                  <div className="ai-result animate-fadeIn">
                    <div className="ai-header">
                      <Sparkles size={20} />
                      <span>AI Detection Result</span>
                      <span className="confidence">{Math.round(aiResult.confidence * 100)}% confident</span>
                    </div>
                    <div className="ai-details">
                      <div className="ai-item">
                        <span className="ai-label">Detected Product</span>
                        <span className="ai-value">{aiResult.product}</span>
                      </div>
                      <div className="ai-item">
                        <span className="ai-label">Category</span>
                        <span className="ai-value">{categories.find(c => c.id === aiResult.category)?.name}</span>
                      </div>
                      <div className="ai-item">
                        <span className="ai-label">Suggested Price</span>
                        <span className="ai-value price">₹{aiResult.suggestedPrice}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => navigate('/sell')}
                >
                  <ArrowLeft size={18} />
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setStep(2)}
                  disabled={previewImages.length === 0}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Product Details */}
          {step === 2 && (
            <div className="form-step animate-fadeIn">
              <div className="step-header">
                <h2>📝 Product Details</h2>
                <p className="text-muted">Tell buyers about your item</p>
              </div>

              <div className="form-card card">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <div className="category-grid">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`category-btn ${formData.category === cat.id ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      >
                        <cat.icon size={24} />
                        <span className="cat-name">{cat.name}</span>
                        <span className="cat-desc">{cat.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-2">
                    <label className="form-label">Product Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., Samsung Galaxy S21 Ultra"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group flex-1">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-input"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Describe your product in detail - any defects, accessories included, reason for selling..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Condition *</label>
                  <div className="condition-options">
                    {conditions.map(cond => (
                      <button
                        key={cond.id}
                        type="button"
                        className={`condition-btn ${formData.condition === cond.id ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, condition: cond.id }))}
                        style={{ '--condition-color': cond.color }}
                      >
                        <span className="cond-indicator"></span>
                        <div className="cond-content">
                          <span className="cond-label">{cond.label}</span>
                          <span className="cond-desc">{cond.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label vintage-label">
                    <input
                      type="checkbox"
                      checked={formData.isVintage}
                      onChange={(e) => setFormData(prev => ({ ...prev, isVintage: e.target.checked }))}
                    />
                    <Clock size={18} />
                    <span>This is a Vintage/Antique Item</span>
                  </label>
                  <p className="form-hint">Vintage items get special visibility in our Vintage collection</p>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setStep(3)}
                  disabled={!formData.category || !formData.productName || !formData.condition}
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing & Location */}
          {step === 3 && (
            <div className="form-step animate-fadeIn">
              <div className="step-header">
                <h2>💰 Set Your Price</h2>
                <p className="text-muted">Price your item competitively to sell faster</p>
              </div>

              <div className="form-card card">
                <div className="pricing-section">
                  <div className="form-group">
                    <label className="form-label">Your Price *</label>
                    <div className="price-input-group">
                      <span className="currency">₹</span>
                      <input
                        type="number"
                        className="form-input price-input"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    {aiResult && (
                      <div className="ai-suggestion">
                        <Sparkles size={14} />
                        <span>AI suggests <strong>₹{aiResult.suggestedPrice}</strong> based on similar items</span>
                        <button 
                          type="button"
                          className="use-suggestion"
                          onClick={() => setFormData(prev => ({ ...prev, price: aiResult.suggestedPrice.toString() }))}
                        >
                          Use this
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label negotiable-label">
                      <input
                        type="checkbox"
                        checked={formData.isNegotiable}
                        onChange={(e) => setFormData(prev => ({ ...prev, isNegotiable: e.target.checked }))}
                      />
                      <span>Price is negotiable</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup Location *</label>
                  <div className="location-input">
                    <MapPin size={20} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your city/area for pickup"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="listing-preview">
                  <h4>Listing Preview</h4>
                  <div className="preview-card">
                    <div className="preview-image">
                      {previewImages[0] && <img src={previewImages[0]} alt="Preview" />}
                    </div>
                    <div className="preview-info">
                      <span className="preview-category">{categories.find(c => c.id === formData.category)?.name}</span>
                      <h3>{formData.productName || 'Product Name'}</h3>
                      <span className="preview-condition">{conditions.find(c => c.id === formData.condition)?.label}</span>
                      <div className="preview-price">₹{formData.price || '0'}</div>
                      <div className="preview-location">
                        <MapPin size={14} />
                        {formData.location || 'Location'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="eco-points-preview">
                  <Leaf size={24} />
                  <div>
                    <strong>You'll earn 30 Eco Points</strong>
                    <p>when your item is listed!</p>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft size={18} />
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={!formData.price || !formData.location}
                >
                  <Tag size={18} />
                  List Product for Sale
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .list-item-page {
          padding: var(--space-6) 0 var(--space-16);
          min-height: 100vh;
        }

        .list-hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-8);
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-8);
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .hero-icon-wrap {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .list-hero h1 {
          color: white;
          margin-bottom: var(--space-1);
        }

        .list-hero p {
          opacity: 0.9;
          margin: 0;
        }

        .hero-stats {
          display: flex;
          gap: var(--space-6);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-3) var(--space-5);
          background: rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-lg);
        }

        .hero-stat .stat-value {
          font-size: var(--text-2xl);
          font-weight: 700;
        }

        .hero-stat .stat-label {
          font-size: var(--text-xs);
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .list-hero {
            flex-direction: column;
            text-align: center;
            gap: var(--space-4);
          }
          
          .hero-content {
            flex-direction: column;
          }
        }

        .form-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-8);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }

        .step-number {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--color-gray-200);
          color: var(--color-gray-500);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: var(--text-lg);
          transition: all var(--transition-base);
        }

        .progress-step.active .step-number {
          background: var(--color-accent);
          color: white;
        }

        .progress-step.completed .step-number {
          background: var(--color-success);
          color: white;
        }

        .step-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .progress-line {
          width: 100px;
          height: 3px;
          background: var(--color-gray-200);
          margin: 0 var(--space-4);
          margin-bottom: var(--space-6);
          border-radius: var(--radius-full);
          transition: all var(--transition-base);
        }

        .progress-line.active {
          background: var(--color-accent);
        }

        .list-form {
          max-width: 800px;
          margin: 0 auto;
        }

        .step-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .step-header h2 {
          margin-bottom: var(--space-2);
        }

        .form-card {
          padding: var(--space-6);
          margin-bottom: var(--space-6);
        }

        .image-upload-area {
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-xl);
          padding: var(--space-12);
          text-align: center;
          transition: all var(--transition-fast);
          background: var(--color-gray-50);
        }

        .image-upload-area:hover {
          border-color: var(--color-accent);
          background: rgba(245, 158, 11, 0.05);
        }

        .upload-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
        }

        .upload-icon-wrap {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.1));
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
        }

        .upload-text {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--color-text);
        }

        .upload-hint {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .analyzing-animation {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .sparkle-icon {
          color: var(--color-accent);
        }

        .analyzing-text {
          font-weight: 600;
          color: var(--color-accent);
        }

        .progress-bar {
          width: 200px;
          height: 4px;
          background: var(--color-gray-200);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent);
          animation: loading 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .image-previews {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-6);
          flex-wrap: wrap;
        }

        .preview-item {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 2px solid var(--color-border);
        }

        .preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          font-size: var(--text-xs);
          background: var(--color-accent);
          color: white;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        .add-more-btn {
          width: 100px;
          height: 100px;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-1);
          cursor: pointer;
          color: var(--color-gray-400);
          transition: all var(--transition-fast);
        }

        .add-more-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .add-more-btn span {
          font-size: var(--text-xs);
        }

        .ai-result {
          margin-top: var(--space-6);
          padding: var(--space-5);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.05));
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-lg);
        }

        .ai-header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          color: var(--color-accent);
          font-weight: 600;
        }

        .confidence {
          margin-left: auto;
          font-size: var(--text-sm);
          background: var(--color-accent);
          color: white;
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-sm);
        }

        .ai-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        .ai-item {
          display: flex;
          flex-direction: column;
        }

        .ai-label {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-1);
        }

        .ai-value {
          font-weight: 600;
        }

        .ai-value.price {
          font-size: var(--text-lg);
          color: var(--color-success);
        }

        .form-row {
          display: flex;
          gap: var(--space-4);
        }

        .flex-1 { flex: 1; }
        .flex-2 { flex: 2; }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }

        @media (max-width: 600px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .category-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
          text-align: center;
        }

        .category-btn:hover {
          border-color: var(--color-accent);
          transform: translateY(-2px);
        }

        .category-btn.selected {
          border-color: var(--color-accent);
          background: rgba(245, 158, 11, 0.1);
          color: var(--color-accent);
        }

        .cat-name {
          font-weight: 600;
        }

        .cat-desc {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .condition-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .condition-btn {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-lg);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .condition-btn:hover {
          border-color: var(--condition-color);
        }

        .condition-btn.selected {
          border-color: var(--condition-color);
          background: color-mix(in srgb, var(--condition-color) 10%, transparent);
        }

        .cond-indicator {
          width: 12px;
          height: 12px;
          border-radius: var(--radius-full);
          background: var(--condition-color);
        }

        .cond-content {
          display: flex;
          flex-direction: column;
        }

        .cond-label {
          font-weight: 600;
        }

        .cond-desc {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .vintage-label,
        .negotiable-label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          cursor: pointer;
        }

        .vintage-label input,
        .negotiable-label input {
          width: 20px;
          height: 20px;
          accent-color: var(--color-accent);
        }

        .form-hint {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-1);
          margin-left: var(--space-8);
        }

        .pricing-section {
          padding-bottom: var(--space-6);
          border-bottom: 1px solid var(--color-border);
          margin-bottom: var(--space-6);
        }

        .price-input-group {
          display: flex;
          align-items: center;
        }

        .currency {
          padding: var(--space-4);
          background: var(--color-gray-100);
          border: 1px solid var(--color-border);
          border-right: none;
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-text-secondary);
        }

        .price-input {
          border-radius: 0 var(--radius-lg) var(--radius-lg) 0 !important;
          font-size: var(--text-xl) !important;
          font-weight: 700 !important;
        }

        .ai-suggestion {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-accent);
          margin-top: var(--space-2);
          padding: var(--space-3);
          background: rgba(245, 158, 11, 0.1);
          border-radius: var(--radius-md);
        }

        .use-suggestion {
          margin-left: auto;
          padding: var(--space-1) var(--space-3);
          background: var(--color-accent);
          color: white;
          border-radius: var(--radius-md);
          font-size: var(--text-xs);
          font-weight: 600;
        }

        .location-input {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .location-input svg {
          color: var(--color-gray-400);
        }

        .location-input .form-input {
          flex: 1;
        }

        .listing-preview {
          margin-top: var(--space-6);
          padding-top: var(--space-6);
          border-top: 1px solid var(--color-border);
        }

        .listing-preview h4 {
          margin-bottom: var(--space-4);
        }

        .preview-card {
          display: flex;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .preview-image {
          width: 120px;
          height: 120px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--color-gray-200);
        }

        .preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-info {
          flex: 1;
        }

        .preview-category {
          font-size: var(--text-xs);
          text-transform: uppercase;
          color: var(--color-accent);
          font-weight: 600;
        }

        .preview-info h3 {
          font-size: var(--text-base);
          margin: var(--space-1) 0;
        }

        .preview-condition {
          font-size: var(--text-xs);
          padding: 2px 8px;
          background: var(--color-gray-100);
          border-radius: var(--radius-sm);
        }

        .preview-price {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-success);
          margin: var(--space-2) 0;
        }

        .preview-location {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .eco-points-preview {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.05));
          border: 1px solid var(--color-success);
          border-radius: var(--radius-lg);
          margin-top: var(--space-6);
        }

        .eco-points-preview svg {
          color: var(--color-success);
        }

        .eco-points-preview p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: var(--space-4);
        }

        .success-card {
          text-align: center;
          padding: var(--space-12);
          max-width: 600px;
          margin: var(--space-12) auto;
        }

        .success-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6);
          color: var(--color-success);
        }

        .success-card h2 {
          margin-bottom: var(--space-3);
        }

        .listing-summary {
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          margin: var(--space-6) 0;
          text-align: left;
        }

        .listing-summary h4 {
          margin-bottom: var(--space-4);
          text-align: center;
        }

        .summary-grid {
          display: flex;
          gap: var(--space-4);
        }

        .summary-image {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .summary-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .summary-details {
          flex: 1;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: var(--space-2) 0;
          border-bottom: 1px solid var(--color-border);
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .price-text {
          font-weight: 700;
          color: var(--color-success);
        }

        .success-actions {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default ListItemPage
