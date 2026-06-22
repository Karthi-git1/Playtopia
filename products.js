/* products.js */

const DB = {
  controllers: {
    title: "🎮 Custom Controllers",
    items: [
      {
        name: "PS5 DualSense — Midnight Black",
        price: "₹5,999",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#ffffff", label: "White" }],
        features: ["Adaptive triggers & haptic feedback", "Built-in microphone + speaker", "USB-C charging, ~12hr battery", "Compatible with PS5 & PC"],
        availability: "In Stock",
        img: "things/PS5_DualSense___Midnight_Black-removebg-preview.png"
      },
      {
        name: "Xbox Elite Controller Series 2",
        price: "₹12,999",
        colors: [{ hex: "#1b1b1b", label: "Black" }, { hex: "#c0c0c0", label: "Silver" }],
        features: ["Adjustable-tension thumbsticks", "Hair trigger locks + 3 profiles", "Wrap-around rubberized grip", "Rechargeable 40hr battery"],
        availability: "In Stock",
        img: "things/Xbox_Elite_Controller_Series_2-removebg-preview.png"
      },
      {
        name: "Custom Grip PS5 Controller",
        price: "₹6,499",
        colors: [{ hex: "#ffffff", label: "White" }, { hex: "#3DA9FC", label: "Blue" }, { hex: "#8B5CF6", label: "Violet" }],
        features: ["Textured silicone grip panels", "Custom matte faceplate", "Full DualSense internals", "Includes thumb grips"],
        availability: "In Stock",
        img: "things/Custom_Grip_PS5_Controller-removebg-preview.png"
      },
      {
        name: "Retro SNES Style USB Controller",
        price: "₹1,299",
        colors: [{ hex: "#7a7a8c", label: "Grey" }, { hex: "#e8e8e8", label: "White" }],
        features: ["Classic D-pad feel", "USB-C plug-and-play", "Works on PC, Mac, Raspberry Pi", "6 action buttons"],
        availability: "In Stock",
        img: "things/Retro_SNES_Style_USB_Controller-removebg-preview.png"
      },
      {
        name: "8BitDo Pro 2 Wireless",
        price: "₹3,999",
        colors: [{ hex: "#2e2e3a", label: "Black" }, { hex: "#c0c0d0", label: "Grey" }],
        features: ["Bluetooth + 2.4G dual wireless", "Back paddle buttons", "20-hour battery", "Switch, PC & Android compatible"],
        availability: "In Stock",
        img: "things/OIP-removebg-preview.png"
      }
    ]
  },
  headsets: {
    title: "🎧 Pro Audio",
    items: [
      {
        name: "Sony WH-1000XM5",
        price: "₹24,999",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#e8d5c0", label: "Platinum" }],
        features: ["Industry-leading noise cancellation", "30-hour battery life", "Multi-device pairing (2 at once)", "Crystal-clear call mic"],
        availability: "In Stock",
        img: "things/Sony_WH-1000XM5-removebg-preview.png"
      },
      {
        name: "HyperX Cloud III",
        price: "₹7,999",
        colors: [{ hex: "#cc0000", label: "Red" }, { hex: "#1a1a1a", label: "Black" }],
        features: ["Angled 53mm drivers", "Memory foam ear cushions", "Detachable noise-cancelling mic", "Multi-platform (PC, PS, Xbox, Mobile)"],
        availability: "In Stock",
        img: "things/HyperX_Cloud_III-removebg-preview.png"
      },
      {
        name: "Razer BlackShark V2",
        price: "₹6,499",
        colors: [{ hex: "#1a1a1a", label: "Black" }],
        features: ["TriForce Titanium 50mm drivers", "THX 7.1 Spatial Audio", "HyperClear cardioid mic", "Leatherette + flow-through ear cushions"],
        availability: "In Stock",
        img: "things/Razer_BlackShark_V2-removebg-preview.png"
      },
      {
        name: "SteelSeries Arctis Nova 3",
        price: "₹8,999",
        colors: [{ hex: "#ffffff", label: "White" }, { hex: "#2a2a2a", label: "Black" }],
        features: ["Hi-Fi grade audio drivers", "ClearCast Gen 2 mic", "Ultra-soft ear cushions", "Multi-platform ready"],
        availability: "In Stock",
        img: "things/SteelSeries_Arctis_Nova_3-removebg-preview.png"
      },
      {
        name: "JBL Quantum 100",
        price: "₹2,999",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#3DA9FC", label: "Blue" }],
        features: ["JBL QuantumSOUND Signature", "Flip-up detachable boom mic", "Memory foam ear cushions", "3.5mm universal connection"],
        availability: "In Stock",
        img: "things/JBL_Quantum_100-removebg-preview.png"
      }
    ]
  },
  accessories: {
    title: "🖱️ Gaming Accessories",
    items: [
      {
        name: "Playtopia XL Mousepad",
        price: "₹799",
        colors: [{ hex: "#1a1a2e", label: "Black" }],
        features: ["900×400mm extended size", "Smooth micro-weave surface", "Stitched anti-fray edges", "Non-slip rubber base"],
        availability: "In Stock",
        img: "things/Playtopia_XL_Mousepad-removebg-preview.png"
      },
      {
        name: "Custom Keycap Set",
        price: "₹1,299",
        colors: [{ hex: "#8B5CF6", label: "Violet" }, { hex: "#3DA9FC", label: "Blue" }, { hex: "#ffffff", label: "White" }],
        features: ["PBT double-shot material", "RGB shine-through legends", "Universal layout (104/87/75)", "Includes puller tool"],
        availability: "In Stock",
        img: "things/Custom_Keycap_Set-removebg-preview.png"
      },
      {
        name: "Controller Grip Set",
        price: "₹499",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#4ade80", label: "Green" }],
        features: ["Anti-slip silicone material", "Fits PS5 DualSense & Xbox Series", "Includes thumb grips (4 heights)", "Full-grip sleeve included"],
        availability: "In Stock",
        img: "things/Controller_Grip_Set-removebg-preview.png"
      },
      {
        name: "Wrist Rest — Gel",
        price: "₹599",
        colors: [{ hex: "#2a2a2a", label: "Black" }],
        features: ["Memory foam + cooling gel layer", "Non-slip base", "Fits standard TKL keyboards", "Washable cover"],
        availability: "In Stock",
        img: "things/Wrist_Rest___Gel-removebg-preview.png"
      },
      {
        name: "Cable Management Sleeve",
        price: "₹349",
        colors: [{ hex: "#1a1a1a", label: "Black" }],
        features: ["Flexible neoprene construction", "Cut-to-length design", "Velcro closure", "Hides up to 6 cables cleanly"],
        availability: "In Stock",
        img:"things/Cable_Management_Sleeve-removebg-preview.png"
      }
    ]
  },
  apparel: {
    title: "👕 Apparel",
    items: [
      {
        name: "Playtopia Arena Hoodie",
        price: "₹1,499",
        colors: [{ hex: "#0a0c14", label: "Black" }, { hex: "#1a3a5c", label: "Navy" }, { hex: "#3DA9FC", label: "Blue" }],
        features: ["400 GSM cotton-poly blend", "Embroidered Playtopia logo", "Kangaroo pocket", "Sizes: S / M / L / XL / XXL"],
        availability: "In Stock",
        img: "things/hoodie-removebg-preview.png"
      },
      {
        name: "Gaming Oversized Tee",
        price: "₹699",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#ffffff", label: "White" }, { hex: "#8B5CF6", label: "Violet" }],
        features: ["Drop-shoulder fit", "100% ring-spun cotton", "Screen-printed arena graphic", "Pre-shrunk fabric"],
        availability: "In Stock",
        img: "things/Gaming_Oversized_Tee-removebg-preview.png"
      },
      {
        name: "Snapback Cap — Black",
        price: "₹599",
        colors: [{ hex: "#000000", label: "Black" }, { hex: "#ffffff", label: "White" }, { hex: "#1a3a5c", label: "Navy" }],
        features: ["Structured 6-panel snapback", "Embroidered Playtopia logo", "One size fits all"],
        availability: "In Stock",
        img: "things/Snapback Cap — Black.webp"
      },
      {
        name: "Arena Joggers",
        price: "₹1,199",
        colors: [{ hex: "#111111", label: "Black" }, { hex: "#2a2a3a", label: "Charcoal" }],
        features: ["Slim-fit tapered cut", "Deep side pockets", "Ribbed cuffs", "Embroidered logo patch at hip"],
        availability: "In Stock",
        img: "things/Arena_Joggers-removebg-preview.png"
      },
      {
        name: "Playtopia Tote Bag",
        price: "₹399",
        colors: [{ hex: "#1a1a1a", label: "Black" }, { hex: "#f5f5f5", label: "Ecru" }],
        features: ["Heavy-duty canvas material", "Reinforced handles", "Fits 15-inch laptop + peripherals", "Interior zip pocket"],
        availability: "In Stock",
        img: "things/Playtopia__Tote_Bag-removebg-preview.png"
      }
    ]
  },
  drinks: {
    title: "⚡ Energy Drinks",
    items: [
      {
        name: "Red Bull Original",
        price: "₹150",
        colors: [{ hex: "#1c3d99", label: "Blue" }],
        features: ["Classic energy, 250ml", "Taurine + B-vitamins", "0 alcohol", "Cold served"],
        availability: "In Stock",
        
      }
    ]
  },
  shakes: {
    title: "🥤 Shakes & Smoothies",
    items: [
      {
        name: "Protein Choco Shake",
        price: "₹180",
        colors: [{ hex: "#4a2c0a", label: "Chocolate" }],
        features: ["Chocolate whey protein", "Cold milk + ice", "24g protein per serve", "No added sugar"],
        availability: "In Stock",

      }
    ]
  },
  snacks: {
    title: "🍟 Quick Snacks",
    items: [
      {
        name: "Loaded Arena Fries",
        price: "₹180",
        colors: [],
        features: ["Crispy golden fries", "House cheddar cheese sauce", "Jalapeño + sriracha drizzle", "Served hot"],
        availability: "In Stock",
      }
    ]
  },
  meals: {
    title: "🍔 Full Meals",
    items: [
      {
        name: "The Arena Burger",
        price: "₹320",
        colors: [],
        features: ["200g smash patty", "Cheddar + truffle aioli", "Caramelised onion + pickles", "Brioche bun"],
        availability: "In Stock",
        
      }
    ]
  }
};

