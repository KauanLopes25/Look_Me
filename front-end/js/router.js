/* *********************************************************************
* Objetivo: Centralizar a configuração das rotas.
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

// Importa as páginas
import { Home } from './pages/home.js';
import { Anunciar } from './pages/anunciar.js';
import { DetalhesPet } from './pages/detalhesPet.js';
import { CadastroUsuario} from './pages/cadastroUsuario.js';
import { DetalhesPedido } from './pages/detalhesPedido.js'
import { Favoritos } from './pages/favoritos.js'
import { Login } from './pages/login.js'
import { MeusPedidos } from './pages/meusPedidos.js'
import { MeusPets } from './pages/meusPets.js'
import { Notificacoes } from './pages/notificacoes.js'
import { Perfil } from './pages/perfil.js'

// Define as rotas
const routes = {
    "/": Home,
    "/index.html": Home,
    "/anunciar": Anunciar,
    "/pet": DetalhesPet,
    "/login": Login,
    "/cadastro": CadastroUsuario,
    "/detalhespedido": DetalhesPedido,
    "/favoritos": Favoritos,
    "/meuspedidos": MeusPedidos,
    "/meuspets": MeusPets,
    "/notificacoes": Notificacoes,
    "/perfil": Perfil,
    404: {
        title: "Página não encontrada",
        template: `<h2>Erro 404</h2>`
    }
};

export const router = () => {
    // Pega o hash da URL. Se vazio, assume '/'
    // .slice(1) remove o caractere '#'
    let hash = window.location.hash.slice(1) || '/';

    // Separa a rota dos parâmetros (ex: '/pet?id=1' vira apenas '/pet')
    const routePath = hash.split('?')[0];

    // Busca a rota correspondente. Se não achar, vai para 404.
    const route = routes[routePath] || routes[404];

    // Injeta HTML
    const app = document.getElementById('app');
    app.innerHTML = route.template;

    // Atualiza Título da Aba
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = route.title;

    // Controla o Cabeçalho Secundário (filtros)
    const cabecalhoSecundario = document.querySelector('.cabecalho-secundario');
    if (cabecalhoSecundario) {
        // Mostra apenas na Home ('/')
        cabecalhoSecundario.style.display = (routePath === '/') ? 'flex' : 'none';
    }

    // Inicia Scripts da página
    if (route.init) {
        route.init();
    }
};

// Torna a função global para usar nos onlick="window.route()" se necessário
window.route = router;