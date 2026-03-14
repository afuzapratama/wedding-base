/* ================================================
   COVER - Opening Envelope Animation
   ================================================ */

import { gsap } from 'gsap'

export function initCover(onOpenCallback) {
  const cover = document.getElementById('cover')
  const mainContent = document.getElementById('mainContent')
  const btnOpen = document.getElementById('openInvitation')
  
  if (!cover || !mainContent || !btnOpen) return

  // Cover entrance animation
  const tl = gsap.timeline()
  
  tl.from('.cover-ornament.top-ornament', {
    y: -40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.cover-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.cover-names .name-groom', {
    x: -40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.cover-names .name-ampersand', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .from('.cover-names .name-bride', {
    x: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.cover-date', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.cover-guest', {
    y: 30,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.2')
  // Button uses CSS animation only - no GSAP to avoid opacity conflicts
  .from('.cover-scroll-hint', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')

  // Animate location slide elements
  .from('.cover-location-header', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.2')
  .from('.cover-loc-card', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.4')
  .from('.cover-map-wrapper', {
    y: 30,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.btn-open-maps', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.2')

  // Force button visible as safety net after GSAP timeline finishes
  tl.eventCallback('onComplete', () => {
    const btn = document.querySelector('.btn-open-invitation')
    if (btn) {
      btn.style.opacity = '1'
      btn.style.visibility = 'visible'
      btn.style.transform = 'none'
    }
  })

  // Also force visible after a timeout in case GSAP fails entirely
  setTimeout(() => {
    const btn = document.querySelector('.btn-open-invitation')
    if (btn) {
      btn.style.opacity = '1'
      btn.style.visibility = 'visible'
      btn.style.transform = 'none'
    }
  }, 4000)

  // Open invitation handler
  btnOpen.addEventListener('click', () => {
    // Animate cover opening
    // Scroll cover to top first, then animate out
    cover.scrollTo({ top: 0, behavior: 'instant' })
    
    const openTl = gsap.timeline({
      onComplete: () => {
        cover.style.display = 'none'
        
        // Show main content
        mainContent.classList.remove('hidden')
        
        // Trigger callback
        if (onOpenCallback) onOpenCallback()
        
        // Animate main content entrance
        gsap.from('#hero', {
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }
    })

    openTl.to('.cover-slide-invitation', {
      y: -40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in'
    })
    .to(cover, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power3.inOut'
    }, '-=0.2')
  })
}
