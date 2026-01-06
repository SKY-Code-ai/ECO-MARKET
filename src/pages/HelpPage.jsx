import { useState, useRef, useEffect } from 'react'
import {
  HelpCircle,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

// FAQ data
const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click on "Sign Up" on the login page. Fill in your details including name, email, password, mobile number, and optional profile information. You can also sign up using your Google account for quick registration.'
      },
      {
        q: 'What are Eco Points?',
        a: 'Eco Points are rewards you earn for sustainable actions like donating, selling waste, and making eco-friendly purchases. Points can be redeemed for discounts, gift cards, and special badges.'
      },
      {
        q: 'How do levels work?',
        a: 'Your level increases as you earn Eco Points. Every 200 points, you advance to the next level. Higher levels unlock exclusive rewards and badges.'
      }
    ]
  },
  {
    category: 'Donations & Selling',
    questions: [
      {
        q: 'How do I donate items?',
        a: 'Go to the Donate page, select a category, provide item details and photos, then choose pickup or drop-off. Our team will collect the items at your convenience.'
      },
      {
        q: 'How do I sell my waste?',
        a: 'List your items on the Marketplace with photos, description, and price. Buyers in your area can purchase. We provide AI-powered price suggestions to help you set competitive rates.'
      },
      {
        q: 'What items can I donate or sell?',
        a: 'You can donate/sell clothes, electronics, books, furniture, kitchen items, and much more. All items should be in usable condition for donations.'
      }
    ]
  },
  {
    category: 'Payments & Delivery',
    questions: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept UPI, credit/debit cards, net banking, and wallet payments. All transactions are secured with industry-standard encryption.'
      },
      {
        q: 'How does delivery work?',
        a: 'Sellers arrange delivery within their city. For eco-products, we provide standard delivery (3-5 days) and express delivery options.'
      }
    ]
  }
]

// AI Chat responses - Enhanced with website navigation knowledge
const websiteKnowledge = {
  pages: {
    home: { path: '/', name: 'Home', description: 'Your dashboard showing eco score, recent activities, and quick actions' },
    marketplace: { path: '/marketplace', name: 'Marketplace', description: 'Browse and buy recycled products, waste materials, and eco-friendly items' },
    donate: { path: '/donate', name: 'Donate', description: 'Donate clothes, electronics, books, and other items to earn Eco Points' },
    sell: { path: '/sell', name: 'Sell', description: 'List your waste or used items for sale' },
    cart: { path: '/cart', name: 'Cart', description: 'View and checkout items in your shopping cart' },
    orders: { path: '/my-orders', name: 'My Orders', description: 'Track your orders and view purchase history' },
    wallet: { path: '/wallet', name: 'Wallet', description: 'Manage your Eco Wallet balance and transactions' },
    bank: { path: '/bank', name: 'Bank', description: 'Link bank accounts for withdrawals and payments' },
    profile: { path: '/profile', name: 'Profile', description: 'Update your personal information and settings' },
    leaderboard: { path: '/leaderboard', name: 'Leaderboard', description: 'See top eco warriors and your ranking' },
    community: { path: '/community', name: 'Community', description: 'Join challenges, connect with other users, and participate in events' },
    vintage: { path: '/vintage', name: 'Vintage', description: 'Browse unique vintage and antique items' },
    eliteBuyer: { path: '/elite-buyer', name: 'Elite Buyer', description: 'Premium membership for buyers with cashback and exclusive deals' },
    eliteSeller: { path: '/elite-seller', name: 'Elite Seller', description: 'Premium membership for sellers with boosted visibility and lower fees' },
    myAds: { path: '/my-ads', name: 'My Ads', description: 'Manage your listed items and advertisements' },
    help: { path: '/help', name: 'Help Center', description: 'Get help and support for using ECO-MARKET' }
  },
  features: {
    ecoPoints: 'Eco Points are rewards earned for sustainable actions. Earn 50 pts for donations, 30 pts for selling, 20 pts for purchases. Redeem for discounts!',
    levels: 'Your level increases every 200 Eco Points. Higher levels unlock badges, rewards, and exclusive perks.',
    wallet: 'Eco Wallet stores your earnings. Add money via UPI, cards, or bank transfer. Withdraw anytime to your linked bank.',
    elite: 'Elite memberships offer cashback (5-15%), free delivery, priority support, and exclusive access to deals.',
    delivery: 'Standard delivery takes 3-5 days. Express delivery available in select cities. Sellers can also arrange local pickup.'
  }
}

