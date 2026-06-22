/* ============================================================
   PLAYTOPIA — main.js
   ============================================================ */

/* ---------- Nav scroll state + mobile menu ---------- */
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');

/* Mark nav as expanded after the open animation finishes (0.6s delay + 0.8s anim) */
setTimeout(() => nav.classList.add('expanded'), 1500);

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive:true });

navBurger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- Active nav link on scroll ---------- */
(function activeNavLink(){
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    });
  }, { rootMargin:'-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();

/* ============================================================
   HERO — Scroll-driven Frame Animation (270 frames)
   ============================================================ */
(function heroFrameAnimation(){
  const frameImg = document.getElementById('heroFrameImg');
  if(!frameImg) return;

  const totalFrames = 270;
  const frameDir = 'ezgif-4a31bce2e2017d34-png-split/';
  const framePadding = 3; // e.g., "frame-001.png"
  let currentFrameIndex = 1;
  let frameCache = {}; // Cache loaded frames

  function getFramePath(frameNum) {
    const padded = String(frameNum).padStart(framePadding, '0');
    return `${frameDir}ezgif-frame-${padded}.webp`;
  }

  function updateFrame(frameNum) {
    if(frameNum === currentFrameIndex) return; // No change
    
    currentFrameIndex = frameNum;
    const src = getFramePath(frameNum);
    frameImg.src = src;
  }

  function updateSceneVisibility(progress) {
    const scenes = [
      { el: document.getElementById('heroScene1'), start: 0.00, end: 0.25 },
      { el: document.getElementById('heroScene2'), start: 0.25, end: 0.50 },
      { el: document.getElementById('heroScene3'), start: 0.50, end: 0.75 },
      { el: document.getElementById('heroScene4'), start: 0.75, end: 1.00 }
    ];

    scenes.forEach(scene => {
      if(!scene.el) return;
      
      if(progress >= scene.start && progress <= scene.end) {
        scene.el.classList.add('active');
      } else {
        scene.el.classList.remove('active');
      }
    });
  }

  function handleScroll() {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero');
    if(!heroSection) return;

    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;
    const scrollProgress = (scrolled - heroTop) / (heroHeight - window.innerHeight);

    // Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Map scroll progress to frame number (1 to 270)
    const frameNum = Math.round(1 + (clampedProgress * (totalFrames - 1)));
    
    // Update frame image
    updateFrame(frameNum);
    
    // Update scene text visibility
    updateSceneVisibility(clampedProgress);

    // Hide scroll indicator when scrolling starts
    const indicator = document.getElementById('scrollIndicator');
    if(indicator) {
      indicator.style.opacity = clampedProgress > 0.05 ? '0' : '1';
    }
  }

  // Preload first few frames for smooth start
  for(let i = 1; i <= 5; i++) {
    const img = new Image();
    img.src = getFramePath(i);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial update
  handleScroll();
})();

/* ============================================================
   Reveal-on-scroll (IntersectionObserver)
   ============================================================ */
(function reveals(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();



/* ============================================================
   About — animated stat counters
   ============================================================ */
(function counters(){
  const stats = document.querySelectorAll('.stat-num');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold:0.4 });
  stats.forEach(s => io.observe(s));
})();

/* ============================================================
   3D Circular Gallery — Carousel with rotating images
   ============================================================ */
(function gallery3D(){
  const gallery = document.getElementById('gallery3D');
  if(!gallery) return;

  // Images from the new folder
  const images = [
    'new/arcade1.jpeg',
    'new/celebration 3.jpeg',
    'new/celebration1.jpeg',
    'new/celebration2.jpeg',
    'new/racing 1.jpeg',
    'new/racing2.jpeg',
    'new/sports1.jpeg',
    'new/vr1.jpeg',
    'new/vr2.jpeg'
  ];

  let currentIndex = 0;
  const radius = 400;
  let autoRotateTimer;

  function createGallery() {
    gallery.innerHTML = '';
    images.forEach((img, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-3d-item';
      if (i === 0) item.classList.add('active');
      item.innerHTML = `<img src="${img}" alt="Gaming ambience ${i + 1}">`;
      item.addEventListener('click', () => rotateToIndex(i));
      gallery.appendChild(item);
      updatePosition(item, i);
    });
  }

  function updatePosition(item, index) {
    const totalItems = images.length;
    const angle = (index - currentIndex) * (360 / totalItems);
    const rad = (angle * Math.PI) / 180;
    
    const x = Math.cos(rad) * radius;
    const z = Math.sin(rad) * radius;
    const scale = (z + radius) / (radius * 2);
    const opacity = Math.max(0.3, scale);
    
    item.style.transform = `
      translateX(${x}px) 
      translateZ(${z}px) 
      scale(${scale})
    `;
    item.style.opacity = opacity;
    item.style.pointerEvents = opacity < 0.5 ? 'none' : 'auto';
    
    if (index === currentIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  }

  function rotateToIndex(index) {
    currentIndex = index;
    clearTimeout(autoRotateTimer);
    updateAllPositions();
    startAutoRotate();
  }

  function updateAllPositions() {
    const items = gallery.querySelectorAll('.gallery-3d-item');
    items.forEach((item, i) => updatePosition(item, i));
  }

  function rotate(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateAllPositions();
  }

  function startAutoRotate() {
    autoRotateTimer = setTimeout(() => {
      rotate(1);
      startAutoRotate();
    }, 5000);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      clearTimeout(autoRotateTimer);
      rotate(-1);
      startAutoRotate();
    } else if (e.key === 'ArrowRight') {
      clearTimeout(autoRotateTimer);
      rotate(1);
      startAutoRotate();
    }
  });

  createGallery();
  startAutoRotate();
})();

/* ============================================================
   Gallery — grid collage with scroll entrance animation
   ============================================================ */
(function gallery(){
  const track = document.getElementById('galleryCollage');
  if(!track) return;
  
  // Use all 7 ambience images from your folder
  const ambienceImages = [1, 2, 3, 4, 5, 6, 7];
  
  ambienceImages.forEach(n => {
    const img = document.createElement('img');
    img.src = `ambience/a${n}.jpeg`;
    img.alt = 'Playtopia ambience';
    img.loading = 'lazy';
    track.appendChild(img);
  });

  // Trigger entrance animation when gallery comes into view
  const gallerySection = document.querySelector('.gallery');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !track.classList.contains('animated')){
        track.classList.add('animated');
        io.unobserve(gallerySection);
      }
    });
  }, { threshold:0.2 });
  io.observe(gallerySection);
})();

