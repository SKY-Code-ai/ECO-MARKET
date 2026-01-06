import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Leaf,
  Shield,
  Lock,
  Recycle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const policyContent = {
  en: {
    title: 'Our Policies',
    subtitle: 'Please review and accept our policies to continue',
    terms: {
      title: 'Terms of Service',
      content: `Welcome to Waste-to-Worth! By using our platform, you agree to these terms.

1. Account Responsibility: You are responsible for maintaining the security of your account and all activities under it.

2. Acceptable Use: Use our platform only for lawful purposes. Do not post misleading information about items.

3. Transactions: All transactions are between users. We facilitate but don't guarantee any transaction.

4. Content: You retain rights to content you post but grant us license to display it on the platform.

5. Eco-Points: Points earned are for platform use only and have no cash value.

6. Termination: We may suspend accounts that violate these terms.`
    },
    privacy: {
      title: 'Privacy Policy',
      content: `Your privacy matters to us. Here's how we handle your data:

1. Data Collection: We collect information you provide (name, email, location) and usage data.

2. Data Use: We use your data to provide services, improve the platform, and communicate with you.

3. Data Sharing: We don't sell your data. We may share with service providers who help operate our platform.

4. Location Data: Used to match you with nearby users and communities. You can disable this.

5. Data Security: We implement industry-standard security measures to protect your information.

6. Your Rights: You can access, correct, or delete your data by contacting us.`
    },
    sustainability: {
      title: 'Sustainability Policy',
      content: `Our commitment to the environment:

1. Circular Economy: We promote reuse and recycling to minimize waste going to landfills.

2. Carbon Tracking: We track and display the environmental impact of your actions.

3. Community Goals: We set collective sustainability targets for communities.

4. Verification: We verify recycling partners to ensure proper waste handling.

5. Education: We provide tips and resources for sustainable living.

6. Transparency: We regularly report on our platform's environmental impact.`
    },
    accept: 'I Accept All Policies',
    voiceReader: 'AI Voice Reader'
  },
  hi: {
    title: 'हमारी नीतियां',
    subtitle: 'कृपया जारी रखने के लिए हमारी नीतियों की समीक्षा करें और स्वीकार करें',
    terms: {
      title: 'सेवा की शर्तें',
      content: `वेस्ट-टू-वर्थ में आपका स्वागत है! हमारे प्लेटफ़ॉर्म का उपयोग करके, आप इन शर्तों से सहमत होते हैं।

1. खाता जिम्मेदारी: आप अपने खाते की सुरक्षा और उसके तहत सभी गतिविधियों के लिए जिम्मेदार हैं।

2. स्वीकार्य उपयोग: हमारे प्लेटफ़ॉर्म का उपयोग केवल वैध उद्देश्यों के लिए करें।

3. लेन-देन: सभी लेन-देन उपयोगकर्ताओं के बीच होते हैं।

4. सामग्री: आप अपनी पोस्ट की गई सामग्री पर अधिकार रखते हैं।

5. इको-पॉइंट्स: अर्जित पॉइंट्स केवल प्लेटफ़ॉर्म उपयोग के लिए हैं।

6. समाप्ति: हम इन शर्तों का उल्लंघन करने वाले खातों को निलंबित कर सकते हैं।`
    },
    privacy: {
      title: 'गोपनीयता नीति',
      content: `आपकी गोपनीयता हमारे लिए महत्वपूर्ण है:

1. डेटा संग्रह: हम आपके द्वारा प्रदान की गई जानकारी एकत्र करते हैं।

2. डेटा उपयोग: हम सेवाएं प्रदान करने के लिए आपके डेटा का उपयोग करते हैं।

3. डेटा साझाकरण: हम आपका डेटा नहीं बेचते।

4. स्थान डेटा: आस-पास के उपयोगकर्ताओं से मिलान के लिए उपयोग किया जाता है।

5. डेटा सुरक्षा: हम आपकी जानकारी की सुरक्षा के लिए उपाय लागू करते हैं।

6. आपके अधिकार: आप अपना डेटा एक्सेस, सही या हटा सकते हैं।`
    },
    sustainability: {
      title: 'स्थिरता नीति',
      content: `पर्यावरण के प्रति हमारी प्रतिबद्धता:

1. सर्कुलर इकॉनमी: हम पुन: उपयोग और रीसाइक्लिंग को बढ़ावा देते हैं।

2. कार्बन ट्रैकिंग: हम आपके कार्यों के पर्यावरणीय प्रभाव को ट्रैक करते हैं।

3. सामुदायिक लक्ष्य: हम समुदायों के लिए सामूहिक स्थिरता लक्ष्य निर्धारित करते हैं।

4. सत्यापन: हम रीसाइक्लिंग भागीदारों को सत्यापित करते हैं।

5. शिक्षा: हम स्थायी जीवन के लिए सुझाव प्रदान करते हैं।

6. पारदर्शिता: हम नियमित रूप से पर्यावरणीय प्रभाव की रिपोर्ट करते हैं।`
    },
    accept: 'मैं सभी नीतियां स्वीकार करता/करती हूं',
    voiceReader: 'AI वॉइस रीडर'
  }
}

