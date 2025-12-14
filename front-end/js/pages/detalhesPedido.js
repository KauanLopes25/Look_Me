/* *********************************************************************
* Objetivo: Template e a lógica do detalhes de pedido
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

export const DetalhesPedido = {
    title: "DETALHES DO PEDIDO",
    template: `
            <div class="detalhes-pedido-container">
                <div class="card-solicitacao">
                    
                    <div class="pet-area">
                        <img src="./img/pet-teste.jpg" alt="Foto do Gato" class="pet-img">
                        <h3>Will</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="interessado-area">
                        
                        <div class="interessado-info">
                            <img src="./img/pessoa-teste.PNG" alt="Foto do Solicitante" class="requester-avatar">
                            
                            <div class="interessado-detalhes">
                                <h4>Michael Corleone</h4>
                                <p><strong>Data de Nascimento:</strong> 23/03/1999</p>
                                <p><strong>Telefone:</strong> 11 99582-5234</p>
                                <p><strong>Endereço:</strong> Rua Italia, 99, Jandira - SP</p>
                                <p><strong>Email:</strong> corleone@gmail.com</p>
                            </div>
                        </div>

                        <div class="botoes-acao">
                            <button class="botao botao-aceitar">Aceitar</button>
                            <button class="botao botao-recusar">Recusar</button>
                        </div>

                    </div>

                </div>
            </div>
        `,
    init: () => {
        const btnAceitar = document.querySelector('.botao-aceitar');
        const btnRecusar = document.querySelector('.botao-recusar');

        if (btnAceitar) {
            btnAceitar.addEventListener('click', () => {
                if (confirm('Deseja aceitar este pedido de adoção?')) {
                    alert('Pedido aceito com sucesso! Entre em contato com o adotante.');
                }
            });
        }

        if (btnRecusar) {
            btnRecusar.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja recusar este pedido?')) {
                    alert('Pedido recusado.');
                    // Opcional: voltar para notificações
                    window.history.pushState({}, "", "/notificacoes");
                    window.route();
                }
            });
        }
    }
};