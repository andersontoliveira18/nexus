// Abrir/Fechar Chat
const chatWidget = document.getElementById('chat-widget');
const openBtn = document.getElementById('open-chat');
const closeBtn = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');

openBtn.onclick = () => chatWidget.style.display = 'flex';
closeBtn.onclick = () => chatWidget.style.display = 'none';

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botResponse(option) {
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
        botText = "Entendido! Estou te conectando ao nosso WhatsApp... [Link Simulado]";
        setTimeout(() => window.open('https://wa.me/seunumeroaqui', '_blank'), 2000);
    }

    addMessage(userText, 'user');
    setTimeout(() => addMessage(botText, 'bot'), 800);
}

// Validação do Formulário de Contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede a página de recarregar

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name === "" || email === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
    } else {
        alert(`Obrigado, ${name}! Recebemos sua mensagem e entraremos em contato em breve.`);
        contactForm.reset(); // Limpa o formulário após o envio
    }
});

// Filtro de Produtos
function filterSelection(category) {
    const items = document.getElementsByClassName("filter-item");
    const btns = document.getElementsByClassName("filter-btn");

    // Atualiza botões ativos
    for (let btn of btns) {
        btn.classList.remove("active");
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'Todos')) {
            btn.classList.add("active");
        }
    }

    // Filtra os cards
    for (let item of items) {
        if (category === "all" || item.classList.contains(category)) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    }
}

// Modal de Checkout
const modal = document.getElementById("checkout-modal");
const closeModal = document.querySelector(".close-modal");

function openCheckout(productName) {
    document.getElementById("product-name-modal").innerText = "Curso: " + productName;
    modal.style.display = "flex";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

const pageForm = document.getElementById('contact-form-page');
if (pageForm) {
    pageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Mensagem enviada com sucesso! Em breve um consultor da Nexus entrará em contato.");
        pageForm.reset();
    });
}