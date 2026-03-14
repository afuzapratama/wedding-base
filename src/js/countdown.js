/* ================================================
   COUNTDOWN - Timer to wedding day
   ================================================ */

export function initCountdown() {
  // Wedding date: April 4, 2026 at 08:00 WIB (UTC+7)
  const weddingDate = new Date('2026-04-04T08:00:00+07:00').getTime()
  
  const daysEl = document.getElementById('days')
  const hoursEl = document.getElementById('hours')
  const minutesEl = document.getElementById('minutes')
  const secondsEl = document.getElementById('seconds')
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = weddingDate - now
    
    if (distance < 0) {
      daysEl.textContent = '00'
      hoursEl.textContent = '00'
      minutesEl.textContent = '00'
      secondsEl.textContent = '00'
      return
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    // Animate number changes
    animateNumber(daysEl, days)
    animateNumber(hoursEl, hours)
    animateNumber(minutesEl, minutes)
    animateNumber(secondsEl, seconds)
  }
  
  function animateNumber(element, value) {
    const formatted = String(value).padStart(2, '0')
    if (element.textContent !== formatted) {
      element.style.transform = 'translateY(-5px)'
      element.style.opacity = '0.5'
      
      setTimeout(() => {
        element.textContent = formatted
        element.style.transform = 'translateY(0)'
        element.style.opacity = '1'
      }, 150)
    }
  }
  
  // Update immediately, then every second
  updateCountdown()
  setInterval(updateCountdown, 1000)
}
