document.addEventListener('DOMContentLoaded', () => {
    const wardrobe = document.querySelector('.wardrobe');
    const speechBubble = document.querySelector('.speech-bubble');

    const targetDate = new Date('2026-05-30'); // Target date when wardrobe becomes ready
    
    // Array of upgrade messages
    const upgradeMessages = [
        "Hey, we aren't ready yet!",
        "We're upgrading Tandish to serve both property owners and tenants better...",
        "Building smarter tenant management tools...",
        "Adding seamless rent tracking and payment insights...",
        "Setting up dashboards for landlords to manage their listings and tenants...",
        "Introducing automated invoices and expense summaries...",
        "Polishing up new property analytics and reporting features...",
        "Enhancing account security and data protection...",
        "Preparing your personalized property management experience...",
        "Almost there — Tandish is about to get a whole lot better!"
    ];

    
    let currentMessageIndex = 0;
    let hideTimeout = null; // Store timeout reference
    
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
                
                // Clear any existing timeout
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                
                // If speech bubble is currently visible, hide it and return
                if (speechBubble.style.opacity === "1") {
                    speechBubble.style.opacity = "0";
                    // return;
                }
                
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
                    
                    // Update message text with current message
                    speechBubble.textContent = upgradeMessages[currentMessageIndex];
                    speechBubble.style.opacity = "1";
                    
                    // Cycle to next message for next click
                    currentMessageIndex = (currentMessageIndex + 1) % upgradeMessages.length;
                    
                    // Set timeout to hide speech bubble after 5 seconds
                    hideTimeout = setTimeout(() => {
                        speechBubble.style.opacity = "0";
                        hideTimeout = null;
                    }, 5000);
                }, 200); // Doors open for 200ms before closing
            }
        });
    });
});