/* ============================================================
   Testimonials & Social Feed — auto-scroll carousel
   ============================================================ */
(function testimonials(){
  const data = [
    { type: 'testimonial', name:'Arjun Mehta', handle:'@arjunfrags', text:'The PC zone setup is genuinely tournament-grade. Zero input lag, even during peak hours.' },
    { type: 'instagram', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80', text: "Late night grinds in the Pro Zone. Who's pulling an all-nighter with us tonight? 🎮🌙 #playtopia" },
    { type: 'google', name:'Sneha Kapoor', handle:'Google Review', text:'Booked the VR Arena for a birthday and it was the best two hours of free-roam I\u2019ve had anywhere.' },
    { type: 'testimonial', name:'Rohan Iyer', handle:'@rohan_gg', text:'Gold membership pays for itself after two visits. The free coaching session alone is worth it.' },
    { type: 'instagram', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80', text: "Console lounge looking sharp today. 4K OLEDs, PS5s, and endless library. 🕹️🔥 #gaminglounge" },
    { type: 'google', name:'Priya Nair', handle:'Google Review', text:'Retro Arcade hits different — real cabinets, not emulators pretending to be cabinets.' },
    { type: 'testimonial', name:'Kabir Singh', handle:'@kabirxgames', text:'Stage area for the Valorant Cup felt like a real broadcast. Crowd energy was unreal.' },
    { type: 'instagram', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', text: "Retro Arcade high score broken again! Can anyone beat 99,400 on Pac-Man? 👾🏆 #retro" },
    { type: 'google', name:'Ananya Rao', handle:'Google Review', text:'Creator booth saved me from building my own stream setup. Plug in and go live.' }
  ];

  const track = document.getElementById('testiTrack');
  if(!track) return;
  const renderSet = data.concat(data); // duplicate for seamless loop
  renderSet.forEach(t => {
    if (t.type === 'instagram') {
      const card = document.createElement('a');
      card.href = 'https://instagram.com';
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'social-item';
      card.innerHTML = `
        <img src="${t.img}" alt="Social post" loading="lazy">
        <div class="social-item-overlay">
          <p class="social-item-text">${t.text}</p>
        </div>
      `;
      track.appendChild(card);
    } else {
      const card = document.createElement('div');
      card.className = 'testi-card';
      const initials = t.name.split(' ').map(w => w[0]).join('');
      const isGoogle = t.type === 'google';
      
      const headerHTML = isGoogle 
        ? `<div style="display:flex; justify-content:space-between; align-items:flex-start;">
             <div class="testi-stars">★★★★★</div>
             <div class="testi-icon" style="color:#fff;background:#ea4335;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;">G</div>
           </div>`
        : `<div class="testi-stars">★★★★★</div>`;

      card.innerHTML = `
        ${headerHTML}
        <p class="testi-quote">${t.text}</p>
        <div class="testi-person">
          <div class="testi-avatar">${initials}</div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-handle">${t.handle}</div>
          </div>
        </div>
      `;
      track.appendChild(card);
    }
  });
})();

/* ============================================================
   Booking form — Premium Multi-Step
   ============================================================ */
(function bookingApp(){
  const form = document.getElementById('bookingForm');
  if(!form) return;

  /* ── State ── */
  const state = {
    zone: null, zoneCode: null, zoneColor: null,
    date: null,
    time: null,
    duration: null,
    seats: 1,
    name: '',
    phone: ''
  };

  /* ── 1. Zone selection ── */
  document.querySelectorAll('.bk-zone-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.bk-zone-card').forEach(c => {
        c.classList.remove('selected');
        c.style.borderColor = '';
        c.style.boxShadow = '';
      });
      card.classList.add('selected');
      const col = card.dataset.color;
      card.style.borderColor = col;
      card.style.boxShadow = `0 0 20px ${col}4d`;
      state.zone     = card.dataset.zone;
      state.zoneCode = card.dataset.code;
      state.zoneColor = col;
      document.getElementById('bkModalCard').style.borderTop = `2px solid ${col}`;
      clearErr('errZone');
      refreshSummary();
    });
  });

  /* ── 2. Date ── */
  document.getElementById('bDate').addEventListener('change', e => {
    state.date = e.target.value;
    clearErr('errDate');
    refreshSummary();
  });

  /* ── 2b. Time slot ── */
  document.querySelectorAll('.bk-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bk-slot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.time = btn.dataset.time;
      document.getElementById('bTime').value = state.time;
      clearErr('errTime');
      refreshSummary();
    });
  });

  /* ── 3a. Duration pills ── */
  document.querySelectorAll('.bk-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.bk-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.duration = parseInt(pill.dataset.hrs);
      document.getElementById('bDuration').value = state.duration;
      clearErr('errDur');
      refreshSummary();
    });
  });

  /* ── 3b. Seats stepper ── */
  document.getElementById('bkInc').addEventListener('click', () => {
    if(state.seats < 10){ state.seats++; updateSeats(); }
  });
  document.getElementById('bkDec').addEventListener('click', () => {
    if(state.seats > 1){ state.seats--; updateSeats(); }
  });
  function updateSeats(){
    document.getElementById('bkSeatsNum').textContent = state.seats;
    document.getElementById('bSeats').value = state.seats;
    refreshSummary();
  }

  /* ── 4. Personal details ── */
  document.getElementById('bName').addEventListener('input', e => {
    state.name = e.target.value.trim();
    clearErr('errName');
    refreshSummary();
  });
  document.getElementById('bPhone').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g,'').slice(0,10);
    state.phone = e.target.value;
    clearErr('errPhone');
    refreshSummary();
  });

  /* ── Summary box refresh ── */
  function refreshSummary(){
    const all = state.zone && state.date && state.time && state.duration && state.name && state.phone;
    const box = document.getElementById('bkSummary');
    if(all){
      document.getElementById('sZone').textContent    = state.zone;
      document.getElementById('sDate').textContent    = formatDate(state.date);
      document.getElementById('sTime').textContent    = state.time;
      document.getElementById('sDur').textContent     = state.duration + (state.duration === 1 ? ' hour' : ' hours');
      document.getElementById('sSeats').textContent   = state.seats;
      if(box.classList.contains('hidden')){
        box.classList.remove('hidden');
        box.classList.add('fade-in');
      }
    }
  }

  function formatDate(val){
    if(!val) return '—';
    const d = new Date(val + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
  }

  /* ── Validation ── */
  function validate(){
    let ok = true;
    if(!state.zone)     { showErr('errZone',  'Select a zone'); shake(document.getElementById('bkZones')); ok = false; }
    if(!state.date)     { showErr('errDate',  'Pick a date');   shake(document.getElementById('bDate'));   ok = false; }
    if(!state.time)     { showErr('errTime',  'Choose a time slot'); shake(document.getElementById('bkSlots')); ok = false; }
    if(!state.duration) { showErr('errDur',   'Select duration'); shake(document.getElementById('bkDuration')); ok = false; }
    if(state.name.length < 2) { showErr('errName', 'Enter at least 2 characters'); shake(document.getElementById('bName')); ok = false; }
    if(!/^\d{10}$/.test(state.phone)){ showErr('errPhone', 'Enter a valid 10-digit number'); shake(document.getElementById('bPhone')); ok = false; }
    return ok;
  }

  function showErr(id, msg){ const el = document.getElementById(id); if(el) el.textContent = msg; }
  function clearErr(id){ const el = document.getElementById(id); if(el) el.textContent = ''; }
  function shake(el){ if(!el) return; el.classList.remove('bk-shake'); void el.offsetWidth; el.classList.add('bk-shake'); setTimeout(()=>el.classList.remove('bk-shake'), 400); }

  /* ── Generate booking ID ── */
  function genId(code){ return 'PLY-' + code + '-' + (Math.floor(Math.random()*9000)+1000); }

  /* ── Form submit ── */
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!validate()) return;

    const bid = genId(state.zoneCode);
    const dateStr = formatDate(state.date);
    const durStr = state.duration + (state.duration===1?' hr':' hrs');

    /* Populate modal */
    document.getElementById('bkBookingId').textContent    = bid;
    document.getElementById('bkModalZoneLine').textContent = state.zone;
    document.getElementById('bkModalDetailLine').textContent = `${dateStr} · ${state.time} · ${durStr} · ${state.seats} seat${state.seats>1?'s':''} · Pay at desk`;
    if(state.zoneColor) document.getElementById('bkModalCard').style.borderTop = `2px solid ${state.zoneColor}`;

    /* WhatsApp button */
    document.getElementById('bkWaBtn').onclick = () => {
      const msg = encodeURIComponent(`Hi Playtopia! I just reserved a slot.\nBooking ID: ${bid}\nZone: ${state.zone}\nDate: ${dateStr}\nTime: ${state.time}\nDuration: ${durStr}\nSeats: ${state.seats}\nName: ${state.name}\nPhone: ${state.phone}\nSee you soon!`);
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    };

    /* Copy button */
    const copyBtn = document.getElementById('bkCopyBtn');
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(bid).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✓';
        setTimeout(() => { copyBtn.textContent = orig; }, 2000);
      });
    };

    /* Google Sheets POST (replace URL with your Apps Script URL) */
    const SHEETS_URL = 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec';
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BookingID: bid,
        Name: state.name,
        Phone: state.phone,
        Zone: state.zone,
        Date: state.date,
        Time: state.time,
        Duration: state.duration,
        Seats: state.seats,
        Timestamp: new Date().toISOString()
      })
    }).catch(() => {}); // silent fail if not configured

    /* Show modal */
    document.getElementById('bkModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  /* ── Close modal ── */
  function closeModal(){
    document.getElementById('bkModal').classList.add('hidden');
    document.body.style.overflow = '';
  }
  document.getElementById('bkModalClose').addEventListener('click', closeModal);
  document.getElementById('bkModal').addEventListener('click', e => {
    if(e.target === document.getElementById('bkModal')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeModal();
  });

})();

