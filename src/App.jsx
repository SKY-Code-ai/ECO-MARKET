import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import PolicyPage from './pages/PolicyPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MarketplacePage from './pages/MarketplacePage'
import DonatePage from './pages/DonatePage'
import VintagePage from './pages/VintagePage'
import LeaderboardPage from './pages/LeaderboardPage'
import CommunityPage from './pages/CommunityPage'
import CartPage from './pages/CartPage'
import HelpPage from './pages/HelpPage'
import WalletPage from './pages/WalletPage'
import SellPage from './pages/SellPage'
import ListItemPage from './pages/ListItemPage'
import BankPage from './pages/BankPage'
import MyAdsPage from './pages/MyAdsPage'
import EliteBuyerPage from './pages/EliteBuyerPage'
import EliteSellerPage from './pages/EliteSellerPage'
import UserProfilePage from './pages/UserProfilePage'
import MyOrdersPage from './pages/MyOrdersPage'
import MapPage from './pages/MapPage'
import TutorialPage from './pages/TutorialPage'


// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, policyAccepted } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-lg"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!policyAccepted) {
    return <Navigate to="/policy" replace />
  }

  return children
}

// Public Route (redirect if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, loading, policyAccepted } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-lg"></div>
      </div>
    )
  }

  if (isAuthenticated && policyAccepted) {
    return <Navigate to="/" replace />
  }

  return children
}

// Policy Route (only for authenticated users who haven't accepted policy)
function PolicyRoute({ children }) {
  const { isAuthenticated, loading, policyAccepted } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-lg"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (policyAccepted) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { isAuthenticated, policyAccepted } = useAuth()
  const showNavbar = isAuthenticated && policyAccepted

  return (
    <div className="app">
      <ScrollToTop />
      {showNavbar && <Navbar />}
      
      <main className={showNavbar ? 'main-content' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            } 
          />

          {/* Policy Route */}
          <Route 
            path="/policy" 
            element={
              <PolicyRoute>
                <PolicyPage />
              </PolicyRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace" 
            element={
              <ProtectedRoute>
                <MarketplacePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/donate" 
            element={
              <ProtectedRoute>
                <DonatePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vintage" 
            element={
              <ProtectedRoute>
                <VintagePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help" 
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-orders" 
            element={
              <ProtectedRoute>
                <MyOrdersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wallet" 
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sell" 
            element={
              <ProtectedRoute>
                <SellPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sell/new" 
            element={
              <ProtectedRoute>
                <ListItemPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bank" 
            element={
              <ProtectedRoute>
                <BankPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-ads" 
            element={
              <ProtectedRoute>
                <MyAdsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/elite-buyer" 
            element={
              <ProtectedRoute>
                <EliteBuyerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/elite-seller" 
            element={
              <ProtectedRoute>
                <EliteSellerPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user/:userId" 
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/map" 
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/learn" 
            element={
              <ProtectedRoute>
                <TutorialPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tutorial" 
            element={
              <ProtectedRoute>
                <TutorialPage />
              </ProtectedRoute>
            } 
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {showNavbar && <Footer />}
    </div>
  )
}

export default App
