/* *********************************************************************
* Objetivo: Ponto de entrada da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira e Kauan Lopes
* Versão: 1.0
* **********************************************************************/

import { router } from './router.js';

//Navegação: Quando o Hash mudar, roda o roteador (que fará a verificação de login)
window.addEventListener('hashchange', router);

//Carregamento Inicial
window.addEventListener('load', () => {
    // Se a URL não tiver hash, força ir para a Home (#/)
    if (!window.location.hash) {
        window.location.hash = '/';
    } else {
        router();
    }
});

// Captura cliques em links (.spa-link)
document.addEventListener('click', (e) => {
    const link = e.target.closest('.spa-link');
    
    // Ignora botões que não são links de navegação
    if (e.target.closest('.botao-mobile-filter')) return;

    if (link) {
        e.preventDefault();
        
        const href = link.getAttribute('href');
        
        // O evento 'hashchange' dispara o router.
        // O router verifica se está logado. Se não estiver, o router redireciona pro login.
        window.location.hash = href; 
    }
});