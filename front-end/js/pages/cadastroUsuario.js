/* *********************************************************************
* Objetivo: Template e a lógica do formulário de cadastro de usuario
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { criarUsuario } from "../services/userService.js";
import { router } from "../router.js";

export const CadastroUsuario = {
    title: "CRIE SUA CONTA",
    template: `
            <div class="cadastro-wrapper">
                <a href="/login" class="spa-link botao-voltar">
                    <i class="bi bi-arrow-left"></i>
                </a>

                <div class="card-auth">
                    <div class="content-login">
                        <img class="logo" src="./img/logo.png" alt="Logo do Site">

                        <form class="box-login">
                            <h3 class="titulo-secao">INFORMAÇÕES</h3>

                            <div class="input-login">
                                <input type="text" class="campo" placeholder="Usuário">
                                <i class="bi bi-person"></i>
                            </div>

                            <div class="input-login">
                                <input type="email" class="campo" placeholder="Email">
                                <i class="bi bi-envelope"></i>
                            </div>

                            <div class="input-senha">
                                <input id="criar-senha" type="password" class="campo" placeholder="Crie uma senha">
                                <i id="icon-criar-senha" class="bi bi-eye" style="cursor: pointer;"></i>
                            </div>

                            <div class="input-senha">
                                <input id="confirmar-senha" type="password" class="campo" placeholder="Confirme a senha">
                                <i id="icon-confirmar-senha" class="bi bi-eye" style="cursor: pointer;"></i>
                            </div>

                            <div class="input-login">
                                <input type="text" class="campo" placeholder="Telefone">
                                <i class="bi bi-telephone"></i>
                            </div>

                            <h3 class="titulo-secao">PREFERÊNCIA DE PETS</h3>
                            <div class="grupo-radios">
                                <label><input type="radio" name="pet" value="cachorro"> Cachorro</label>
                                <label><input type="radio" name="pet" value="gato"> Gato</label>
                                <label><input type="radio" name="pet" value="outros"> Outros</label>
                            </div>

                            <h3 class="titulo-secao">ENDEREÇO</h3>
                            <div class="input-login">
                                <input type="text" id="cep" class="campo" placeholder="Digite seu CEP" maxlength="9">
                            </div>
                            <div class="input-login">
                                <input type="text" id="logradouro" class="campo" placeholder="Logradouro">
                            </div>
                            <div class="input-login">
                                <input type="text" id="cidade" class="campo" placeholder="Cidade">
                            </div>
                            <div class="input-login">
                                <input type="text" id="estado" class="campo" placeholder="Estado">
                            </div>

                            <input type="submit" id="botao-cadastrar" class="botao" value="CADASTRAR">
                        </form>
                    </div>
                </div>
            </div>
        `,
    init: () => {
        // lgica de Senha (Olhinho)
        const togglePassword = (inputId, iconId) => {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);

            if (input && icon) {
                icon.addEventListener('click', () => {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    icon.classList.toggle('bi-eye');
                    icon.classList.toggle('bi-eye-slash');
                });
            }
        };
        togglePassword('criar-senha', 'icon-criar-senha');
        togglePassword('confirmar-senha', 'icon-confirmar-senha');

        // logica de Consumo de API (ViaCEP)

        // funções auxiliares
        const limparFormulario = () => {
            document.getElementById('logradouro').value = '';
            document.getElementById('cidade').value = '';
            document.getElementById('estado').value = '';
        }

        const preencherFormulario = (endereco) => {
            document.getElementById('logradouro').value = endereco.logradouro;
            document.getElementById('cidade').value = endereco.localidade;
            document.getElementById('estado').value = endereco.uf;
        }

        const verificarNumero = (numero) => /^[0-9]+$/.test(numero);

        const cepValido = (cep) => cep.length === 8 && verificarNumero(cep);

        const pesquisarCep = async () => {
            limparFormulario();

            const inputCep = document.getElementById('cep');
            //remove traço caso o usuário digite
            const cep = inputCep.value.replace("-", "");
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            if (cepValido(cep)) {
                try {
                    const dados = await fetch(url);
                    const endereco = await dados.json();

                    if (endereco.hasOwnProperty('erro')) {
                        inputCep.value = '';
                        alert('CEP não encontrado!');
                    } else {
                        preencherFormulario(endereco);
                    }
                } catch (error) {
                    console.error(error);
                    alert('Erro ao buscar CEP');
                }
            } else {
                //avisa se o campo não estiver vazio 
                if (cep.length > 0) alert('CEP incorreto!');
            }
        }

        //adiciona o evento APENAS se o campo existir
        const inputCep = document.getElementById('cep');
        if (inputCep) {
            inputCep.addEventListener('focusout', pesquisarCep);
        }
        // 🔹 LÓGICA DO FORMULÁRIO — CORREÇÃO PRINCIPAL
        const form = document.querySelector(".box-login");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            // --- Criar o FormData ---
            const formData = new FormData();

            // Foto do usuário (se existir)
            const fotoInput = document.getElementById("file-input-imagem");
            if (fotoInput && fotoInput.files.length > 0) {
                formData.append("image", fotoInput.files[0]);
            }

            // --- Coleta dos dados do usuário ---
            const dadosUsuario = {
                nome: document.querySelector('input[placeholder="Usuário"]').value,
                email: document.querySelector('input[type="email"]').value,
                senha: document.getElementById("criar-senha").value,
                telefone: document.querySelector('input[placeholder="Telefone"]').value,
                data_nascimento: "2003-12-17", // ajuste quando tiver input
                status_cadastro: 1
            };

            formData.append("data", JSON.stringify(dadosUsuario));

            // --- Enviar ---
            const resposta = await criarUsuario(formData);

            if (resposta) {
                alert("Usuário cadastrado com sucesso!");
                window.history.pushState({}, "", "/login");
                router();
            } else {
                alert("Erro ao cadastrar usuário.");
            }
        });
    }
};