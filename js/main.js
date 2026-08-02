document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = document.querySelector('.hamburger i');
            if(icon && icon.classList.contains('fa-times')){
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // 2. Modo Claro / Escuro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    if (localStorage.getItem('tema-barbearia') === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('tema-barbearia', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('tema-barbearia', 'dark');
        }
    });

    // 3. Efeito Scroll no Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // 4. Sistema de Animação ao rolar a página
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementosAnimados = document.querySelectorAll('.anime-scroll');
    elementosAnimados.forEach(el => { observer.observe(el); });

    // 5. Popup (Lightbox) da Galeria
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("img-popup");
    const closeModal = document.querySelector(".close-modal");
    const galeriaImgs = document.querySelectorAll(".galeria-img");

    // Abrir o popup ao clicar na foto
    galeriaImgs.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            // Trava o scroll da página enquanto o popup está aberto
            document.body.style.overflow = "hidden";
        });
    });

    // Fechar o popup ao clicar no X
    if(closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // Fechar o popup ao clicar fora da imagem
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});