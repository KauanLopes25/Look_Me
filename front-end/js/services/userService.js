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
        if (response.ok) {
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

    if (usuario.email == inputEmail && usuario.senha == inputSenha) {
        return usuario;   // <-- retorna o usuário inteiro
    } else {
        return null;
    }

}

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

export async function atualizarUsuario(email, formData) {
    const url = `${API_URL_USUARIO}${email}`;

    try {
        const resposta = await fetch(url, {
            method: "PUT",
            body: formData
        });

        const result = await resposta.json();

        if (!resposta.ok) {
            alert(result.message || "Erro ao atualizar perfil");
            return null;
        }

        // Atualiza no localStorage
        localStorage.setItem("usuarioLogado", JSON.stringify(result.usuario));
        console.log("URL PUT:", url);
        console.log("FormData:", [...formData.entries()]);
        return result.usuario;

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        alert("Erro ao conectar com a API.");
        return null;
    }
}