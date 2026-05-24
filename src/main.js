import './style.css';
import { pages, heroSlides, galleryImages, blogPosts } from './pages.js';

// Global State
let currentSlide = 0;
let slideInterval = null;
let activeGalleryCategory = 'all';
let currentLightboxIndex = 0;
let lightboxImages = [];

// Pricing packages data
const pricingData = {
  newborn: {
    image: "https://static.wixstatic.com/media/c11f9c_49784873866e402c8a2444f82ad0fb0b~mv2.jpg",
    intro: "Artistic posed newborn photography captured inside our comfortable, warm McLean studio. Best photographed when baby is between 5 and 14 days old.",
    packages: [
      {
        name: "Petite Newborn",
        subtitle: "Baby Only",
        price: "$475",
        features: [
          "30-45 minutes studio photoshoot",
          "2-3 setups utilizing premium baskets, beds, or bowls",
          "1 wrap style with variety of hats, bonnets, or headbands",
          "7 high-resolution professionally retouched digital images",
          "Baby only (no parent or sibling photos included)",
          "Online gallery for viewing and print ordering"
        ]
      },
      {
        name: "Boutique Newborn",
        subtitle: "Baby Only • Extended Setup",
        price: "$695",
        features: [
          "1 hour studio photoshoot",
          "3 setups customized by Raha utilizing props and accessories",
          "2-3 wraps using variety of textures, hats, and bands",
          "Macro shots of baby's tiny features (toes, eyelashes, lips)",
          "15 high-resolution professionally retouched digital images",
          "Baby only (no parent or sibling photos included)"
        ],
        popular: true
      },
      {
        name: "Standard Newborn + Family",
        subtitle: "For the Whole Family",
        price: "$895",
        features: [
          "Up to 2 hours studio photoshoot",
          "4 setups customized to your color preferences",
          "Parent, sibling, and baby portraits (together & separate)",
          "Immediate family only (no grandparents)",
          "20 high-resolution professionally retouched digital images",
          "Full styling and wraps included"
        ]
      },
      {
        name: "Premium Newborn + Family",
        subtitle: "All-Inclusive Luxury",
        price: "$1,250",
        features: [
          "Up to 3 hours studio photoshoot",
          "5-6 setups customized by Raha",
          "Portraits of baby, parents, siblings, & grandparents welcome",
          "25 high-resolution professionally retouched digital images",
          "Premium 8x8 high-quality heirloom coffee table album",
          "Dedicated staging, styling, and poses"
        ]
      },
      {
        name: "In-Home Lifestyle Newborn",
        subtitle: "In the Comfort of Your Home",
        price: "$750",
        features: [
          "1 hour relaxed lifestyle session in your home",
          "15 professionally edited digital images",
          "3-4 setups utilizing portable wraps, props, and layers",
          "Available within 15-mile radius of McLean, VA",
          "Baby only ($750)",
          "Optional: Add mini family portraits (parents/siblings) for +$225"
        ]
      }
    ]
  },
  maternity: {
    image: "https://static.wixstatic.com/media/909cb6_8aa8210555bf41ebb4a3147c1912a2c3~mv2.jpg",
    intro: "Elegant maternity portraits celebrating your journey into motherhood. Best photographed between 28 and 34 weeks of pregnancy.",
    packages: [
      {
        name: "In-Studio Maternity",
        subtitle: "Classic Studio Session",
        price: "$650",
        features: [
          "Up to 1 hour photoshoot in our McLean studio",
          "Partner and siblings are welcome to join",
          "1-2 outfit changes for Mom (studio wardrobe available)",
          "Professional studio lighting and elegant backdrops",
          "10 high-resolution professionally retouched digital images"
        ]
      },
      {
        name: "Outdoor Maternity Standard",
        subtitle: "Natural Light Session",
        price: "$750",
        features: [
          "Up to 1.5 hours outdoor photoshoot",
          "Stunning Northern Virginia location selected by photographer",
          "1 outfit change if time permits",
          "Partner and siblings are welcome to join",
          "10 high-resolution professionally retouched digital images",
          "Golden hour shooting time for magical lighting"
        ],
        popular: true
      },
      {
        name: "Studio Maternity Premium",
        subtitle: "Luxury Wardrobe & Album",
        price: "$1,195",
        features: [
          "Up to 2 hours studio photoshoot",
          "Partner, siblings, and grandparents are welcome to join",
          "Multiple outfit changes for Mom",
          "20 high-resolution professionally retouched digital images",
          "Premium 8x8 custom-designed coffee table album"
        ]
      }
    ]
  },
  cakesmash: {
    image: "https://static.wixstatic.com/media/909cb6_f8fc0a113bda457c803f102062bbe3ad~mv2.jpg",
    intro: "Celebrate your baby's first birthday milestone with a fun-filled cake smash and splash photoshoot in our studio. We handle the setup and cleanup!",
    packages: [
      {
        name: "Petite Cake Smash",
        subtitle: "Child Only",
        price: "$495",
        features: [
          "30-minute cake smash session in studio",
          "Birthday child only (no family portraits)",
          "1 custom theme from our available selection (all props included)",
          "7 high-resolution digital images",
          "Parents provide the cake",
          "Optional: Add mini family portraits for +$150"
        ]
      },
      {
        name: "Cake Smash + Splash",
        subtitle: "Smash & Bath",
        price: "$625",
        features: [
          "1 hour studio session (birthday child only)",
          "Cake smash followed by warm bubble bath in a miniature tub",
          "Miniature clawfoot tub splash photos",
          "Simple vanilla naked cake included",
          "10 high-resolution digital images",
          "Optional: Add mini family portraits for +$150"
        ],
        popular: true
      },
      {
        name: "Custom Smash + Splash",
        subtitle: "Bespoke Birthday Portrait",
        price: "$895",
        features: [
          "1 hour studio session (birthday child only)",
          "Bespoke custom theme designed around your exact vision",
          "Custom matching bakery cake included",
          "Custom balloons, backdrops, and outfits",
          "Splashing in mini bathtub photos included",
          "20 high-resolution digital images",
          "Optional: Add mini family portraits for +$150"
        ]
      }
    ]
  },
  milestone: {
    image: "https://static.wixstatic.com/media/909cb6_1c1f486194f34974895566f2d98c34df~mv2.jpg",
    intro: "Capture those sweet baby milestones between 3 and 10 months old—from learning to push up, sitting, smiling, to crawling and taking first steps.",
    packages: [
      {
        name: "Petite Milestone",
        subtitle: "Child Only • Quick Session",
        price: "$395",
        features: [
          "45-minute studio photoshoot",
          "1 custom baby setup (all outfits and props provided)",
          "Birthday baby only",
          "10 fully edited digital images",
          "Ideal for capturing sitting, tummy-time, or crawling milestones"
        ]
      },
      {
        name: "Boutique Milestone",
        subtitle: "Child Only • Two Looks",
        price: "$525",
        features: [
          "1 hour studio photoshoot",
          "2 setups customized with baby outfits from our wardrobe",
          "15 fully edited digital images",
          "Captures multiple looks, smiles, and baby details",
          "Optional: Add cake smash for +$150",
          "Optional: Add extra setup for +$75"
        ],
        popular: true
      },
      {
        name: "Milestone + Family",
        subtitle: "Baby & Parents Together",
        price: "$695",
        features: [
          "90-minute studio photoshoot",
          "2 baby setups plus family portrait setup",
          "Mini family portraits included (parents & siblings)",
          "20 fully edited digital images",
          "Beautiful blend of baby-only details and warm family bounds"
        ]
      }
    ]
  },
  family: {
    image: "https://static.wixstatic.com/media/909cb6_5bbe9913e83e490bab0dadf5a8ff999d~mv2.jpg",
    intro: "Heartwarming outdoor or studio sessions capturing the authentic connection, smiles, and love that make your family unique.",
    packages: [
      {
        name: "Studio Family Session",
        subtitle: "Comfortable Studio Session",
        price: "$375",
        features: [
          "1 hour studio session in McLean",
          "For up to 5 immediate family members",
          "20 professionally edited digital images",
          "Elegant, classic background styling",
          "Relaxed experience perfect for toddlers"
        ]
      },
      {
        name: "Outdoor Family Session",
        subtitle: "Golden Hour Outdoor",
        price: "$425",
        features: [
          "1 hour outdoor golden hour session",
          "Locations in McLean and surrounding areas (within 10 miles of studio)",
          "For up to 5 immediate family members",
          "20 professionally edited digital images",
          "Weather rescheduling policy applies"
        ],
        popular: true
      },
      {
        name: "Extended Family Session",
        subtitle: "Grandparents, Cousins, & More",
        price: "$550",
        features: [
          "90-minute session (studio or outdoor)",
          "For up to 10 family members",
          "Perfect for multi-generational portraits, aunts, uncles",
          "25 professionally edited digital images",
          "A mix of large group and individual family unit shots"
        ]
      }
    ]
  }
};

