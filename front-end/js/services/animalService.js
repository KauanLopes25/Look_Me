/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD).
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const API_URL_ANIMAIS = "http://localhost:8080/v1/lookme/animal/";

export async function criarAnimal(formData) {
    const options = {
        method: "POST",
        body: formData
    };
    try {
        const response = await fetch(API_URL_ANIMAIS, options);
        
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

export async function atualizarAnimal(id, formData) {
    const url = `${API_URL_ANIMAIS}${id}`;
    const options = {
        method: "PUT",
        body: formData
    };
    try {
        const response = await fetch(url, options);
        return response.ok;
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        return false;
    }
}

export async function deletarAnimal(id) {
    const url = `${API_URL_ANIMAIS}${id}`;
    const options = { method: "DELETE" };
    try {
        const response = await fetch(url, options);
        return response.ok;
    } catch (error) {
        console.error("Erro ao deletar:", error);
        return false;
    }
}

export async function lerAnimal(id) {
    const url = `${API_URL_ANIMAIS}${id}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let animal = data;
            if (data.items && data.items.animal) animal = data.items.animal[0];
            else if (Array.isArray(data)) animal = data[0];
            return animal;
        }
        return null;
    } catch (error) {
        console.error("Erro ao ler animal:", error);
        return null;
    }
}

export async function lerTodosAnimais() {
    try {
        const response = await fetch(API_URL_ANIMAIS);
        if(response.ok) {
            const data = await response.json();
            return data.items ? data.items.animal : data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}