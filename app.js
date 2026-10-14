/**
 * JDM EXPO — REMASTERED MODERN FRONTEND JAVASCRIPT
 * Automotive Motorsport & JDM Legend Exporter (Japan to Global)
 * Pure Vanilla JS — Zero Heavy Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DUAL TIME ZONE LIVE CLOCKS (TOKYO & PST)
  // ------------------------------------------------------------------------
  const tokyoTimeEl = document.getElementById('tokyo-time');
  const pstTimeEl = document.getElementById('pst-time');
  const officeStatusEl = document.getElementById('office-status');

  function updateClocks() {
    const now = new Date();

    // Tokyo Time (Asia/Tokyo)
    const tokyoFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const tokyoHour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', hour: 'numeric', hour12: false }).format(now), 10);
    const tokyoDay = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', weekday: 'short' }).format(now);

    // PST Time (America/Los_Angeles)
    const pstFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    if (tokyoTimeEl) {
      tokyoTimeEl.textContent = `${tokyoFormatter.format(now)} JST`;
    }
    if (pstTimeEl) {
      pstTimeEl.textContent = `${pstFormatter.format(now)} PST`;
    }

    // Business Hours Status (Nagoya Yatomi HQ: 9:00 - 18:00 JST, Mon-Sat)
    if (officeStatusEl) {
      const isOpen = tokyoHour >= 9 && tokyoHour < 18 && tokyoDay !== 'Sun';
      if (isOpen) {
        officeStatusEl.innerHTML = '<span class="status-pulse-dot"></span> Yatomi HQ: Open';
      } else {
        officeStatusEl.innerHTML = '<span class="status-pulse-dot" style="background:#f59e0b;box-shadow:0 0 8px #f59e0b;"></span> Sales Online (24/7)';
      }
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);

  // ------------------------------------------------------------------------
  // 2. CURRENCY SWITCHER ENGINE
  // ------------------------------------------------------------------------
  const currencySelects = document.querySelectorAll('.currency-select');
  let currentCurrency = 'USD';
  const currencyRates = {
    USD: { symbol: '$', rate: 1.0, format: (val) => `$${val.toLocaleString()}` },
    JPY: { symbol: '¥', rate: 155.0, format: (val) => `¥${Math.round(val * 155).toLocaleString()}` },
    EUR: { symbol: '€', rate: 0.92, format: (val) => `€${Math.round(val * 0.92).toLocaleString()}` }
  };

  currencySelects.forEach(select => {
    select.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      currencySelects.forEach(s => s.value = currentCurrency);
      updateAllPrices();
    });
  });

  function updateAllPrices() {
    const priceElements = document.querySelectorAll('.car-price-value[data-usd]');
    priceElements.forEach(el => {
      const usdVal = parseFloat(el.getAttribute('data-usd'));
      if (isNaN(usdVal) || usdVal <= 0 || el.classList.contains('ask') || el.classList.contains('sold')) return; // Keep "PRICE: ASK" or "SOLD"
      el.textContent = currencyRates[currentCurrency].format(usdVal);
    });
  }

  // ------------------------------------------------------------------------
  // 3. CINEMATIC HERO SLIDER CONTROLLER
  // ------------------------------------------------------------------------
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let currentSlideIndex = 0;
  let slideInterval = null;
  const SLIDE_DURATION = 5500;

  function showSlide(index) {
    if (!slides.length) return;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
  }

  function nextSlide() {
    showSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(currentSlideIndex - 1);
  }

  function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopSlideTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startSlideTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startSlideTimer();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startSlideTimer();
    });
  });

  const heroWrapper = document.querySelector('.hero-slider-wrapper');
  if (heroWrapper) {
    heroWrapper.addEventListener('mouseenter', stopSlideTimer);
    heroWrapper.addEventListener('mouseleave', startSlideTimer);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    heroWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      if (touchEndX < touchStartX - 40) {
        nextSlide();
        startSlideTimer();
      }
      if (touchEndX > touchStartX + 40) {
        prevSlide();
        startSlideTimer();
      }
    }
  }

  startSlideTimer();

  // ------------------------------------------------------------------------
  // 4. INTERACTIVE INVENTORY FILTER & SEARCH ENGINE
  // ------------------------------------------------------------------------
  const inventoryGrid = document.getElementById('inventory-grid');
  const inventoryCards = document.querySelectorAll('.car-card');
  const categoryTabs = document.querySelectorAll('.tab-btn[data-category]');
  const makerChips = document.querySelectorAll('.maker-card, .quick-chip[data-maker]');
  const sortSelect = document.getElementById('inventory-sort');
  const searchInput = document.getElementById('global-search-input');
  const makerDropdown = document.getElementById('global-maker-filter');
  const resultsCountEl = document.getElementById('results-count');

  let activeCategory = 'all';
  let activeMaker = 'all';
  let activeSearch = '';

  function filterInventory() {
    let visibleCount = 0;

    inventoryCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardMaker = card.getAttribute('data-maker') || '';
      const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
      const cardChassis = (card.getAttribute('data-chassis') || '').toLowerCase();
      const cardRef = (card.getAttribute('data-ref') || '').toLowerCase();

      // Check category match
      const categoryMatch = activeCategory === 'all' || 
                            cardCategory.includes(activeCategory) || 
                            (activeCategory === 'featured' && card.hasAttribute('data-featured')) ||
                            (activeCategory === 'latest' && card.hasAttribute('data-latest'));

      // Check maker match
      const makerMatch = activeMaker === 'all' || cardMaker.toLowerCase() === activeMaker.toLowerCase();

      // Check search match
      const searchMatch = !activeSearch || 
                          cardTitle.includes(activeSearch) || 
                          cardChassis.includes(activeSearch) || 
                          cardRef.includes(activeSearch);

      if (categoryMatch && makerMatch && searchMatch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${visibleCount} vehicles`;
    }
  }

  // Category Tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      filterInventory();
    });
  });

  // Maker Selector / Cards
  makerChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const maker = chip.getAttribute('data-maker');
      if (maker) {
        activeMaker = maker;
        if (makerDropdown) makerDropdown.value = maker;
        document.querySelectorAll('.quick-chip[data-maker]').forEach(c => {
          c.classList.toggle('active', c.getAttribute('data-maker') === maker);
        });
        filterInventory();

        // Smooth scroll to inventory section if clicked from manufacturer grid
        if (chip.classList.contains('maker-card')) {
          const invSection = document.getElementById('inventory');
          if (invSection) invSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Global Header Maker Filter
  if (makerDropdown) {
    makerDropdown.addEventListener('change', (e) => {
      activeMaker = e.target.value;
      document.querySelectorAll('.quick-chip[data-maker]').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-maker') === activeMaker);
      });
      filterInventory();
    });
  }

  // Global Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearch = e.target.value.trim().toLowerCase();
      filterInventory();
    });
  }

  // Header quick search form
  const headerSearchForm = document.getElementById('header-search-form');
  if (headerSearchForm) {
    headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = headerSearchForm.querySelector('input');
      if (input && searchInput) {
        searchInput.value = input.value;
        activeSearch = input.value.trim().toLowerCase();
        filterInventory();
        const invSection = document.getElementById('inventory');
        if (invSection) invSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Hero Quick Configurator bar controls
  const cfgMaker = document.getElementById('cfg-maker');
  const cfgCategory = document.getElementById('cfg-category');
  const cfgStatus = document.getElementById('cfg-status');
  const cfgSearchBtn = document.getElementById('cfg-search-btn');

  function applyConfigurator() {
    if (cfgMaker && cfgMaker.value) {
      activeMaker = cfgMaker.value;
      if (makerDropdown) makerDropdown.value = activeMaker;
      document.querySelectorAll('.quick-chip[data-maker]').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-maker') === activeMaker);
      });
    }
    if (cfgCategory && cfgCategory.value) {
      activeCategory = cfgCategory.value;
      categoryTabs.forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-category') === activeCategory);
      });
    }
    if (cfgStatus && cfgStatus.value) {
      const statusVal = cfgStatus.value;
      if (statusVal === 'usa-legal') {
        activeSearch = 'usa legal';
      } else if (statusVal === 'ask') {
        activeSearch = 'ask';
      } else {
        activeSearch = '';
      }
      if (searchInput) searchInput.value = activeSearch;
    }
    filterInventory();
    const invSection = document.getElementById('inventory');
    if (invSection) invSection.scrollIntoView({ behavior: 'smooth' });
  }

  if (cfgSearchBtn) cfgSearchBtn.addEventListener('click', applyConfigurator);
  if (cfgMaker) cfgMaker.addEventListener('change', applyConfigurator);
  if (cfgCategory) cfgCategory.addEventListener('change', applyConfigurator);
  if (cfgStatus) cfgStatus.addEventListener('change', applyConfigurator);

  // Sorting
  if (sortSelect && inventoryGrid) {
    sortSelect.addEventListener('change', (e) => {
      const sortType = e.target.value;
      const cardsArr = Array.from(inventoryCards);

      cardsArr.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-usd')) || 9999999;
        const priceB = parseFloat(b.getAttribute('data-usd')) || 9999999;
        const refA = a.getAttribute('data-ref') || '';
        const refB = b.getAttribute('data-ref') || '';

        if (sortType === 'price-low') return priceA - priceB;
        if (sortType === 'price-high') return priceB - priceA;
        if (sortType === 'ref') return refB.localeCompare(refA);
        return 0; // default order
      });

      cardsArr.forEach(card => inventoryGrid.appendChild(card));
    });
  }

  // ------------------------------------------------------------------------
  // 5. VEHICLE INQUIRY & DETAILS MODAL
  // ------------------------------------------------------------------------
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryCloseBtn = document.getElementById('inquiry-modal-close');
  const inquiryForm = document.getElementById('inquiry-form');
  const modalCarTitle = document.getElementById('modal-car-title');
  const modalCarRef = document.getElementById('modal-car-ref');
  const modalCarImg = document.getElementById('modal-car-img');
  const modalCarPrice = document.getElementById('modal-car-price');
  const modalCarSpecs = document.getElementById('modal-car-specs');
  const inquiryMessageField = document.getElementById('inquiry-message');

  function openInquiryModal(card) {
    if (!inquiryModal) return;

    const title = card.getAttribute('data-title') || 'Selected Vehicle';
    const ref = card.getAttribute('data-ref') || 'N.A';
    const price = card.querySelector('.car-price-value')?.textContent || 'ASK';
    const imgSrc = card.querySelector('.car-card-img')?.src || '';
    const specs = card.querySelector('.car-specs-row')?.innerHTML || '';

    if (modalCarTitle) modalCarTitle.textContent = title;
    if (modalCarRef) modalCarRef.textContent = `Stock ID: ${ref}`;
    if (modalCarPrice) modalCarPrice.textContent = price;
    if (modalCarImg) modalCarImg.src = imgSrc;
    if (modalCarSpecs) modalCarSpecs.innerHTML = specs;

    if (inquiryMessageField) {
      inquiryMessageField.value = `Hello JDM EXPO Team,\n\nI am interested in purchasing ${title} (${ref}). Please provide additional high-resolution inspection photos, export inspection report, and shipping quotation to my destination country.\n\nThank you!`;
    }

    inquiryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  inventoryCards.forEach(card => {
    // Click on "View Details" button or card body
    const viewBtn = card.querySelector('.btn-view-details');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openInquiryModal(card);
      });
    }

    card.addEventListener('click', (e) => {
      // Don't open if clicked on direct links
      if (e.target.tagName.toLowerCase() === 'a') return;
      openInquiryModal(card);
    });
  });

  if (inquiryCloseBtn) {
    inquiryCloseBtn.addEventListener('click', closeInquiryModal);
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Inquiry...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        closeInquiryModal();
        showToast('Inquiry sent successfully! Our export agent will contact you shortly.');
        inquiryForm.reset();
      }, 900);
    });
  }

  // ------------------------------------------------------------------------
  // 6. FLOATING QUICK CONTACT DRAWER & BACK TO TOP
  // ------------------------------------------------------------------------
  const floatingContactBtn = document.getElementById('floating-contact-trigger');
  const floatingBackTopBtn = document.getElementById('floating-back-top');
  const contactModal = document.getElementById('contact-drawer-modal');
  const contactCloseBtn = document.getElementById('contact-drawer-close');
  const generalContactForm = document.getElementById('general-contact-form');
  const mainHeader = document.querySelector('.main-header');

  if (floatingContactBtn) {
    floatingContactBtn.addEventListener('click', () => {
      if (contactModal) {
        contactModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', () => {
      if (contactModal) {
        contactModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (generalContactForm) {
    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = generalContactForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        if (contactModal) contactModal.classList.remove('open');
        document.body.style.overflow = '';
        showToast('Message sent! JDM EXPO Nagoya office will reply within 24 hours.');
        generalContactForm.reset();
      }, 800);
    });
  }

  // Main page contact form (in contact section)
  const pageContactForm = document.getElementById('page-contact-form');
  if (pageContactForm) {
    pageContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = pageContactForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Transmitting...';

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
        showToast('Thank you! Your message has been received by our sales team.');
        pageContactForm.reset();
      }, 800);
    });
  }

  // Scroll effects: Header blur & Back-to-Top visibility
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (mainHeader) {
      if (scrollPos > 60) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    if (floatingBackTopBtn) {
      if (scrollPos > 350) {
        floatingBackTopBtn.style.opacity = '1';
        floatingBackTopBtn.style.pointerEvents = 'auto';
      } else {
        floatingBackTopBtn.style.opacity = '0';
        floatingBackTopBtn.style.pointerEvents = 'none';
      }
    }
  }, { passive: true });

  if (floatingBackTopBtn) {
    floatingBackTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // 7. NEWSLETTER SUBSCRIPTION FORMS
  // ------------------------------------------------------------------------
  const newsletterForms = document.querySelectorAll('.newsletter-form, #footer-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"], input[name="email"]');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! You will now receive JDM EXPO stock arrivals & auction alerts.');
        form.reset();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 8. MOBILE MENU DRAWER
  // ------------------------------------------------------------------------
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sub-link');

  function openMobileNav() {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavBackdrop) {
      mobileNavBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuTrigger) mobileMenuTrigger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileNavBackdrop) closeMobileNav();
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Global Escape Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInquiryModal();
      if (contactModal) contactModal.classList.remove('open');
      closeMobileNav();
      document.body.style.overflow = '';
    }
  });

  // ------------------------------------------------------------------------
  // 9. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // ------------------------------------------------------------------------
  // 10. IMAGE FALLBACK HANDLING
  // ------------------------------------------------------------------------
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', () => {
      // Elegant dark gradient placeholder if an image fails to load
      img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20fill%3D%22%23161c28%22%20width%3D%22600%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%239ca3af%22%20font-family%3D%22sans-serif%22%20font-size%3D%2218%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EJDM%20EXPO%20VEHICLE%3C%2Ftext%3E%3C%2Fsvg%3E';
    });
  });
});
