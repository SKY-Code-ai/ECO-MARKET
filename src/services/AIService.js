/**
 * AI Service Module
 * Provides mock AI functionality for the ECO-MARKET platform
 * Ready for integration with real AI services (TensorFlow.js, OpenAI, etc.)
 */

// Product categories for classification
const productCategories = [
  { id: 'plastic', name: 'Plastic Waste', keywords: ['bottle', 'plastic', 'container', 'pet', 'hdpe'] },
  { id: 'metal', name: 'Metal Scrap', keywords: ['metal', 'iron', 'steel', 'aluminum', 'copper', 'wire'] },
  { id: 'paper', name: 'Paper & Cardboard', keywords: ['paper', 'cardboard', 'newspaper', 'carton', 'box'] },
  { id: 'glass', name: 'Glass', keywords: ['glass', 'bottle', 'jar', 'window'] },
  { id: 'electronics', name: 'E-Waste', keywords: ['phone', 'computer', 'laptop', 'electronic', 'cable', 'charger'] },
  { id: 'textile', name: 'Textile & Fabric', keywords: ['cloth', 'fabric', 'textile', 'jeans', 'cotton', 'shirt'] },
  { id: 'organic', name: 'Organic Waste', keywords: ['food', 'organic', 'compost', 'garden', 'leaves'] },
  { id: 'furniture', name: 'Furniture', keywords: ['chair', 'table', 'sofa', 'bed', 'furniture', 'wood'] },
  { id: 'vintage', name: 'Vintage Items', keywords: ['antique', 'vintage', 'old', 'collectible', 'retro'] }
]

// Mock user behavior patterns for recommendations
const mockUserBehaviors = {
  recycler: ['plastic', 'metal', 'paper', 'electronics'],
  vintage_lover: ['vintage', 'furniture', 'textile'],
  eco_warrior: ['organic', 'paper', 'textile'],
  bulk_trader: ['metal', 'plastic', 'electronics']
}

/**
 * Get personalized product recommendations based on user behavior
 * @param {string} userId - User ID
 * @param {Object} behavior - User behavior data
 * @returns {Promise<Array>} Recommended product categories
 */
export async function getProductRecommendations(userId, behavior = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { recentSearches = [], recentPurchases = [], location = '' } = behavior
  
  // Analyze behavior to determine user type
  let recommendations = []
  
  // Based on recent activity
  if (recentSearches.length > 0 || recentPurchases.length > 0) {
    const allActivity = [...recentSearches, ...recentPurchases].join(' ').toLowerCase()
    
    productCategories.forEach(category => {
      const matchScore = category.keywords.filter(kw => allActivity.includes(kw)).length
      if (matchScore > 0) {
        recommendations.push({ ...category, score: matchScore })
      }
    })
    
    recommendations.sort((a, b) => b.score - a.score)
  }
  
  // Default recommendations if no activity
  if (recommendations.length === 0) {
    recommendations = productCategories.slice(0, 4).map(c => ({ ...c, score: 1 }))
  }
  
  return recommendations.slice(0, 6)
}

/**
 * Classify product from image
 * Mock implementation - returns category based on random selection
 * In production, integrate with TensorFlow.js or cloud vision API
 * @param {File} imageFile - Image file to classify
 * @returns {Promise<Object>} Classification result
 */
export async function classifyImage(imageFile) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // In production, this would use TensorFlow.js or a cloud API
  // For now, return mock classification based on file characteristics
  
  const categories = [
    { category: 'plastic', confidence: 0.85, suggestedPrice: '₹50-200', condition: 'Good' },
    { category: 'metal', confidence: 0.92, suggestedPrice: '₹100-500', condition: 'Recyclable' },
    { category: 'electronics', confidence: 0.78, suggestedPrice: '₹200-1000', condition: 'Working' },
    { category: 'textile', confidence: 0.88, suggestedPrice: '₹30-150', condition: 'Usable' },
    { category: 'vintage', confidence: 0.73, suggestedPrice: '₹500-2000', condition: 'Good' }
  ]
  
  const randomIndex = Math.floor(Math.random() * categories.length)
  const result = categories[randomIndex]
  
  return {
    success: true,
    ...result,
    detectedObjects: [result.category],
    recommendations: [
      `This appears to be ${result.category} waste`,
      `Estimated market price: ${result.suggestedPrice}`,
      `Condition detected: ${result.condition}`
    ]
  }
}

