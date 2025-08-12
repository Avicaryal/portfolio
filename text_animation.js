  document.addEventListener("DOMContentLoaded", () => {
            const roles = ["Graphics Designer", "Front-end Developer", "UI Designer"];
            const typingElement = document.getElementById("typing");
            let roleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeEffect() {
                const currentRole = roles[roleIndex];

                if (isDeleting) {
                    typingElement.textContent = currentRole.substring(0, charIndex--);
                } else {
                    typingElement.textContent = currentRole.substring(0, charIndex++);
                }

                if (!isDeleting && charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1000); // pause before deleting
                    return;
                } 
                else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }

                setTimeout(typeEffect, isDeleting ? 100 : 150);
            }

            typeEffect();
        });