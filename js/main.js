/**
 * Webin — Main JavaScript
 * Navegação, FAQ, Formulário, Animações mínimas
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQ();
    initContactForm();
    initSmoothScroll();
});

/* ---------- NAVEGAÇÃO ---------- */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!header) return;
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active');
            
            // Atualizar cor das linhas
            const lines = navToggle.querySelectorAll('.nav-toggle-line');
            lines.forEach(line => {
                line.style.backgroundColor = expanded ? '' : 'var(--color-text)';
            });
        });
        
        // Fechar menu ao clicar num link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/* ---------- FAQ ---------- */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const expanded = question.getAttribute('aria-expanded') === 'true';
            
            // Fechar todas as outras
            document.querySelectorAll('.faq-question').forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.setAttribute('hidden', '');
            });
            
            // Abrir a atual se estava fechada
            if (!expanded) {
                question.setAttribute('aria-expanded', 'true');
                answer.removeAttribute('hidden');
            }
        });
        
        // Acessibilidade: teclado
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

/* ---------- FORMULÁRIO DE CONTACTO ---------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Limpar mensagens anteriores
        const messageDiv = document.getElementById('formMessage');
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
        
        // Limpar erros visuais
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Validação
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Validação de email
        const emailField = document.getElementById('email');
        if (emailField && emailField.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value.trim())) {
                emailField.classList.add('error');
                isValid = false;
            }
        }
        
        if (!isValid) {
            messageDiv.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
            messageDiv.className = 'form-message error-message';
            return;
        }
        
        // Simulação de envio (substituir por integração real com PHP/SMTP)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Aqui seria a chamada fetch para o backend
        // fetch('enviar.php', { method: 'POST', body: formData })
        
        // Feedback de sucesso
        messageDiv.textContent = 'Obrigado! Recebemos o seu pedido. Entraremos em contacto em menos de 24 horas úteis.';
        messageDiv.className = 'form-message success';
        form.reset();
        
        // Log para debug (remover em produção)
        console.log('Dados do formulário:', data);
    });
}

/* ---------- SCROLL SUAVE ---------- */
function initSmoothScroll() {
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading nativo para imagens
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.src;
        });
    }
}