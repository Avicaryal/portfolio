
        // Simple animation for the terminal text (optional
        document.addEventListener('DOMContentLoaded', function() {
            const terminalLines = document.querySelectorAll('.terminal-content p');
            
            terminalLines.forEach((line, index) => {
                line.style.opacity = '0';
                setTimeout(() => {
                    line.style.transition = 'opacity 0.5s ease';
                    line.style.opacity = '1';
                }, index * 500);
            });
        });