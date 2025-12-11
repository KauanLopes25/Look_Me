/* *********************************************************************
* Objetivo: Lógica de fetch (CRUD).
* Data: 11/12/2025
* Autor: Kauan Lopes Pereira
* Versão: 1.0
* **********************************************************************/

const API_URL_USUARIO = "http://localhost:8080/v1/lookme/user/";

export async function lerTodosUsuarios() {
    try {
        const response = await fetch(API_URL_USUARIO);
        if(response.ok) {
            const data = await response.json();
            return data.items ? data.items.usuarios : data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function lerUsuario(email) {
    const url = `${API_URL_USUARIO}${email}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            // Aqui está o ajuste:
            if (data.items && data.items.usuarios) {
                return data.items.usuarios[0]; // <-- AQUI
            }

            return null;
        }
        return null;
    } catch (error) {
        console.error("Erro ao ler usuario:", error);
        return null;
    }
}


export async function loginUsuario(inputEmail, inputSenha) {
    let usuario = await lerUsuario(inputEmail);

    if (!usuario) return null;

    if (usuario.email == inputEmail && usuario.senha == inputSenha){
        return usuario;   // <-- retorna o usuário inteiro
    } else {
        return null;
    }

}