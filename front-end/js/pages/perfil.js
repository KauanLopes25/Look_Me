/* *********************************************************************
* Objetivo: template e logica Perfil do usuario
* Autor: Marcelo Vieira
* Data: 14/12/2025
* Versão: 1.0
* **********************************************************************/

import { atualizarUsuario } from "../services/userService.js";

export const Perfil = {
    title: "MEU PERFIL",
    template: `
            <div class="perfil-container">
                <div class="perfil-section">
                    <div class="photo-upload">
                        <img id="foto-perfil" src="" alt="Foto do usuário" class="foto-perfil">
                        <div class="upload-icon"><i class="bi bi-cloud-upload-fill"></i></div>
                        <input type="file" id="file-input-perfil" style="display: none;" accept="image/*">
                    </div>

                    <div class="container-dados">
                        <input type="text" placeholder="Nome" class="input-padrao">
                        <input type="text" placeholder="CEP" class="input-padrao">
                        <input type="date" placeholder="Idade" class="input-padrao">
                        <input type="email" placeholder="Email" class="input-padrao" disabled style="background: #e0e0e0; cursor: not-allowed;">
                        <input type="tel" placeholder="Telefone" class="input-padrao">
                    </div>
                </div>

                <div class="actions-section">
                    <a href="#/meuspets" class="botao spa-link" style="text-align:center; text-decoration:none; display:inline-block;">Pets Anunciados</a>
                    <a href="#/meuspedidos" class="botao spa-link" style="text-align:center; text-decoration:none; display:inline-block;">Meus Pedidos</a>
                    <button id="btn-salvar" class="botao">Salvar</button>
                    <button class="botao botao-logout">Logout</button>
                </div>
            </div>
        `,
    init: () => {
        // LER USUÁRIO
        let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario) {
            alert("Sessão expirada.");
            window.location.hash = "/login";
            return; 
        }

        // CONFIGURA FOTO E INPUTS
        const fileInput = document.getElementById("file-input-perfil");
        const fotoPerfil = document.getElementById("foto-perfil");
        let novaFoto = null; 

        document.querySelector(".photo-upload").addEventListener("click", () => fileInput.click());
        
        fileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                novaFoto = e.target.files[0];
                // Preview
                fotoPerfil.src = URL.createObjectURL(novaFoto);
            }
        });

        const inputs = document.querySelectorAll(".container-dados .input-padrao");
        inputs[0].value = usuario.nome || "";
        inputs[1].value = usuario.cep || "";
        inputs[2].value = usuario.data_nascimento ? String(usuario.data_nascimento).substring(0, 10) : "";
        inputs[3].value = usuario.email || "";
        inputs[4].value = usuario.telefone || "";
        
        //Adiciona ?t=agora para forçar o navegador a baixar a imagem de novo
        if (usuario.foto_url && !usuario.foto_url.includes("undefined")) {
            fotoPerfil.src = `${usuario.foto_url}?t=${new Date().getTime()}`;
        } else {
            fotoPerfil.src = './img/pet-teste.jpg';
        }

        //BOTÃO SALVAR
        const btnSalvar = document.getElementById("btn-salvar");
        
        btnSalvar.addEventListener("click", async () => {
            btnSalvar.innerText = "Salvando...";
            btnSalvar.disabled = true;

            try {
                const formData = new FormData();
                if (novaFoto) {
                    formData.append("image", novaFoto);
                }

                const dadosDoFormulario = {
                    nome: inputs[0].value,
                    cep: inputs[1].value,
                    data_nascimento: inputs[2].value,
                    email: inputs[3].value,
                    telefone: inputs[4].value,
                    status_cadastro: 1,
                    senha: usuario.senha
                };

                formData.append("data", JSON.stringify(dadosDoFormulario));

                // Validação do ID
                const identificador = usuario.email || usuario.id || usuario.id_usuario;
                
                // CHAMA O SERVICE
                const resultado = await atualizarUsuario(identificador, formData);

                if (resultado.success) {
                    alert("Perfil atualizado com sucesso!");

                    //ATUALIZAÇÃO DO LOCALSTORAGE
                    
                    //Clona o usuário atual
                    let novoUsuario = { ...usuario, ...dadosDoFormulario };

                    //Tenta capturar a URL da imagem no caminho CORRETO (dentro de items)
                    const dados = resultado.data || {};
                    
                    let urlNova = null;

                    // Verifica o caminho exato
                    if (dados.items && dados.items.usuario && dados.items.usuario.foto_url) {
                        urlNova = dados.items.usuario.foto_url;
                    } 
                    // Fallback
                    else if (dados.usuario && dados.usuario.foto_url) {
                        urlNova = dados.usuario.foto_url;
                    }
                    else if (dados.foto_url) {
                        urlNova = dados.foto_url;
                    }

                    if (urlNova) {
                        console.log("Nova URL encontrada e salva:", urlNova);
                        novoUsuario.foto_url = urlNova;
                    } else {
                        console.warn("URL da foto não encontrada no retorno.");
                    }

                    // Salva no localStorage
                    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
                    
                    // Recarrega a página
                    window.location.reload(); 

                } else {
                    alert(resultado.message || "Erro ao atualizar.");
                }

            } catch (error) {
                console.error(error);
                alert("Erro técnico ao salvar.");
            } finally {
                btnSalvar.innerText = "Salvar";
                btnSalvar.disabled = false;
            }
        });

        //LOGOUT
        document.querySelector(".botao-logout").addEventListener("click", () => {
            if(confirm("Deseja sair?")) {
                localStorage.removeItem("usuarioLogado");
                window.location.hash = "/login";
            }
        });
    }
};