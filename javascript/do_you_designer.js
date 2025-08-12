
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Letter animation for "DESIGNER"
        const letters = document.querySelectorAll('.designer-text span');
        letters.forEach((letter, index) => {
            letter.style.transitionDelay = `${index * 0.05}s`;
        });
        
        // Particle animation
        function createParticles() {
            const particleCount = 30;
            const container = document.body;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 5 + 1;
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                const opacity = Math.random() * 0.5 + 0.1;
                
                // Apply styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = opacity;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                
                // Add to DOM
                container.appendChild(particle);
            }
        }
        
        // Create floating animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(20px, 20px);
                }
                50% {
                    transform: translate(0, 40px);
                }
                75% {
                    transform: translate(-20px, 20px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Initialize
        window.addEventListener('load', () => {
            createParticles();
        });
        
        // Responsive adjustments
        function handleResize() {
            const services = document.querySelector('.services-container');
            if (window.innerWidth < 768) {
                services.classList.add('grid');
                services.classList.remove('flex');
            } else {
                services.classList.add('flex');
                services.classList.remove('grid');
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize();