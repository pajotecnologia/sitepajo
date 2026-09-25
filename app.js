/**
 * PAJO TECNOLOGIA — APP JAVASCRIPT
 * Interactivity, System Tabs (PJZap, SGH, Ponto, IMOB, Lavanderia, Tree), Dynamic Showcase & WhatsApp Redirection
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSystemTabs();
    initLivePontoClock();
    initMobileDrawer();
    initAccordions();
    initCounters();
    initHashNavigation();
    initCopyrightYear();
    initBackToTop();
});

/* --------------------------------------------------------------------------
   1. SYSTEM TABS & DYNAMIC SHOWCASE (6 SYSTEMS)
   -------------------------------------------------------------------------- */
const PAJO_CONFIG = {
    whatsapp: '5587996540551',
    instagram: 'https://www.instagram.com/pajotecnologia'
};

const systemsData = {
    pjzap: { name: 'PJZap', url: 'https://pjzap.pajotech.com.br', previewUrl: 'https://pjzap.pajotech.com.br', badge: 'PJZAP', badgeIcon: 'fa-whatsapp', tag: 'Atendimento', title: 'PJZap', desc: 'Solução de atendimento pelo WhatsApp.', kpis: [] },
    sgh: { name: 'SGH', url: 'https://sgh.pajotech.com.br', previewUrl: 'https://sgh.pajotech.com.br', badge: 'SGH', badgeIcon: 'fa-hospital-user', tag: 'Saúde', title: 'SGH', desc: 'Sistema para gestão hospitalar e de clínicas.', kpis: [] },
    ponto: { name: 'EzPoint Web', url: 'https://ponto.pajotech.com.br', previewUrl: 'https://ponto.pajotech.com.br', badge: 'EZPOINT WEB', badgeIcon: 'fa-user-clock', tag: 'Controle de ponto', title: 'EzPoint Web', desc: 'Solução de controle de ponto com terminais FOCUS e EVO 40.', kpis: [] },
    imob: { name: 'IMOB', url: 'https://imob.pajotech.com.br', previewUrl: 'https://imob.pajotech.com.br', badge: 'IMOB', badgeIcon: 'fa-building-user', tag: 'Imobiliário', title: 'IMOB', desc: 'Solução para gestão de imóveis e locações.', kpis: [] },
    lavanderia: { name: 'SGL Lavanderia', url: 'https://sgl.pajotech.com.br', previewUrl: 'https://sgl.pajotech.com.br', badge: 'SGL', badgeIcon: 'fa-shirt', tag: 'Lavanderia', title: 'SGL Lavanderia', desc: 'Solução de gestão para lavanderias.', kpis: [] },
    tree: { name: 'Pajotech Tree', url: 'https://tree.pajotech.com.br', previewUrl: 'https://tree.pajotech.com.br', badge: 'PAJOTECH TREE', badgeIcon: 'fa-diagram-project', tag: 'Links digitais', title: 'Pajotech Tree', desc: 'Perfil digital e centralização de links.', kpis: [] }
};

function switchSystemTab(systemKey) {
    // 1. Update Tab Buttons
    const tabButtons = document.querySelectorAll('.system-tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-system') === systemKey) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    // 2. Update Tab Panes
    const tabPanes = document.querySelectorAll('.system-pane');
    tabPanes.forEach(pane => {
        if (pane.id === `pane-${systemKey}`) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });

    // 3. Sync Hero Window Preview
    updateHeroShowcase(systemKey);

    // 4. Update URL Hash
    if (history.pushState) {
        history.pushState(null, null, `#${systemKey}`);
    }
}

