// Resume Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initScrollAnimations();
    initSkillsEnhancements();
    initSmoothScrolling();
    initTypewriterEffect();
    initProgressBars();
    initThemeToggle();
    initPrintButton();
    initContactLinks();
    
    // Scroll-triggered animations
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for list items
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            section.classList.add('section');
            observer.observe(section);
            
            // Initially hide list items for animation
            const listItems = section.querySelectorAll('li');
            listItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.6s ease';
            });
        });
    }
    
    // Enhanced skills section
    function initSkillsEnhancements() {
        const skillsSection = document.querySelector('h2:contains("Skills")') || 
                            Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Skills'));
        
        if (!skillsSection) return;
        
        const skillsList = skillsSection.nextElementSibling?.nextElementSibling;
        if (!skillsList || skillsList.tagName !== 'UL') return;
        
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'skills-grid';
        
        const skills = Array.from(skillsList.querySelectorAll('li'));
        skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill-category';
            skillDiv.innerHTML = skill.innerHTML;
            
            // Add progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.width = `${Math.floor(Math.random() * 30) + 70}%`;
            progressBar.appendChild(progressFill);
            skillDiv.appendChild(progressBar);
            
            skillsContainer.appendChild(skillDiv);
        });
        
        skillsList.parentNode.replaceChild(skillsContainer, skillsList);
    }
    
    // Smooth scrolling for internal links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Typewriter effect for the name
    function initTypewriterEffect() {
        const nameElement = document.querySelector('h1');
        if (!nameElement) return;
        
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid white';
        nameElement.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 500);
        
        // Add blinking cursor animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                50% { border-color: transparent; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animated progress bars
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    // Theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌓';
        themeToggle.className = 'theme-toggle';
        themeToggle.title = 'Toggle dark/light theme';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Animate the toggle button
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        document.body.appendChild(themeToggle);
        
        // Add dark theme styles
        const darkThemeStyles = document.createElement('style');
        darkThemeStyles.textContent = `
            .dark-theme {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            }
            .dark-theme .container {
                background: #2c3e50 !important;
                color: #ecf0f1 !important;
            }
            .dark-theme .section h2,
            .dark-theme .section h3 {
                color: #ecf0f1 !important;
            }
            .dark-theme .skill-category {
                background: linear-gradient(135deg, #34495e, #2c3e50) !important;
                color: #ecf0f1 !important;
            }
        `;
        document.head.appendChild(darkThemeStyles);
    }
    
    // Print functionality
    function initPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '🖨️';
        printButton.className = 'print-button';
        printButton.title = 'Print resume';
        printButton.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        printButton.addEventListener('click', () => {
            // Temporarily show all sections for printing
            document.querySelectorAll('.section').forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'none';
            });
            
            window.print();
        });
        
        printButton.addEventListener('mouseenter', () => {
            printButton.style.transform = 'scale(1.1)';
        });
        
        printButton.addEventListener('mouseleave', () => {
            printButton.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(printButton);
    }
    
    // Enhanced certifications display
    function enhanceCertifications() {
        const certSection = Array.from(document.querySelectorAll('h2')).find(h => 
            h.textContent.includes('Certification'));
        
        if (!certSection) return;
        
        const certList = certSection.nextElementSibling?.nextElementSibling;
        if (!certList || certList.tagName !== 'UL') return;
        
        const certs = Array.from(certList.querySelectorAll('li'));
        certs.forEach(cert => {
            const text = cert.textContent;
            const badges = text.split(':')[1]?.split(',') || [];
            
            if (badges.length > 1) {
                cert.innerHTML = `<strong>${text.split(':')[0]}:</strong>`;
                badges.forEach(badge => {
                    const badgeElement = document.createElement('span');
                    badgeElement.className = 'cert-badge';
                    badgeElement.textContent = badge.trim();
                    cert.appendChild(badgeElement);
                });
            }
        });
    }
    
    enhanceCertifications();
    
    // Add particle background effect
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
        
        // Add floating animation
        const floatStyles = document.createElement('style');
        floatStyles.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
            }
        `;
        document.head.appendChild(floatStyles);
    }
    
    createParticles();
    
    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    initScrollProgress();
});

// Utility function for element selection
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Helper function to check if element contains text
HTMLElement.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

// Add some console easter egg
console.log(`
🎉 Welcome to Aravind's Resume! 🎉
This resume is powered by modern CSS and JavaScript.
Feel free to check out the interactive features:
- Smooth scrolling animations
- Theme toggle (🌓)
- Print functionality (🖨️)
- Particle background
- Progress indicators

Built with ❤️ and modern web technologies!
`);
    
    // Contact links functionality
    function initContactLinks() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click feedback
                this.style.transform = 'translateY(-1px) scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Ensure LinkedIn opens in new tab
                if (this.classList.contains('linkedin-link')) {
                    e.preventDefault();
                    const url = this.getAttribute('href');
                    
                    // Try to open in new tab
                    const newTab = window.open(url, '_blank', 'noopener,noreferrer');
                    
                    // Fallback if popup blocked
                    if (!newTab) {
                        window.location.href = url;
                    }
                }
            });
            
            // Add keyboard support
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
