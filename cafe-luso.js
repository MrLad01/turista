// Shared utilities
const storage = {
    getKey: (page) => `visit_count_${page}`,
    increment: (page) => {
        const key = storage.getKey(page);
        const count = parseInt(localStorage.getItem(key)) || 0;
        localStorage.setItem(key, (count + 1).toString());
        return count + 1;
    },
    getCount: (page) => parseInt(localStorage.getItem(storage.getKey(page))) || 0
};

// Get current page name from URL or filename
function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop().split('.')[0];
}

// Handle first visit modal
function handleFirstVisit(page) {
    if (!localStorage.getItem(storage.getKey(page))) {
        const modal = document.getElementById('what-modal');
        const closeBtn = document.querySelector('.what-close-button');
        const okButton = document.querySelector('.what-modal-ok-button');
        
        document.getElementById('what-modal-title').textContent = "Toby shared this experience with you!";
        document.getElementById('what-modal-body').innerHTML = `
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 48px;">🤩</span>
            </div>
            <p style="text-align: center;">Let's dive into Lisbon together and uncover the city's hidden wonders. Your adventure awaits!</p>
        `;
        
        modal.style.display = "block";
        
        const closeModal = () => {
            modal.style.display = "none";
            storage.increment(page);
        };
        
        closeBtn.onclick = closeModal;
        okButton.onclick = closeModal;
        window.onclick = (event) => {
            if (event.target === modal) closeModal();
        };
    } else {
        storage.increment(page);
    }
}

// Navigation handling
function handleNavigation(page) {
    const backButton = document.querySelector('.codfish-back-button');
    if (backButton && storage.getCount(page) >= 2) {
        backButton.style.display = 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();
    handleFirstVisit(currentPage);
    handleNavigation(currentPage);
});

// Toggle information box content
let currentInfoIndex = 0;
const infoTexts = [
    "Café Luso was established in 1927, and is now the oldest operating fado house in the world.",
];

setInterval(() => {
    currentInfoIndex = (currentInfoIndex + 1) % infoTexts.length;
    document.querySelector('.codfish-info-box div p:last-child').textContent = infoTexts[currentInfoIndex];
}, 5000);

// View more functionality
function viewMore() {
    const description = document.querySelector('p');
    description.textContent = "End your evening at the world\’s oldest Fado house. Enjoy a nightcap as the soulful voices of Fado singers transport you to the heart of Portuguese tradition. In this historic setting, every note resonates with passion, every sip enhances the magic. Raise your glass to the timeless art of Fado—a night to remember.";
}

// Add click listeners to expandable sections
document.querySelectorAll('.codfish-section-title').forEach(section => {
    section.addEventListener('click', () => {
        // This would typically toggle the visibility of the section content
        section.querySelector('.codfish-chevron').style.transform = 
            section.querySelector('.codfish-chevron').style.transform === 'rotate(90deg)' 
                ? 'rotate(0deg)' 
                : 'rotate(90deg)';
    });
});

// Modal content data
const whatModalContent = {
    "What's included": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Seat reservation;</li>
                <li>Ticket price deducted from your bill;</li>
                <li> Fado show;</li>
                <li>Complimentary ginginha (our sour cherry Liquor).</li>
            </ul>
        `
    },
    "What to expect": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Fado show with professional fado singers, and guitarists playing classic and Portuguese guitar</li>
            </ul>
        `
    },
    "Who is this for": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Not suitable for small children</li>
            </ul>
        `
    },
    "More you should know": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>For a full refund, cancel at least 24 hours in advance of the start date of the experience.</li>
            </ul>
        `
    }
};

// Get modal elements
const whatModal = document.getElementById('what-modal');
const whatModalTitle = document.getElementById('what-modal-title');
const whatModalBody = document.getElementById('what-modal-body');
const whatCloseButton = document.querySelector('.what-close-button');
const whatOkButton = document.querySelector('.what-modal-ok-button');

// Add click listeners to expandable sections
document.querySelectorAll('.codfish-section-title').forEach(section => {
    section.addEventListener('click', () => {
        const title = section.textContent.trim();
        if (whatModalContent[title]) {
            whatModalTitle.textContent = title;
            whatModalBody.innerHTML = whatModalContent[title].content;
            whatModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        }
    });
});

// Close modal functions
const closeWhatModal = () => {
    whatModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
};

whatCloseButton.addEventListener('click', closeWhatModal);
whatOkButton.addEventListener('click', closeWhatModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === whatModal) {
        closeWhatModal();
    }
});

// Close modal when pressing escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeWhatModal();
    }
});