
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Mobile menu toggle
        function toggleMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }

        // Form submission (placeholder)
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! (Demo)');
        });
        
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}
playButton.addEventListener('click', () => {
  // Show the loading spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'flex';

  // Create the iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'https://your-game-url.com/index.html'; // Replace with your game URL
  iframe.width = '100%';
  iframe.height = '600px';
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;

  // Hide the spinner and show the game once it's loaded
  iframe.onload = () => {
    loadingSpinner.style.display = 'none';
  };

  // Clear any existing content in the container
  gameContainer.innerHTML = '';

  // Append the iframe to the container
  gameContainer.appendChild(iframe);

  // Optionally, hide the "Play" button after clicking
  playButton.style.display = 'none';
});