import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Leaf, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Sparkles
} from 'lucide-react'

function LoginPage() {
  const navigate = useNavigate()
  const { login, googleSignIn } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(formData.email, formData.password)
    
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
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-logo animate-float">
              <Leaf size={48} />
            </div>
            <h1 className="auth-title">
              Waste<span className="text-accent">-to-</span>Worth
            </h1>
            <p className="auth-tagline">
              Transform waste into value. Join the circular economy revolution.
            </p>
            
            <div className="auth-features">
              <div className="auth-feature">
                <Sparkles className="auth-feature-icon" />
                <span>Donate or sell your waste</span>
              </div>
              <div className="auth-feature">
                <Sparkles className="auth-feature-icon" />
                <span>Discover vintage treasures</span>
              </div>
              <div className="auth-feature">
                <Sparkles className="auth-feature-icon" />
                <span>Earn eco-rewards</span>
              </div>
            </div>
          </div>
          
          <div className="auth-branding-bg"></div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>Welcome Back!</h2>
              <p className="text-muted">Sign in to continue your eco-journey</p>
            </div>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <p><strong>Demo:</strong> demo@ecomarket.com / demo123</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="auth-error animate-fadeIn">
                  {error}
                </div>
              )}

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

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-icon">
                  <Lock className="icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="divider-text">or continue with</div>

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
              Sign in with Google
            </button>

            <p className="auth-switch">
              Don't have an account? 
              <Link to="/signup" className="auth-switch-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
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
          font-size: var(--text-4xl);
          font-weight: 800;
          margin-bottom: var(--space-4);
        }

        .auth-tagline {
          font-size: var(--text-lg);
          opacity: 0.9;
          max-width: 300px;
          margin: 0 auto var(--space-8);
        }

        .auth-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .auth-feature {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
        }

        .auth-feature-icon {
          width: 18px;
          height: 18px;
          color: var(--color-accent-light);
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
          max-width: 420px;
        }

        .auth-form-header {
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .auth-form-header h2 {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }

        .demo-credentials {
          background: var(--color-primary-50);
          border: 1px solid var(--color-primary-200);
          border-radius: var(--radius-lg);
          padding: var(--space-3) var(--space-4);
          margin-bottom: var(--space-6);
          text-align: center;
          font-size: var(--text-sm);
          color: var(--color-primary-dark);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--color-error);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          text-align: center;
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
          transition: color var(--transition-fast);
        }

        .password-toggle:hover {
          color: var(--color-gray-600);
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: var(--space-2) 0 var(--space-4);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .forgot-link {
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
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

        .auth-switch-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