function selectSystemTab(systemKey) {
    switchSystemTab(systemKey);
    const sistemasSection = document.getElementById('sistemas');
    if (sistemasSection) {
        sistemasSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateHeroShowcase(systemKey) {
    const data = systemsData[systemKey];
    if (!data) return;

    const urlEl = document.getElementById('heroWindowUrl');
    const contentEl = document.getElementById('heroDisplayContent');

    if (urlEl) {
        urlEl.textContent = data.previewUrl;
    }

    const iconClass = data.badgeIcon.includes('whatsapp') ? 'fa-brands fa-whatsapp' : `fa-solid ${data.badgeIcon}`;

    if (contentEl) {
        contentEl.innerHTML = `
            <div class="showcase-preview-card ${systemKey}-active">
                <div class="preview-badge-row">
                    <span class="preview-badge ${systemKey === 'pjzap' ? 'text-whatsapp' : ''}"><i class="${iconClass}"></i> ${data.badge}</span>
                    <span class="preview-tag">${data.tag}</span>
                </div>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <div class="preview-mini-kpis">
                    ${data.kpis.map(kpi => `
                        <div class="kpi-box">
                            <small>${kpi.label}</small>
                            <strong>${kpi.val}</strong>
                        </div>
                    `).join('')}
                </div>
                <div class="preview-cta-row">
                    <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                        Acessar ${data.url.replace('https://', '')} <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <button class="btn btn-sm btn-outline-glow" onclick="selectSystemTab('${systemKey}')">
                        Ver Recursos Completos
                    </button>
                </div>
            </div>
        `;
    }
}

function initSystemTabs() {
    const currentHash = window.location.hash.replace('#', '');
    if (systemsData[currentHash]) {
        switchSystemTab(currentHash);
    }
}

/* --------------------------------------------------------------------------
   2. LIVE PONTO CLOCK SIMULATOR
   -------------------------------------------------------------------------- */
function initLivePontoClock() {
    const clockEl = document.getElementById('livePontoClock');
    if (!clockEl) return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   3. THEME TOGGLE (DARK / LIGHT)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('pajo_theme') || 'dark-theme';

    document.body.className = savedTheme;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('pajo_theme', 'light-theme');
            } else {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('pajo_theme', 'dark-theme');
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const closeBtn = document.getElementById('drawerClose');
    const drawer = document.getElementById('mobileDrawer');

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', () => {
            drawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && drawer) {
        closeBtn.addEventListener('click', closeDrawer);
    }
}

function closeDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------------------------------------
   5. ACCORDION COMPONENT
   -------------------------------------------------------------------------- */
function initAccordions() {
    document.querySelectorAll('.accordion-item').forEach(item => {
        const button = item.querySelector('.accordion-btn');
        if (button) button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    });
}

function toggleAccordion(buttonEl) {
    const item = buttonEl.closest('.accordion-item');
    const allItems = document.querySelectorAll('.accordion-item');
    const willOpen = !item.classList.contains('active');
    allItems.forEach(i => {
        const button = i.querySelector('.accordion-btn');
        const isCurrent = i === item;
        i.classList.toggle('active', isCurrent && willOpen);
        if (button) button.setAttribute('aria-expanded', isCurrent && willOpen ? 'true' : 'false');
    });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM & WHATSAPP REDIRECTION
   -------------------------------------------------------------------------- */
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const company = form.company.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const system = form.system.value;
    const message = form.message.value.trim();

    const submitBtn = document.getElementById('submitContactBtn');
    const feedback = document.getElementById('formFeedback');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    }

    // Prepare WhatsApp Message
    const textMsg = `*Novo Contato via Site PAJO Tecnologia*%0A%0A` +
        `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
        `🏢 *Empresa:* ${encodeURIComponent(company || 'Não informada')}%0A` +
        `📧 *E-mail:* ${encodeURIComponent(email)}%0A` +
        `📱 *Telefone/WhatsApp:* ${encodeURIComponent(phone)}%0A` +
        `💻 *Sistema de Interesse:* ${encodeURIComponent(system)}%0A` +
        `📝 *Mensagem:* ${encodeURIComponent(message || 'Gostaria de uma apresentação.')}`;

    setTimeout(() => {
        if (feedback) {
            feedback.className = 'form-feedback success';
            feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mensagem pronta! Redirecionando para o WhatsApp da PAJO Tecnologia...';
            feedback.style.display = 'block';
        }

        const whatsappUrl = `https://wa.me/${PAJO_CONFIG.whatsapp}?text=${textMsg}`;
        window.open(whatsappUrl, '_blank');

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem';
        }

        form.reset();
    }, 800);
}

/* --------------------------------------------------------------------------
   7. MODAL DEMO REQUEST
   -------------------------------------------------------------------------- */
function openDemoModal(systemName) {
    const modal = document.getElementById('demoModal');
    const titleEl = document.getElementById('modalTitle');
    const targetInput = document.getElementById('modalTargetSystem');

    if (titleEl) {
        titleEl.textContent = `Solicitar Demonstração: ${systemName}`;
    }
    if (targetInput) {
        targetInput.value = systemName;
    }
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleModalSubmit(event) {
    event.preventDefault();
    const system = document.getElementById('modalTargetSystem').value;
    const name = document.getElementById('modalName').value.trim();
    const phone = document.getElementById('modalPhone').value.trim();
    const company = document.getElementById('modalCompany').value.trim();

    const textMsg = `*Solicitação de Demonstração - PAJO Tecnologia*%0A%0A` +
        `💻 *Sistema:* ${encodeURIComponent(system)}%0A` +
        `👤 *Nome:* ${encodeURIComponent(name)}%0A` +
        `🏢 *Empresa:* ${encodeURIComponent(company)}%0A` +
        `📱 *WhatsApp:* ${encodeURIComponent(phone)}`;

    const whatsappUrl = `https://wa.me/${PAJO_CONFIG.whatsapp}?text=${textMsg}`;
    window.open(whatsappUrl, '_blank');

    closeDemoModal();
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('demoModal');
    if (e.target === modal) {
        closeDemoModal();
    }
});

/* --------------------------------------------------------------------------
   8. ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const suffix = counter.textContent.includes('%') ? '%' : '+';
            let current = 0;
            const increment = target / 30;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current) + suffix;
                }
            }, 40);
        });
    }

    window.addEventListener('scroll', () => {
        const statsEl = document.querySelector('.hero-stats');
        if (!statsEl) return;
        const rect = statsEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !hasAnimated) {
            hasAnimated = true;
            runCounters();
        }
    });
}

/* --------------------------------------------------------------------------
   9. HASH & ACTIVE NAVIGATION
   -------------------------------------------------------------------------- */
function initHashNavigation() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (systemsData[hash]) {
            switchSystemTab(hash);
        }
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    const updateBackToTop = () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 420);
    };

    updateBackToTop();
    window.addEventListener('scroll', updateBackToTop, { passive: true });
}

function initCopyrightYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
