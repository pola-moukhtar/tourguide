// hiker.js - responsive hero + services animation
let index = 0;
const images = [
  "https://i.ibb.co/CWKHcCh/mountainhiking-Copy.jpg",
  "https://i.ibb.co/dtsz1jC/farmwalk.jpg",
  "https://i.ibb.co/ncHRjHR/the-view.jpg",
  "https://i.ibb.co/7v7vVKy/saltbath.jpg",
  "https://i.ibb.co/5TcSq9J/memo1.jpg",
  "https://i.ibb.co/2MCDKBg/waterfal.jpg",
  "https://i.ibb.co/CnpPkHq/ethio.jpg",
  "https://i.ibb.co/sv6ndcX/teree.jpg",
  "https://i.ibb.co/JkjwdWr/walk-down.jpg",
  "https://i.ibb.co/wJcP4Rz/horsen.jpg",
  "https://i.ibb.co/mDGWDhv/pic.jpg",
  "https://i.ibb.co/phkgjS6/rest.jpg",
  "https://i.ibb.co/4Pzy6cJ/memo3.jpg",
  "https://i.ibb.co/KqyWDmT/cross.jpg",
  "https://i.ibb.co/Lp90ndc/look.jpg"
];

function displayImages() {
  const banner = document.querySelector(".banner-desktop");

  if (banner && window.innerWidth > 768) {
    banner.style.opacity = 0; // fade out
    setTimeout(() => {
      banner.style.backgroundImage = `url(${images[index]})`;
      banner.style.opacity = 1; // fade in
    }, 700); // fade duration

    index = (index + 1) % images.length;
    setTimeout(displayImages, 5000); // next image after 4s
  }
}

displayImages();

// Animate Services on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  serviceItems.forEach(item => observer.observe(item));
});

// Services animation (IntersectionObserver)
function initServicesObserver() {
  const serviceItems = document.querySelectorAll(".service-item");
  if (!serviceItems.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  serviceItems.forEach(item => observer.observe(item));
}

// Toggle hero mode based on width
function updateHeroMode() {
  const isMobile = window.innerWidth <= 768;
  const desktop = document.querySelector(".banner-desktop");
  const mobile = document.querySelector(".banner-mobile");
  const video = mobile ? mobile.querySelector("video") : null;

  if (isMobile) {
    if (desktop) desktop.style.display = "none";
    if (mobile) {
      mobile.style.display = "flex";
      mobile.setAttribute("aria-hidden", "false");
    }
    // stop slideshow and play video if possible
    stopSlideshow();
    if (video) {
      // try to play (some browsers may block, but muted + playsinline helps)
      video.play().catch(() => {/* ignore play error */});
    }
  } else {
    if (desktop) desktop.style.display = "flex";
    if (mobile) {
      mobile.style.display = "none";
      mobile.setAttribute("aria-hidden", "true");
    }
    // pause video if exists, reset and start slideshow
    if (video) {
      try { video.pause(); video.currentTime = 0; } catch(e) {}
    }
    startSlideshow();
  }
}

// Run on load and resize
window.addEventListener("DOMContentLoaded", () => {
  initServicesObserver();
  updateHeroMode();
});

window.addEventListener("resize", () => {
  // small debounce to avoid thrashing
  if (window._heroResizeTimeout) clearTimeout(window._heroResizeTimeout);
  window._heroResizeTimeout = setTimeout(() => {
    updateHeroMode();
  }, 120);
});
