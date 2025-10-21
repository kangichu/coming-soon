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
            // If wardrobe isn't ready yet, show door opening effect
            if (!wardrobe.dataset.ready) {
                e.preventDefault(); // Prevent door from opening
                
                // Add slight opening effect to doors
                const leftDoor = wardrobe.querySelector('.wardrobe__door--left .door');
                const rightDoor = wardrobe.querySelector('.wardrobe__door--right .door');
                
                // Apply temporary opening styles
                leftDoor.style.transform = 'rotateY(-15deg)';
                rightDoor.style.transform = 'rotateY(15deg)';
                
                // After a brief moment, close doors and show speech bubble
                setTimeout(() => {
                    leftDoor.style.transform = '';
                    rightDoor.style.transform = '';
                    speechBubble.style.opacity = "1";
                    
                    // Hide speech bubble after 3 seconds
                    setTimeout(() => {
                        speechBubble.style.opacity = "0";
                    }, 3000);
                }, 200); // Doors open for 200ms before closing
            }
        });
    });
});