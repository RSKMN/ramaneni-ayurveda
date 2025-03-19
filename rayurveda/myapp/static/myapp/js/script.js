document.addEventListener("DOMContentLoaded", function() {
    // Carousel Setup
    const carousel = document.querySelector('.carousel');
    // Use carousel items instead of images
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    let currentIndex = 0;
    let itemWidth = 0; // width of one carousel item plus gap
  
    // Calculate the width of one carousel item plus a gap (assumed 10px gap)
    function updateItemWidth() {
      if (items.length > 0) {
        itemWidth = items[0].offsetWidth + 10; // Adjust gap if needed
      }
    }
  
    // Update the carousel transform based on currentIndex
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  
    // Determine how many items are fully visible in the container
    function visibleItemCount() {
      const containerWidth = carousel.parentElement.offsetWidth;
      return Math.floor(containerWidth / itemWidth);
    }
  
    // Next button: move one item to the right or wrap around
    nextBtn.addEventListener('click', function() {
      const visibleCount = visibleItemCount();
      if (currentIndex < items.length - visibleCount) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  
    // Previous button: move one item to the left or wrap around
    prevBtn.addEventListener('click', function() {
      const visibleCount = visibleItemCount();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = items.length - visibleCount;
        if (currentIndex < 0) currentIndex = 0;
      }
      updateCarousel();
    });
  
    // Auto-scroll every 5 seconds
    setInterval(function() {
      const visibleCount = visibleItemCount();
      if (currentIndex < items.length - visibleCount) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    }, 5000);
  
    // Update dimensions on window resize
    window.addEventListener('resize', function() {
      updateItemWidth();
      updateCarousel();
    });
  
    // Initial calculations once images have loaded
    window.addEventListener('load', function() {
      updateItemWidth();
      updateCarousel();
    });
  
    // --- Add to Cart Feature for Carousel Items ---
  
    // Create quantity control element
    function createQuantityControls() {
      const container = document.createElement('div');
      container.classList.add('quantity-controls');
  
      const decreaseBtn = document.createElement('button');
      decreaseBtn.classList.add('decrease');
      decreaseBtn.textContent = '-';
  
      const quantitySpan = document.createElement('span');
      quantitySpan.classList.add('quantity');
      quantitySpan.textContent = '1';
  
      const increaseBtn = document.createElement('button');
      increaseBtn.classList.add('increase');
      increaseBtn.textContent = '+';
  
      container.appendChild(decreaseBtn);
      container.appendChild(quantitySpan);
      container.appendChild(increaseBtn);
  
      // Increase quantity
      increaseBtn.addEventListener('click', function() {
        let qty = parseInt(quantitySpan.textContent);
        qty++;
        quantitySpan.textContent = qty;
      });
  
      // Decrease quantity; if quantity falls below 1, revert to "Add to Cart" button
      decreaseBtn.addEventListener('click', function() {
        let qty = parseInt(quantitySpan.textContent);
        qty--;
        if (qty < 1) {
          // Replace quantity controls with "Add to Cart" button
          const cartControls = container.parentElement;
          cartControls.innerHTML = '<button class="add-to-cart">Add to Cart</button>';
          attachAddToCartListener(cartControls.querySelector('.add-to-cart'));
        } else {
          quantitySpan.textContent = qty;
        }
      });
  
      return container;
    }
  
    // Attach listener to "Add to Cart" button within a carousel item
    function attachAddToCartListener(button) {
      button.addEventListener('click', function() {
        const cartControls = button.parentElement;
        const quantityControls = createQuantityControls();
        cartControls.innerHTML = '';
        cartControls.appendChild(quantityControls);
      });
    }
  
    // Attach event listeners to all initial "Add to Cart" buttons in carousel items
    const addToCartButtons = carousel.querySelectorAll('.carousel-item .add-to-cart');
    addToCartButtons.forEach(function(button) {
      attachAddToCartListener(button);
    });
  });