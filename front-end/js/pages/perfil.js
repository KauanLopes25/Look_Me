/* *********************************************************************
* Objetivo: Template e a lógica de perfil
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

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
        // upload de Foto
        const uploadBox = document.querySelector('.perfil-section .photo-upload');
        const fileInput = document.getElementById('file-input-perfil');

        if (uploadBox && fileInput) {
            uploadBox.addEventListener('click', () => {
                fileInput.click();
            });
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    alert(`Foto selecionada: ${e.target.files[0].name}`);
                }
            });
        }

        // logica de Logout
        const btnLogout = document.querySelector('.botao-logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                // limpar sessao (simulando aqui)
                alert('Você saiu do sistema.');
                //redireciona para o Login
                window.history.pushState({}, "", "/login");
                window.route();
            });
        }

        // --- PEGAR USUÁRIO LOGADO ---
        const usuario = window.usuarioLogado;
        if (!usuario) {
            alert("Nenhum usuário logado!");
            window.history.pushState({}, "", "/login");
            return route();
        }

        // Selecionar os inputs
        const inputs = document.querySelectorAll(".container-dados .input-padrao");

        // Ordem dos inputs do seu HTML:
        // 0 - Nome
        // 1 - CEP  
        // 2 - Data de nascimento
        // 3 - Email
        // 4 - Telefone

        inputs[0].value = usuario.nome || "";
        inputs[1].value = usuario.cep || "";
        inputs[2].value = usuario.data_nascimento?.substring(0, 10) || "";
        inputs[3].value = usuario.email || "";
        inputs[4].value = usuario.telefone || "";

        // Seleciona a imagem
        const fotoPerfil = document.getElementById("foto-perfil");

        // Se a API enviou uma URL válida, troca a foto
        if (usuario.foto_url) {
            fotoPerfil.src = usuario.foto_url;
        }
    }



};