/* ============================================================
   Newsletter strip — new footer
   ============================================================ */
(function newsletter(){
  const form = document.getElementById('nfNewsletterForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    const success = document.getElementById('nfNlSuccess');
    if(success) success.classList.remove('hidden');
  });
})();

/* ============================================================
   Amenities Slideshow
   ============================================================ */
(function amenitiesSlideshow(){
  const slideshow = document.getElementById('amenitiesSlideshow');
  if(!slideshow) return;
  const groups = slideshow.querySelectorAll('.amenities-group');
  if(groups.length <= 1) return;
  
  let currentIndex = 0;
  let intervalId = null;

  function startSlideshow() {
    if(intervalId) return;
    groups.forEach((g, i) => {
      if(i === 0) g.classList.add('active');
      else g.classList.remove('active');
    });
    
    intervalId = setInterval(() => {
      groups[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % groups.length;
      groups[currentIndex].classList.add('active');
    }, 6000);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        startSlideshow();
      }
    });
  }, { threshold: 0.3 });

  groups.forEach(g => g.classList.remove('active'));
  io.observe(slideshow);
})();

/* ============================================================
   GAMIFICATION ENGINE
   Animations: floating elements, holo cards,
   XP bar, loot drops, stat auras, card shimmer.
   ============================================================ */
