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
    let path = window.location.pathname;

    if (path === '' || path === '/index.html') path = '/';

    const route = routes[path] || routes[404];

    // Injeta HTML
    document.getElementById('app').innerHTML = route.template;

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = route.title;

    // Cabeçalho Secundário
    const cabecalhoSecundario = document.querySelector('.cabecalho-secundario');
    if (cabecalhoSecundario) {
        if (path === '/') cabecalhoSecundario.style.display = 'flex';
        else cabecalhoSecundario.style.display = 'none';
    }

    // Inicializa a página
    if (route.init) {
        route.init();
    }
};

window.route = router;