/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD).
* Data: 10/12/2025
* Autor: Luana M. Lopes Bomfim
* Versão: 1.0
* **********************************************************************/

const API_URL_PEDIDO = "http://localhost:8080/v1/lookme/pedido/";
const USUARIO_LOGADO = 3;

export async function criarPedido(animalId, usuarioId) {
    const dadosPedido = {
        animal_id: parseInt(animalId),
        usuario_id: USUARIO_LOGADO
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