// Router Function
function router() {
  const hash = window.location.hash.slice(1) || 'home';
  const cleanHash = hash.split('?')[0];
  const params = new URLSearchParams(hash.split('?')[1] || '');

  // Accessibility Routing: Find page update targets
  const app = document.getElementById('app');
  
  const updateDOM = () => {
    if (pages[cleanHash]) {
      app.innerHTML = pages[cleanHash];
      
      // Update nav link active states
      document.querySelectorAll('.nav-link').forEach(link => {
        const linkHash = link.getAttribute('href').slice(1);
        if (linkHash === cleanHash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      // Page specific setups
      if (cleanHash === 'home') {
        initHome();
      } else if (cleanHash === 'gallery') {
        const category = params.get('category') || 'all';
        initGallery(category);
      } else if (cleanHash === 'investment') {
        initInvestment();
      } else if (cleanHash === 'blog') {
        initBlog();
      } else if (cleanHash === 'contact') {
        initContact();
      }
    } else {
      // Fallback to Home if page not found
      window.location.hash = '#home';
    }
  };

  // Modern View Transitions support
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      updateDOM();
    });
    transition.finished.finally(() => {
      // Set accessibility focus to top of the content header/heading to announce page update
      const mainHeading = app.querySelector('h1, h2');
      if (mainHeading) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus();
      }
    });
  } else {
    updateDOM();
    // A11y focus shift fallback
    setTimeout(() => {
      const mainHeading = app.querySelector('h1, h2');
      if (mainHeading) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus();
      }
    }, 100);
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  // Close mobile navigation drawer if open
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.remove('mobile-active');
  const toggleLines = document.querySelectorAll('.menu-toggle span');
  if (toggleLines.length === 3) {
    toggleLines[0].style.transform = 'none';
    toggleLines[1].style.opacity = '1';
    toggleLines[2].style.transform = 'none';
  }
}

