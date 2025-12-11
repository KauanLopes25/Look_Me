/* *********************************************************************
* Objetivo: Ponto de entrada da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { router } from './router.js';

// Carregar usuário salvo
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const rotasProtegidas = ["/perfil", "/favoritos", "/notificacoes", "/meuspets", "/meuspedidos", "/detalhespedido", "/anunciar"];

// Evento de navegação pelos links do menu
document.addEventListener('click', (e) => {
    const link = e.target.closest('.spa-link');

    if (e.target.closest('.botao-mobile-filter')) return;

    const destino = link.getAttribute('href');

    e.preventDefault();
    window.history.pushState({}, "", link.getAttribute('href'));
    router();

    // Se clicar no perfil:
    if (rotasProtegidas.includes(destino)) {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        // SE A ROTA FOR PROTEGIDA
        if (!usuarioLogado) {
            // REDIRECIONA PARA LOGIN
            window.history.pushState({}, "", "/login");
            return router();
        }
    }
});

// Evento do botão voltar/avançar do navegador
window.onpopstate = router;

// Inicia a aplicação
router();