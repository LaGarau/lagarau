document.addEventListener("DOMContentLoaded", function() {
    // Handle splash screen
    setTimeout(() => {
        const splashElement = document.querySelector(".splash");
        if (splashElement) {
            splashElement.classList.add("hidden");
        }
    }, 4000); // Hide splash after 4 seconds

    // Text selection font changer
    (function() {
        let spansWithChangedFont = new Set(); // Store spans created for selection

        // Function to revert changes
        function revertFontChanges() {
            spansWithChangedFont.forEach(span => {
                if (span && span.parentNode) {
                    span.replaceWith(...span.childNodes); // Remove span but keep text
                }
            });
            spansWithChangedFont.clear();
        }

        document.addEventListener('selectionchange', function() {
            const selection = window.getSelection();

            // If no text is selected, revert any changes
            if (!selection || selection.toString().trim().length === 0) {
                revertFontChanges();
                return;
            }

            if (selection.rangeCount > 0) {
                try {
                    const range = selection.getRangeAt(0);
                    
                    // Ensure we only wrap text, not entire sections
                    if (!range.collapsed) {
                        const span = document.createElement("span");
                        span.style.fontFamily = '"Roboto", sans-serif';  

                        // span.style.background = "#ff9800"; // Optional highlight
                        
                        range.surroundContents(span); // Wrap only selected text
                        spansWithChangedFont.add(span);
                    }
                } catch (error) {
                    console.error("Error in selection handling:", error);
                }
            }
        });

        // Revert when selection disappears
        document.addEventListener('mouseup', function() {
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection || selection.toString().trim().length === 0) {
                    revertFontChanges();
                }
            }, 100);
        });
    })();
});
