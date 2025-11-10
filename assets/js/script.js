// Aplicar tema imediatamente para evitar flash de conteúdo não estilizado
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplicar classe no html e body
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        if (document.body) {
            document.body.classList.add('dark-theme');
        } else {
            // Se body ainda não existe, esperar um pouco
            document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('dark-theme');
            });
        }
    }
})();

// Função para atualizar cores das partículas
function updateParticlesColor(color) {
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.draw();
    }
}

// Theme Toggle - Executar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verificar tema salvo no localStorage ou preferência do sistema
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Verificar preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', theme);
        // Atualizar cores das partículas se já estiverem inicializadas
        updateParticlesColor(theme === 'dark' ? '#5b7fff' : '#6c63ff');
    }

    // Aplicar tema ao carregar a página
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // Função para alternar tema
    function toggleTheme() {
        const isDark = body.classList.contains('dark-theme');
        if (isDark) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    }

    // Alternar tema - Botão do header
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Alternar tema - Botão mobile fixo
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Escutar mudanças na preferência do sistema (apenas se não houver preferência salva)
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Mensagem whatsapp
    const whatsappForm = document.getElementById("whatsapp-form");
    if (whatsappForm) {
        whatsappForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const assunto = document.getElementById("subject").value;
            const mensagem = document.getElementById("message").value;

            const numero = "5583999251636";
            const texto = `Olá, meu nome é *${nome}*.\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });
    }

    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    });

    // Menu Mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    const parallaxOnScroll = () => {
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', parallaxOnScroll);
    parallaxOnScroll();

    // Mouse Effect
    const cursor = document.querySelector('.highlight-effect');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Particles.js - Inicializar com cor baseada no tema atual
    const particlesColor = body.classList.contains('dark-theme') ? '#5b7fff' : '#6c63ff';
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particlesColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.6,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particlesColor,
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Adicione aqui a lógica de envio do formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }
});
