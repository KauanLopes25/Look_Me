/* *********************************************************************
* Objetivo: Template e a lógica de Login
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { loginUsuario } from '../services/userService.js';


export const Login = {
    title: "ENTRAR",
    template: `
            <!-- ADICIONEI A CLASSE 'login-mode' AQUI NA DIV WRAPPER -->
            <div class="cadastro-wrapper login-mode">
                
                <a href="/" class="spa-link botao-voltar">
                    <i class="bi bi-arrow-left"></i>
                </a>

                <div class="card-auth">
                    <div class="content-login">
                    
                        <img class="logo" src="./img/logo.png" alt="Logo do Site">
                    
                        <form class="box-login">
                            <div class="input-login">
                                <input type="email" id="email" class="campo" name="email" placeholder="Email">
                                <i class="bi bi-person"></i>
                            </div>
                            
                            <div class="input-senha">
                                <input type="password" id="senha" class="campo" name="senha" placeholder="Senha">
                                <i id="icon-senha" class="bi bi-eye" style="cursor: pointer;"></i>
                            </div>
                            
                            <input type="submit" class="botao" value="ENTRAR">
                        </form>
                    
                        <div class="criar-cadastro">  
                            <a class="link spa-link" href="/cadastro">Cadastrar uma nova conta</a>
                        </div>
                    
                    </div>
                </div>
            </div>
        `,
    init: () => {

        const form = document.querySelector(".box-login");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            const usuario = await loginUsuario(email, senha);

            if (usuario) {
                // Guarda o usuário completo para usar no perfil
                window.usuarioLogado = usuario;
                // Salva o usuário inteiro no localStorage
                localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

                //window.history.pushState({}, "", "/perfil");
                window.location.hash = "/perfil";
                route();
            } else {
                alert("Email ou senha incorretos");
            }
        });

        const input = document.getElementById('senha');
        const icon = document.getElementById('icon-senha');

        if (input && icon) {
            icon.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                icon.classList.toggle('bi-eye');
                icon.classList.toggle('bi-eye-slash');
            });
        }
    }
}