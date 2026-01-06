import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Gift,
  Upload,
  Camera,
  MapPin,
  Package,
  Recycle,
  Shirt,
  Cpu,
  BookOpen,
  Sofa,
  Utensils,
  CheckCircle,
  ArrowRight,
  Leaf,
  Heart,
  Users,
  Truck
} from 'lucide-react'

const categories = [
  { id: 'clothes', name: 'Clothes', icon: Shirt },
  { id: 'electronics', name: 'Electronics', icon: Cpu },
  { id: 'books', name: 'Books', icon: BookOpen },
  { id: 'furniture', name: 'Furniture', icon: Sofa },
  { id: 'kitchen', name: 'Kitchen Items', icon: Utensils },
  { id: 'other', name: 'Other', icon: Package }
]

const pickupOptions = [
  { id: 'pickup', name: 'Schedule Pickup', description: 'We\'ll collect from your doorstep', icon: Truck },
  { id: 'dropoff', name: 'Drop-off Center', description: 'Find nearest collection point', icon: MapPin }
]

function DonatePage() {
  const { user, addEcoPoints } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    description: '',
    quantity: 1,
    condition: 'good',
    images: [],
    pickupMethod: '',
    address: user?.location || '',
    preferredDate: '',
    preferredTime: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({ ...prev, category: categoryId }))
    setStep(2)
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...newPreviews])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission
    addEcoPoints(50)
    setSubmitted(true)
  }

  const impactStats = [
    { value: '45K+', label: 'Items Donated', icon: Gift },
    { value: '12K+', label: 'Families Helped', icon: Users },
    { value: '500+', label: 'Tons Recycled', icon: Recycle },
    { value: '30K+', label: 'Eco Points Given', icon: Leaf }
  ]

  if (submitted) {
    return (
      <div className="donate-page">
        <div className="container container-md">
          <div className="success-card card animate-scaleIn">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Thank You for Your Donation! 🎉</h2>
            <p>Your donation has been registered successfully. You've earned <strong>50 Eco Points!</strong></p>
            
            <div className="donation-summary">
              <h4>Donation Details</h4>
              <div className="summary-item">
                <span>Category:</span>
                <span>{categories.find(c => c.id === formData.category)?.name}</span>
              </div>
              <div className="summary-item">
                <span>Item:</span>
                <span>{formData.itemName}</span>
              </div>
              <div className="summary-item">
                <span>Quantity:</span>
                <span>{formData.quantity}</span>
              </div>
              <div className="summary-item">
                <span>Pickup Method:</span>
                <span>{formData.pickupMethod === 'pickup' ? 'Home Pickup' : 'Drop-off'}</span>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setSubmitted(false)
                  setStep(1)
                  setFormData({
                    category: '',
                    itemName: '',
                    description: '',
                    quantity: 1,
                    condition: 'good',
                    images: [],
                    pickupMethod: '',
                    address: user?.location || '',
                    preferredDate: '',
                    preferredTime: ''
                  })
                  setPreviewImages([])
                }}
              >
                Donate More Items
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="donate-page">
      <div className="container">
        {/* Hero Section */}
        <div className="donate-hero">
          <div className="hero-content">
            <h1>Donate & Make a Difference</h1>
            <p>Your unused items can transform someone's life. Donate today and earn eco-rewards!</p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="impact-cards">
          {impactStats.map((stat, index) => (
            <div key={index} className="impact-card card">
              <stat.icon className="impact-icon" size={28} />
              <span className="impact-value">{stat.value}</span>
              <span className="impact-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Donation Form */}
        <div className="donation-form-container">
          {/* Progress Steps */}
          <div className="form-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Category</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Details</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Pickup</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Category Selection */}
            {step === 1 && (
              <div className="form-step animate-fadeIn">
                <h2>What would you like to donate?</h2>
                <p className="text-muted">Select a category to get started</p>

                <div className="category-grid">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      className={`category-card card ${formData.category === category.id ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <category.icon size={32} />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Item Details */}
            {step === 2 && (
              <div className="form-step animate-fadeIn">
                <h2>Tell us about your item</h2>
                <p className="text-muted">Provide details to help us match with recipients</p>

                <div className="form-card card">
                  <div className="form-group">
                    <label className="form-label">Item Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., Winter Clothes Bundle"
                      value={formData.itemName}
                      onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Describe the items you're donating..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-input"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: +e.target.value }))}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Condition</label>
                      <select
                        className="form-input form-select"
                        value={formData.condition}
                        onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                      >
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Images</label>
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
                        <Camera size={32} />
                        <span>Click to upload photos</span>
                      </label>
                    </div>
                    {previewImages.length > 0 && (
                      <div className="image-previews">
                        {previewImages.map((src, index) => (
                          <div key={index} className="preview-item">
                            <img src={src} alt={`Preview ${index + 1}`} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setStep(3)}
                    disabled={!formData.itemName}
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pickup Details */}
            {step === 3 && (
              <div className="form-step animate-fadeIn">
                <h2>How should we collect?</h2>
                <p className="text-muted">Choose a convenient pickup option</p>

                <div className="pickup-options">
                  {pickupOptions.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      className={`pickup-card card ${formData.pickupMethod === option.id ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, pickupMethod: option.id }))}
                    >
                      <option.icon size={32} />
                      <h4>{option.name}</h4>
                      <p>{option.description}</p>
                    </button>
                  ))}
                </div>

                {formData.pickupMethod === 'pickup' && (
                  <div className="form-card card animate-fadeIn">
                    <div className="form-group">
                      <label className="form-label">Pickup Address</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Preferred Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Preferred Time</label>
                        <select
                          className="form-input form-select"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                        >
                          <option value="">Select time</option>
                          <option value="9-12">9 AM - 12 PM</option>
                          <option value="12-3">12 PM - 3 PM</option>
                          <option value="3-6">3 PM - 6 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="eco-points-preview card-gradient">
                  <Leaf size={24} />
                  <div>
                    <strong>You'll earn 50 Eco Points</strong>
                    <p>for this donation!</p>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={!formData.pickupMethod}
                  >
                    <Heart size={18} />
                    Complete Donation
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .donate-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .donate-hero {
          text-align: center;
          padding: var(--space-12) 0;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-8);
        }

        .donate-hero h1 {
          color: white;
          margin-bottom: var(--space-3);
        }

        .donate-hero p {
          font-size: var(--text-lg);
          opacity: 0.9;
        }

        .impact-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-12);
        }

        @media (max-width: 768px) {
          .impact-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .impact-card {
          text-align: center;
          padding: var(--space-5);
        }

        .impact-icon {
          color: var(--color-primary);
          margin-bottom: var(--space-2);
        }

        .impact-value {
          display: block;
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-text);
        }

        .impact-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .donation-form-container {
          max-width: 700px;
          margin: 0 auto;
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
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-gray-200);
          color: var(--color-gray-500);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all var(--transition-base);
        }

        .progress-step.active .step-number {
          background: var(--color-primary);
          color: white;
        }

        .step-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .progress-line {
          width: 80px;
          height: 2px;
          background: var(--color-gray-200);
          margin: 0 var(--space-4);
          margin-bottom: var(--space-6);
        }

        .form-step {
          margin-bottom: var(--space-6);
        }

        .form-step h2 {
          text-align: center;
          margin-bottom: var(--space-2);
        }

        .form-step > p {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        @media (max-width: 600px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-6);
          text-align: center;
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .category-card:hover {
          border-color: var(--color-primary);
        }

        .category-card.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .category-card svg {
          color: var(--color-primary);
        }

        .form-card {
          padding: var(--space-6);
          margin-bottom: var(--space-6);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .image-upload-area {
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          text-align: center;
        }

        .upload-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          cursor: pointer;
          color: var(--color-gray-400);
        }

        .upload-trigger:hover {
          color: var(--color-primary);
        }

        .image-previews {
          display: flex;
          gap: var(--space-2);
          margin-top: var(--space-4);
          flex-wrap: wrap;
        }

        .preview-item {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .preview-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pickup-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        @media (max-width: 500px) {
          .pickup-options {
            grid-template-columns: 1fr;
          }
        }

        .pickup-card {
          padding: var(--space-6);
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .pickup-card:hover {
          border-color: var(--color-primary);
        }

        .pickup-card.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .pickup-card svg {
          color: var(--color-primary);
          margin-bottom: var(--space-3);
        }

        .pickup-card h4 {
          margin-bottom: var(--space-2);
        }

        .pickup-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .eco-points-preview {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
        }

        .eco-points-preview svg {
          color: var(--color-primary);
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
          max-width: 500px;
          margin: var(--space-12) auto;
        }

        .success-icon {
          width: 100px;
          height: 100px;
          background: var(--color-primary-100);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6);
          color: var(--color-primary);
        }

        .success-card h2 {
          margin-bottom: var(--space-3);
        }

        .donation-summary {
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin: var(--space-6) 0;
          text-align: left;
        }

        .donation-summary h4 {
          margin-bottom: var(--space-3);
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
      `}</style>
    </div>
  )
}

export default DonatePage
