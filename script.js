function duplicateItems() {
    const container = document.querySelector('.scroll-container');
    const items = container.querySelectorAll('.scroll-items');
    
    // Clone all items and append them to create a seamless loop
    items.forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });
  }

  // Initialize the scroll
  duplicateItems();