const URL_API = 'http://localhost:3000/jogos';

async function fetchItems() {
    try {
        const resposta = await fetch(URL_API);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar jogos:", erro);
        return [];
    }
}

function createCard(item) {
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    
    divCard.innerHTML = `
        <img src="${item.imagem}" alt="${item.titulo}">
        <h3>${item.titulo}</h3>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        <p>${item.descricaoCurta}</p>
        <p class="preco">R$ ${item.preco.toFixed(2)}</p>
        <a href="details.html?id=${item.id}" class="btn-detalhes">Ver detalhes</a>
    `;
    return divCard;
}

function renderCards(items) {
    const container = document.getElementById('card-container');
    container.innerHTML = ''; 
    items.forEach(item => {
        const card = createCard(item);
        container.appendChild(card);
    });
}

async function init() {
    const jogos = await fetchItems();
    renderCards(jogos);
}

init();