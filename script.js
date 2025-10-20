document.addEventListener('DOMContentLoaded', () => {
    const wardrobe = document.querySelector('.wardrobe');
    const speechBubble = document.querySelector('.speech-bubble');

    const targetDate = new Date('2026-05-30'); // Target date when wardrobe becomes ready
    
    // Check if target date has been reached
    const checkDate = () => {
        const now = new Date();
        if (now >= targetDate) {
            wardrobe.dataset.ready = "true";
            speechBubble.style.opacity = "0"; // Hide speech bubble when ready
            clearInterval(dateChecker); // Stop checking
        }
    };
    
    // Check immediately
    checkDate();
    
    // Check every hour (3600000 ms) if not ready yet
    const dateChecker = setInterval(checkDate, 3600000);
    
    // Add click handler to wardrobe doors
    const doorDetails = wardrobe.querySelectorAll('details');
    doorDetails.forEach(detail => {
        detail.addEventListener('click', (e) => {
            // If wardrobe isn't ready yet, show SweetAlert popup
            if (!wardrobe.dataset.ready) {
                e.preventDefault(); // Prevent door from opening
                speechBubble.style.opacity = "1"; // Make speech bubble visible
            }
        });
    });
});