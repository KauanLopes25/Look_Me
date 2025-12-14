/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD) para Pedidos de Adoção.
* Data: 10/12/2025
* Autor: Luana M. Lopes Bomfim e Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const API_URL_PEDIDO = "http://localhost:8080/v1/lookme/pedido/";

// Função auxiliar para pegar o ID do usuário logado dinamicamente
function getUsuarioLogadoId() {
    const usuarioJson = localStorage.getItem("usuarioLogado");
    if (!usuarioJson) return null;
    
    const usuario = JSON.parse(usuarioJson);
    return usuario.id || usuario.id_usuario || usuario.usuario_id;
}

export async function criarPedido(status_pedido, animalId) {
    const usuarioId = getUsuarioLogadoId();

    if (!usuarioId) {
        alert("Erro: Usuário não identificado. Faça login novamente.");
        return false;
    }

    const dadosPedido = {
        status_pedido: String(status_pedido),
        data_solicitacao: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        usuario_id: parseInt(usuarioId),
        animal_id: parseInt(animalId)
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosPedido)
    };

    try {
        const response = await fetch(API_URL_PEDIDO, options);
        
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("ERRO BACKEND (Criar Pedido):", errorText);
            alert(`Não foi possível realizar o pedido. Erro: ${response.status}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erro de Rede (Criar Pedido):", error);
        alert("Erro de conexão com a API ao criar pedido.");
        return false;
    }
}

export async function removerPedido(pedidoId) {
    const url = `${API_URL_PEDIDO}${pedidoId}`;
    const options = { method: "DELETE" };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            console.error("Erro DELETE Pedido:", await response.text());
            alert("Erro ao excluir o pedido.");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erro Conexão DELETE:", error);
        return false;
    }
}

export async function listarPedidos() { 
    const usuarioId = getUsuarioLogadoId();

    if (!usuarioId) {
        console.warn("Usuário não logado tentou listar pedidos.");
        return [];
    }

    try {
        const response = await fetch(API_URL_PEDIDO);

        if (response.ok) {
            const data = await response.json();
            
            let lista = [];
            if (data.items && data.items.pedidos) {
                lista = data.items.pedidos;
            } else if (Array.isArray(data)) {
                lista = data;
            } else if (data.pedidos) {
                lista = data.pedidos;
            }
            
            console.log("LISTA DE PEDIDOS (API):", lista);

            // Filtra apenas os pedidos do usuário logado
            return lista.filter(order => order.usuario_id == usuarioId);
        }
        return [];
    } catch (error) {
        console.error("Erro Listar Pedidos:", error);
        return [];
    }
}