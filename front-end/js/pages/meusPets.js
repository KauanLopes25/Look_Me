/* *********************************************************************
* Objetivo: Lógica para listar apenas os pets do usuário logado.
* Data: 14/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { lerTodosAnimais } from '../services/animalService.js';
import { listarAnimaisPorUsuario, deletarAnimal } from "../services/animalService.js";

export const MeusPets = {
    title: "MEUS PETS",
    template: `
        <div class="meus-pets-container">
            <section class="cards" id="container-meus-pets">
                <div style="text-align: center; width: 100%; margin-top: 50px;">
                    <p style="font-size: 20px;">Carregando seus anúncios...</p>
                </div>
            </section>
        </div>
    `,
    init: async () => {
        const container = document.getElementById('container-meus-pets');

        // Verifica Usuário Logado
        const usuarioJson = localStorage.getItem("usuarioLogado");
        if (!usuarioJson) {
            alert("Sessão expirada.");
            window.location.hash = "/login";
            return;
        }
        
        const usuario = JSON.parse(usuarioJson);
        // Garante que pegamos o ID independente do nome do campo no banco (id, id_usuario, etc)
        const usuarioId = usuario.id || usuario.id_usuario || usuario.usuario_id;

        try {
            // Busca todos os animais
            const listaGeral = await lerTodosAnimais();

            // Filtra apenas os meus
            const meusPets = listaGeral.filter(pet => pet.usuario_id == usuarioId);

            container.innerHTML = '';

            // Verifica se está vazio
            if (meusPets.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; width: 100%;">
                        <h3>Você ainda não tem pets anunciados.</h3>
                    </div>
                `;
                return;
            }

            // Renderiza os Cards
            meusPets.forEach(pet => {
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
                    <img src="${imagemPet}" alt="${pet.nome}">
                    <h3>${pet.nome}</h3>
                    <p>${statusTexto}</p>
                `;
                
                container.appendChild(card);
            });

        } catch (error) {
            console.error("Erro ao carregar meus pets:", error);
            container.innerHTML = '<p style="text-align:center; color:red">Erro ao carregar seus pets.</p>';
        }
    }
};