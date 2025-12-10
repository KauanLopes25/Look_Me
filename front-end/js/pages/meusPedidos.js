/* *********************************************************************
* Objetivo: Template e a lógica de meus pedidos
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

export const MeusPedidos = {
    title: "MEUS PEDIDOS",
    template: `
            <div class="meus-pedidos-container">
                <section class="cards">

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Luna</h3>
                        <p style="color: orange;">Aguardando</p> </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Max</h3>
                        <p style="color: green;">Aprovado</p>
                    </div>

                </section>
            </div>
        `
};