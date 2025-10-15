document.addEventListener('DOMContentLoaded', () => {
    const wardrobe = document.querySelector('.wardrobe');
    const speechBubble = document.querySelector('.speech-bubble');
    const timer = parseInt(wardrobe.dataset.timer, 10) || 5; // Default 5 seconds
    
    // Add click handler to wardrobe doors
    const doorDetails = wardrobe.querySelectorAll('details');
    doorDetails.forEach(detail => {
        detail.addEventListener('click', (e) => {
            // If wardrobe isn't ready yet, show speech bubble
            if (!wardrobe.dataset.ready) {
                e.preventDefault(); // Prevent door from opening
                speechBubble.style.opacity = "1"; // Make speech bubble visible
            }
        });
    });
    
    // Set wardrobe to ready after timer expires
    setTimeout(() => {
        wardrobe.dataset.ready = "true";
        speechBubble.style.opacity = "0"; // Hide speech bubble when ready
    }, timer * 15000);
});
