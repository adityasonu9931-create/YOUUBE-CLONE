// Performance utility functions

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if element is in viewport
 * @param {Element} el - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
export const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Preload image for better performance
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch DOM updates for better performance
 * @param {Function} callback - Function containing DOM updates
 */
export const batchDOMUpdates = (callback) => {
  if (window.requestAnimationFrame) {
    requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 0);
  }
};

/**
 * Measure performance of a function
 * @param {Function} fn - Function to measure
 * @param {string} name - Name for the measurement
 * @returns {any} - Result of the function
 */
export const measurePerformance = (fn, name = 'Function') => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start} milliseconds`);
  }
  
  return result;
};

/**
 * Lazy load images with intersection observer
 * @param {string} src - Image source URL
 * @param {Element} imgElement - Image element
 * @param {Object} options - Intersection observer options
 */
export const lazyLoadImage = (src, imgElement, options = {}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imgElement.src = src;
        imgElement.classList.remove('lazy');
        observer.unobserve(imgElement);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  });
  
  observer.observe(imgElement);
};

/**
 * Optimize scroll performance
 * @param {Function} callback - Scroll callback function
 * @returns {Function} - Throttled scroll handler
 */
export const optimizeScroll = (callback) => {
  return throttle(callback, 16); // ~60fps
};

/**
 * Check if device is mobile
 * @returns {boolean} - Whether the device is mobile
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};

/**
 * Check if device supports touch
 * @returns {boolean} - Whether the device supports touch
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
