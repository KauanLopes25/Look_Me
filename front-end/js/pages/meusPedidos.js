/* *********************************************************************
* Objetivo: Listar pedidos com visual de Cards (Foto, Nome e Status)
* Data: 14/12/2025
* Autor: Marcelo Vieira
* **********************************************************************/

import { listarPedidos } from '../services/orderService.js';
import { lerAnimal } from '../services/animalService.js';

export const MeusPedidos = {
    title: "MEUS PEDIDOS DE ADOÇÃO",
    template: `
        <div class="meus-pedidos-container">
            <section class="cards" id="container-pedidos">
                <div style="text-align: center; width: 100%; margin-top: 50px;">
                    <p style="font-size: 20px;">Carregando seus pedidos...</p>
                </div>
            </section>
        </div>
    `,
    init: async () => {
        const container = document.getElementById('container-pedidos');

        // Verifica Login
        const usuarioJson = localStorage.getItem("usuarioLogado");
        if (!usuarioJson) {
            alert("Sessão expirada.");
            window.location.hash = "/login";
            return;
        }

        try {
            // Busca os pedidos do usuário
            const pedidos = await listarPedidos();

            if (pedidos.length === 0) {
                container.innerHTML = `
                    <div style="text-align:center; width: 100%;">
                        <h3>Você não tem pedidos de adoção.</h3>
                        <p>Visite a galeria e encontre seu novo amigo!</p>
                        <a href="#/" class="botao spa-link" style="margin-top:20px; display:inline-block;">Ver Pets</a>
                    </div>
                `;
                return;
            }

            container.innerHTML = ''; // Limpa o loading

            // Para cada pedido, busca os dados do animal para montar o card
            // Promise.all para buscar vários animais ao mesmo tempo
            const promises = pedidos.map(async (pedido) => {
                try {
                    const pet = await lerAnimal(pedido.animal_id);
                    return { pedido, pet };
                } catch (error) {
                    console.error(`Erro ao buscar pet do pedido ${pedido.id}:`, error);
                    return null;
                }
            });

            const resultados = await Promise.all(promises);

            //Renderiza os Cards
            resultados.forEach(item => {
                if (!item || !item.pet) return; // Pula se deu erro ao buscar o pet

                const { pedido, pet } = item;

                // Define texto do status
                let statusClass = '';
                let statusTexto = pedido.status_pedido;

                // Normaliza o texto para exibição
                if (statusTexto === 'PENDENTE') {
                    statusTexto = 'Pendente';
                } else if (statusTexto === 'APROVADO') {
                    statusTexto = 'Aprovado';
                } else if (statusTexto === 'RECUSADO') {
                    statusTexto = 'Recusado';
                }

                // Imagem do Pet
                let imagemPet = './img/pet-teste.jpg';
                if (pet.foto_url && !pet.foto_url.includes('site.com')) {
                    imagemPet = pet.foto_url;
                }

                // Cria o Card
                const card = document.createElement('div');
                card.classList.add('card');
                
                card.onclick = () => {

                    window.location.hash = `/pet?id=${pet.animal_id}`; // Por enquanto vai pro Pet
                };

                card.innerHTML = `
                    <img src="${imagemPet}" alt="${pet.nome}" onerror="this.src='./img/pet-teste.jpg'">
                    <h3>${pet.nome}</h3>
                    <p style="margin-top: 5px; ${statusClass}">${statusTexto}</p>
                `;

                container.appendChild(card);
            });

        } catch (error) {
            console.error("Erro ao carregar pedidos:", error);
            container.innerHTML = '<p style="text-align:center; color:red">Erro ao carregar seus pedidos.</p>';
        }
    }
};