// Global Nav setup
function setupGlobalNav() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  // Scroll Listener for shrinkable header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('mobile-active')) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// ----------------------------------------------------
// Page Initializations
// ----------------------------------------------------

// 1. Home Page Logic
function initHome() {
  // Slideshow Setup
  const slider = document.getElementById('hero-slider');
  if (!slider) return;
  
  slider.innerHTML = '';
  heroSlides.forEach((src, idx) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide ${idx === 0 ? 'active' : ''}`;
    slide.style.backgroundImage = `url('${src}')`;
    slider.appendChild(slide);
  });
  
  currentSlide = 0;
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);

  // Testimonials Carousel Setup
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.children);
  dotsContainer.innerHTML = '';
  
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.dataset.slide = idx;
    dotsContainer.appendChild(dot);
    
    dot.addEventListener('click', () => {
      goToTestimonial(idx);
    });
  });

  let currentTestimonial = 0;
  
  function goToTestimonial(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
      if (idx === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });
    currentTestimonial = index;
  }

  // Auto scroll testimonials
  let testimonialInterval = setInterval(() => {
    let nextIndex = (currentTestimonial + 1) % slides.length;
    goToTestimonial(nextIndex);
  }, 5000);

  track.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
  track.addEventListener('mouseleave', () => {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
      let nextIndex = (currentTestimonial + 1) % slides.length;
      goToTestimonial(nextIndex);
    }, 5000);
  });
}

// 2. Gallery Page Logic
function initGallery(category) {
  activeGalleryCategory = category;
  const grid = document.getElementById('gallery-grid');
  const filters = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  // Set active button
  filters.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filter change handler
  filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.target.dataset.filter;
      // Update hash parameters cleanly
      window.location.hash = `#gallery?category=${selected}`;
    });
  });

  // Build grid images list
  let activeList = [];
  if (category === 'all') {
    // Merge all lists together sequentially/interleaved
    const categories = ['newborn', 'maternity', 'cakesmash', 'family'];
    const lengths = categories.map(c => galleryImages[c].length);
    const maxLen = Math.max(...lengths);
    
    for (let i = 0; i < maxLen; i++) {
      categories.forEach(cat => {
        if (galleryImages[cat][i]) {
          activeList.push({ src: galleryImages[cat][i], type: cat });
        }
      });
    }
  } else {
    activeList = galleryImages[category].map(src => ({ src, type: category }));
  }

  // Populate Grid HTML
  grid.innerHTML = '';
  activeList.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = `gallery-item ${item.type}`;
    card.dataset.index = idx;
    
    card.innerHTML = `
      <img src="${item.src}" alt="${item.type} photography session" loading="lazy">
      <div class="gallery-item-overlay">
        <div class="gallery-zoom-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Lightbox open triggers
    card.addEventListener('click', () => {
      lightboxImages = activeList.map(i => i.src);
      openLightbox(idx);
    });
  });
}

// Lightbox Modal functions
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  currentLightboxIndex = index;
  lightboxImg.src = lightboxImages[index];
  lightbox.style.display = 'flex';
  
  document.body.style.overflow = 'hidden'; // Stop scroll

  // Setup click triggers once
  if (!lightbox.dataset.initialized) {
    lightbox.dataset.initialized = 'true';
    
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', prevLightbox);
    document.getElementById('lightbox-next').addEventListener('click', nextLightbox);
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') nextLightbox();
        else if (e.key === 'ArrowLeft') prevLightbox();
      }
    });
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function nextLightbox() {
  if (lightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  document.getElementById('lightbox-img').src = lightboxImages[currentLightboxIndex];
}

function prevLightbox() {
  if (lightboxImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  document.getElementById('lightbox-img').src = lightboxImages[currentLightboxIndex];
}

// 3. Investment Pricing Page Logic
function initInvestment() {
  const tabs = document.querySelectorAll('.pricing-tab-btn');
  const container = document.getElementById('pricing-details-container');
  if (!tabs.length || !container) return;

  // Active Tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      renderPricingCategory(e.target.dataset.pricing);
    });
  });

  // Default Category render
  renderPricingCategory('newborn');

  function renderPricingCategory(category) {
    const data = pricingData[category];
    if (!data) return;

    let html = `
      <div class="pricing-banner-wrapper">
        <div style="background-image: url('${data.image}');" class="pricing-banner-img"></div>
      </div>
      <div class="pricing-section-intro">
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.5; margin-bottom: 3rem;">${data.intro}</p>
      </div>
      <div class="pricing-grid">
    `;

    data.packages.forEach(pkg => {
      html += `
        <div class="price-card ${pkg.popular ? 'popular' : ''}">
          ${pkg.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
          <div class="price-header">
            <h3 class="price-title serif">${pkg.name}</h3>
            <p class="price-subtitle">${pkg.subtitle}</p>
            <p class="price-amount">${pkg.price}</p>
          </div>
          <ul class="price-features">
            ${pkg.features.map(feat => `<li>${feat}</li>`).join('')}
          </ul>
          <div style="margin-top: auto;">
            <a href="#contact?session=${category}" class="btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}" style="width: 100%;">Inquire Now</a>
          </div>
        </div>
      `;
    });

    html += `
      </div>
      <div class="addons-wrap">
        <div>
          <h3 class="serif addons-title">A la Carte Add-ons</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem;">Enhance your photography experience with custom albums, high-quality prints, or digital bundle expansions.</p>
          <a href="#contact" class="btn btn-outline">Ask About Staging & Storing</a>
        </div>
        <div>
          <ul class="addons-list">
            <li><span>Single Additional Digital Image</span> <span>$15</span></li>
            <li><span>5-Image Digital Bundle</span> <span>$65</span></li>
            <li><span>10-Image Digital Bundle</span> <span>$99</span></li>
            <li><span>Mini Family Add-on (For Petite milestone/newborn)</span> <span>$150 - $225</span></li>
            <li><span>Fine Art Canvas & Framed Wall Prints</span> <span>Browse in Shop</span></li>
            <li><span>8x8 Premium Coffee Table Album</span> <span>Inquire</span></li>
          </ul>
        </div>
      </div>
    `;

    // View Transitions for switching pricing categories
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        container.innerHTML = html;
      });
    } else {
      container.innerHTML = html;
    }
  }
}

// 4. Contact Form Setup
function initContact() {
  const form = document.getElementById('booking-form');
  const successMsg = document.getElementById('form-success');
  if (!form || !successMsg) return;

  // Pre-fill session from URL parameter
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash.split('?')[1] || '');
  const sessionTypeParam = params.get('session');
  if (sessionTypeParam) {
    const select = document.getElementById('session-type');
    if (select) {
      select.value = sessionTypeParam;
    }
  }

  // Handle submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect values
    const inquiry = {
      name: document.getElementById('parent-name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      sessionType: document.getElementById('session-type').value,
      dueDate: document.getElementById('due-date').value,
      location: document.getElementById('city').value,
      message: document.getElementById('message').value,
      date: new Date().toISOString()
    };

    // Save to localstorage for demo purposes
    let submissions = JSON.parse(localStorage.getItem('photography_inquiries') || '[]');
    submissions.push(inquiry);
    localStorage.setItem('photography_inquiries', JSON.stringify(submissions));

    // Reset Form
    form.reset();

    // Show Success message and hide button/inputs
    successMsg.style.display = 'block';
    
    // Hide success after 8 seconds
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 8000);
  });
}

// 5. Blog Page Logic
let displayedPostsCount = 6;

function initBlog() {
  const grid = document.getElementById('blog-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.getElementById('load-more-container');
  if (!grid || !loadMoreBtn) return;

  displayedPostsCount = 6;
  grid.innerHTML = '';
  
  function renderPosts() {
    const postsToRender = blogPosts.slice(grid.children.length, grid.children.length + 6);
    
    postsToRender.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <div class="blog-img-wrap">
          <img class="blog-img" src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-info">
          <span class="blog-meta">${post.date}</span>
          <h3 class="blog-post-title serif">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div>
            <a href="#contact" class="btn-text">Book Session Details</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Hide button if all posts are displayed
    if (grid.children.length >= blogPosts.length) {
      loadMoreContainer.style.display = 'none';
    } else {
      loadMoreContainer.style.display = 'block';
    }
  }

  // Initial render
  renderPosts();

  // Load More handler
  loadMoreBtn.addEventListener('click', () => {
    renderPosts();
  });
}

// ----------------------------------------------------
// Startup / Event Listeners
// ----------------------------------------------------
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  setupGlobalNav();
  router();
});
