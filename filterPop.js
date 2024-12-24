// Get modal elements
const filterModal = document.getElementById("filterModal");
const controlsIcon = document.getElementById("filter");
const closeBtn = document.querySelector(".filter-close");
const applyButton = document.querySelector(".filter-apply-button");
const filterOptions = document.querySelectorAll(".filter-option");

// Open modal when clicking the controls icon
controlsIcon.onclick = function() {
    filterModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Close filterModal when clicking the close button
closeBtn.onclick = function() {
    filterModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close filterModal when clicking outside
window.onclick = function(event) {
    if (event.target == filterModal) {
        filterModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Toggle filter options
filterOptions.forEach(option => {
    option.addEventListener('click', function() {
        this.classList.toggle('filter-selected');
    });
});

// Apply filters
applyButton.onclick = function() {
    const selectedFilters = document.querySelectorAll('.filter-option.filter-selected');
    const filters = Array.from(selectedFilters).map(filter => filter.textContent);
    console.log('Selected filters:', filters);
    filterModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close filterModal when pressing ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        filterModal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
