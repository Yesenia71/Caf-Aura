 // Initialize Lucide icons
        lucide.createIcons();

        // --- JavaScript for Interactivity ---

        // 1. Hero Slogan Dynamic Text
        const heroSlogan = document.getElementById('heroSlogan');
        const slogans = [
            'Tu Momento, Tu Café.',
            'Despierta tus Sentidos.',
            'Calidad en Cada Gota.',
            'El Aroma de la Felicidad.'
        ];
        let currentSloganIndex = 0;

        function changeSlogan() {
            heroSlogan.classList.remove('animate-slide-in-up'); // Reset animation
            void heroSlogan.offsetWidth; // Trigger reflow
            heroSlogan.classList.add('animate-slide-in-up'); // Re-add animation

            currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
            heroSlogan.textContent = slogans[currentSloganIndex];
        }
        setInterval(changeSlogan, 5000); // Change slogan every 5 seconds

        // 2. Smooth Scrolling for Navigation Links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
                if (mobileMenuOverlay && !mobileMenuOverlay.classList.contains('hidden')) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            });
        });

        // 3. Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');

        if (mobileMenuBtn && mobileMenuOverlay && closeMobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('hidden');
            });

            closeMobileMenuBtn.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('hidden');
            });

            // Close when clicking outside the menu content
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('hidden');
                }
            });
        }


        // 4. About Us Image Carousel
        const aboutImage = document.getElementById('aboutImage');
        const prevImageBtn = document.getElementById('prevImage');
        const nextImageBtn = document.getElementById('nextImage');
        const images = [
            'https://placehold.co/600x400/D2B48C/FFFFFF?text=Interior+de+Cafetería+1',
            'https://placehold.co/600x400/8B4513/FFFFFF?text=Barista+Preparando+Café',
            'https://placehold.co/600x400/A0522D/FFFFFF?text=Zona+de+Asientos+Acogedora',
            'https://placehold.co/600x400/CD853F/FFFFFF?text=Repostería+Fresca'
        ];
        let currentImageIndex = 0;

        function updateImage() {
            aboutImage.style.opacity = 0; // Fade out
            setTimeout(() => {
                aboutImage.src = images[currentImageIndex];
                aboutImage.style.opacity = 1; // Fade in
            }, 300); // Match with CSS transition duration
        }

        if (prevImageBtn && nextImageBtn) {
            prevImageBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateImage();
            });

            nextImageBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateImage();
            });
        }


        // 5. Contact Form Submission (using custom modal)
        const contactForm = document.getElementById('contactForm');
        const customModal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault(); // Prevent default form submission

                // Basic validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (!name || !email || !message) {
                    showModal('Error', 'Por favor, rellena todos los campos.');
                    return;
                }

                // Simulate form submission
                console.log('Formulario enviado:', { name, email, message });

                // Show success message
                showModal('¡Mensaje Enviado!', 'Gracias por contactarnos. Te responderemos pronto.');

                // Clear the form
                contactForm.reset();
            });
        }

        // Function to show the custom modal
        function showModal(title, message) {
            if (modalTitle && modalMessage && customModal) {
                modalTitle.textContent = title;
                modalMessage.textContent = message;
                customModal.classList.add('show');
            }
        }

        // Function to hide the custom modal
        function hideModal() {
            if (customModal) {
                customModal.classList.remove('show');
            }
        }

        // Event listener for modal close button
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', hideModal);
        }

        // Close modal if clicking outside the content
        if (customModal) {
            customModal.addEventListener('click', (e) => {
                if (e.target === customModal) {
                    hideModal();
                }
            });
        }

        // 6. Intersection Observer for animations on scroll
        const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in-up');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated'); // Add a class to trigger animation
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Initial check for elements already in viewport on load
        window.addEventListener('load', () => {
            animateElements.forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('animated');
                }
            });
        });
