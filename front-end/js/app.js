/* *********************************************************************
* Objetivo: Ponto de entrada da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { router } from './router.js';
let emailUsuario = null
let senhaUsuario = null
// Evento de navegação pelos links do menu
document.addEventListener('click', (e) => {
    const link = e.target.closest('.spa-link');

    if (e.target.closest('.botao-mobile-filter')) return;

    const destino = link.getAttribute('href');

    // Se clicar no perfil:
    if (destino === "/perfil") {
        if (emailUsuario && senhaUsuario) {
            // Usuário logado → deixa ir pro perfil
            window.history.pushState({}, "", "/perfil");
            router();
        } else {
            // Usuário NÃO logado → manda pro login
            window.history.pushState({}, "", "/login");
            router();
        }
    }
    if (link) {
        e.preventDefault();
        window.history.pushState({}, "", link.getAttribute('href'));
        router();
    }

});

// Evento do botão voltar/avançar do navegador
window.onpopstate = router;

// Inicia a aplicação
router();