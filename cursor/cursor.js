document.addEventListener('DOMContentLoaded', () => {
            const colors = ['#3b82f6', '#00b4d8', '#0096c7', '#48cae4'];
            const trailCount = 12;
            let trails = [];
            let isTrailActive = true;
            
            // Create trail elements
            for (let i = 0; i < trailCount; i++) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.backgroundColor = colors[i % colors.length];
                trail.style.width = `${20 - i}px`;
                trail.style.height = `${20 - i}px`;
                trail.style.opacity = `${1 - (i * 0.07)}`;
                trail.style.transition = `transform 0.${i+1}s cubic-bezier(0.2, 0, 0, 1), opacity 0.${i+1}s ease`;
                document.body.appendChild(trail);
                trails.push(trail);
            }
            
            // Main cursor position
            let mouseX = 0;
            let mouseY = 0;
            
            // Previous positions for each trail element
            let prevPositions = Array(trailCount).fill({ x: 0, y: 0 });
            
            // Handle mouse movement
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                if (!isTrailActive) return;
                
                // Update trail positions with delay
                trails.forEach((trail, index) => {
                    setTimeout(() => {
                        const prevPos = prevPositions[index];
                        const newX = prevPos.x + (mouseX - prevPos.x) * 0.2;
                        const newY = prevPos.y + (mouseY - prevPos.y) * 0.2;
                        
                        trail.style.left = `${newX}px`;
                        trail.style.top = `${newY}px`;
                        
                        prevPositions[index] = { x: newX, y: newY };
                    }, index * 20);
                });
            });
            
            // Handle click effect
            document.addEventListener('click', (e) => {
                if (!isTrailActive) return;
                
                const clickEffect = document.createElement('div');
                clickEffect.className = 'cursor-trail click-effect';
                clickEffect.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                clickEffect.style.left = `${e.clientX}px`;
                clickEffect.style.top = `${e.clientY}px`;
                clickEffect.style.width = '20px';
                clickEffect.style.height = '20px';
                clickEffect.style.boxShadow = `0 0 10px #3b82f6, 0 0 20px #00b4d8`;
                clickEffect.style.filter = 'blur(0.5px)';
                clickEffect.style.background = 'linear-gradient(135deg, #3b82f6, #00b4d8)';
                document.body.appendChild(clickEffect);
                
                // Remove after animation completes
                setTimeout(() => {
                    clickEffect.remove();
                }, 300);
            });
            
            // Toggle trail effect
            document.getElementById('toggleBtn').addEventListener('click', () => {
                isTrailActive = !isTrailActive;
                trails.forEach(trail => {
                    trail.style.display = isTrailActive ? 'block' : 'none';
                });
            });
            
            // Hide trails when mouse leaves window
            document.addEventListener('mouseleave', () => {
                trails.forEach(trail => {
                    trail.style.opacity = '0';
                });
            });
            
            // Show trails when mouse enters window
            document.addEventListener('mouseenter', () => {
                if (isTrailActive) {
                    trails.forEach(trail => {
                        trail.style.opacity = '1';
                    });
                }
            });
        });
