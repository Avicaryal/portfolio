 document.querySelectorAll('.neon-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });
        
        // Initialize 3D Globe
        const globeContainer = document.getElementById('globe');
        const nepalLabel = document.getElementById('nepalLabel');
        
        // Nepal coordinates
        const nepalLat = 28.3949;
        const nepalLng = 84.1240;
        
        // Create globe
        const globe = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .showAtmosphere(true)
            .atmosphereColor('#00bfff')
            .atmosphereAltitude(0.25)
            .pointOfView({ lat: nepalLat, lng: nepalLng, altitude: 1.5 }, 2000)
            (globeContainer);
            
        // Add pulse to Nepal
        globe.pointsData([{ lat: nepalLat, lng: nepalLng }])
            .pointColor(() => '#00bfff')
            .pointAltitude(0.05)
            .pointRadius(0.25)
            .pointResolution(16)
            .pointsMerge(true)
            .pointLabel(() => '');
            
        // Rotate globe continuously
        (function rotateGlobe() {
            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 0.5;
            requestAnimationFrame(rotateGlobe);
        })();
        
        // Highlight Nepal on hover
        globe.onPointHover(point => {
            if (point) {
                nepalLabel.style.opacity = '1';
                
                // Position label near Nepal
                const { width, height } = globeContainer.getBoundingClientRect();
                const { x, y } = globe.getScreenCoords(nepalLat, nepalLng);
                
                nepalLabel.style.left = `${x * width}px`;
                nepalLabel.style.top = `${y * height}px`;
                
                // Zoom slightly towards Nepal
                globe.pointOfView({ lat: nepalLat, lng: nepalLng, altitude: 1.2 }, 1000);
            } else {
                nepalLabel.style.opacity = '0';
                globe.pointOfView({ lat: nepalLat, lng: nepalLng, altitude: 1.5 }, 1000);
            }
        });
        
        // Add connection lines (optional)
        const connections = [
            { startLat: nepalLat, startLng: nepalLng, endLat: 40.7128, endLng: -74.0060, color: 'rgba(0, 191, 255, 0.5)' }, // New York
            { startLat: nepalLat, startLng: nepalLng, endLat: 51.5074, endLng: -0.1278, color: 'rgba(138, 43, 226, 0.5)' }, // London
            { startLat: nepalLat, startLng: nepalLng, endLat: 35.6762, endLng: 139.6503, color: 'rgba(30, 58, 138, 0.5)' }  // Tokyo
        ];
        
        globe.arcsData(connections)
            .arcColor('color')
            .arcDashLength(0.25)
            .arcDashGap(1)
            .arcDashAnimateTime(2000)
            .arcsTransitionDuration(1000);
            
        // Responsive adjustments
        function handleResize() {
            const width = globeContainer.clientWidth;
            const height = globeContainer.clientHeight;
            globe.width(width).height(height);
        }
        
        window.addEventListener('resize', handleResize);
        handleResize();