// Smart AI response generator
const generateAIResponse = (userMessage) => {
  const msg = userMessage.toLowerCase()
  
  // Navigation intent detection
  const navigationKeywords = {
    'home': ['home', 'dashboard', 'main page', 'start'],
    'marketplace': ['marketplace', 'market', 'shop', 'buy', 'purchase', 'browse', 'products', 'items for sale'],
    'donate': ['donate', 'donation', 'give away', 'charity'],
    'sell': ['sell', 'selling', 'list item', 'list product', 'post ad'],
    'cart': ['cart', 'basket', 'checkout'],
    'orders': ['order', 'orders', 'track', 'tracking', 'my purchases', 'purchase history', 'delivery status'],
    'wallet': ['wallet', 'balance', 'money', 'funds', 'payment'],
    'bank': ['bank', 'withdraw', 'bank account', 'transfer money'],
    'profile': ['profile', 'account', 'settings', 'my info', 'personal'],
    'leaderboard': ['leaderboard', 'ranking', 'top users', 'eco warriors', 'rank'],
    'community': ['community', 'challenge', 'events', 'connect', 'social'],
    'vintage': ['vintage', 'antique', 'old', 'classic', 'retro'],
    'eliteBuyer': ['elite buyer', 'buyer membership', 'premium buyer'],
    'eliteSeller': ['elite seller', 'seller membership', 'premium seller'],
    'myAds': ['my ads', 'my listings', 'my items', 'listed items'],
    'help': ['help', 'support', 'contact', 'assistance']
  }

  // Check for navigation intent
  for (const [pageKey, keywords] of Object.entries(navigationKeywords)) {
    if (keywords.some(kw => msg.includes(kw))) {
      const page = websiteKnowledge.pages[pageKey]
      if (page) {
        let response = `📍 **${page.name}**\n\n${page.description}\n\n`
        
        // Add contextual help based on the page
        if (pageKey === 'orders') {
          response += `To track your orders:\n1. Click on "My Orders" from the menu\n2. Find your order and click "Track Order"\n3. View real-time status updates\n\n🔗 Go to: ${page.path}`
        } else if (pageKey === 'marketplace') {
          response += `In the Marketplace you can:\n• Browse recycled products\n• Filter by category (Waste, Recycled, Vintage)\n• Add items to cart\n• Contact sellers directly\n\n🔗 Go to: ${page.path}`
        } else if (pageKey === 'donate') {
          response += `How to donate:\n1. Select a category (Clothes, Electronics, etc.)\n2. Add item details and photos\n3. Choose pickup or drop-off\n4. Earn 50+ Eco Points! 🌱\n\n🔗 Go to: ${page.path}`
        } else if (pageKey === 'sell') {
          response += `To sell items:\n1. Go to Sell page\n2. Click "List New Item"\n3. Add photos, description, and price\n4. Wait for buyers!\n\n🔗 Go to: ${page.path}`
        } else if (pageKey === 'leaderboard') {
          response += `Leaderboard features:\n• National rankings\n• City-wise leaderboards\n• Filter by time (weekly/monthly)\n• See your percentile\n\n🔗 Go to: ${page.path}`
        } else {
          response += `🔗 Go to: ${page.path}`
        }
        
        return { text: response, action: { type: 'navigate', path: page.path, label: `Go to ${page.name}` } }
      }
    }
  }

  // Feature-specific responses
  if (msg.includes('eco point') || msg.includes('points') || msg.includes('reward') || msg.includes('earn')) {
    return {
      text: `🌟 **Eco Points System**\n\n${websiteKnowledge.features.ecoPoints}\n\n**Ways to earn:**\n• Donate items: +50 pts\n• Sell waste: +30 pts\n• Buy recycled: +20 pts\n• Complete challenges: +100-300 pts\n\nCheck your points on the Home page!`,
      action: { type: 'navigate', path: '/', label: 'Check My Points' }
    }
  }

  if (msg.includes('level') || msg.includes('badge')) {
    return {
      text: `🎖️ **Levels & Badges**\n\n${websiteKnowledge.features.levels}\n\n**Current badges:**\n• 🌱 Eco Starter (Level 1-5)\n• 🌿 Green Helper (Level 6-10)\n• 🌳 Eco Warrior (Level 11-20)\n• 👑 Eco Champion (Level 21+)\n\nKeep earning to unlock more!`
    }
  }

  if (msg.includes('elite') || msg.includes('membership') || msg.includes('premium') || msg.includes('subscription')) {
    return {
      text: `👑 **Elite Membership**\n\n${websiteKnowledge.features.elite}\n\n**Buyer Benefits:**\n• 5-15% cashback\n• Free delivery\n• Early access to deals\n\n**Seller Benefits:**\n• Boosted visibility\n• Lower platform fees\n• Priority support`,
      action: { type: 'navigate', path: '/elite-buyer', label: 'View Elite Plans' }
    }
  }

  if (msg.includes('payment') || msg.includes('pay') || msg.includes('upi')) {
    return {
      text: `💳 **Payment Options**\n\nWe accept:\n• UPI (GPay, PhonePe, Paytm)\n• Credit/Debit Cards\n• Net Banking\n• Eco Wallet Balance\n\nAll transactions are secured with encryption. For issues, contact support.`,
      action: { type: 'navigate', path: '/wallet', label: 'Manage Wallet' }
    }
  }

  if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('when will')) {
    return {
      text: `🚚 **Delivery Information**\n\n${websiteKnowledge.features.delivery}\n\n**Track your order:**\n1. Go to "My Orders"\n2. Click "Track Order"\n3. View live status updates\n\nNeed help? Contact the seller directly.`,
      action: { type: 'navigate', path: '/my-orders', label: 'Track Orders' }
    }
  }

  if (msg.includes('refund') || msg.includes('return') || msg.includes('cancel')) {
    return {
      text: `🔄 **Returns & Refunds**\n\nOur policy:\n• Returns accepted within 7 days\n• Item must be unused and in original packaging\n• Refunds processed to original payment method\n• Takes 3-5 business days\n\nTo initiate a return, go to My Orders and select the order.`,
      action: { type: 'navigate', path: '/my-orders', label: 'View Orders' }
    }
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good')) {
    return {
      text: `Hello! 👋 Welcome to ECO-MARKET Help!\n\nI can help you with:\n• 🛒 Shopping & Marketplace\n• 🎁 Donating items\n• 💰 Selling waste\n• 📦 Order tracking\n• 💳 Payments & Wallet\n• 🏆 Eco Points & Rewards\n\nJust ask me anything or tell me what you're looking for!`
    }
  }

  if (msg.includes('thank')) {
    return {
      text: `You're welcome! 😊 Happy to help!\n\nIs there anything else you'd like to know about ECO-MARKET? I'm here to assist with shopping, donations, selling, or any other questions!`
    }
  }

  // Default response with suggestions
  return {
    text: `I'd be happy to help! Here's what I can assist with:\n\n🛒 **Shopping:** "Where can I buy recycled products?"\n🎁 **Donating:** "How do I donate items?"\n💰 **Selling:** "How can I sell my waste?"\n📦 **Orders:** "Track my order"\n💳 **Payments:** "Payment options"\n🏆 **Rewards:** "How do Eco Points work?"\n\nTry asking about any of these topics!`
  }
}

function HelpPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: "Hello! 👋 I'm EcoBot, your AI assistant.\n\nI can help you navigate ECO-MARKET, find products, track orders, and answer questions about:\n• 🛒 Shopping & Marketplace\n• 🎁 Donating items\n• 💰 Selling waste\n• 📦 Order tracking\n• 🏆 Eco Points & Rewards\n\nWhat would you like help with?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Skip scrolling on initial mount to prevent page from scrolling down
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    // Only scroll chat container for new messages, not the entire page
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [chatMessages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInputMessage('')
    setIsTyping(true)

    // Generate smart AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage)
      setChatMessages(prev => [...prev, { 
        type: 'bot', 
        text: aiResponse.text,
        action: aiResponse.action 
      }])
      setIsTyping(false)
    }, 800 + Math.random() * 400) // Slight random delay for natural feel
  }

  const handleQuickAction = (action) => {
    if (action.type === 'navigate') {
      window.location.href = action.path
    }
  }

  const filteredFaqs = searchQuery
    ? faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : faqs

  return (
    <div className="help-page">
      <div className="container">
        {/* Hero Section */}
        <div className="help-hero">
          <HelpCircle size={48} className="hero-icon" />
          <h1>Help Center</h1>
          <p>Find answers or chat with our AI assistant</p>
          
          <div className="hero-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="help-layout">
          {/* FAQ Section */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-categories">
              {filteredFaqs.map((category, catIndex) => (
                <div key={catIndex} className="faq-category">
                  <button 
                    className={`category-header ${activeCategory === catIndex ? 'active' : ''}`}
                    onClick={() => setActiveCategory(catIndex)}
                  >
                    {category.category}
                    <ChevronDown size={18} />
                  </button>
                  
                  {activeCategory === catIndex && (
                    <div className="category-questions animate-fadeIn">
                      {category.questions.map((item, qIndex) => (
                        <div key={qIndex} className="faq-item">
                          <button 
                            className="faq-question"
                            onClick={() => setExpandedQuestion(
                              expandedQuestion === `${catIndex}-${qIndex}` 
                                ? null 
                                : `${catIndex}-${qIndex}`
                            )}
                          >
                            <span>{item.q}</span>
                            <ChevronRight 
                              size={18} 
                              className={expandedQuestion === `${catIndex}-${qIndex}` ? 'rotated' : ''}
                            />
                          </button>
                          {expandedQuestion === `${catIndex}-${qIndex}` && (
                            <p className="faq-answer animate-fadeIn">{item.a}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Section */}
          <div className="chat-section">
            <div className="chat-card card">
              <div className="chat-header">
                <div className="bot-info">
                  <div className="bot-avatar">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3>EcoBot</h3>
                    <span className="online-status">● Online</span>
                  </div>
                </div>
                <Sparkles size={20} className="sparkle-icon" />
              </div>

              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-avatar">
                      {msg.type === 'bot' ? <Bot size={18} /> : <User size={18} />}
                    </div>
                    <div className="message-content">
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-avatar">
                      <Bot size={18} />
                    </div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </div>

              <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Ask EcoBot anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="submit" className="send-btn">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>Still need help?</h2>
          <div className="contact-cards">
            <div className="contact-card card">
              <Phone size={24} />
              <h4>Call Us</h4>
              <p>+91 9359442508</p>
              <span>Mon-Sat, 9AM-6PM</span>
            </div>
            <div className="contact-card card">
              <Mail size={24} />
              <h4>Email Us</h4>
              <p>deshmaneganesh25@gmail.com</p>
              <span>We reply within 24 hours</span>
            </div>
            <div className="contact-card card">
              <MapPin size={24} />
              <h4>Visit Us</h4>
              <p>Nagpur, Maharashtra</p>
              <span>Eco Hub Center</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .help-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .help-hero {
          text-align: center;
          padding: var(--space-12) 0;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-2xl);
          color: white;
          margin-bottom: var(--space-12);
        }

        .hero-icon {
          margin-bottom: var(--space-4);
        }

        .help-hero h1 {
          color: white;
          margin-bottom: var(--space-2);
        }

        .help-hero p {
          opacity: 0.9;
          margin-bottom: var(--space-6);
        }

        .hero-search {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          max-width: 500px;
          margin: 0 auto;
          padding: var(--space-3) var(--space-4);
          background: white;
          border-radius: var(--radius-xl);
        }

        .hero-search svg {
          color: var(--color-gray-400);
        }

        .hero-search input {
          flex: 1;
          border: none;
          font-size: var(--text-base);
          outline: none;
        }

        .help-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
        }

        @media (max-width: 1024px) {
          .help-layout {
            grid-template-columns: 1fr;
          }
        }

        .faq-section h2 {
          margin-bottom: var(--space-6);
        }

        .faq-category {
          margin-bottom: var(--space-2);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: var(--space-4);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .category-header:hover,
        .category-header.active {
          background: var(--color-primary-50);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .category-questions {
          padding: var(--space-2) 0;
        }

        .faq-item {
          border-bottom: 1px solid var(--color-border);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: var(--space-4);
          text-align: left;
          font-weight: 500;
          color: var(--color-text);
          transition: color var(--transition-fast);
        }

        .faq-question:hover {
          color: var(--color-primary);
        }

        .faq-question svg {
          transition: transform var(--transition-fast);
          flex-shrink: 0;
        }

        .faq-question svg.rotated {
          transform: rotate(90deg);
        }

        .faq-answer {
          padding: 0 var(--space-4) var(--space-4);
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        .chat-section {
          position: sticky;
          top: 100px;
        }

        .chat-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 500px;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4);
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          color: white;
        }

        .bot-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .bot-avatar {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bot-info h3 {
          color: white;
          font-size: var(--text-base);
          margin-bottom: 0;
        }

        .online-status {
          font-size: var(--text-xs);
          color: #4ade80;
        }

        .sparkle-icon {
          color: rgba(255, 255, 255, 0.7);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .message {
          display: flex;
          gap: var(--space-3);
          max-width: 85%;
        }

        .message.user {
          flex-direction: row-reverse;
          margin-left: auto;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background: var(--color-primary-100);
          color: var(--color-primary);
        }

        .message.user .message-avatar {
          background: var(--color-gray-200);
          color: var(--color-gray-600);
        }

        .message-content {
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
          line-height: 1.6;
        }

        .message.bot .message-content {
          background: var(--color-gray-100);
        }

        .message.user .message-content {
          background: var(--color-primary);
          color: white;
        }

        .message-content p {
          margin: 0;
        }

        .message-content p + p {
          margin-top: var(--space-2);
        }

        .typing-indicator {
          display: flex;
          gap: var(--space-1);
          padding: var(--space-3) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--color-gray-400);
          border-radius: var(--radius-full);
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        .chat-input {
          display: flex;
          gap: var(--space-2);
          padding: var(--space-4);
          border-top: 1px solid var(--color-border);
        }

        .chat-input input {
          flex: 1;
          padding: var(--space-3) var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .chat-input input:focus {
          border-color: var(--color-primary);
        }

        .send-btn {
          width: 44px;
          height: 44px;
          background: var(--color-primary);
          color: white;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .send-btn:hover {
          background: var(--color-primary-dark);
          transform: scale(1.05);
        }

        .contact-section {
          text-align: center;
        }

        .contact-section h2 {
          margin-bottom: var(--space-8);
        }

        .contact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 768px) {
          .contact-cards {
            grid-template-columns: 1fr;
          }
        }

        .contact-card {
          padding: var(--space-8);
          text-align: center;
        }

        .contact-card svg {
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }

        .contact-card h4 {
          margin-bottom: var(--space-2);
        }

        .contact-card p {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: var(--space-1);
        }

        .contact-card span {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  )
}

export default HelpPage
