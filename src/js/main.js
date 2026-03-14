/* ================================================
   MAIN JS - Wedding Invitation
   Initializes all modules
   ================================================ */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initCover } from './cover.js'
import { initAnimations } from './animations.js'
import { initCountdown } from './countdown.js'
import { initPetals } from './petals.js'
import { initNavigation } from './navigation.js'
import { initForms } from './forms.js'

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger)

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Prevent scroll on body initially
  document.body.classList.add('no-scroll')

  // Get guest name from URL params
  const urlParams = new URLSearchParams(window.location.search)
  const guestName = urlParams.get('to') || urlParams.get('guest') || 'Tamu Undangan'
  const guestNameEl = document.getElementById('guestName')
  if (guestNameEl) {
    guestNameEl.textContent = decodeURIComponent(guestName)
  }

  // Initialize Cover (Opening Animation)
  initCover(() => {
    // After cover opens, start everything
    document.body.classList.remove('no-scroll')
    
    // Initialize all modules
    initPetals()
    initAnimations()
    initCountdown()
    initNavigation()
    initForms()
    
    // Re-init icons for dynamically added content
    if (window.lucide) {
      window.lucide.createIcons()
    }
  })
})
