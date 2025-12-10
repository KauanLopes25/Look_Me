/* *********************************************************************
* Objetivo: Lógica da pagina favoritos.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const API_URL_FAVORITOS = "http://localhost:8080/v1/lookme/favoritos/";
const USUARIO_LOGADO = 3;

export async function adicionarFavorito(animalId) {
    const dados = {
        usuario_id: USUARIO_LOGADO,
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
            console.error("Erro POST Favorito:", await response.text());
        }
        return response.ok;
    } catch (error) {
        console.error("Erro Conexão Favorito:", error);
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
    try {
        const response = await fetch(API_URL_FAVORITOS);
        if (response.ok) {
            const data = await response.json();

            console.log("LISTA DE FAVORITOS (API):", data);

            let lista = [];
            if (data.items && data.items.favoritos) lista = data.items.favoritos;
            else if (Array.isArray(data)) lista = data;
            
            return lista.filter(fav => fav.usuario_id == USUARIO_LOGADO);
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
    
    if (favorito) {
        console.log("Favorito encontrado:", favorito);
    }
    return favorito || null;
}