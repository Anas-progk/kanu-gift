document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const backBtn = document.getElementById('backBtn');
    const buttons = document.getElementById('buttons');
    const heartbreak = document.getElementById('heartbreak');
    const coupleGif = document.getElementById('coupleGif');
    let clickCount = 0;
    const noBtnTexts = ['No', 'Are you sure?', 'Really sure?', 'Think again!', 'Last chance!', 'Definitely not?', 'You might regret this!', 'Give it another thought!', 'Are you absolutely certain?', 'This could be a mistake!', 'Have a heart!', 'Please?', 'Just click Yes!'];

    // Handle Yes button click
    yesBtn.addEventListener('click', () => {
        if (clickCount === 0) {
            // Hide the question and buttons, show the GIF
            document.querySelector('.question').classList.add('hidden');
            buttons.classList.add('hidden');
            coupleGif.classList.remove('hidden');
            // Use local GIF
            document.querySelector('#coupleGif img').src = 'cute-couple.gif';
            
            // Add confetti effect
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            clickCount++;
        } else {
            // If clicked again, just show the GIF
            document.querySelector('.question').classList.add('hidden');
            buttons.classList.add('hidden');
            coupleGif.classList.remove('hidden');
        }
    });

    // Handle No button hover
    noBtn.addEventListener('mouseover', () => {
        // Move the No button to a random position
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();
        
        const maxX = containerRect.width - buttonRect.width - 20;
        const maxY = containerRect.height - buttonRect.height - 20;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Make the button smaller
        const currentSize = parseFloat(getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${currentSize * 0.8}px`;
    });

    // Handle No button click
    noBtn.addEventListener('click', () => {
        buttons.classList.add('hidden');
        heartbreak.classList.remove('hidden');
    });

    // Handle Back button click from heartbreak
    backBtn.addEventListener('click', () => {
        heartbreak.classList.add('hidden');
        document.querySelector('.question').classList.remove('hidden');
        buttons.classList.remove('hidden');
        
        // Reset button size and text
        noBtn.style.fontSize = '';
        noBtn.textContent = 'yea';
        clickCount = 0;
    });

    // Handle Back button click from GIF view
    document.getElementById('backFromGif').addEventListener('click', () => {
        coupleGif.classList.add('hidden');
        document.querySelector('.question').classList.remove('hidden');
        buttons.classList.remove('hidden');
        
        // Reset button size and text
        noBtn.style.fontSize = '';
        noBtn.textContent = 'yea';
        clickCount = 0;
    });
});

// Simple confetti effect
function confetti({ particleCount = 50, spread = 70, origin = { y: 0 } } = {}) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const particles = [];
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.5,
            size: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * spread - spread / 2,
            speedY: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            
            ctx.restore();
            
            p.x += p.speedX * 0.1;
            p.y += p.speedY * 0.1;
            p.rotation += p.rotationSpeed;
            
            if (p.y > height) {
                p.y = -p.size;
                p.x = Math.random() * width;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Remove canvas after animation
    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 3000);
}
// Debug audio loading
const bgMusic = document.getElementById('backgroundMusic');

// Log audio loading events
bgMusic.addEventListener('error', function() {
    console.error('Audio error:', bgMusic.error);
    console.log('Audio source:', bgMusic.currentSrc);
    console.log('Network state:', bgMusic.networkState);
    console.log('Ready state:', bgMusic.readyState);
});

// Try to load the audio manually
console.log('Attempting to load audio...');
bgMusic.load();
