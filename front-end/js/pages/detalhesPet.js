/* *********************************************************************
* Objetivo: Template e a lógica de detalhes do pet, importando o serviço.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { lerAnimal } from '../services/animalService.js';

export const DetalhesPet = {
    title: "DETALHES DO PET",
    template: `
            <div class="detalhes-pet-container">
                <div id="loading-message" style="text-align: center; padding: 50px;">
                    <h2>Carregando informações do pet...</h2>
                </div>

                <div id="pet-content" style="display: none;">
                    <div class="pet-card">
                        <div class="pet-header">
                            <div class="pet-image">
                                <img id="detalhe-img" src="./img/pet-teste.jpg" alt="Foto do Pet">
                            </div>
                            <div class="pet-info">
                                <h1 class="pet-nome" id="detalhe-nome">Nome do Pet</h1>
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
                            <button class="botao-favorito"><i class="bi bi-heart"></i></button>
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
        //Pega o ID da URL
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            alert("Pet não identificado!");
            return;
        }

        // Mapas para traduzir os IDs 
        const mapEspecie = { 1: 'Cachorro', 2: 'Gato', 3: 'Outros' };
        const mapPorte = { 1: 'Pequeno', 2: 'Médio', 3: 'Grande' };
        const mapIdade = { 1: 'Filhote', 2: 'Adulto', 3: 'Idoso' };
        const mapSexo = { 1: 'Macho', 2: 'Fêmea' };
        const mapRaca = { 1: 'Sem raça definida', 2: 'Poodle', 3: 'Bulldog', 4: 'Siamês' }; // Exemplo

        // Busca os dados na API
        try {
            // Tenta buscar no endpoint específico: .../animal/3
            const response = await fetch(`http://localhost:8080/v1/lookme/animal/${id}`);

            if (!response.ok) throw new Error('Erro ao buscar detalhes do pet');

            const dados = await response.json();

            let pet = dados;

            if (dados.items && dados.items.animal) pet = dados.items.animal[0];
            else if (Array.isArray(dados)) pet = dados[0];

            // Preenche o HTML
            document.getElementById('detalhe-nome').innerText = pet.nome;
            document.getElementById('detalhe-descricao').innerText = pet.descricao || "Sem descrição.";
            document.getElementById('detalhe-temperamento').innerText = pet.temperamento || "Não informado.";
            document.getElementById('detalhe-vet').innerText = pet.informacoes_veterinarias || "Não informado.";
            document.getElementById('detalhe-adaptabilidade').innerText = pet.adaptabilidade || "Não informado.";

            // Tradução dos IDs usando os mapas
            document.getElementById('detalhe-especie').innerText = mapEspecie[pet.especie_id] || 'Desconhecido';
            document.getElementById('detalhe-raca').innerText = mapRaca[pet.raca_id] || 'Outra';
            document.getElementById('detalhe-porte').innerText = mapPorte[pet.porte_id] || 'Desconhecido';
            document.getElementById('detalhe-idade').innerText = mapIdade[pet.idade_id] || 'Desconhecido';
            document.getElementById('detalhe-sexo').innerText = mapSexo[pet.sexo_id] || 'Desconhecido';

            document.getElementById('detalhe-status').innerText = pet.status_adocao === 1 ? 'Disponível' : 'Indisponível';

            // Imagem
            const imgEl = document.getElementById('detalhe-img');
            imgEl.src = pet.foto_url || './img/pet-teste.jpg';
            imgEl.onerror = () => imgEl.src = './img/pet-teste.jpg';

            // Mostra o conteúdo e esconde o loading
            document.getElementById('loading-message').style.display = 'none';
            document.getElementById('pet-content').style.display = 'block';

        } catch (error) {
            console.error(error);
            document.getElementById('loading-message').innerHTML = '<h3>Erro ao carregar detalhes. Tente novamente.</h3>';
        }

        // Accordions
        const headers = document.querySelectorAll('.expandable-card .card-header');
        headers.forEach(header => {
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            newHeader.addEventListener('click', (e) => {
                e.stopPropagation();
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

        // Lógica do botão favorito
        const btnFav = document.querySelector('.botao-favorito');
        if (btnFav) {
            btnFav.addEventListener('click', () => {
                const icon = btnFav.querySelector('i');
                if (icon.classList.contains('bi-heart')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                    icon.style.color = 'red';
                } else {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                    icon.style.color = '#0475A8';
                }
            });
        }
    }
};