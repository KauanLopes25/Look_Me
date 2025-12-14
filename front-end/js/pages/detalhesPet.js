/* *********************************************************************
* Objetivo: Lógica de detalhes do pet 
* Data: 14/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { lerAnimal } from '../services/animalService.js';
import { adicionarFavorito, removerFavorito, verificarSeEhFavorito } from '../services/favoritesService.js';
import { criarPedido } from '../services/orderService.js'; // Certifique-se de importar o service de pedido

export const DetalhesPet = {
    title: "DETALHES DO PET",
    template: `
        <div class="detalhes-pet-container">
            <div id="loading-message" style="text-align: center; padding: 50px;">
                <h2>Carregando informações do pet...</h2>
                <p id="msg-erro" style="display: none;"></p>
            </div>

            <div id="pet-content" style="display: none;">
                <div class="pet-card">
                    <div class="pet-header">
                        <div class="pet-image">
                            <img id="detalhe-img" src="./img/pet-teste.jpg" alt="Foto do Pet">
                        </div>
                        <div class="pet-info">
                            <h1 class="pet-nome" id="detalhe-nome">...</h1>
                            <div class="pet-detalhes">
                                <p><strong>Espécie:</strong> <span id="detalhe-especie">...</span></p>
                                <p><strong>Raça:</strong> <span id="detalhe-raca">...</span></p>
                                <p><strong>Porte:</strong> <span id="detalhe-porte">...</span></p>
                                <p><strong>Idade:</strong> <span id="detalhe-idade">...</span></p>
                                <p><strong>Sexo:</strong> <span id="detalhe-sexo">...</span></p>
                                <p><strong>Status:</strong> <span id="detalhe-status">...</span></p>
                            </div>
                            <button id="btn-adotar" class="botao-adote">QUERO ADOTAR</button>
                        </div>
                        
                        <button class="botao-favorito" id="btn-favoritar" disabled>
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>

                 <div class="info-card descricao-card">
                    <h2>Descrição</h2>
                    <p id="detalhe-descricao">...</p>
                </div>
                
                <div class="bottom-cards">
                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Temperamento</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p id="detalhe-temperamento">...</p>
                        </div>
                    </div>
                    
                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Informações Veterinárias</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p id="detalhe-vet">...</p>
                        </div>
                    </div>

                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Adaptabilidade</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p id="detalhe-adaptabilidade">...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    init: async () => {
        // LEITURA DA URL 
        const hashString = window.location.hash; 
        const paramsPart = hashString.split('?')[1]; 
        const params = new URLSearchParams(paramsPart);
        const id = params.get('id');

        if (!id) {
            alert("Erro: ID não encontrado.");
            window.location.hash = "/";
            return;
        }

        try {
            // BUSCA DADOS DO ANIMAL 
            const pet = await lerAnimal(id);
            if (!pet) throw new Error("Pet não encontrado na API.");

            // Mapas de tradução
            const mapEspecie = { 1: 'Cachorro', 2: 'Gato', 3: 'Outros' };
            const mapPorte = { 1: 'Pequeno', 2: 'Médio', 3: 'Grande' };
            const mapIdade = { 1: 'Filhote', 2: 'Adulto', 3: 'Idoso' };
            const mapSexo = { 1: 'Macho', 2: 'Fêmea' };
            const mapRaca = { 0: 'Sem raça', 1: 'Poodle', 2: 'Bulldog', 3: 'Siamês', 4: 'Persa', 5: 'Outros' }; 

            // Preenche HTML
            document.getElementById('detalhe-nome').innerText = pet.nome;
            document.getElementById('detalhe-descricao').innerText = pet.descricao || "Sem descrição.";
            document.getElementById('detalhe-temperamento').innerText = pet.temperamento || "Não informado.";
            document.getElementById('detalhe-vet').innerText = pet.informacoes_veterinarias || "Não informado.";
            document.getElementById('detalhe-adaptabilidade').innerText = pet.adaptabilidade || "Não informado.";

            document.getElementById('detalhe-especie').innerText = mapEspecie[pet.especie_id] || pet.especie_id;
            document.getElementById('detalhe-raca').innerText = mapRaca[pet.raca_id] || pet.raca_id;
            document.getElementById('detalhe-porte').innerText = mapPorte[pet.porte_id] || pet.porte_id;
            document.getElementById('detalhe-idade').innerText = mapIdade[pet.idade_id] || pet.idade_id;
            document.getElementById('detalhe-sexo').innerText = mapSexo[pet.sexo_id] || pet.sexo_id;
            document.getElementById('detalhe-status').innerText = pet.status_adocao === 1 ? 'Disponível' : 'Indisponível';
            
            const imgEl = document.getElementById('detalhe-img');
            if (pet.foto_url && !pet.foto_url.includes('site.com')) {
                imgEl.src = pet.foto_url;
            } else {
                imgEl.src = './img/pet-teste.jpg';
            }
            imgEl.onerror = () => imgEl.src = './img/pet-teste.jpg';

            document.getElementById('loading-message').style.display = 'none';
            document.getElementById('pet-content').style.display = 'block';

            // LÓGICA DO FAVORITO
            const btnFav = document.getElementById('btn-favoritar');
            const iconFav = btnFav.querySelector('i');
            let favoritoAtual = null;

            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
            
            if (usuarioLogado) {
                try {
                    favoritoAtual = await verificarSeEhFavorito(pet.animal_id);
                    if (favoritoAtual) {
                        iconFav.classList.remove('bi-heart');
                        iconFav.classList.add('bi-heart-fill');
                        iconFav.style.color = '#0475A8';
                    }
                } catch (favError) {
                    console.warn("API Favoritos offline ou erro:", favError);
                }
            }
            btnFav.disabled = false; 

            // Clique Favoritar
            btnFav.addEventListener('click', async () => {
                const usuarioCheck = JSON.parse(localStorage.getItem("usuarioLogado"));
                if (!usuarioCheck) {
                    alert("Você precisa fazer login para favoritar um pet.");
                    window.location.hash = "/login";
                    return;
                }

                btnFav.disabled = true;
                try {
                    if (favoritoAtual) {
                        // Remover
                        const idFav = favoritoAtual.id || favoritoAtual.id_favorito || favoritoAtual.favorito_id;
                        if (idFav) {
                            const sucesso = await removerFavorito(idFav);
                            if (sucesso) {
                                favoritoAtual = null;
                                iconFav.classList.remove('bi-heart-fill');
                                iconFav.classList.add('bi-heart');
                                iconFav.style.color = '#0475A8';
                            } else alert("Erro ao remover.");
                        }
                    } else {
                        // Adicionar
                        const sucesso = await adicionarFavorito(pet.animal_id);
                        if (sucesso) {
                            favoritoAtual = await verificarSeEhFavorito(pet.animal_id);
                            iconFav.classList.remove('bi-heart');
                            iconFav.classList.add('bi-heart-fill');
                            iconFav.style.color = '#0475A8';
                        } else alert("Erro ao adicionar.");
                    }
                } catch (e) { console.error(e); } 
                finally { btnFav.disabled = false; }
            });

            // LÓGICA DE PEDIDO DE ADOÇÃO
            const btnOrder = document.getElementById('btn-adotar');
            
            // Se o pet já foi adotado (status != 1), desativa o botão
            if (pet.status_adocao !== 1) {
                btnOrder.disabled = true;
                btnOrder.innerText = "INDISPONÍVEL";
                btnOrder.style.backgroundColor = "#ccc";
                btnOrder.style.cursor = "not-allowed";
            } else {
                // Clique Adotar
                btnOrder.addEventListener('click', async () => {
                    
                    //Verifica Login
                    const usuarioCheck = JSON.parse(localStorage.getItem("usuarioLogado"));
                    if (!usuarioCheck) {
                        alert("Você precisa estar logado para solicitar a adoção.");
                        // Salva onde estava para talvez voltar depois (opcional)
                        window.location.hash = "/login";
                        return;
                    }

                    //Confirmação
                    if (confirm(`Deseja realmente solicitar a adoção de ${pet.nome}?`)) {
                        btnOrder.disabled = true;
                        btnOrder.innerText = "ENVIANDO...";
                        
                        // Chama o Service
                        // O status inicial do pedido é 'PENDENTE'
                        const sucesso = await criarPedido('PENDENTE', pet.animal_id);
                        
                        if (sucesso) {
                            alert("Pedido de adoção enviado com sucesso! Acompanhe em 'Meus Pedidos'.");
                            window.location.hash = "/meuspedidos"; // Redireciona para lista de pedidos
                        } else {
                            btnOrder.disabled = false;
                            btnOrder.innerText = "QUERO ADOTAR";
                            // O service já dá alert de erro, não precisa duplicar
                        }
                    }
                });
            }

        } catch (error) {
            console.error(error);
            const msgErro = document.getElementById('msg-erro');
            msgErro.innerText = "Falha ao carregar: " + error.message;
            msgErro.style.display = 'block';
        }

        // Accordions
        const headers = document.querySelectorAll('.expandable-card .card-header');
        headers.forEach(header => {
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            newHeader.addEventListener('click', (e) => {
                const currentCard = newHeader.closest('.expandable-card');
                const currentContent = currentCard.querySelector('.card-conteudo');
                currentCard.classList.toggle('active');
                if (currentCard.classList.contains('active')) {
                    currentContent.style.maxHeight = currentContent.scrollHeight + "px";
                    currentContent.style.marginTop = "15px";
                    currentContent.style.opacity = "1";
                } else {
                    currentContent.style.maxHeight = null;
                    currentContent.style.marginTop = "0";
                    currentContent.style.opacity = "0";
                }
            });
        });
    }
};