/* ================================================
   ANIMATIONS - Scroll-triggered animations with GSAP
   ================================================ */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initAnimations() {
  // ============ Scroll-based element animations ============
  const animateElements = document.querySelectorAll('[data-animate]')
  
  animateElements.forEach(el => {
    const animType = el.getAttribute('data-animate')
    const delay = parseFloat(el.getAttribute('data-delay') || 0)
    
    let fromVars = { opacity: 0, duration: 1, delay, ease: 'power3.out' }
    
    switch (animType) {
      case 'fade-up':
        fromVars.y = 50
        break
      case 'fade-down':
        fromVars.y = -50
        break
      case 'fade-left':
        fromVars.x = 60
        break
      case 'fade-right':
        fromVars.x = -60
        break
      case 'scale-in':
        fromVars.scale = 0.8
        fromVars.ease = 'back.out(1.7)'
        break
      case 'zoom-in':
        fromVars.scale = 0.6
        fromVars.duration = 0.8
        break
      case 'rotate-in':
        fromVars.rotation = -10
        fromVars.scale = 0.9
        break
    }
    
    gsap.from(el, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // ============ Hero Section Special Animations ============
  initHeroAnimations()
  
  // ============ Couple Cards Hover ============
  initCoupleAnimations()
  
  // ============ Timeline Animation ============
  initTimelineAnimation()
  
  // ============ Gallery Animations ============
  initGalleryAnimations()
  
  // ============ Parallax Effects ============
  initParallax()
  
  // ============ Section Ornament Animations ============
  initOrnamentAnimations()
}

function initHeroAnimations() {
  // Floating frame corners
  gsap.to('.frame-corner', {
    borderColor: 'rgba(176, 137, 104, 0.8)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.5
  })

  // Heart beat animation
  gsap.to('.separator-heart', {
    scale: 1.2,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    repeatDelay: 1
  })

  // Names shimmer effect (already CSS but enhance with GSAP)
  gsap.to('.hero-names', {
    scrollTrigger: {
      trigger: '.hero-names',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 1.5,
    ease: 'power3.out'
  })
}

function initCoupleAnimations() {
  const cards = document.querySelectorAll('.couple-card')
  
  cards.forEach(card => {
    const deco = card.querySelector('.photo-decoration')
    
    card.addEventListener('mouseenter', () => {
      gsap.to(deco, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'linear'
      })
    })
    
    card.addEventListener('mouseleave', () => {
      gsap.killTweensOf(deco)
      gsap.to(deco, {
        rotation: 0,
        duration: 1,
        ease: 'power3.out'
      })
    })
  })
}

function initTimelineAnimation() {
  // Animate the timeline line drawing
  const timelineLine = document.querySelector('.timeline-line')
  if (timelineLine) {
    gsap.from(timelineLine, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1
      }
    })
  }

  // Animate timeline dots
  const timelineDots = document.querySelectorAll('.timeline-dot')
  timelineDots.forEach((dot, i) => {
    gsap.from(dot, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: dot,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  })
}

function initGalleryAnimations() {
  const galleryItems = document.querySelectorAll('.gallery-item')
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.05,
        zIndex: 10,
        boxShadow: '0 20px 40px rgba(91, 74, 63, 0.2)',
        duration: 0.4,
        ease: 'power3.out'
      })
    })
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        zIndex: 1,
        boxShadow: 'none',
        duration: 0.4,
        ease: 'power3.out'
      })
    })
  })
}

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-bg')
  
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || 0.3)
    
    gsap.to(el, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })
}

function initOrnamentAnimations() {
  // Section background ornaments float
  const ornaments = document.querySelectorAll('.section-bg-ornament')
  
  ornaments.forEach(orn => {
    gsap.to(orn, {
      x: 20,
      y: -20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  })

  // Verse ornament rotation
  const verseOrnament = document.querySelector('.verse-ornament')
  if (verseOrnament) {
    gsap.to(verseOrnament, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'linear'
    })
  }

  // Icon rings in event cards
  const iconRings = document.querySelectorAll('.icon-ring .ring-svg')
  iconRings.forEach(ring => {
    gsap.to(ring, {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: 'linear'
    })
  })
}
