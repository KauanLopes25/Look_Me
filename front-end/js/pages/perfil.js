/* *********************************************************************
* Objetivo: Template e a lógica de perfil
* Data: 09/12/2025
* Autor: Marcelo Vieira
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
                        <div class="upload-icon">
                            <i class="bi bi-cloud-upload-fill"></i>
                        </div>
                        <!-- Input oculto para funcionar o clique -->
                        <input type="file" id="file-input-perfil" style="display: none;" accept="image/*">
                    </div>

                    <div class="container-dados">
                        <input type="text" placeholder="Nome" class="input-padrao">
                        <input type="text" placeholder="CEP" class="input-padrao">
                        <input type="date" placeholder="Idade" class="input-padrao">
                        <input type="email" placeholder="Email" class="input-padrao">
                        <input type="tel" placeholder="Telefone" class="input-padrao">
                    </div>
                </div>

                <div class="actions-section">
                    <a href="/meus-pets" class="botao spa-link" style="text-align:center; text-decoration:none; display:inline-block;">
                        Pets Anunciados
                    </a>
                    <a href="/meus-pedidos" class="botao spa-link" style="text-align:center; text-decoration:none; display:inline-block;">
                        Meus Pedidos
                    </a>
                    <button class="botao">Editar</button>
                    <button class="botao">Salvar</button>
                    <button class="botao botao-logout">Logout</button>
                </div>
            </div>
        `,
    init: () => {
        // PEGAR USUÁRIO LOGADO 
        const usuario = window.usuarioLogado;
        if (!usuario) {
            alert("Nenhum usuário logado!");
            window.history.pushState({}, "", "/login");
            return route();
        }


        // UPLOAD DE FOTO COM PREVIEW

        const fileInput = document.getElementById("file-input-perfil");
        const fotoPerfil = document.getElementById("foto-perfil");
        let novaFoto = null; // <- armazenar a foto escolhida

        // Clicar na área → abre o input
        document.querySelector(".photo-upload").addEventListener("click", () => {
            fileInput.click();
        });

        // Quando selecionar a foto
        fileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                novaFoto = e.target.files[0];

                // preview na hora
                fotoPerfil.src = URL.createObjectURL(novaFoto);
            }
        });


        //  PREENCHER CAMPOS

        const inputs = document.querySelectorAll(".container-dados .input-padrao");

        inputs[0].value = usuario.nome || "";
        inputs[1].value = usuario.cep || "";
        inputs[2].value = usuario.data_nascimento?.substring(0, 10) || "";
        inputs[3].value = usuario.email || "";
        inputs[4].value = usuario.telefone || "";

        // FOTO ATUAL DO USUÁRIO
        if (usuario.foto_url) {
            fotoPerfil.src = usuario.foto_url;
        }

        // BOTÃO SALVAR → Enviar PUT

        const btnSalvar = document.querySelector(".actions-section button:nth-child(4)");
        btnSalvar.addEventListener("click", async () => {

            const formData = new FormData();

            if (novaFoto) {
                formData.append("image", novaFoto);
            }

            const dadosAtualizados = {
                nome: inputs[0].value,
                cep: inputs[1].value,
                data_nascimento: inputs[2].value,
                email: inputs[3].value,
                telefone: inputs[4].value,
                status_cadastro: 1,
                senha: usuario.senha
            };

            formData.append("data", JSON.stringify(dadosAtualizados));

            // AQUI CHAMA A API !!!
            const usuarioAtualizado = await atualizarUsuario(usuario.email, formData);

            if (usuarioAtualizado) {
                alert("Perfil atualizado com sucesso!");
                window.location.reload(); // recarrega a página do perfil
            }

        });

        // BOTÃO LOGOUT
        const btnLogout = document.querySelector(".botao-logout");

        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado"); // apaga usuário
            window.usuarioLogado = null;

            alert("Você saiu da sua conta!");
            window.history.pushState({}, "", "/login");
            route();
        });

    }
}