(function gamification() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── 1. XP SCROLL BAR ─────────────────────────────────────── */
  const xpBar   = document.createElement('div'); xpBar.id   = 'xp-bar';
  const xpFill  = document.createElement('div'); xpFill.id  = 'xp-fill';
  const xpLabel = document.createElement('div'); xpLabel.id = 'xp-label';
  xpLabel.textContent = 'XP 0%';
  xpBar.appendChild(xpFill);
  document.body.append(xpBar, xpLabel);

  function updateXP() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? Math.round((scrolled / total) * 100) : 0;
    xpFill.style.width   = pct + '%';
    xpLabel.textContent  = 'XP ' + pct + '%';
    xpLabel.style.color  = pct > 80
      ? 'rgba(139,92,246,0.8)'
      : pct > 40
        ? 'rgba(61,169,252,0.65)'
        : 'rgba(61,169,252,0.4)';
  }
  window.addEventListener('scroll', updateXP, { passive: true });



  /* ── 3. HOLOGRAPHIC 3D CARD TILT ──────────────────────────── */
  const holoTargets = [
    ...document.querySelectorAll('.zone-card'),
    ...document.querySelectorAll('.plan-card'),
    ...document.querySelectorAll('.event-card'),
    ...document.querySelectorAll('.testi-card'),
  ];

  holoTargets.forEach(card => {
    card.classList.add('holo-card');

    // Inject glare div
    const glare = document.createElement('div');
    glare.className = 'holo-glare';
    card.appendChild(glare);

    const MAX_TILT = 12; // degrees

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
      const dy   = (e.clientY - cy) / (rect.height / 2);

      const rotY =  dx * MAX_TILT;
      const rotX = -dy * MAX_TILT;

      card.style.transform   = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      card.style.boxShadow   = `${-rotY * 1.5}px ${rotX * 1.5}px 40px rgba(61,169,252,0.18)`;

      // glare follows cursor
      const mx = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      glare.style.setProperty('--mx', mx + '%');
      glare.style.setProperty('--my', my + '%');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });


  /* ── 6. LOOT-DROP AMENITY ENTRANCE ───────────────────────── */
  const amenities = document.querySelectorAll('.amenity');
  const lootObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const amenity = entry.target;
      const idx     = [...amenities].indexOf(amenity);
      amenity.style.setProperty('--loot-delay', (idx * 0.12) + 's');
      amenity.classList.add('loot-drop');
      lootObserver.unobserve(amenity);
    });
  }, { threshold: 0.2 });
  amenities.forEach(a => lootObserver.observe(a));

  /* ── 7. STAT CARD POWER-UP AURA ──────────────────────────── */
  const stats = document.querySelectorAll('.stat');
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const idx = [...stats].indexOf(el);
      el.style.setProperty('--stat-delay', (idx * 0.18) + 's');
      el.classList.add('powered');
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  stats.forEach(s => statObserver.observe(s));

  /* ── 8. GAME-CARD FLIP SHIMMER ON FILTER CHANGE ──────────── */
  document.querySelectorAll('#genreTabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(() => {
        document.querySelectorAll('.game-card').forEach((card, i) => {
          card.style.animation = 'none';
          card.style.opacity   = '0';
          card.style.transform = 'scale(0.85) rotateY(20deg)';
          setTimeout(() => {
            card.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
            card.style.opacity   = '1';
            card.style.transform = '';
          }, 30);
        });
      }, 10);
    });
  });

})();

