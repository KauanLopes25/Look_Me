/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD).
* Data: 11/12/2025
* Autor: Kauan Lopes Pereira
* Versão: 1.0
* **********************************************************************/

const API_URL_USUARIO = "http://localhost:8080/v1/lookme/user/";

export async function criarUsuario(formData) {
    const options = {
        method: "POST",
        body: formData
    };
    try {
        const response = await fetch(API_URL_USUARIO, options);
        
        if (!response.ok) {
            const errorData = await response.text(); 
            console.error("ERRO BACKEND:", errorData);
            alert(`O Backend recusou: ${response.status} - ${errorData}`);
            return false;
        }
        const usuarioCriado = await response.json();
        return usuarioCriado;  // <- retorna o usuário criado
    } catch (error) {
        console.error("Erro de Rede:", error);
        alert("Erro de conexão com a API.");
        return false;
    }
}