/* *********************************************************************
* Objetivo: Template e a lógica da home, importando o serviço.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { lerTodosAnimais } from '../services/animalService.js'; // Assumindo que você criou essa função

export const Home = {
    title: "NOSSOS PETS",
    template: `
            <div class="overlay"></div>
            
            <aside class="filtros">
                <h2>FILTROS</h2>
                
                <div class="grupo">
                    <h3>Status</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="status" value="0"> Adotado</label>
                        <label><input type="checkbox" name="status" value="1" checked> Disponível</label> 
                    </div>
                </div>

                <div class="grupo">
                    <h3>Espécie</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="especie" value="1"> Cachorro</label>
                        <label><input type="checkbox" name="especie" value="2"> Gato</label>
                        <label><input type="checkbox" name="especie" value="3"> Outros</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Raça</h3>
                     <select class="select-raca" id="filtro-raca">
                        <option value="">Todas as raças</option>
                        <option value="0">Sem raça definida</option>
                        <option value="1">Poodle</option>
                        <option value="2">Bulldog</option>
                        <option value="3">Siamês</option>
                        <option value="4">Persa</option>
                        </select>
                </div>

                <div class="grupo">
                    <h3>Porte</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="porte" value="1"> Pequeno</label>
                        <label><input type="checkbox" name="porte" value="2"> Médio</label>
                        <label><input type="checkbox" name="porte" value="3"> Grande</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Idade</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="idade" value="1"> Filhote</label>
                        <label><input type="checkbox" name="idade" value="2"> Adulto</label>
                        <label><input type="checkbox" name="idade" value="3"> Idoso</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Sexo</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="sexo" value="1"> Macho</label>
                        <label><input type="checkbox" name="sexo" value="2"> Fêmea</label>
                    </div>
                </div>

                <div class="grupo">
                <h3>Região</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="regiao" value="sudeste"> Sudeste</label>
                        <label><input type="checkbox" name="regiao" value="nordeste"> Nordeste</label>
                        <label><input type="checkbox" name="regiao" value="norte"> Norte</label>
                        <label><input type="checkbox" name="regiao" value="sul"> Sul</label>
                        <label><input type="checkbox" name="regiao" value="centro-oeste"> Centro-Oeste</label>
                    </div>
                </div>
            </aside>

            <section class="cards" id="container-cards">
                <div style="text-align: center; width: 100%; padding-top: 50px;">
                    <p style="font-size: 20px;">Carregando pets...</p>
                </div>
            </section>
        `,
    init: async () => {
        //Lógica do Menu Mobile (Visual)
        const btnFilter = document.querySelector('.botao-mobile-filter');
        const menuFiltros = document.querySelector('.filtros');
        const overlay = document.querySelector('.overlay');

        if (btnFilter && menuFiltros && overlay) {
            btnFilter.addEventListener('click', () => {
                menuFiltros.classList.add('ativo');
                overlay.classList.add('ativo');
            });
            overlay.addEventListener('click', () => {
                menuFiltros.classList.remove('ativo');
                overlay.classList.remove('ativo');
            });
        }

        // Variáveis de Estado 
        const containerCards = document.getElementById('container-cards');
        const apiUrl = 'http://localhost:8080/v1/lookme/animal/';
        let todosOsPets = []; // Guarda a lista original para não precisar refazer o fetch

        // Função de Renderização
        const renderizarPets = (lista) => {
            containerCards.innerHTML = ''; // Limpa a tela

            if (!lista || lista.length === 0) {
                containerCards.innerHTML = '<p style="text-align:center; width:100%">Nenhum pet encontrado com esses filtros.</p>';
                return;
            }

            lista.forEach(pet => {
                const statusTexto = pet.status_adocao === 1 ? 'Disponível' : 'Adotado';
                const imagemPet = pet.foto_url ? pet.foto_url : './img/pet-teste.jpg';

                const card = document.createElement('div');
                card.classList.add('card');

                card.onclick = () => {
                    // Ao mudar o hash, o 'hashchange' no app.js dispara o router automaticamente
                    window.location.hash = `/pet?id=${pet.animal_id}`;
                };

                card.innerHTML = `
                        <img src="${imagemPet}" alt="${pet.nome}" onerror="this.src='./img/pet-teste.jpg'">
                        <h3>${pet.nome}</h3>
                        <p>${statusTexto}</p>
                    `;
                containerCards.appendChild(card);
            });
        };

        // Função de Filtragem 
        const aplicarFiltros = () => {
            // Captura os valores marcados
            const especiesSelecionadas = Array.from(document.querySelectorAll('input[name="especie"]:checked')).map(el => parseInt(el.value));
            const portesSelecionados = Array.from(document.querySelectorAll('input[name="porte"]:checked')).map(el => parseInt(el.value));
            const idadesSelecionadas = Array.from(document.querySelectorAll('input[name="idade"]:checked')).map(el => parseInt(el.value));
            const sexosSelecionados = Array.from(document.querySelectorAll('input[name="sexo"]:checked')).map(el => parseInt(el.value));
            const statusSelecionados = Array.from(document.querySelectorAll('input[name="status"]:checked')).map(el => parseInt(el.value));

            const racaSelecionada = document.getElementById('filtro-raca').value;

            // Filtra o array original
            const petsFiltrados = todosOsPets.filter(pet => {
                // Verifica Espécie (se nenhum marcado, aceita todos)
                if (especiesSelecionadas.length > 0 && !especiesSelecionadas.includes(pet.especie_id)) return false;

                // Verifica Porte
                if (portesSelecionados.length > 0 && !portesSelecionados.includes(pet.porte_id)) return false;

                // Verifica Idade
                if (idadesSelecionadas.length > 0 && !idadesSelecionadas.includes(pet.idade_id)) return false;

                // Verifica Sexo
                if (sexosSelecionados.length > 0 && !sexosSelecionados.includes(pet.sexo_id)) return false;

                // Verifica Status
                if (statusSelecionados.length > 0 && !statusSelecionados.includes(pet.status_adocao)) return false;

                // Verifica Raça
                if (racaSelecionada !== "" && pet.raca_id != racaSelecionada) return false;

                return true; // Passou em tudo
            });

            renderizarPets(petsFiltrados);
        };

        // Adicionar Event Listeners aos Inputs 
        // Seleciona todos os checkboxes e selects dentro de .filtros e adiciona o evento 'change'
        const inputsFiltro = document.querySelectorAll('.filtros input, .filtros select');
        inputsFiltro.forEach(input => {
            input.addEventListener('change', aplicarFiltros);
        });

        // Fetch Inicial 
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erro API: ${response.status}`);

            const dados = await response.json();
            todosOsPets = dados.items.animal || []; // Salva na memória global da função

            // Aplica o filtro inicial (para pegar o status "checked" do HTML, por exemplo)
            aplicarFiltros();

        } catch (error) {
            console.error("Erro:", error);
            containerCards.innerHTML = '<p style="text-align:center;">Erro ao carregar pets. Verifique a API.</p>';
        }
    }
};