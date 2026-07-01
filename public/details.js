// Ler o parâmetro id da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById('detalhe-container');

async function carregarDetalhes() {
    if (!id) {
        container.innerHTML = '<h2>Erro: Jogo não especificado na URL.</h2>';
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/jogos/${id}`);
        
        if (!resposta.ok) {
            container.innerHTML = '<h2>Erro: Jogo não encontrado no servidor.</h2>';
            return;
        }

        const jogo = await resposta.json();
        
        let tagsHTML = '';
        jogo.tags.forEach(tag => {
            tagsHTML += `<span class="tag">${tag}</span>`;
        });

        container.innerHTML = `
            <h1>${jogo.titulo}</h1>
            <div style="display: flex; gap: 20px;">
                <img src="${jogo.imagem}" alt="${jogo.titulo}" style="width: 300px; border-radius: 8px;">
                <div>
                    <h2 class="preco">R$ ${jogo.preco.toFixed(2)}</h2>
                    <p><strong>Categoria:</strong> ${jogo.categoria}</p>
                    <p>${jogo.descricaoCompleta}</p>
                    <div style="margin-top: 15px;">
                        <strong>Tags: </strong> ${tagsHTML}
                    </div>
                </div>
            </div>
        `;

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        container.innerHTML = '<h2>Erro de conexão com o servidor.</h2>';
    }
}

carregarDetalhes();