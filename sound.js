
        function createClickSound() {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioCtx.currentTime;
            
            // Main oscillator (deep, rich tone)
            const osc = audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = 120; // Deep base frequency
            
            // High frequency oscillator for crispness
            const highOsc = audioCtx.createOscillator();
            highOsc.type = 'triangle';
            highOsc.frequency.value = 1800;
            
            // Create gain nodes for envelope control
            const gainNode = audioCtx.createGain();
            const highGain = audioCtx.createGain();
            
            // Configure main oscillator envelope
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.5, now + 0.002); // Quick attack
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12); // Smooth decay
            
            // Configure high frequency oscillator envelope
            highGain.gain.setValueAtTime(0, now);
            highGain.gain.linearRampToValueAtTime(0.3, now + 0.001); // Very quick attack
            highGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08); // Fast decay
            
            // Connect nodes
            osc.connect(gainNode);
            highOsc.connect(highGain);
            gainNode.connect(audioCtx.destination);
            highGain.connect(audioCtx.destination);
            
            // Start oscillators
            osc.start(now);
            highOsc.start(now);
            
            // Stop oscillators after sound completes
            osc.stop(now + 0.15);
            highOsc.stop(now + 0.1);
        }

        // Example usage:
        document.addEventListener('click', createClickSound);