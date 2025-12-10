/* *********************************************************************
* Objetivo: Ponto de entrada da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { router } from './router.js';

// Evento de navegação pelos links do menu
document.addEventListener('click', (e) => {
    const link = e.target.closest('.spa-link');
    
    if (e.target.closest('.botao-mobile-filter')) return;

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