/**
 * Detect potential fraud or spam in listings
 * @param {Object} listing - Listing data to analyze
 * @returns {Promise<Object>} Fraud detection result
 */
export async function detectFraud(listing) {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const { title, description, price, images = [] } = listing
  let riskScore = 0
  const warnings = []
  
  // Check for suspicious patterns
  if (price && price < 10) {
    riskScore += 20
    warnings.push('Unusually low price')
  }
  
  if (description && description.length < 20) {
    riskScore += 15
    warnings.push('Description too short')
  }
  
  if (images.length === 0) {
    riskScore += 25
    warnings.push('No images provided')
  }
  
  // Check for common spam words
  const spamWords = ['free money', 'guaranteed', 'urgent', 'winner', 'click here']
  const text = `${title} ${description}`.toLowerCase()
  spamWords.forEach(word => {
    if (text.includes(word)) {
      riskScore += 30
      warnings.push(`Suspicious phrase: "${word}"`)
    }
  })
  
  return {
    riskScore: Math.min(riskScore, 100),
    isRisky: riskScore > 50,
    warnings,
    recommendation: riskScore > 50 ? 'Review manually' : 'Safe to publish'
  }
}

/**
 * Get smart search suggestions
 * @param {string} query - Search query
 * @returns {Promise<Array>} Search suggestions
 */
export async function getSmartSuggestions(query) {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (!query || query.length < 2) {
    return []
  }
  
  const allSuggestions = [
    'plastic bottles',
    'plastic containers',
    'metal scrap',
    'copper wire',
    'old newspapers',
    'cardboard boxes',
    'vintage furniture',
    'antique decor',
    'e-waste',
    'old phones',
    'used laptops',
    'cotton fabric',
    'denim jeans',
    'wooden pallets',
    'glass bottles',
    'aluminum cans'
  ]
  
  const queryLower = query.toLowerCase()
  const suggestions = allSuggestions.filter(s => s.includes(queryLower))
  
  // Add category-based suggestions
  productCategories.forEach(cat => {
    if (cat.name.toLowerCase().includes(queryLower)) {
      suggestions.push(`${cat.name} items`)
    }
  })
  
  return suggestions.slice(0, 8)
}

/**
 * Get personalized home page sections based on user data
 * @param {Object} user - User data
 * @returns {Promise<Array>} Dynamic sections
 */
export async function getPersonalizedSections(user) {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const { location, level, ecoScore, purchases = 0, donations = 0, sales = 0 } = user
  
  const sections = [
    { id: 'recommended', title: 'Recommended for You', priority: 1 },
    { id: 'trending', title: 'Trending in Your Area', priority: 2 }
  ]
  
  // Based on activity
  if (donations > sales) {
    sections.push({ id: 'charity', title: 'Items Needing Donation', priority: 3 })
  }
  
  if (sales > 0) {
    sections.push({ id: 'selling-tips', title: 'Boost Your Sales', priority: 4 })
  }
  
  if (level >= 10) {
    sections.push({ id: 'elite', title: 'Elite Member Deals', priority: 5 })
  }
  
  if (ecoScore > 1000) {
    sections.push({ id: 'rewards', title: 'Redeem Your Eco Points', priority: 6 })
  }
  
  return sections.sort((a, b) => a.priority - b.priority)
}

/**
 * Analyze text sentiment (for reviews, comments)
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} Sentiment analysis result
 */
export async function analyzeSentiment(text) {
  await new Promise(resolve => setTimeout(resolve, 150))
  
  const positiveWords = ['good', 'great', 'excellent', 'love', 'best', 'amazing', 'wonderful', 'quality']
  const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'broken', 'fake', 'scam', 'waste']
  
  const textLower = text.toLowerCase()
  
  let positiveScore = 0
  let negativeScore = 0
  
  positiveWords.forEach(word => {
    if (textLower.includes(word)) positiveScore++
  })
  
  negativeWords.forEach(word => {
    if (textLower.includes(word)) negativeScore++
  })
  
  let sentiment = 'neutral'
  if (positiveScore > negativeScore) sentiment = 'positive'
  else if (negativeScore > positiveScore) sentiment = 'negative'
  
  return {
    sentiment,
    confidence: Math.abs(positiveScore - negativeScore) / Math.max(positiveScore + negativeScore, 1),
    positiveScore,
    negativeScore
  }
}

export default {
  getProductRecommendations,
  classifyImage,
  detectFraud,
  getSmartSuggestions,
  getPersonalizedSections,
  analyzeSentiment
}
