import { createContext, useContext, useState, useEffect } from 'react'

// Translations
const translations = {
  en: {
    // Common
    home: 'Home',
    marketplace: 'Marketplace',
    donate: 'Donate',
    vintage: 'Vintage',
    sell: 'Sell',
    wallet: 'Wallet',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    search: 'Search',
    cart: 'Cart',
    notifications: 'Notifications',
    
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    mobile: 'Mobile Number',
    forgotPassword: 'Forgot Password?',
    signInWithGoogle: 'Sign in with Google',
    signUpWithGoogle: 'Sign up with Google',
    
    // Profile
    editProfile: 'Edit Profile',
    followers: 'Followers',
    following: 'Following',
    ecoScore: 'Eco Score',
    level: 'Level',
    
    // Marketplace
    purchase: 'Purchase',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    filter: 'Filter',
    sortBy: 'Sort By',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    
    // Wallet
    balance: 'Balance',
    sendMoney: 'Send Money',
    scanPay: 'Scan & Pay',
    recharge: 'Recharge',
    rewards: 'Rewards',
    
    // Policy
    termsTitle: 'Terms & Conditions',
    privacyTitle: 'Privacy Policy',
    acceptPolicy: 'I Accept',
    readAloud: 'Read Aloud',
    pause: 'Pause',
    resume: 'Resume',
    
    // Help
    helpCenter: 'Help Center',
    faqs: 'FAQs',
    contactUs: 'Contact Us',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Submit',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    loading: 'Loading...',
    
    // Messages
    welcome: 'Welcome',
    success: 'Success',
    error: 'Error',
    noResults: 'No results found',
    
    // Age verification
    ageVerification: 'Age Verification',
    ageConfirm: 'I confirm that I am 16 years or older'
  },
  hi: {
    // Common
    home: 'होम',
    marketplace: 'मार्केटप्लेस',
    donate: 'दान करें',
    vintage: 'पुरानी चीज़ें',
    sell: 'बेचें',
    wallet: 'वॉलेट',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    search: 'खोजें',
    cart: 'कार्ट',
    notifications: 'सूचनाएं',
    
    // Auth
    login: 'लॉग इन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    mobile: 'मोबाइल नंबर',
    forgotPassword: 'पासवर्ड भूल गए?',
    signInWithGoogle: 'Google से साइन इन करें',
    signUpWithGoogle: 'Google से साइन अप करें',
    
    // Profile
    editProfile: 'प्रोफाइल संपादित करें',
    followers: 'अनुयायी',
    following: 'फॉलो कर रहे हैं',
    ecoScore: 'इको स्कोर',
    level: 'स्तर',
    
    // Marketplace
    purchase: 'खरीदें',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    filter: 'फ़िल्टर',
    sortBy: 'क्रमबद्ध करें',
    priceLowHigh: 'मूल्य: कम से अधिक',
    priceHighLow: 'मूल्य: अधिक से कम',
    
    // Wallet
    balance: 'शेष राशि',
    sendMoney: 'पैसे भेजें',
    scanPay: 'स्कैन और पे',
    recharge: 'रिचार्ज',
    rewards: 'इनाम',
    
    // Policy
    termsTitle: 'नियम और शर्तें',
    privacyTitle: 'गोपनीयता नीति',
    acceptPolicy: 'मैं स्वीकार करता/करती हूं',
    readAloud: 'जोर से पढ़ें',
    pause: 'रोकें',
    resume: 'जारी रखें',
    
    // Help
    helpCenter: 'सहायता केंद्र',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    contactUs: 'संपर्क करें',
    
    // Common Actions
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    submit: 'जमा करें',
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'अगला',
    done: 'हो गया',
    loading: 'लोड हो रहा है...',
    
    // Messages
    welcome: 'स्वागत है',
    success: 'सफल',
    error: 'त्रुटि',
    noResults: 'कोई परिणाम नहीं मिला',
    
    // Age verification
    ageVerification: 'आयु सत्यापन',
    ageConfirm: 'मैं पुष्टि करता/करती हूं कि मैं 16 वर्ष या उससे अधिक आयु का/की हूं'
  },
  mr: {
    // Common
    home: 'होम',
    marketplace: 'मार्केटप्लेस',
    donate: 'दान करा',
    vintage: 'जुन्या वस्तू',
    sell: 'विक्री करा',
    wallet: 'वॉलेट',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    search: 'शोधा',
    cart: 'कार्ट',
    notifications: 'सूचना',
    
    // Auth
    login: 'लॉग इन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूर्ण नाव',
    mobile: 'मोबाइल नंबर',
    forgotPassword: 'पासवर्ड विसरला?',
    signInWithGoogle: 'Google ने साइन इन करा',
    signUpWithGoogle: 'Google ने साइन अप करा',
    
    // Profile
    editProfile: 'प्रोफाइल संपादित करा',
    followers: 'अनुयायी',
    following: 'फॉलो करत आहात',
    ecoScore: 'इको स्कोअर',
    level: 'पातळी',
    
    // Marketplace
    purchase: 'खरेदी करा',
    addToCart: 'कार्टमध्ये जोडा',
    buyNow: 'आता खरेदी करा',
    filter: 'फिल्टर',
    sortBy: 'क्रमवारी',
    priceLowHigh: 'किंमत: कमी ते जास्त',
    priceHighLow: 'किंमत: जास्त ते कमी',
    
    // Wallet
    balance: 'शिल्लक',
    sendMoney: 'पैसे पाठवा',
    scanPay: 'स्कॅन आणि पे',
    recharge: 'रिचार्ज',
    rewards: 'बक्षिसे',
    
    // Policy
    termsTitle: 'अटी आणि शर्ती',
    privacyTitle: 'गोपनीयता धोरण',
    acceptPolicy: 'मी स्वीकारतो/स्वीकारते',
    readAloud: 'मोठ्याने वाचा',
    pause: 'थांबवा',
    resume: 'पुन्हा सुरू करा',
    
    // Help
    helpCenter: 'मदत केंद्र',
    faqs: 'वारंवार विचारले जाणारे प्रश्न',
    contactUs: 'संपर्क साधा',
    
    // Common Actions
    save: 'जतन करा',
    cancel: 'रद्द करा',
    delete: 'हटवा',
    edit: 'संपादित करा',
    submit: 'सबमिट करा',
    continue: 'पुढे चला',
    back: 'मागे',
    next: 'पुढील',
    done: 'पूर्ण',
    loading: 'लोड होत आहे...',
    
    // Messages
    welcome: 'स्वागत आहे',
    success: 'यशस्वी',
    error: 'त्रुटी',
    noResults: 'कोणतेही परिणाम नाहीत',
    
    // Age verification
    ageVerification: 'वय पडताळणी',
    ageConfirm: 'मी पुष्टी करतो/करते की माझे वय 16 वर्षे किंवा त्याहून अधिक आहे'
  }
}

const LanguageContext = createContext(null)

const LANGUAGE_KEY = 'eco_market_language'

// Supported languages
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
]

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY)
    if (stored && translations[stored]) {
      return stored
    }
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (translations[browserLang]) {
      return browserLang
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang)
    }
  }

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key
  }

  // Text-to-speech function
  const speak = (text, onStart, onEnd) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Set language based on current selection
      const langCodes = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN'
      }
      utterance.lang = langCodes[language] || 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      
      if (onStart) utterance.onstart = onStart
      if (onEnd) utterance.onend = onEnd
      
      window.speechSynthesis.speak(utterance)
      
      return {
        pause: () => window.speechSynthesis.pause(),
        resume: () => window.speechSynthesis.resume(),
        cancel: () => window.speechSynthesis.cancel(),
        isPaused: () => window.speechSynthesis.paused,
        isSpeaking: () => window.speechSynthesis.speaking
      }
    }
    return null
  }

  const value = {
    language,
    setLanguage,
    t,
    speak,
    languages,
    translations: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
