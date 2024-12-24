// Toggle information box content
let currentInfoIndex = 0;
const infoTexts = [
    "Portugal has over 1,000 codfish recipes, earning it the nickname \"faithful friend\" of Portuguese cuisine.",
    "Codfish isn't native to Portugal—it's imported, mostly from Norway and Iceland.",
    "Portuguese explorers introduced dried codfish to the world during their sea voyages in the 15th century.",
    "Bacalhau à Brás is one of Portugal\’s most famous dishes, blending codfish with eggs, onions, and crispy potatoes.",
    "Codfish is traditionally served on Christmas Eve in Portugal as a symbol of simplicity and family unity."
];

setInterval(() => {
    currentInfoIndex = (currentInfoIndex + 1) % infoTexts.length;
    document.querySelector('.codfish-info-box div p:last-child').textContent = infoTexts[currentInfoIndex];
}, 5000);

// View more functionality
function viewMore() {
    const description = document.querySelector('p');
    description.textContent = "Dive into Lisbon\'s love affair with bacalhau on this tantalizing food experience. Explore seven distinct and delicious ways the Portuguese transform dried codfish into culinary magic. From the creamy Bacalhau à Brás to crispy golden Pastéis de Bacalhau, and the indulgent layers of Bacalhau com Natas, each dish tells a story of tradition and innovation. Along the way, savor local wines and learn the secrets of Portugal\'s most iconic ingredient. A codfish feast you\’ll never forget!";
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
                <li style="margin-bottom: 10px;">Tasting of 7 traditional codfish dishes, including:
                    <ul style="list-style-type: circle; padding-left: 20px; margin-top: 10px;">
                        <li>Salada de Bacalhau: A refreshing codfish salad with chickpeas, onions, and olive oil;</li>
                        <li>Pastéis de Bacalhau: Golden codfish cake, crispy on the outside and fluffy inside;</li>
                        <li>Patanisca de Bacalhau: a delicious codfish fritter crispy on the outside and fluffy inside;</li>
                        <li>Bacalhau à Brás: A comforting mix of shredded codfish, eggs, onions, and crispy potatoes;</li>
                        <li>Bacalhau à Lagareiro: Oven-baked codfish with olive oil, garlic, and roasted potatoes;</li>
                        <li>Bacalhau à Gomes de Sá: A classic casserole with cod, potatoes, onions, and olives;</li>
                        <li>Bacalhau Assado na Brasa: Grilled codfish with a smoky, charred flavor;</li>
                    </ul>
                </li>
                <li>A glass of wine or beverage paired with the dishes.</li>
                <li>Access to the web app providing insights into the history and cultural significance of codfish in Portuguese cuisine.</li>
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
                <li>Most travelers can participate;</li>
                <li>In case of food allergies or diet restrictions, indicate it at the time of booking;</li>
                <li>This activity is NOT suitable for: Vegan, Vegetarian or if you do not eat fish;</li>
                <li>It IS suitable for the Pescetarian diet (fish, no meat). To be indicated at the time of purchase.</li>
            </ul>
        `
    },
    "More you should know": {
        content: `
            <ul style="list-style-type: disc; padding-left: 20px;">
                <li>This experience requires a minimum number of travelers. If it's canceled because the minimum isn't met, you'll be offered a different date/experience or a full refund</li>
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