/* ================================================================
   RENDER & SLIDER
   ── Image wheel geometry (mirrors reference CSS/JS exactly):
       • img-list    static -120 ° (initial display angle)
       • img-slider  rotates CW for →, CCW for ← via JS
       • each .item  counter-rotates to cancel slider rotation (images stay upright)
       • each img    per-item base rotation to keep upright at initial angle
   ── Info panel slides from right (translateX 100% → 0)
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const urlParams    = new URLSearchParams(window.location.search);
  const catParam     = urlParams.get('c') || 'controllers';
  const categoryData = DB[catParam] || DB['controllers'];

  document.getElementById('categoryTitle').textContent = categoryData.title;

  const imgSliderEl = document.getElementById('imgSlider');
  const infoBox     = document.getElementById('infoBox');
  const glowBlob    = document.getElementById('glowBlob');
  const items       = categoryData.items;
  const N           = items.length;
  const STEP        = 360 / N;    // degrees between each item on the wheel
  const INIT_ROT    = 180;        // Base rotation to put item at right edge (3 o'clock)
  const RADIUS      = 650;        // transform-origin = orbital radius (px)

  /* ── Derive a visible accent colour per item ── */
  const FALLBACK_ACCENT = '#7aa2f7';
  function itemAccent(item) {
    if (!item.colors || item.colors.length === 0) return FALLBACK_ACCENT;
    const dark = ['#000000','#111111','#1a1a1a','#0a0c14','#1a1a2e','#1a1b26'];
    const found = item.colors.find(c => !dark.includes(c.hex.toLowerCase()));
    return found ? found.hex : FALLBACK_ACCENT;
  }

  /* ── 1. Build image wheel ── */
  items.forEach((item, i) => {
    const imgItem = document.createElement('div');
    imgItem.className = `img-item${i === 0 ? ' active' : ''}`;

    /* Position the item in the orbit; transform-origin: 650px set in CSS */
    const baseAngle = INIT_ROT - (STEP * i);
    imgItem.style.transform = i === 0
      ? `translateY(-50%) rotate(${baseAngle}deg) scale(0.95) translateX(-65%)`
      : `translateY(-50%) rotate(${baseAngle}deg) scale(0.8)`;

    /* .item wrapper — will be counter-rotated by JS to cancel slider rotation */
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.style.transform = `rotate(${-INIT_ROT}deg)`; /* Counter initial rotation */

    /* img — per-item base rotation keeps it upright */
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.style.transform = `rotate(${STEP * i}deg)`;
    img.style.filter = i === 0
      ? 'blur(0)'
      : 'blur(8px)';

    itemDiv.appendChild(img);
    imgItem.appendChild(itemDiv);
    imgSliderEl.appendChild(imgItem);
  });

  /* ── 2. Build info panel cards ── */
  items.forEach((item, i) => {
    const infoItem = document.createElement('div');
    infoItem.className = `info-item${i === 0 ? ' active' : ''}`;

    /* colour swatches */
    let colorsHtml = '';
    if (item.colors && item.colors.length > 0) {
      const swatches = item.colors.map((c, idx) => `
        <span class="info-swatch${idx === 0 ? ' active' : ''}"
              style="background-color:${c.hex}"
              data-label="${c.label}"
              title="${c.label}"></span>
      `).join('');
      colorsHtml = `
        <div class="info-colors">
          <span class="swatch-label-txt">Colour</span>
          ${swatches}
          <span class="swatch-name-txt">${item.colors[0].label}</span>
        </div>`;
    }

    const featuresHtml = item.features && item.features.length
      ? `<ul class="info-features">${item.features.map(f => `<li>${f}</li>`).join('')}</ul>`
      : '';

    infoItem.innerHTML = `
      <div class="info-title">${item.name}</div>
      <div class="info-price">${item.price}</div>
      ${colorsHtml}
      ${featuresHtml}
      <div class="info-avail">
        <span class="avail-dot"></span>
        Availability: ${item.availability} ✓
      </div>
      <button class="btn-buy">Available In-Store Only</button>
    `;
    infoBox.appendChild(infoItem);
  });

  /* ── 3. Swatch clicks ── */
  infoBox.querySelectorAll('.info-swatch').forEach(swatch => {
    swatch.addEventListener('click', function () {
      const parent = this.closest('.info-colors');
      parent.querySelectorAll('.info-swatch').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      const nameEl = parent.querySelector('.swatch-name-txt');
      if (nameEl) nameEl.textContent = this.dataset.label;
    });
  });

  /* ── 4. Slider state ── */
  let currentIdx  = 0;
  let indexSlider = 0;   /* cumulative rotation count (can go negative) */

  const allImgItems  = Array.from(imgSliderEl.querySelectorAll('.img-item'));
  const allItemDivs  = Array.from(imgSliderEl.querySelectorAll('.img-item .item'));
  const allImgs      = Array.from(imgSliderEl.querySelectorAll('.img-item .item img'));
  const allInfoItems = Array.from(infoBox.querySelectorAll('.info-item'));
  const counterEl    = document.getElementById('slideCounter');

  function updateCounter() {
    if (counterEl) counterEl.textContent = `${currentIdx + 1} / ${N}`;
  }
  updateCounter();

  /* Update everything for the current index */
  function slider() {
    const sliderAngle = indexSlider * STEP;

    /* ── Rotate the wheel ── */
    imgSliderEl.style.transform = `rotate(${sliderAngle}deg)`;

    /* ── Counter-rotate each .item to cancel wheel rotation (images stay upright) ── */
    allItemDivs.forEach(itemDiv => {
      itemDiv.style.transform = `rotate(${-(sliderAngle + INIT_ROT)}deg)`;
    });

    /* ── Update each img-item position + image blur ── */
    allImgItems.forEach((imgItem, i) => {
      const isActive  = (i === currentIdx);
      const baseAngle = INIT_ROT - (STEP * i);

      /* Toggle active class for good measure */
      imgItem.classList.toggle('active', isActive);

      /* Active item: floats forward (translateX(-65%) pulls it toward centre) */
      imgItem.style.transform = isActive
        ? `translateY(-50%) rotate(${baseAngle}deg) scale(0.95) translateX(-65%)`
        : `translateY(-50%) rotate(${baseAngle}deg) scale(0.8)`;
      imgItem.style.zIndex = isActive ? '2' : '0';

      /* Blur all but active */
      const img = allImgs[i];
      img.style.filter = isActive
        ? 'blur(0)'
        : 'blur(8px)';
    });

    /* ── Slide info card ── */
    allInfoItems.forEach((infoItem, i) => {
      infoItem.classList.toggle('active', i === currentIdx);
    });

    /* ── Glow blob tint ── */
    const accent = itemAccent(items[currentIdx]);
    if (glowBlob) {
      glowBlob.style.background = `${accent}2a`; /* ~16% opacity */
    }

    updateCounter();
  }

  /* ── 5. Navigation ── */
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIdx >= N - 1) return;
    indexSlider++;
    currentIdx++;
    slider();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIdx <= 0) return;
    indexSlider--;
    currentIdx--;
    slider();
  });

  /* Set initial glow */
  slider();
  /* Reset counter after initial call (slider() increments nothing but re-renders) */
  currentIdx = 0; indexSlider = 0;
  updateCounter();

  /* ── 6. Custom cursor ── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (window.matchMedia('(pointer: fine)').matches && dot && ring) {
    document.addEventListener('mousemove', e => {
      dot.style.transform  = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      ring.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    });
    document.addEventListener('mousedown', () => {
      ring.style.width = '30px'; ring.style.height = '30px';
      ring.style.background = 'rgba(255,255,255,0.15)';
      ring.style.borderColor = '#fff';
    });
    document.addEventListener('mouseup', () => {
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'rgba(122,162,247,0.4)';
    });
    document.querySelectorAll('a, button, .info-swatch, .nav-arrow').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '50px'; ring.style.height = '50px';
        ring.style.background = 'rgba(122,162,247,0.08)';
        ring.style.borderColor = 'rgba(122,162,247,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.background = 'transparent';
        ring.style.borderColor = 'rgba(122,162,247,0.4)';
      });
    });
  }
});
