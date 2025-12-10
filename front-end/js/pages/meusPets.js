/* *********************************************************************
* Objetivo: Template e a lógica de meus pets
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

export const MeusPets = {
    title: "MEUS PETS",
    template: `
            <div class="meus-pets-container">
                <section class="cards">
                    
                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Thor</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Mel</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Bob</h3>
                        <p>Disponível</p>
                    </div>

                </section>
            </div>
        `
};