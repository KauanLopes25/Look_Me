/* *********************************************************************
* Objetivo: Ponto de entrada da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { router } from './router.js';

// Escuta a mudança de Hash na URL (Navegação)
window.addEventListener('hashchange', router);

// Ao carregar a página (F5 ou Primeira vez)
window.addEventListener('load', () => {
    // Se a URL não tiver hash (ex: apenas localhost:8080), força ir para a Home (#/)
    if (!window.location.hash) {
        window.location.hash = '/';
    } else {
        // Se já tiver hash (ex: localhost:8080/#/anunciar), carrega a rota certa
        router();
    }
});

// Captura cliques em links com a classe .spa-link
document.addEventListener('click', (e) => {
    const link = e.target.closest('.spa-link');
    
    // Ignora botões que não são links de navegação
    if (e.target.closest('.botao-mobile-filter')) return;

    if (link) {
        e.preventDefault();
        // Muda o Hash. O evento 'hashchange' percebe e roda o router.
        window.location.hash = link.getAttribute('href'); 
    }
});