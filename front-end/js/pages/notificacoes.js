/* *********************************************************************
* Objetivo: Template e a lógica de notificações
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

export const Notificacoes = {
    title: "NOTIFICAÇÕES",
    template: `
            <div class="notificacoes-wrapper">
                <div class="notificacoes-container">
                    
                    <div class="notificacao-card">
                        <span class="card-titulo">PEDIDO DE ADOÇÃO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                    <div class="notificacao-card">
                        <span class="card-titulo">RETORNO DO PEDIDO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                    <div class="notificacao-card">
                        <span class="card-titulo">RETORNO DO PEDIDO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                </div>
            </div>
        `
};