/* ============================================================
   Operating Hours & Walk-in Badge
   ============================================================ */
(function setupHours(){
  const days = ['sun','mon','tue','wed','thu','fri','sat'];
  const today = days[new Date().getDay()];
  const row = document.querySelector(`.hours-row[data-today="${today}"]`);
  if(row) row.classList.add('is-today');

  // Simple mock logic for walk-in availability based on time
  const hour = new Date().getHours();
  const badge = document.getElementById('walkinBadge');
  const dot = document.getElementById('walkinDot');
  const text = document.getElementById('walkinText');
  if(badge && dot && text){
    if(hour >= 10 && hour <= 23){
      // Open
      badge.style.background = 'rgba(74, 222, 128, 0.1)';
      badge.style.borderColor = 'rgba(74, 222, 128, 0.3)';
      dot.style.background = '#4ade80';
      dot.style.boxShadow = '0 0 10px #4ade80';
      text.style.color = '#4ade80';
      text.textContent = 'Walk-ins Welcome Now';
      dot.style.animation = 'pulseGreen 2s infinite';
    } else {
      // Closed
      badge.style.background = 'rgba(239, 68, 68, 0.1)';
      badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
      dot.style.background = '#ef4444';
      dot.style.boxShadow = '0 0 10px #ef4444';
      text.style.color = '#ef4444';
      text.textContent = 'Arena Closed Currently';
      dot.style.animation = 'none';
    }
  }
})();

