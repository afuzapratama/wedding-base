/* ================================================
   PETALS - Floating petal particle effect
   ================================================ */

export function initPetals() {
  const petalContainers = document.querySelectorAll('.floating-petals')
  
  petalContainers.forEach(container => {
    createPetals(container, 15)
  })
}

function createPetals(container, count) {
  const colors = [
    'rgba(176, 137, 104, 0.25)',  // warm gold
    'rgba(212, 196, 168, 0.3)',   // soft champagne
    'rgba(201, 169, 135, 0.3)',   // muted gold
    'rgba(240, 230, 218, 0.3)',   // light ivory
    'rgba(245, 237, 228, 0.35)',  // warm cream
  ]
  
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div')
    petal.classList.add('petal')
    
    const size = Math.random() * 12 + 8  // 8-20px
    const left = Math.random() * 100
    const animDuration = Math.random() * 12 + 10 // 10-22s
    const delay = Math.random() * 15
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: radial-gradient(ellipse, ${color}, transparent);
      border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
      animation-duration: ${animDuration}s;
      animation-delay: ${delay}s;
      opacity: 0;
    `
    
    container.appendChild(petal)
  }
}

// Export a function to add petals dynamically if needed
export function addPetalBurst(container, count = 20) {
  const colors = [
    'rgba(176, 137, 104, 0.45)',
    'rgba(212, 196, 168, 0.4)',
    'rgba(240, 230, 218, 0.4)',
  ]
  
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div')
    petal.classList.add('petal')
    
    const size = Math.random() * 10 + 6
    const startX = 40 + Math.random() * 20
    const animDuration = Math.random() * 4 + 3
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}%;
      top: 40%;
      background: radial-gradient(ellipse, ${color}, transparent);
      border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
      animation-duration: ${animDuration}s;
      animation-delay: 0s;
      opacity: 0;
    `
    
    container.appendChild(petal)
    
    // Remove after animation
    setTimeout(() => {
      petal.remove()
    }, animDuration * 1000)
  }
}
