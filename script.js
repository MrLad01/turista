function duplicateItems() {
    const container = document.querySelector('.scroll-container');
    const items = container.querySelectorAll('.scroll-items');
    
    items.forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });
}

duplicateItems();

// First modal (Toby's modal)
const tobyModal = document.getElementById("tobyModal");
const welcomeLink = document.querySelector(".welcome-link");
const welcomeCloseBtn = document.querySelector(".welcome-close");

welcomeLink.onclick = function(e) {
    e.preventDefault();
    tobyModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

welcomeCloseBtn.onclick = function() {
    tobyModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Fourth item click handler
document.querySelector('.scroll-items:nth-child(4)').addEventListener('click', function() {
  window.location.href = 'gettingToKnow.html';
});

document.querySelector('.seven-cod').addEventListener('click', function() {
  window.location.href = 'codfish-detail.html';
});

document.querySelector('.wine-alchemist').addEventListener('click', function() {
  window.location.href = 'wine-alchemist-details.html';
});

document.querySelector('.toast-fado').addEventListener('click', function() {
  window.location.href = 'cafe-luso-details.html';
});

document.querySelector('.adega-machado').addEventListener('click', function() {
  window.location.href = 'adega-details.html';
});
document.querySelector('.box-adega').addEventListener('click', function() {
  window.location.href = 'box-adega-details.html';
});

// Filter modal
const filterModal = document.getElementById("filterModal");
const controlsIcon = document.querySelector(".controls-icon"); // Changed from getElementById
const filterCloseBtn = document.querySelector(".filter-close"); // Renamed to avoid conflict
const applyButton = document.querySelector(".filter-apply-button");
const filterOptions = document.querySelectorAll(".filter-option");

controlsIcon.onclick = function() {
    filterModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

filterCloseBtn.onclick = function() {
    filterModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Modified window click handler to handle both modals
window.onclick = function(event) {
    if (event.target == tobyModal) {
        tobyModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    if (event.target == filterModal) {
        filterModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

filterOptions.forEach(option => {
    option.addEventListener('click', function() {
        this.classList.toggle('filter-selected');
        applyButton.style.opacity = "1";
    });
});

applyButton.onclick = function() {
    const selectedFilters = document.querySelectorAll('.filter-option.filter-selected');
    const filters = Array.from(selectedFilters).map(filter => filter.textContent);
    console.log('Selected filters:', filters);
    filterModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Modified keydown handler to handle both modals
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        tobyModal.style.display = "none";
        filterModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});