/* ============================================================
   FAQ Accordion — new footer
   ============================================================ */
(function setupFAQ(){
  const list = document.getElementById('nfFaqList');
  if(!list) return;

  list.addEventListener('click', e => {
    const btn = e.target.closest('.nf-faq-q');
    if(!btn) return;
    const item = btn.closest('.nf-faq-item');
    const ans  = item.querySelector('.nf-faq-a');
    const isOpen = item.classList.contains('open');

    // Close all
    list.querySelectorAll('.nf-faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.nf-faq-a').style.maxHeight = null;
    });

    // Open clicked if it was closed
    if(!isOpen){
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
})();

/* ============================================================
   Custom Cursor & Magnetic Buttons
   ============================================================ */
(function setupCursor(){
  // Only apply custom cursor if it's a non-touch device
  if(window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if(!dot || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Ring follows with easing
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Click animation
  window.addEventListener('mousedown', () => ring.classList.add('clicking'));
  window.addEventListener('mouseup', () => ring.classList.remove('clicking'));

  // Hover states for interactive elements
  const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .fnb-card, .party-card, .plan-card, .zone-card');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Magnetic Buttons Logic
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      // Calculate cursor position relative to button center (-1 to 1)
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // Pull button slightly towards cursor
      btn.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ============================================================
   Membership — Floating Particle Spawner
   ============================================================ */
(function memberParticles(){
  const container = document.getElementById('memberParticles');
  if(!container) return;

  const COLORS = [
    'rgba(139,92,246,',   // violet
    'rgba(61,169,252,',   // blue
    'rgba(196,181,253,',  // lavender
    'rgba(91,141,239,',   // blue-soft
  ];

  const COUNT = 22;

  for(let i = 0; i < COUNT; i++){
    const p = document.createElement('div');
    p.className = 'member-particle';

    const size    = 2 + Math.random() * 5;           // px
    const left    = Math.random() * 100;              // %
    const bottom  = Math.random() * 30;              // % starting offset
    const color   = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity = 0.4 + Math.random() * 0.5;
    const dur     = 8 + Math.random() * 14;          // s
    const delay   = -(Math.random() * dur);           // negative = already in-flight

    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      background:${color}${opacity});
      left:${left}%;
      bottom:${bottom}%;
      box-shadow:0 0 ${size * 3}px ${color}0.6);
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;

    container.appendChild(p);
  }
})();

/* ============================================================
   Fuel Station (Food & Beverages)
   ============================================================ */
(function fuelStation(){
  const fnbMenu = {
    drinks: [
      { name: 'Red Bull Original', price: '₹150', desc: 'Classic energy, 250ml', img: 'food/red bull.avif' },
      { name: 'Red Bull Sugar Free', price: '₹150', desc: 'Zero sugar, full focus', img: 'food/red bull sugar free.webp' },
      { name: 'Monster Energy', price: '₹120', desc: 'Green, original blend', img: 'food/monster drink.avif' },
      { name: 'Arena Lemonade', price: '₹90', desc: 'House lemon + mint cooler', img: 'food/lemonade.webp' },
      { name: 'Cold Brew Coffee', price: '₹110', desc: 'Double shot, no sugar', img: 'food/cold brew coffee.jpeg' }
    ],
    shakes: [
      { name: 'Protein Choco Shake', price: '₹180', desc: 'Chocolate whey, cold milk, ice', img: 'food/protein shake.webp' },
      { name: 'Mango Blast', price: '₹150', desc: 'Fresh mango, yogurt, honey', img: 'food/mango blast.jpeg' },
      { name: 'Berry Focus', price: '₹160', desc: 'Blueberry, banana, almond milk', img: 'food/berry focus.jpeg' },
      { name: 'Oreo Crush', price: '₹170', desc: 'Crushed Oreo, vanilla ice cream', img: 'food/orea crush.jpg' },
      { name: 'Green Machine', price: '₹150', desc: 'Spinach, apple, ginger, lemon', img: 'food/green machin.jpeg' }
    ],
    snacks: [
      { name: 'Loaded Arena Fries', price: '₹180', desc: 'Cheese sauce, jalapeño, sriracha', img: 'food/loaded fries.jpeg' },
      { name: 'Chicken Popcorn', price: '₹160', desc: 'Crispy bites, dipping sauce', img: 'food/chicken popcorn.jpeg' },
      { name: 'Veg Nachos', price: '₹150', desc: 'Tortilla chips, salsa, sour cream', img: 'food/loaded fries.jpeg' },
      { name: 'Paneer Tikka Skewers', price: '₹190', desc: '4 pieces, mint chutney', img: 'food/paneer tikka skewers.jpg' },
      { name: 'Peri Peri Fries', price: '₹140', desc: 'Nando\'s style seasoning', img: 'food/peri peri fries.webp' },
      { name: 'Mozzarella Sticks', price: '₹170', desc: '6 pieces, marinara dip', img: 'food/mozzarella sticks.jpeg' }
    ],
    meals: [
      { name: 'The Arena Burger', price: '₹320', desc: '200g smash patty, cheddar, truffle aioli, brioche bun', img: 'food/burger.webp' },
      { name: 'Chicken Zinger Wrap', price: '₹280', desc: 'Crispy chicken, coleslaw, cheese, garlic mayo', img: 'food/chicken zinger wrap.jpeg' },
      { name: 'Paneer Power Bowl', price: '₹260', desc: 'Rice, grilled paneer, roasted veggies, tahini', img: 'food/panner power bowl.jpg' },
      { name: 'BBQ Chicken Pizza', price: '₹350', desc: '8 inch, smoked chicken, onion, peppers', img: 'food/chicken pizza.jpg' },
      { name: 'Pasta Arrabbiata', price: '₹240', desc: 'Penne, spicy tomato, parmesan', img: 'food/pasta.jpg' },
      { name: 'Chicken Fried Rice', price: '₹220', desc: 'Wok tossed, soy glaze, spring onion', img: 'food/chicken fried rice.webp' }
    ]
  };

  const categories = document.querySelectorAll('.fnb-cat-btn');
  const layout = document.getElementById('fnbLayout');
  if(!layout) return;

  function renderCategory(catId) {
    const items = fnbMenu[catId];
    if(!items) return;

    const featured = items[0];


    // Build right side cards for all items in the category
    const listHTML = items.map((item, index) => `
      <div class="fnb-list-card ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="fnb-list-info">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="fnb-list-price">${item.price}</div>
      </div>
    `).join('');

    layout.innerHTML = `
      <div class="fnb-left">
        <div class="fnb-featured-card holo-card">
          <div class="fnb-featured-img" style="background-image:url('${featured.img}'); transition: opacity 0.2s ease;"></div>
        </div>
      </div>
      <div class="fnb-right">
        ${listHTML}
      </div>
    `;

    // Attach click listeners to list items
    const listCards = layout.querySelectorAll('.fnb-list-card');
    
    function selectItem(index) {
      listCards.forEach(c => c.classList.remove('active'));
      listCards[index].classList.add('active');
      
      // Update featured card smoothly
      const featImg = layout.querySelector('.fnb-featured-img');
      const item = items[index];
      
      featImg.style.opacity = 0.5; // slight fade for image transition
      setTimeout(() => {
        featImg.style.backgroundImage = `url('${item.img}')`;
        featImg.style.opacity = 1;
      }, 200);
    }

    listCards.forEach((c, i) => c.addEventListener('click', () => selectItem(i)));
  }

  categories.forEach(btn => {
    btn.addEventListener('click', () => {
      categories.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      renderCategory(btn.dataset.cat);
      
      layout.style.animation = 'none';
      layout.offsetHeight; 
      layout.style.animation = 'navFadeInUp 0.5s forwards';
    });
  });

  // Init
  renderCategory('meals');
})();