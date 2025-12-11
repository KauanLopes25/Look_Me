/* *********************************************************************
* Objetivo: Template e a lógica de meus pedidos
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/
import { listarPedidos } from '../services/orderService.js';
import { lerAnimal } from '../services/animalService.js';

export const MeusPedidos = {
    title: "MEUS PEDIDOS",
    template: `
            <div class="meus-pedidos-container" id="meus-pedidos-container">
                <section class="cards">

                    <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Luna</h3>
                        <p style="color: orange;">Aguardando</p> </div>

                    <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Max</h3>
                        <p style="color: green;">Aprovado</p>
                    </div>

                </section>
            </div>
        `, 
        
        init: async () => {
            const container = document.getElementById('meus-pedidos-container');
        
            const pedidos = await listarPedidos(); 
    
            container.innerHTML = '';
    
            if (pedidos.length === 0) {
                container.innerHTML = '<h3 style="text-align:center; width:100%; color: white;">Você ainda não tem favoritos.</h3>';
                return;
            }
    
            // Para cada favorito, busca os dados do animal (Nome, Foto, Status)
            // Usar Promise.all para carregar todos juntos e ser mais rápido
            const promessas = pedidos.map(async (order) => {
                const animal = await lerAnimal(order.animal_id);
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
