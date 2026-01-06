import { Link } from 'react-router-dom'
import {
  Leaf,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <Leaf size={24} />
              </div>
              <span>Waste<span className="text-accent">2</span>Worth</span>
            </Link>
            <p className="footer-desc">
              Transform waste into worth. Join millions of eco-warriors making 
              a positive impact on our planet through sustainable practices.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/donate">Donate Waste</Link></li>
              <li><Link to="/vintage">Vintage Items</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Sell Waste</a></li>
              <li><a href="#">Buy Recycled</a></li>
              <li><a href="#">B2B Solutions</a></li>
              <li><a href="#">Pickup Service</a></li>
              <li><a href="#">Recycling Partners</a></li>
              <li><a href="#">Eco Certification</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Sustainability Report</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <div className="contact-item">
              <Mail size={18} />
              <span>support@waste2worth.com</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+91 1800-ECO-HELP</span>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>Mumbai, Maharashtra, India</span>
            </div>

            <div className="newsletter">
              <h5>Subscribe to Newsletter</h5>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="footer-impact">
          <div className="impact-item">
            <span className="impact-value">10M+</span>
            <span className="impact-label">Kg Waste Recycled</span>
          </div>
          <div className="impact-item">
            <span className="impact-value">500K+</span>
            <span className="impact-label">Active Users</span>
          </div>
          <div className="impact-item">
            <span className="impact-value">1M+</span>
            <span className="impact-label">Items Donated</span>
          </div>
          <div className="impact-item">
            <span className="impact-value">50K+</span>
            <span className="impact-label">Trees Equivalent Saved</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {currentYear} Waste-to-Worth. All rights reserved. Made with 
            <Heart size={14} className="heart-icon" /> for the planet.
          </p>
          <div className="footer-badges">
            <span className="badge badge-success">🌱 Carbon Neutral</span>
            <span className="badge">♻️ 100% Eco-Friendly</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-gray-900);
          color: var(--color-gray-300);
          padding: var(--space-16) 0 var(--space-6);
          margin-top: var(--space-16);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-4);
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
        }

        @media (max-width: 1200px) {
          .footer-main {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 500px) {
          .footer-main {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .footer-logo .logo-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .footer-logo span {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: white;
        }

        .footer-desc {
          font-size: var(--text-sm);
          line-height: 1.7;
          margin-bottom: var(--space-6);
          color: var(--color-gray-400);
        }

        .footer-social {
          display: flex;
          gap: var(--space-2);
        }

        @media (max-width: 500px) {
          .footer-social {
            justify-content: center;
          }
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-gray-800);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-400);
          transition: all var(--transition-fast);
        }

        .social-link:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .footer-links h4,
        .footer-contact h4 {
          font-size: var(--text-base);
          font-weight: 600;
          color: white;
          margin-bottom: var(--space-4);
        }

        .footer-links ul {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .footer-links a {
          font-size: var(--text-sm);
          color: var(--color-gray-400);
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--color-primary);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
          font-size: var(--text-sm);
          color: var(--color-gray-400);
        }

        @media (max-width: 500px) {
          .contact-item {
            justify-content: center;
          }
        }

        .contact-item svg {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .newsletter {
          margin-top: var(--space-6);
        }

        .newsletter h5 {
          font-size: var(--text-sm);
          font-weight: 600;
          color: white;
          margin-bottom: var(--space-3);
        }

        .newsletter-form {
          display: flex;
          gap: var(--space-2);
        }

        @media (max-width: 500px) {
          .newsletter-form {
            flex-direction: column;
          }
        }

        .newsletter-input {
          flex: 1;
          padding: var(--space-2) var(--space-3);
          background: var(--color-gray-800);
          border: 1px solid var(--color-gray-700);
          border-radius: var(--radius-md);
          color: white;
          font-size: var(--text-sm);
        }

        .newsletter-input::placeholder {
          color: var(--color-gray-500);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .newsletter-btn {
          padding: var(--space-2) var(--space-4);
          background: var(--color-primary);
          color: white;
          font-size: var(--text-sm);
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .newsletter-btn:hover {
          background: var(--color-primary-dark);
        }

        .footer-impact {
          display: flex;
          justify-content: space-around;
          padding: var(--space-8) 0;
          border-top: 1px solid var(--color-gray-800);
          border-bottom: 1px solid var(--color-gray-800);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          gap: var(--space-6);
        }

        .impact-item {
          text-align: center;
        }

        .impact-value {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--space-1);
        }

        .impact-label {
          font-size: var(--text-sm);
          color: var(--color-gray-400);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        @media (max-width: 600px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-bottom p {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-gray-500);
        }

        .heart-icon {
          color: var(--color-error);
          margin: 0 var(--space-1);
        }

        .footer-badges {
          display: flex;
          gap: var(--space-2);
        }

        .footer-badges .badge {
          background: var(--color-gray-800);
          color: var(--color-gray-300);
        }
      `}</style>
    </footer>
  )
}

export default Footer
