import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Multiple approaches to ensure scroll works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Also scroll any main content container
    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.scrollTop = 0
    }
  }, [pathname])

  return null
}

export default ScrollToTop
