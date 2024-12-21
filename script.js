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

// Get modal elements
const modal = document.getElementById("tobyModal");
const welcomeLink = document.querySelector(".welcome-link");
const closeBtn = document.querySelector(".welcome-close");

// Open modal when clicking the welcome link
welcomeLink.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

// Close modal when clicking the close button
closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
}

// Close modal when pressing ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
});

document.querySelector('.scroll-items:nth-child(4)').addEventListener('click', function() {
  window.location.href = 'gettingToKnow.html';
});