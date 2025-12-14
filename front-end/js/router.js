/* *********************************************************************
* Objetivo: Configuração de rotas BLINDADA E SEGURA (Fix JSON Error)
* Data: 14/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

// Importa as páginas
import { Home } from './pages/home.js';
import { Anunciar } from './pages/anunciar.js';
import { DetalhesPet } from './pages/detalhesPet.js';
import { CadastroUsuario} from './pages/cadastroUsuario.js';
import { DetalhesPedido } from './pages/detalhesPedido.js';
import { Favoritos } from './pages/favoritos.js';
import { Login } from './pages/login.js';
import { MeusPedidos } from './pages/meusPedidos.js';
import { MeusPets } from './pages/meusPets.js';
import { Notificacoes } from './pages/notificacoes.js';
import { Perfil } from './pages/perfil.js';

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
        template: `
            <div style="text-align: center; margin-top: 50px;">
                <h2>Erro 404</h2>
                <p>Página não encontrada.</p>
                <a href="#/" style="color: white; text-decoration: underline;">Voltar para Home</a>
            </div>
        `,
        init: () => {}
    }
};

// LISTA DE ROTAS PROTEGIDAS
const rotasProtegidas = [
    "/perfil", 
    "/favoritos", 
    "/notificacoes", 
    "/meuspets", 
    "/meuspedidos", 
    "/detalhespedido", 
    "/anunciar"
];

// Função auxiliar para ler JSON sem quebrar o site
function getUsuarioLogado() {
    try {
        const jsonUser = localStorage.getItem("usuarioLogado");
        
        // Verifica se é nulo ou a string "undefined" (que causa erro)
        if (!jsonUser || jsonUser === "undefined") {
            return null;
        }

        return JSON.parse(jsonUser);
    } catch (error) {
        console.error("Erro ao ler usuário do cache:", error);
        // Se estiver corrompido, limpa para não travar mais
        localStorage.removeItem("usuarioLogado");
        return null;
    }
}

export const router = () => {
    // Pega o hash
    let hash = window.location.hash.slice(1) || '/';
    const routePath = hash.split('?')[0];

    // PROTEÇÃO DE ROTA
    if (rotasProtegidas.includes(routePath)) {
        // Usa a função segura criada acima
        const usuarioLogado = getUsuarioLogado();

        if (!usuarioLogado) {
            alert("Você precisa estar logado para acessar esta página.");
            window.location.hash = '/login';
            return; 
        }
    }

    // Busca a rota
    const route = routes[routePath] || routes[404];

    // Injeta HTML
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = route.template;
    }

    // Atualiza Título
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = route.title;

    // Cabeçalho Secundário
    const cabecalhoSecundario = document.querySelector('.cabecalho-secundario');
    if (cabecalhoSecundario) {
        cabecalhoSecundario.style.display = (routePath === '/') ? 'flex' : 'none';
    }

    //INICIALIZAÇÃO
    if (route.init) {
        setTimeout(async () => {
            try {
                await route.init();
            } catch (error) {
                console.error(`ERRO CRÍTICO NA ROTA ${routePath}:`, error);
            }
        }, 0);
    }
};

window.route = router;