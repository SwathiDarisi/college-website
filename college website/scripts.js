// Debounce scroll event
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Improved scroll handler
const handleScroll = debounce(() => {
    const header = document.querySelector('.header');
    const body = document.body;
    if (window.scrollY > 0) {
        header.classList.add('sticky');
        body.classList.add('sticky-padding');
    } else {
        header.classList.remove('sticky');
        body.classList.remove('sticky-padding');
    }
}, 16);

window.addEventListener('scroll', handleScroll);

// Improved mobile menu
const mobileMenu = {
    button: document.querySelector('.mobile-menu-btn'),
    nav: document.querySelector('.nav-menu'),
    isOpen: false,
    
    init() {
        this.button.addEventListener('click', () => this.toggle());
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.button.contains(e.target)) {
                this.close();
            }
        });
    },
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('active');
        this.button.setAttribute('aria-expanded', this.isOpen);
    },
    
    close() {
        this.isOpen = false;
        this.nav.classList.remove('active');
        this.button.setAttribute('aria-expanded', false);
    }
};

mobileMenu.init();
