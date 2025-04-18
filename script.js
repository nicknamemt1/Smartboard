// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const downloadBtn = document.getElementById('download-btn');
    
    lightboxImg.src = img.src;
    downloadBtn.href = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    // Prevent event from bubbling up to the lightbox div
    if (event) {
        event.stopPropagation();
    }
    
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Add print button functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Project Details';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: background-color 0.3s ease;
    `;
    printButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1976D2';
    });
    printButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
    });
    printButton.addEventListener('click', function() {
        window.print();
    });
    document.body.appendChild(printButton);

    // Add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        display: none;
        transition: background-color 0.3s ease;
    `;
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#1976D2';
    });
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--primary-color)';
    });
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Add responsive table functionality
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.style.overflowX = 'auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // Add section navigation
    const nav = document.createElement('nav');
    nav.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        display: none;
    `;
    
    const sectionsList = document.createElement('ul');
    sectionsList.style.listStyle = 'none';
    sectionsList.style.padding = '0';
    sectionsList.style.margin = '0';
    
    document.querySelectorAll('h2').forEach((heading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#section${index}`;
        a.textContent = heading.textContent;
        a.style.display = 'block';
        a.style.padding = '5px 0';
        a.style.color = 'var(--primary-color)';
        a.style.textDecoration = 'none';
        a.style.transition = 'color 0.3s ease';
        
        a.addEventListener('mouseenter', function() {
            this.style.color = '#1976D2';
        });
        a.addEventListener('mouseleave', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        li.appendChild(a);
        sectionsList.appendChild(li);
        heading.id = `section${index}`;
    });
    
    nav.appendChild(sectionsList);
    document.body.appendChild(nav);

    // Show/hide navigation based on screen size
    function updateNavVisibility() {
        if (window.innerWidth > 1024) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    }

    window.addEventListener('resize', updateNavVisibility);
    updateNavVisibility();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default and handle smooth scroll for internal links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu after clicking
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}); 