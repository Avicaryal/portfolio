
                        // Count-up animation function
                        function animateValue(id, start, end, duration) {
                            const obj = document.getElementById(id);
                            let startTimestamp = null;
                            const step = (timestamp) => {
                                if (!startTimestamp) startTimestamp = timestamp;
                                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                obj.innerHTML = Math.floor(progress * (end - start) + start) + (progress === 1 ? '+' : '');
                                if (progress < 1) {
                                    window.requestAnimationFrame(step);
                                }
                            };
                            window.requestAnimationFrame(step);
                        }
                        // Initialize animations when counters are in view
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    const target = entry.target.getAttribute('data-target');
                                    const id = entry.target.querySelector('.futuristic-text').id;
                                    animateValue(id, 0, parseInt(target), 2000);
                                    observer.unobserve(entry.target);
                                }
                            });
                        }, {threshold: 0.5});

                        // Observe all stat buttons
                        document.querySelectorAll('.stat-button').forEach(button => {
                            observer.observe(button);
                        });
        // Create background particles
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 8;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 200 + 100;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const color = i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500';
                const animationDuration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                particle.classList.add(color);
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animation = `float ${animationDuration}s ease-in-out ${delay}s infinite`;
                
                container.appendChild(particle);
            }
        }
        
        // Count-up animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-button');
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const countElement = counter.querySelector('.futuristic-text');
                let count = 10;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        countElement.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        countElement.textContent = target + '+';
                    }
                };
                
                // GSAP scroll trigger
                gsap.from(counter, {
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    onComplete: updateCount
                });
            });
        }
        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Register GSAP ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate the entire section on scroll
            gsap.from(".glass-card", {
                scrollTrigger: {
                    trigger: ".glass-card",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            
            // Initialize counter animations
            animateCounters();
            
            // Add hover effects to glass buttons
            const buttons = document.querySelectorAll('.glass-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.boxShadow = `0 0 20px rgba(138, 43, 226, 0.5)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.boxShadow = '';
                });
            });
        });