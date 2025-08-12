 function createParticles() {
            const container = document.getElementById('particles-container');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation duration
                const duration = Math.random() * 10 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Random delay
                particle.style.animationDelay = `${Math.random() * 10}s`;
                
                container.appendChild(particle);
            }
        }
        
        // Draw connecting lines
        function drawConnectingLines() {
            if (window.innerWidth < 768) return;
            
            const centerBtn = document.querySelector('.skills-container button');
            const centerRect = centerBtn.getBoundingClientRect();
            const centerX = centerRect.left + centerRect.width / 2;
            const centerY = centerRect.top + centerRect.height / 2;
            
            // Connect all skill nodes
            const skillNodes = document.querySelectorAll('.skill-node');
            skillNodes.forEach((skill) => {
                const skillRect = skill.getBoundingClientRect();
                const skillX = skillRect.left + skillRect.width / 2;
                const skillY = skillRect.top + skillRect.height / 2;
                
                const line = skill.querySelector('.connector-line');
                const length = Math.sqrt(Math.pow(centerX - skillX, 2) + Math.pow(centerY - skillY, 2));
                const angle = Math.atan2(centerY - skillY, centerX - skillX) * 180 / Math.PI;
                
                line.style.width = `${length}px`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.left = `${skillRect.width / 2}px`;
                line.style.top = `${skillRect.height / 2}px`;
                
                // Set line color based on skill color
                const color = skill.getAttribute('data-color');
                line.style.background = color;
                line.style.boxShadow = `0 0 8px 2px ${color}`;
                
                // Add glowing dot at the end
                const dot = document.createElement('div');
                dot.className = 'connector-dot';
                dot.style.background = color;
                dot.style.boxShadow = `0 0 10px 2px ${color}`;
                line.appendChild(dot);
            });
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            drawConnectingLines();
            
            // Redraw lines on resize
            window.addEventListener('resize', () => {
                const lines = document.querySelectorAll('.connector-line');
                lines.forEach(line => line.style.width = '0');
                
                setTimeout(drawConnectingLines, 100);
            });
            
            // Add hover effects
            const skills = document.querySelectorAll('.skill-node');
            skills.forEach(skill => {
                skill.addEventListener('mouseenter', () => {
                    const color = skill.getAttribute('data-color');
                    const line = skill.querySelector('.connector-line');
                    const dot = line.querySelector('.connector-dot');
                    if (line) {
                        line.style.background = 'white';
                        line.style.boxShadow = '0 0 15px 3px white';
                        dot.style.background = 'white';
                        dot.style.boxShadow = '0 0 15px 3px white';
                    }
                });
                
                skill.addEventListener('mouseleave', () => {
                    const color = skill.getAttribute('data-color');
                    const line = skill.querySelector('.connector-line');
                    const dot = line.querySelector('.connector-dot');
                    if (line) {
                        line.style.background = color;
                        line.style.boxShadow = `0 0 8px 2px ${color}`;
                        dot.style.background = color;
                        dot.style.boxShadow = `0 0 10px 2px ${color}`;
                    }
                });
            });
        });