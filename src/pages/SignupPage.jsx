import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Leaf, 
  User,
  Mail, 
  Lock, 
  Phone,
  Eye, 
  EyeOff, 
  ArrowRight,
  Camera,
  MapPin,
  Calendar,
  Globe,
  Users
} from 'lucide-react'

function SignupPage() {
  const navigate = useNavigate()
  const { signup, googleSignIn } = useAuth()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    profilePicture: null,
    gender: '',
    dob: '',
    location: '',
    language: 'en'
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [locationLoading, setLocationLoading] = useState(false)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const detectLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Using a mock location for demo
            setFormData(prev => ({ 
              ...prev, 
              location: 'Mumbai, Maharashtra, India' 
            }))
          } catch (err) {
            setFormData(prev => ({ 
              ...prev, 
              location: 'Location detected' 
            }))
          }
          setLocationLoading(false)
        },
        () => {
          setError('Unable to detect location. Please enter manually.')
          setLocationLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
      setLocationLoading(false)
    }
  }

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.mobile.match(/^[\d\s+()-]{10,}$/)) {
      setError('Please enter a valid mobile number')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.gender) {
      setError('Please select your gender')
      return
    }
    if (!formData.dob) {
      setError('Please enter your date of birth')
      return
    }
    
    setLoading(true)
    setError('')

    const result = await signup(formData)
    
    if (result.success) {
      navigate('/policy')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const result = await googleSignIn()
    if (result.success) {
      navigate('/policy')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-logo animate-float">
              <Leaf size={48} />
            </div>
            <h1 className="auth-title">
              Join the <span className="text-accent">Eco</span> Revolution
            </h1>
            <p className="auth-tagline">
              Create your account and start making a positive impact on the environment today.
            </p>
            
            <div className="signup-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🌱</div>
                <div>
                  <strong>Earn Eco Points</strong>
                  <p>Get rewarded for every sustainable action</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🏆</div>
                <div>
                  <strong>Unlock Badges</strong>
                  <p>Show off your environmental achievements</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🤝</div>
                <div>
                  <strong>Join Community</strong>
                  <p>Connect with like-minded eco-warriors</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="auth-branding-bg"></div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>Create Account</h2>
              <p className="text-muted">Step {step} of 2</p>
              <div className="step-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className="step-line"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="auth-error animate-fadeIn">
                  {error}
                </div>
              )}

              {step === 1 && (
                <div className="form-step animate-fadeIn">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="form-input-icon">
                      <User className="icon" size={20} />
                      <input
                        type="text"
                        name="fullName"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="form-input-icon">
                      <Mail className="icon" size={20} />
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <div className="form-input-icon">
                        <Lock className="icon" size={20} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          className="form-input"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <div className="form-input-icon">
                        <Lock className="icon" size={20} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          className="form-input"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <div className="form-input-icon">
                      <Phone className="icon" size={20} />
                      <input
                        type="tel"
                        name="mobile"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    className="btn btn-primary btn-lg w-full"
                    onClick={handleNext}
                  >
                    Continue
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step animate-fadeIn">
                  {/* Profile Picture */}
                  <div className="form-group profile-upload-group">
                    <label className="form-label">Profile Picture (Optional)</label>
                    <div className="profile-upload">
                      <div className="profile-preview">
                        {previewImage ? (
                          <img src={previewImage} alt="Profile" />
                        ) : (
                          <User size={40} />
                        )}
                      </div>
                      <label className="upload-btn">
                        <Camera size={18} />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <div className="form-input-icon">
                        <Users className="icon" size={20} />
                        <select
                          name="gender"
                          className="form-input form-select"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date of Birth</label>
                      <div className="form-input-icon">
                        <Calendar className="icon" size={20} />
                        <input
                          type="date"
                          name="dob"
                          className="form-input"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <div className="location-input-group">
                      <div className="form-input-icon flex-1">
                        <MapPin className="icon" size={20} />
                        <input
                          type="text"
                          name="location"
                          className="form-input"
                          placeholder="Enter your city"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary detect-btn"
                        onClick={detectLocation}
                        disabled={locationLoading}
                      >
                        {locationLoading ? (
                          <span className="spinner"></span>
                        ) : (
                          <MapPin size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Language</label>
                    <div className="form-input-icon">
                      <Globe className="icon" size={20} />
                      <select
                        name="language"
                        className="form-input form-select"
                        value={formData.language}
                        onChange={handleChange}
                      >
                        {languages.map(lang => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
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
                      type="submit" 
                      className="btn btn-primary btn-lg flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner"></span>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="divider-text">or sign up with</div>

            <button 
              type="button"
              className="btn btn-secondary w-full google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <p className="auth-switch">
              Already have an account? 
              <Link to="/login" className="auth-switch-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .signup-page .auth-form-section {
          overflow-y: auto;
          padding: var(--space-6);
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-4);
        }

        .step {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--color-gray-200);
          color: var(--color-gray-500);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .step.active {
          background: var(--color-primary);
          color: white;
        }

        .step-line {
          width: 60px;
          height: 2px;
          background: var(--color-gray-200);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .profile-upload-group {
          text-align: center;
        }

        .profile-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
        }

        .profile-preview {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-full);
          background: var(--color-gray-100);
          border: 3px dashed var(--color-gray-300);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: var(--color-gray-400);
        }

        .profile-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .upload-btn:hover {
          background: var(--color-gray-200);
          color: var(--color-text);
        }

        .location-input-group {
          display: flex;
          gap: var(--space-2);
        }

        .flex-1 {
          flex: 1;
        }

        .detect-btn {
          width: 48px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-actions {
          display: flex;
          gap: var(--space-3);
          margin-top: var(--space-4);
        }

        .signup-benefits {
          margin-top: var(--space-8);
          text-align: left;
        }

        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-3);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-3);
        }

        .benefit-icon {
          font-size: var(--text-2xl);
        }

        .benefit-item strong {
          display: block;
          font-size: var(--text-sm);
          margin-bottom: var(--space-1);
        }

        .benefit-item p {
          font-size: var(--text-xs);
          opacity: 0.8;
          margin: 0;
        }

        /* Reuse styles from LoginPage */
        .auth-page {
          min-height: 100vh;
          background: var(--color-bg);
        }

        .auth-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }

        @media (max-width: 968px) {
          .auth-container {
            grid-template-columns: 1fr;
          }
          .auth-branding {
            display: none;
          }
        }

        .auth-branding {
          position: relative;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
          padding: var(--space-12);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .auth-branding-bg {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .auth-branding-content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
        }

        .auth-logo {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .auth-title {
          font-size: var(--text-3xl);
          font-weight: 800;
          margin-bottom: var(--space-4);
        }

        .auth-tagline {
          font-size: var(--text-base);
          opacity: 0.9;
          max-width: 300px;
          margin: 0 auto;
        }

        .auth-form-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
          background: var(--color-bg-secondary);
        }

        .auth-form-container {
          width: 100%;
          max-width: 480px;
        }

        .auth-form-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .auth-form-header h2 {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-1);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--color-error);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          text-align: center;
          margin-bottom: var(--space-4);
        }

        .form-input-icon {
          position: relative;
        }

        .form-input-icon .form-input {
          padding-left: var(--space-12);
        }

        .form-input-icon .icon {
          position: absolute;
          left: var(--space-4);
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-gray-400);
        }

        .password-toggle {
          position: absolute;
          right: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-gray-400);
          padding: var(--space-1);
          cursor: pointer;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
        }

        .auth-switch {
          text-align: center;
          margin-top: var(--space-6);
          color: var(--color-text-secondary);
          font-size: var(--text-sm);
        }

        .auth-switch-link {
          color: var(--color-primary);
          font-weight: 600;
          margin-left: var(--space-1);
        }
      `}</style>
    </div>
  )
}

export default SignupPage