function PolicyPage() {
  const navigate = useNavigate()
  const { acceptPolicy, user } = useAuth()
  const [activeTab, setActiveTab] = useState('terms')
  const [language, setLanguage] = useState(user?.language || 'en')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)
  const [accepted, setAccepted] = useState(false)
  const synth = useRef(window.speechSynthesis)
  const utteranceRef = useRef(null)

  const content = policyContent[language] || policyContent.en

  const tabs = [
    { id: 'terms', icon: Shield, label: content.terms.title },
    { id: 'privacy', icon: Lock, label: content.privacy.title },
    { id: 'sustainability', icon: Recycle, label: content.sustainability.title }
  ]

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      synth.current.cancel()
    }
  }, [])

  // Stop speech when changing tabs or language
  useEffect(() => {
    stopSpeech()
  }, [activeTab, language])

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'terms':
        return content.terms.content
      case 'privacy':
        return content.privacy.content
      case 'sustainability':
        return content.sustainability.content
      default:
        return ''
    }
  }

  const speakText = () => {
    if (synth.current.speaking) {
      if (synth.current.paused) {
        synth.current.resume()
        setIsPlaying(true)
      } else {
        synth.current.pause()
        setIsPlaying(false)
      }
      return
    }

    const text = getCurrentContent()
    utteranceRef.current = new SpeechSynthesisUtterance(text)
    utteranceRef.current.rate = speechRate
    utteranceRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US'
    
    utteranceRef.current.onend = () => {
      setIsPlaying(false)
    }

    synth.current.speak(utteranceRef.current)
    setIsPlaying(true)
  }

  const stopSpeech = () => {
    synth.current.cancel()
    setIsPlaying(false)
  }

  const changeSpeed = (speed) => {
    setSpeechRate(speed)
    if (synth.current.speaking) {
      stopSpeech()
      // Restart with new speed
      setTimeout(() => speakText(), 100)
    }
  }

  const handleAccept = () => {
    stopSpeech()
    acceptPolicy()
    navigate('/')
  }

  return (
    <div className="policy-page">
      <div className="policy-container">
        {/* Header */}
        <div className="policy-header">
          <div className="policy-logo">
            <Leaf size={32} />
          </div>
          <h1>{content.title}</h1>
          <p className="text-muted">{content.subtitle}</p>
        </div>

        {/* Language Selector */}
        <div className="language-selector">
          <Globe size={18} />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        {/* Voice Reader Controls */}
        <div className="voice-reader card-glass">
          <div className="voice-reader-header">
            <Volume2 className="voice-icon" size={20} />
            <span>{content.voiceReader}</span>
          </div>
          
          <div className="voice-controls">
            <button 
              className={`voice-btn ${isPlaying ? 'active' : ''}`}
              onClick={speakText}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button 
              className="voice-btn"
              onClick={stopSpeech}
              title="Stop"
            >
              <Square size={18} />
            </button>

            <div className="speed-controls">
              <span className="speed-label">Speed:</span>
              {[0.5, 1, 1.5, 2].map(speed => (
                <button
                  key={speed}
                  className={`speed-btn ${speechRate === speed ? 'active' : ''}`}
                  onClick={() => changeSpeed(speed)}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="policy-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`policy-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="policy-content card">
          <h3 className="policy-section-title">
            {activeTab === 'terms' && <Shield size={24} />}
            {activeTab === 'privacy' && <Lock size={24} />}
            {activeTab === 'sustainability' && <Recycle size={24} />}
            {content[activeTab].title}
          </h3>
          <div className="policy-text">
            {getCurrentContent().split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Accept Section */}
        <div className="policy-accept">
          <label className="accept-checkbox">
            <input 
              type="checkbox" 
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="form-checkbox"
            />
            <span>I have read and agree to all policies</span>
          </label>

          <button 
            className="btn btn-primary btn-lg w-full"
            disabled={!accepted}
            onClick={handleAccept}
          >
            <CheckCircle size={20} />
            {content.accept}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .policy-page {
          min-height: 100vh;
          background: var(--color-bg);
          padding: var(--space-6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .policy-container {
          max-width: 800px;
          width: 100%;
        }

        .policy-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .policy-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-4);
          color: white;
        }

        .policy-header h1 {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-2);
        }

        .language-selector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          color: var(--color-text-secondary);
        }

        .language-select {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-sm);
          cursor: pointer;
        }

        .voice-reader {
          padding: var(--space-4);
          margin-bottom: var(--space-6);
          border-radius: var(--radius-xl);
        }

        .voice-reader-header {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
          font-weight: 600;
          color: var(--color-primary);
        }

        .voice-icon {
          color: var(--color-primary);
        }

        .voice-controls {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .voice-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .voice-btn:hover,
        .voice-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .speed-controls {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-left: auto;
        }

        .speed-label {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .speed-btn {
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-md);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          font-size: var(--text-xs);
          font-weight: 600;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
        }

        .speed-btn:hover,
        .speed-btn.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .policy-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
          overflow-x: auto;
          padding-bottom: var(--space-2);
        }

        .policy-tab {
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

        .policy-tab:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .policy-tab.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        .policy-content {
          margin-bottom: var(--space-6);
          max-height: 400px;
          overflow-y: auto;
        }

        .policy-section-title {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          color: var(--color-primary);
        }

        .policy-text {
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        .policy-text p {
          margin-bottom: var(--space-4);
        }

        .policy-accept {
          background: var(--color-bg-secondary);
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          border: 2px solid var(--color-border);
        }

        .accept-checkbox {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
          cursor: pointer;
          font-weight: 500;
        }

        .accept-checkbox input {
          width: 24px;
          height: 24px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        @media (max-width: 600px) {
          .policy-page {
            padding: var(--space-4);
          }

          .voice-controls {
            justify-content: center;
          }

          .speed-controls {
            margin-left: 0;
            margin-top: var(--space-3);
            width: 100%;
            justify-content: center;
          }

          .policy-tab span {
            display: none;
          }

          .policy-tab {
            padding: var(--space-3);
          }
        }
      `}</style>
    </div>
  )
}

export default PolicyPage
