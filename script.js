function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");

  // Toggle between dark and light (corrected logic)
  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

// Optimized page load function
document.addEventListener("DOMContentLoaded", function () {
  // Apply the saved theme or set default
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Back to top button functionality
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      backToTopButton.classList.toggle("active", window.pageYOffset > 300);
    });

    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mobile menu toggle - optimized
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      this.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        mainNav.classList.contains("active") &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        mainNav.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }

  // Simplified navigation highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    });
  }
});

// Optimized animations with IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".event-card, .team-card, .alumni-card, .about-image, .contact-item"
  );

  // Only set up observer if there are elements to animate
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px",
      }
    );

    // Observe each element
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }
});

// Hero Slideshow
function startHeroSlideshow() {
  const slides = document.querySelectorAll(".slideshow-container .slide-img");
  let current = 0;
  setInterval(() => {
    slides[current].style.display = "none";
    current = (current + 1) % slides.length;
    slides[current].style.display = "block";
  }, 3000);
}
document.addEventListener("DOMContentLoaded", startHeroSlideshow);

function setupHeroImageSlider() {
  const slider = document.querySelector(".hero-image-slider");
  if (!slider) return;
  const images = slider.querySelectorAll(".slider-img");
  let current = 0;

  function showImage(idx) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === idx);
    });
  }

  function prevImage(e) {
    if (e) e.preventDefault();
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  function nextImage(e) {
    if (e) e.preventDefault();
    current = (current + 1) % images.length;
    showImage(current);
  }

  if (images.length > 0) {
    const prevBtn = document.getElementById("heroSliderPrev");
    const nextBtn = document.getElementById("heroSliderNext");
    showImage(current);

    // Slideshow functionality
    let slideshowInterval = null;
    function startSlideshow() {
      if (slideshowInterval) return;
      slideshowInterval = setInterval(() => {
        nextImage();
      }, 4000); // 4 seconds
    }
    function stopSlideshow() {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
    // Start slideshow by default
    startSlideshow();
    // Pause on hover/focus, resume on leave/blur
    slider.addEventListener("mouseenter", stopSlideshow);
    slider.addEventListener("mouseleave", startSlideshow);
    slider.addEventListener("focusin", stopSlideshow);
    slider.addEventListener("focusout", startSlideshow);

    // Keyboard arrow key support, synced with slideshow
    document.addEventListener("keydown", function (e) {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      )
        return; // Don't interfere with typing
      if (e.key === "ArrowLeft") {
        prevImage();
        stopSlideshow();
        startSlideshow();
      } else if (e.key === "ArrowRight") {
        nextImage();
        stopSlideshow();
        startSlideshow();
      }
    });

    // Arrow button click support, synced with slideshow
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", function (e) {
        prevImage(e);
        stopSlideshow();
        startSlideshow();
      });
      nextBtn.addEventListener("click", function (e) {
        nextImage(e);
        stopSlideshow();
        startSlideshow();
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupHeroImageSlider();
});
