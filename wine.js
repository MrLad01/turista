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
    "Wine was introduced to the inhabitants of Lisbon about 3000 years ago by phoenician merchants.",
    "The Romans called a local tribe Lusitans. According to legend, the name was inspired by Lusus, the son of the Roman god of wine:  Bacchus.",
    "Portugal is home to over 250 native grape varieties, many of which aren’t grown anywhere else in the world."
];

setInterval(() => {
    currentInfoIndex = (currentInfoIndex + 1) % infoTexts.length;
    document.querySelector('.codfish-info-box div p:last-child').textContent = infoTexts[currentInfoIndex];
}, 5000);

// View more functionality
function viewMore() {
    const description = document.querySelector('p');
    description.textContent = "Step into the world of Portuguese winemaking, where tradition meets artistry. Unlike anywhere else, Portugal\’s winemakers are true alchemists, blending a symphony of grape varieties to craft wines bursting with complexity and character. Taste bold reds, crisp whites, and unique blends that reflect the soul of Portugal's diverse terroirs. Let each sip reveal the secrets of the vineyards and the magic of the winemakers who turn nature\’s bounty into liquid gold. Come try some of the best, while enjoying a breathtaking view over Lisbon";
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
                <li>Welcome drink by the Terrace;</li>
                <li>Tasting of 7 selected wines from different regions in Portugal;</li>
                <li>Guidance by professional sommelier;</li>
                <li>Sample of local cheeses and charcuterie;</li>
                <li>Not included: gratuities</li>
            </ul>
        `
    },
    "What to expect": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Expert-guided tasting experience of traditional Portuguese codfish dishes</li>
                <li>Cultural insights into the significance of bacalhau in Portuguese cuisine</li>
                <li>Intimate setting in a historic location in Baixa</li>
                <li>Small group experience for personalized attention</li>
                <li>Beverage pairing to complement the dishes</li>
                <li>Take-home recipe cards for your favorite dishes</li>
            </ul>
        `
    },
    "Who is this for": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Not allowed for people under 18.</li>
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