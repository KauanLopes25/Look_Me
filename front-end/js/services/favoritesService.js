/* *********************************************************************
* Objetivo: Lógica da pagina favoritos.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const API_URL_FAVORITOS = "http://localhost:8080/v1/lookme/favoritos/";

function getUsuarioId() {
    const json = localStorage.getItem("usuarioLogado");
    
    // Se não tiver nada salvo, retorna nulo
    if (!json) return null;
    
    const usuario = JSON.parse(json);

    const idEncontrado = usuario.id || usuario.id_usuario || usuario.usuario_id;
    
    return idEncontrado;
}

export async function adicionarFavorito(animalId) {
    const usuarioId = getUsuarioId();
    
    if (!usuarioId) {
        alert("Você precisa estar logado para favoritar!");
        return false;
    }

    const dados = {
        usuario_id: parseInt(usuarioId), //CONVERSÃO IMPORTANTE (Texto para Número)
        animal_id: parseInt(animalId)
    };

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    };

    try {
        const response = await fetch(API_URL_FAVORITOS, options);
        
        if (!response.ok) {
            // Tenta ler o erro que o backend mandou
            const erroTexto = await response.text();
            console.error("O Backend recusou:", erroTexto);
            alert("Erro ao favoritar: " + erroTexto); // Mostra na tela para facilitar
            return false;
        }
        
        console.log("Favoritado com sucesso!");
        return true;

    } catch (error) {
        console.error("Erro de Rede/Conexão:", error);
        return false;
    }
}

export async function removerFavorito(favoritoId) {
    const url = `${API_URL_FAVORITOS}${favoritoId}`;
    const options = { method: "DELETE" };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error("Erro DELETE Favorito:", await response.text());
        }
        return response.ok;
    } catch (error) {
        console.error("Erro Conexão DELETE:", error);
        return false;
    }
}

export async function listarFavoritos() {
    const usuarioId = getUsuarioId();
    if (!usuarioId) return [];

    try {
        const response = await fetch(API_URL_FAVORITOS);
        if (response.ok) {
            const data = await response.json();

            let lista = [];
            if (data.items && data.items.favoritos) lista = data.items.favoritos;
            else if (Array.isArray(data)) lista = data;
            
            // Filtra pelo ID dinâmico do usuário logado
            return lista.filter(fav => fav.usuario_id == usuarioId);
        }
        return [];
    } catch (error) {
        console.error("Erro Listar Favoritos:", error);
        return [];
    }
}

export async function verificarSeEhFavorito(animalId) {
    const meusFavoritos = await listarFavoritos();
    // Procura o favorito correspondente ao animal atual
    const favorito = meusFavoritos.find(fav => fav.animal_id == animalId);
    
    return favorito || null;
}