import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Storage keys
const USER_KEY = 'eco_market_user'
const POLICY_KEY = 'eco_market_policy_accepted'

// Mock user data for demo
const mockUsers = [
  {
    id: '1',
    email: 'demo@ecomarket.com',
    password: 'demo123',
    fullName: 'Eco Warrior',
    mobile: '+91 9876543210',
    gender: 'other',
    dob: '1995-06-15',
    location: 'Mumbai, India',
    language: 'en',
    profilePicture: null,
    ecoScore: 2450,
    level: 12,
    badges: ['Early Adopter', 'Recycler Pro', 'Community Leader'],
    donations: 45,
    sales: 23,
    purchases: 67,
    communityId: 'mumbai-central',
    joinedAt: '2025-01-15'
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [policyAccepted, setPolicyAccepted] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    const storedPolicy = localStorage.getItem(POLICY_KEY)
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedPolicy === 'true') {
      setPolicyAccepted(true)
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Find user (mock authentication)
    const foundUser = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword))
      return { success: true }
    }
    
    return { success: false, error: 'Invalid email or password' }
  }

  // Signup function
  const signup = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email exists
    if (mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: 'Email already exists' }
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      ecoScore: 0,
      level: 1,
      badges: ['New Member'],
      donations: 0,
      sales: 0,
      purchases: 0,
      communityId: null,
      joinedAt: new Date().toISOString().split('T')[0]
    }
    
    // Remove password before storing
    const { password: _, ...userWithoutPassword } = newUser
    
    setUser(userWithoutPassword)
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword))
    
    return { success: true }
  }

  // Google Sign In (mock)
  const googleSignIn = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const googleUser = {
      id: 'google_' + Date.now(),
      email: 'google.user@gmail.com',
      fullName: 'Google User',
      mobile: '',
      gender: '',
      dob: '',
      location: '',
      language: 'en',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
      ecoScore: 0,
      level: 1,
      badges: ['New Member'],
      donations: 0,
      sales: 0,
      purchases: 0,
      communityId: null,
      joinedAt: new Date().toISOString().split('T')[0]
    }
    
    setUser(googleUser)
    localStorage.setItem(USER_KEY, JSON.stringify(googleUser))
    
    return { success: true }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setPolicyAccepted(false)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(POLICY_KEY)
  }

  // Accept policy
  const acceptPolicy = () => {
    setPolicyAccepted(true)
    localStorage.setItem(POLICY_KEY, 'true')
  }

  // Update user profile
  const updateProfile = async (updates) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    
    return { success: true }
  }

  // Add eco points
  const addEcoPoints = (points) => {
    if (!user) return
    
    const newScore = user.ecoScore + points
    const newLevel = Math.floor(newScore / 200) + 1
    
    const updatedUser = {
      ...user,
      ecoScore: newScore,
      level: newLevel
    }
    
    setUser(updatedUser)
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    policyAccepted,
    login,
    signup,
    googleSignIn,
    logout,
    acceptPolicy,
    updateProfile,
    addEcoPoints,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
