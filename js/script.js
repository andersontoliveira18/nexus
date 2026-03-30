/* ==========================================================================
   CONFIGURAÇÃO GERAL (ESPERA O DOM CARREGAR)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MENU MOBILE (HAMBÚRGUER) --- */
    const mobileMenu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        // Abre e fecha o menu ao clicar no hambúrguer
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active'); // Para animação das barras
        });

        // Fecha o menu automaticamente ao clicar em qualquer link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }

    /* --- 2. CHATBOT (ABRIR/FECHAR) --- */
    const chatWidget = document.getElementById('chat-widget');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');

    if (openChatBtn && chatWidget) {
        openChatBtn.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
        });
    }

    if (closeChatBtn && chatWidget) {
        closeChatBtn.addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });
    }

    /* --- 3. FORMULÁRIOS (VALIDAÇÃO) --- */
    const forms = [document.getElementById('contact-form'), document.getElementById('contact-form-page')];

    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = form.querySelector('input[type="text"]')?.value || "Cliente";
                alert(`Obrigado, ${name}! Recebemos sua mensagem e entraremos em contato em breve.`);
                form.reset();
            });
        }
    });

    /* --- 4. MODAL DE CHECKOUT --- */
    const modal = document.getElementById("checkout-modal");
    const closeModal = document.querySelector(".close-modal");

    if (closeModal && modal) {
        closeModal.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        };
    }
});

/* ==========================================================================
   FUNÇÕES GLOBAIS (PODEM FICAR FORA DO DOM CONTENT LOADED)
   ========================================================================== */

/* --- 5. LÓGICA DE RESPOSTAS DO BOT --- */
function botResponse(option) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;

    let userText = "";
    let botText = "";

    if (option === 'impostos') {
        userText = "Dúvidas sobre Impostos";
        botText = "Trabalhamos com Planejamento Tributário para reduzir seus custos legalmente. Quer uma análise gratuita?";
    } else if (option === 'cursos') {
        userText = "Preços de Cursos";
        botText = "Nossos cursos começam em R$ 99,90. Você pode ver todos na página de 'Produtos'!";
    } else if (option === 'atendente') {
        userText = "Falar com Atendente";
        botText = "Entendido! Estou te conectando ao nosso WhatsApp...";
        setTimeout(() => window.open('https://wa.me/seunumeroaqui', '_blank'), 2000);
    }

    // Adiciona msg do usuário
    addMessage(userText, 'user');
    
    // Adiciona msg do bot com atraso para parecer real
    setTimeout(() => addMessage(botText, 'bot'), 800);
}

function addMessage(text, sender) {
    const chatBody = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

/* --- 6. FILTRO DE PRODUTOS --- */
function filterSelection(category) {
    const items = document.getElementsByClassName("filter-item");
    const btns = document.getElementsByClassName("filter-btn");

    for (let btn of btns) {
        btn.classList.remove("active");
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'Todos')) {
            btn.classList.add("active");
        }
    }

    for (let item of items) {
        if (category === "all" || item.classList.contains(category)) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    }
}

/* --- 7. ABRIR MODAL DE CHECKOUT --- */
function openCheckout(productName) {
    const modal = document.getElementById("checkout-modal");
    const modalText = document.getElementById("product-name-modal");
    
    if (modal && modalText) {
        modalText.innerText = "Curso: " + productName;
        modal.style.display = "flex";
    }
}