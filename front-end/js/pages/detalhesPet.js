/* *********************************************************************
* Objetivo: Template e a lógica de detalhes do pet, importando o serviço.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { lerAnimal } from '../services/animalService.js';
import { adicionarFavorito, removerFavorito, verificarSeEhFavorito } from '../services/favoritesService.js';

export const DetalhesPet = {
    title: "DETALHES DO PET",
    template: `
        <div class="detalhes-pet-container">
            <div id="loading-message" style="text-align: center; padding: 50px;">
                <h2>Carregando informações do pet...</h2>
                <p id="msg-erro" display: none;"></p>
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
                            <button class="botao-adote">QUERO ADOTAR</button>
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
        
        // Pega a string completa da hash (#/pet?id=3)
        const hashString = window.location.hash; 
        
        // Separa pelo '?' para pegar a parte dos parâmetros (id=3)
        const paramsPart = hashString.split('?')[1]; 
        
        // Cria o objeto URLSearchParams com essa parte
        const params = new URLSearchParams(paramsPart);
        const id = params.get('id');

        if (!id) {
            alert("Erro: Nenhum ID de pet foi fornecido.");
            window.location.hash = "/"; // Redireciona para Home com Hash
            return;
        }

        try {
            // Busca dados do animal
            console.log(`Buscando animal ID: ${id}`);
            const pet = await lerAnimal(id);
            
            if (!pet) {
                throw new Error("Pet não encontrado na API.");
            }

            // Mapas para traduzir os IDs (caso a API retorne numeros)
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
            // Verifica se a URL é válida
            if (pet.foto_url && !pet.foto_url.includes('site.com')) {
                imgEl.src = pet.foto_url;
            } else {
                imgEl.src = './img/pet-teste.jpg';
            }
            imgEl.onerror = () => imgEl.src = './img/pet-teste.jpg';

            // Mostra o conteúdo
            document.getElementById('loading-message').style.display = 'none';
            document.getElementById('pet-content').style.display = 'block';

            // LÓGICA DO FAVORITO 
            const btnFav = document.getElementById('btn-favoritar');
            const iconFav = btnFav.querySelector('i');
            
            // Variável para guardar o ID do favorito
            let favoritoAtual = null;

            try {
                console.log("Verificando favoritos...");
                favoritoAtual = await verificarSeEhFavorito(pet.animal_id);
                
                if (favoritoAtual) {
                    iconFav.classList.remove('bi-heart');
                    iconFav.classList.add('bi-heart-fill');
                    iconFav.style.color = '#0475A8';
                }
                // Só habilita o botão se a verificação de favoritos funcionar
                btnFav.disabled = false; 

            } catch (favError) {
                console.warn("Erro ao verificar favoritos (API pode estar offline):", favError);
            }

            btnFav.addEventListener('click', async () => {
                btnFav.disabled = true; 
                console.log("--- INÍCIO DO CLIQUE NO FAVORITO ---");

                try {
                    // 1. Verificar o estado atual
                    console.log("Estado atual do objeto favorito:", favoritoAtual);

                    if (favoritoAtual) {
                        // === TENTATIVA DE REMOVER ===
                        console.log("Tentando REMOVER...");
                        
                        // Tenta adivinhar o nome do ID que vem do banco
                        const idFav = favoritoAtual.id || favoritoAtual.id_favorito || favoritoAtual.favorito_id || favoritoAtual.codigo;
                        console.log("ID identificado para deleção:", idFav);

                        if (!idFav) {
                            alert("ERRO DE CÓDIGO: Não encontrei o ID do favorito. Abra o console (F12) e veja o objeto 'Estado atual'.");
                            console.error("Objeto sem ID legível:", favoritoAtual);
                            return;
                        }

                        const sucesso = await removerFavorito(idFav);
                        console.log("Resultado da remoção:", sucesso);

                        if (sucesso) {
                            favoritoAtual = null;
                            iconFav.classList.replace('bi-heart-fill', 'bi-heart');
                            iconFav.style.color = '#0475A8';
                        } else {
                            alert("O Back-end recusou a remoção. Verifique o Console.");
                        }

                    } else {
                        // === TENTATIVA DE ADICIONAR ===
                        console.log("Tentando ADICIONAR...");
                        console.log("Enviando para API: usuario_id=3, animal_id=", pet.animal_id);

                        const sucesso = await adicionarFavorito(pet.animal_id);
                        console.log("Resultado da adição:", sucesso);

                        if (sucesso) {
                            // Recarrega para ter certeza que salvou e pegar o ID novo
                            console.log("Recarregando lista para confirmar...");
                            favoritoAtual = await verificarSeEhFavorito(pet.animal_id);
                            console.log("Novo estado do favorito:", favoritoAtual);
                            
                            iconFav.classList.replace('bi-heart', 'bi-heart-fill');
                            iconFav.style.color = '#0475A8';
                        } else {
                            alert("O Back-end recusou a adição. Verifique o Console.");
                        }
                    }
                } catch (erro) {
                    console.error("ERRO CRÍTICO NO CLIQUE:", erro);
                    alert("Erro de Javascript ao clicar.");
                } finally {
                    btnFav.disabled = false;
                    console.log("--- FIM DO CLIQUE ---");
                }
            });

        } catch (error) {
            console.error("ERRO CRÍTICO NA TELA DE DETALHES:", error);
            const msgErro = document.getElementById('msg-erro');
            msgErro.innerText = "Falha ao carregar: " + error.message;
            msgErro.style.display = 'block';
        }

        // Lógica dos Accordions (Mantida)
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