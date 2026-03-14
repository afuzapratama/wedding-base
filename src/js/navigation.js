/* ================================================
   NAVIGATION - Dot navigation & scroll tracking
   ================================================ */

export function initNavigation() {
  const navDots = document.querySelectorAll('.nav-dot')
  const sections = document.querySelectorAll('.section')
  
  if (!navDots.length || !sections.length) return

  // Smooth scroll to section on dot click
  navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = dot.getAttribute('data-section')
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })

  // Update active dot on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id
        navDots.forEach(dot => {
          dot.classList.toggle('active', dot.getAttribute('data-section') === sectionId)
        })
      }
    })
  }, observerOptions)

  sections.forEach(section => {
    if (section.id) {
      observer.observe(section)
    }
  })

  // Music toggle
  initMusicToggle()
}

function initMusicToggle() {
  const musicBtn = document.getElementById('musicToggle')
  if (!musicBtn) return
  
  let isPlaying = false
  
  // Create audio element
  const audio = new Audio()
  audio.loop = true
  audio.volume = 0.3
  audio.src = '/music.mp3'
  
  // Auto-play music immediately when navigation initializes
  // (this runs after "Buka Undangan" click, so browser allows it)
  audio.play().then(() => {
    isPlaying = true
    musicBtn.classList.remove('muted')
  }).catch(() => {
    console.log('Music autoplay blocked or file not found.')
    isPlaying = false
    musicBtn.classList.add('muted')
  })
  
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause()
      isPlaying = false
      musicBtn.classList.add('muted')
    } else {
      audio.play().catch(() => {
        console.log('Music file not found. Add music.mp3 to public/ folder.')
      })
      isPlaying = true
      musicBtn.classList.remove('muted')
    }
  })
}
