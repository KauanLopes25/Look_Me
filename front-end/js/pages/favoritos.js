/* *********************************************************************
* Objetivo: Template e a lógica de favoritos
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { listarFavoritos } from '../services/favoritesService.js';
import { lerAnimal } from '../services/animalService.js';

export const Favoritos = {
    title: "MEUS FAVORITOS",
    template: `
        <div class="favoritos-container">
            <section class="cards" id="container-favoritos">
                <div style="text-align: center; width: 100%; margin-top: 50px;">
                    <p style="font-size: 20px;">Carregando seus favoritos...</p>
                </div>
            </section>
        </div>
    `,
    init: async () => {
        const container = document.getElementById('container-favoritos');
        
        // Busca a lista de IDs favoritos do banco
        const listaFavoritos = await listarFavoritos();

        container.innerHTML = '';

        if (listaFavoritos.length === 0) {
            container.innerHTML = '<h3 style="text-align:center; width:100%; color: white;">Você ainda não tem favoritos.</h3>';
            return;
        }

        // Para cada favorito, busca os dados do animal (Nome, Foto, Status)
        // Usar Promise.all para carregar todos juntos e ser mais rápido
        const promessas = listaFavoritos.map(async (fav) => {
            const animal = await lerAnimal(fav.animal_id);
            return animal;
        });

        const animaisDetalhados = await Promise.all(promessas);

        // Renderiza os cards
        animaisDetalhados.forEach(pet => {
            if (!pet) return; // Se o animal foi excluído mas ainda estava nos favoritos

            const statusTexto = pet.status_adocao === 1 ? 'Disponível' : 'Adotado';
            
            let imagemPet = './img/pet-teste.jpg';
            if (pet.foto_url && !pet.foto_url.includes('site.com')) {
                imagemPet = pet.foto_url;
            }

            const card = document.createElement('div');
            card.classList.add('card');
            
            card.onclick = () => {
                window.location.hash = `/pet?id=${pet.animal_id}`;
            };

            card.innerHTML = `
                <img src="${imagemPet}" alt="${pet.nome}" onerror="this.src='./img/pet-teste.jpg'">
                <h3>${pet.nome}</h3>
                <p>${statusTexto}</p>
            `;
            
            container.appendChild(card);
        });
    }
};