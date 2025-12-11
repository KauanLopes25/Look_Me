/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD).
* Data: 10/12/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
* **********************************************************************/

const API_URL_PEDIDO = "http://localhost:8080/v1/lookme/pedido/";
const USUARIO_LOGADO = 3;

export async function criarPedido(status_pedido,animalId) {
    const dadosPedido = {
        status_pedido: String(status_pedido),
        data_solicitacao: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        usuario_id: USUARIO_LOGADO,
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
            const errorData = await response.text(); 
            console.error("ERRO BACKEND:", errorData);
            alert(`O Backend recusou: ${response.status} - ${errorData}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Erro de Rede:", error);
        alert("Erro de conexão com a API.");
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
        }
        return response.ok;
    } catch (error) {
        console.error("Erro Conexão DELETE:", error);
        return false;
    }
}

export async function listarPedidos() { 
    try {
        const response = await fetch(API_URL_PEDIDO);

        if (response.ok) {

            const data = await response.json();

            console.log("LISTA DE PEDIDOS (API):", data);

            let lista = [];
            if (data.items && data.items.pedidos) lista = data.items.pedidos;
            else if (Array.isArray(data)) lista = data;
            
            return lista.filter(order => order.usuario_id == USUARIO_LOGADO);
        }
        return [];
    } catch (error) {
        console.error("Erro Listar Favoritos:", error);
        return [];
    }
}

