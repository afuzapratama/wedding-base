/* ================================================
   FORMS - RSVP, Wishes, Copy functionality
   Connected to Supabase for persistence
   ================================================ */

import { gsap } from 'gsap'
import { supabase } from './supabase.js'

export function initForms() {
  initRSVPForm()
  initWishesForm()
  initCopyButtons()
  loadWishes()
}

// ============ TOAST ============

function showToast(message) {
  const toast = document.getElementById('toast')
  if (!toast) return
  
  const messageEl = toast.querySelector('.toast-message')
  if (messageEl) {
    messageEl.textContent = message
  }
  
  toast.classList.add('show')
  
  setTimeout(() => {
    toast.classList.remove('show')
  }, 3000)
}

// ============ RSVP ============

function initRSVPForm() {
  const form = document.getElementById('rsvpForm')
  if (!form) return
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const name = document.getElementById('rsvpName').value.trim()
    const attendance = document.getElementById('rsvpAttendance').value
    const guests = parseInt(document.getElementById('rsvpGuests').value)
    
    if (!name || !attendance) {
      showToast('Mohon lengkapi semua field')
      return
    }
    
    const btn = form.querySelector('.btn-submit')
    btn.disabled = true
    btn.querySelector('span').textContent = 'Mengirim...'
    
    try {
      if (supabase) {
        const { error } = await supabase
          .from('rsvp')
          .insert([{ name, attendance, guests }])
        
        if (error) throw error
      }
      
      const attendanceText = attendance === 'hadir' 
        ? 'akan hadir' 
        : attendance === 'tidak' 
          ? 'tidak bisa hadir' 
          : 'masih ragu'
      
      showToast(`Terima kasih ${name}! Konfirmasi: ${attendanceText} (${guests} orang)`)
      
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      })
      
      form.reset()
    } catch (err) {
      console.error('RSVP error:', err)
      showToast('Maaf, terjadi kesalahan. Silakan coba lagi.')
    } finally {
      btn.disabled = false
      btn.querySelector('span').textContent = 'Kirim Konfirmasi'
    }
  })
}

// ============ WISHES ============

async function loadWishes() {
  const wishList = document.getElementById('wishesList')
  if (!wishList) return
  
  wishList.innerHTML = '<p class="wishes-loading">Memuat ucapan...</p>'
  
  try {
    if (!supabase) {
      wishList.innerHTML = '<p class="wishes-empty">Belum ada ucapan. Jadilah yang pertama! 💕</p>'
      return
    }
    
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (error) throw error
    
    if (!data || data.length === 0) {
      wishList.innerHTML = '<p class="wishes-empty">Belum ada ucapan. Jadilah yang pertama! 💕</p>'
      return
    }
    
    wishList.innerHTML = ''
    
    data.forEach(wish => {
      const card = createWishCard(wish.name, wish.message, wish.created_at)
      wishList.appendChild(card)
    })
    
    if (window.lucide) {
      window.lucide.createIcons()
    }
    
  } catch (err) {
    console.error('Load wishes error:', err)
    wishList.innerHTML = '<p class="wishes-empty">Belum ada ucapan. Jadilah yang pertama! 💕</p>'
  }
}

function createWishCard(name, message, createdAt) {
  const wishCard = document.createElement('div')
  wishCard.classList.add('wish-card')
  wishCard.innerHTML = `
    <div class="wish-avatar">
      <i data-lucide="user-circle" class="icon"></i>
    </div>
    <div class="wish-content">
      <h4 class="wish-author">${escapeHTML(name)}</h4>
      <p class="wish-text">${escapeHTML(message)}</p>
      <span class="wish-time">${formatTimeAgo(createdAt)}</span>
    </div>
  `
  return wishCard
}

function initWishesForm() {
  const form = document.getElementById('wishesForm')
  const wishList = document.getElementById('wishesList')
  if (!form || !wishList) return
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const name = document.getElementById('wishName').value.trim()
    const message = document.getElementById('wishMessage').value.trim()
    
    if (!name || !message) {
      showToast('Mohon lengkapi nama dan ucapan')
      return
    }
    
    const btn = form.querySelector('.btn-submit')
    btn.disabled = true
    btn.querySelector('span').textContent = 'Mengirim...'
    
    try {
      let createdAt = new Date().toISOString()
      
      if (supabase) {
        const { data, error } = await supabase
          .from('wishes')
          .insert([{ name, message }])
          .select()
        
        if (error) throw error
        
        if (data && data[0]) {
          createdAt = data[0].created_at
        }
      }
      
      // Remove empty/loading message if present
      const emptyMsg = wishList.querySelector('.wishes-empty')
      if (emptyMsg) emptyMsg.remove()
      const loadingMsg = wishList.querySelector('.wishes-loading')
      if (loadingMsg) loadingMsg.remove()
      
      // Create and insert new wish card at top
      const wishCard = createWishCard(name, message, createdAt)
      wishList.insertBefore(wishCard, wishList.firstChild)
      
      if (window.lucide) {
        window.lucide.createIcons()
      }
      
      gsap.from(wishCard, {
        y: -20,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.7)'
      })
      
      showToast(`Terima kasih ${name}! Ucapan Anda telah terkirim 💕`)
      form.reset()
      
    } catch (err) {
      console.error('Wish error:', err)
      showToast('Maaf, terjadi kesalahan. Silakan coba lagi.')
    } finally {
      btn.disabled = false
      btn.querySelector('span').textContent = 'Kirim Ucapan'
    }
  })
}

// ============ COPY BUTTONS ============

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy')
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy')
      
      try {
        await navigator.clipboard.writeText(textToCopy)
        showToast('Nomor rekening berhasil disalin!')
        
        gsap.to(btn, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power3.out'
        })
      } catch (err) {
        const textarea = document.createElement('textarea')
        textarea.value = textToCopy
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        showToast('Nomor rekening berhasil disalin!')
      }
    })
  })
}

// ============ HELPERS ============

function escapeHTML(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function formatTimeAgo(dateString) {
  if (!dateString) return 'Baru saja'
  
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffMonth = Math.floor(diffDay / 30)
  
  if (diffSec < 60) return 'Baru saja'
  if (diffMin < 60) return `${diffMin} menit yang lalu`
  if (diffHour < 24) return `${diffHour} jam yang lalu`
  if (diffDay < 30) return `${diffDay} hari yang lalu`
  if (diffMonth < 12) return `${diffMonth} bulan yang lalu`
  
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
