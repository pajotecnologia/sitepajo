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
});

/* --------------------------------------------------------------------------
   1. SYSTEM TABS & DYNAMIC SHOWCASE (6 SYSTEMS)
   -------------------------------------------------------------------------- */
const systemsData = {
    pjzap: {
        name: 'PJZap Multiatendimento',
        url: 'https://pjzap.pajotech.com.br',
        previewUrl: 'https://pjzap.pajotech.com.br/atendimentos',
        badge: 'PJZAP MULTIATENDIMENTO',
        badgeIcon: 'fa-whatsapp',
        tag: 'WhatsApp Omnichannel',
        title: 'Múltiplos Atendentes em 1 Único WhatsApp',
        desc: 'Centralize filas por departamentos (Vendas, Suporte, Financeiro), chatbots automáticos e relatórios de SLA.',
        kpis: [
            { label: 'Atendimentos/Dia', val: '1.840+' },
            { label: 'Tempo Médio Espera', val: '45 seg' },
            { label: 'Satisfação CSAT', val: '98.6%' }
        ]
    },
    sgh: {
        name: 'SGH Hospitalar',
        url: 'https://sgh.pajotech.com.br',
        previewUrl: 'https://sgh.pajotech.com.br/dashboard',
        badge: 'SGH HOSPITALAR',
        badgeIcon: 'fa-heart-pulse',
        tag: 'Versão Cloud 2026',
        title: 'Gestão Médica, Triagem Manchester & PEP',
        desc: 'Prontuário eletrônico integrado, recepção, agendamento ágil e faturamento TISS completo.',
        kpis: [
            { label: 'Pacientes Atendidos', val: '14.850+' },
            { label: 'Tempo Médio Triagem', val: '3 min' },
            { label: 'Ocupação Leitos', val: '87%' }
        ]
    },
    ponto: {
        name: 'Ponto Eletrônico',
        url: 'https://ponto.pajotech.com.br',
        previewUrl: 'https://ponto.pajotech.com.br/espelho-ponto',
        badge: 'PONTO PORTARIA 671',
        badgeIcon: 'fa-user-clock',
        tag: 'Homologado MTE',
        title: 'Controle de Ponto Web, Mobile & Biometria',
        desc: 'Espelho de ponto automatizado, cerca virtual com GPS, banco de horas e exportação para folha.',
        kpis: [
            { label: 'Batidas Hoje', val: '9.420' },
            { label: 'Precisão GPS', val: '100%' },
            { label: 'Economia Folha', val: '40%' }
        ]
    },
    imob: {
        name: 'IMOB Imobiliária',
        url: 'https://imob.pajotech.com.br',
        previewUrl: 'https://imob.pajotech.com.br/carteira-imoveis',
        badge: 'IMOB GESTÃO',
        badgeIcon: 'fa-building-user',
        tag: 'Vendas & Locações',
        title: 'Contratos Inteligentes & CRM de Corretores',
        desc: 'Gestão completa de locações, reajustes automáticos, repasses a proprietários e portal do locatário.',
        kpis: [
            { label: 'Imóveis Ativos', val: '348 un.' },
            { label: 'Ocupação', val: '94.2%' },
            { label: 'Aluguéis Mês', val: 'R$ 184k' }
        ]
    },
    lavanderia: {
        name: 'Lavanderia Pro',
        url: 'https://lavanderia.pajotech.com.br',
        previewUrl: 'https://lavanderia.pajotech.com.br/ordens-servico',
        badge: 'LAVANDERIA GESTÃO',
        badgeIcon: 'fa-shirt',
        tag: 'Rastreio por Barcode',
        title: 'Controle de OS por Peça, Peso & WhatsApp',
        desc: 'Etiquetagem com código de barras, controle de etapas de lavagem e envio de aviso de retirada.',
        kpis: [
            { label: 'OS em Aberto', val: '47' },
            { label: 'Tempo Lavagem', val: '45 min' },
            { label: 'Alertas Whats', val: '100%' }
        ]
    },
    tree: {
        name: 'Pajotech Tree',
        url: 'https://tree.pajotech.com.br',
        previewUrl: 'https://tree.pajotech.com.br/@pajo',
        badge: 'PAJOTECH TREE',
        badgeIcon: 'fa-diagram-project',
        tag: 'Hub Corporativo',
        title: 'Central Unificada de Links & Atendimento',
        desc: 'Portal direto com canais de suporte, acesso a plataformas e direcionamento para clientes.',
        kpis: [
            { label: 'Links Ativos', val: '12' },
            { label: 'Cliques Mensais', val: '28.5k' },
            { label: 'Uptime', val: '99.9%' }
        ]
    }
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
function initAccordions() {}

function toggleAccordion(buttonEl) {
    const item = buttonEl.closest('.accordion-item');
    const allItems = document.querySelectorAll('.accordion-item');

    allItems.forEach(i => {
        if (i === item) {
            i.classList.toggle('active');
        } else {
            i.classList.remove('active');
        }
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

        const whatsappUrl = `https://wa.me/5587999999999?text=${textMsg}`;
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

    const whatsappUrl = `https://wa.me/5587999999999?text=${textMsg}`;
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

function initCopyrightYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
