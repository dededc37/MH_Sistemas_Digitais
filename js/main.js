// Inicialização do AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Efeito de Paralaxe
document.addEventListener('DOMContentLoaded', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Animação dos números na seção de estatísticas
const stats = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            animateValue(target, 0, value, 2000);
            observer.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => observer.observe(stat));

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Formulário de Contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        // Por exemplo, usando fetch para enviar para um servidor
        
        // Feedback visual
        const submitButton = this.querySelector('.submit-button');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular envio (remover em produção)
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            this.reset();
            
            setTimeout(() => {
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Menu Mobile (para implementar posteriormente)
const menuButton = document.createElement('button');
menuButton.classList.add('menu-toggle');
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
}); 