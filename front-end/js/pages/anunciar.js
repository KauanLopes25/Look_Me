/* *********************************************************************
* Objetivo: Template e a lógica do formulário de cadastro, importando o serviço.
* Data: 09/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

import { criarAnimal, atualizarAnimal, deletarAnimal, lerAnimal } from '../services/animalService.js';

export const Anunciar = {
    title: "ANUNCIAR PET",
    template: `
            <div class="anunciar-container">
                <div class="top-section">
                    <div class="photo-upload">
                        <div class="upload-icon" id="upload-icon-container">
                            <i class="bi bi-cloud-upload-fill"></i>
                        </div>
                        <img id="preview-image" src="" alt="Preview" style="display: none; width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
                        <input type="file" id="file-input" style="display: none;" accept="image/*">
                    </div>

                    <div class="info-basica">
                        <input type="text" id="nome" placeholder="Nome do Pet" class="input-padrao form-input">

                        <div class="input-selecao">
                            <select id="especie" class="input-padrao form-input">
                                <option disabled selected value="">Espécie</option>
                                <option value="1">Cachorro</option>
                                <option value="2">Gato</option>
                                <option value="3">Outro</option>
                            </select>
                            
                            <select id="raca" class="input-padrao form-input">
                                <option disabled selected value="">Raça</option>
                                <option value="0">Sem raça definida</option>
                                <option value="1">Poodle</option>
                                <option value="2">Bulldog</option>
                                <option value="3">Siamês</option>
                                <option value="4">Persa</option>
                                <option value="5">Outros</option>
                            </select>

                            <select id="porte" class="input-padrao form-input">
                                <option disabled selected value="">Porte</option>
                                <option value="1">Pequeno</option>
                                <option value="2">Médio</option>
                                <option value="3">Grande</option>
                            </select>
                            
                            <select id="idade" class="input-padrao form-input">
                                <option disabled selected value="">Idade</option>
                                <option value="1">Filhote</option>
                                <option value="2">Adulto</option>
                                <option value="3">Idoso</option>
                            </select>

                            <select id="sexo" class="input-padrao form-input">
                                <option disabled selected value="">Sexo</option>
                                <option value="1">Macho</option>
                                <option value="2">Fêmea</option>
                            </select>

                            <select id="castrado" class="input-padrao form-input">
                                <option disabled selected value="">Castrado?</option>
                                <option value="1">Sim</option>
                                <option value="0">Não</option>
                            </select>
                        </div>
                    </div>

                    <div class="description-box">
                        <textarea id="descricao" placeholder="Descrição" class="input-padrao form-input"></textarea>
                    </div>
                </div>

                <div class="details-section">
                    <textarea id="temperamento" placeholder="Temperamento" class="input-padrao form-input"></textarea>
                    <textarea id="infos_veterinarias" placeholder="Informações Veterinárias" class="input-padrao form-input"></textarea>
                    <textarea id="adaptabilidade" placeholder="Adaptabilidade" class="input-padrao form-input"></textarea>
                </div>

                <div class="actions-section">
                    <button id="btn-salvar" class="botao botao-salvar">Salvar</button>
                    <button id="btn-editar" class="botao botao-editar" style="display: none;">Editar</button>
                    <button id="btn-excluir" class="botao botao-excluir" style="display: none;">Excluir</button>
                    <button id="btn-cancelar" class="botao botao-cancelar">Cancelar</button>
                </div>
            </div>
        `,
    init: async () => {
        const uploadBox = document.querySelector('.photo-upload');
        const fileInput = document.getElementById('file-input');
        const previewImg = document.getElementById('preview-image');
        const iconContainer = document.getElementById('upload-icon-container');
        const inputs = document.querySelectorAll('.form-input');

        const btnSalvar = document.getElementById('btn-salvar');
        const btnEditar = document.getElementById('btn-editar');
        const btnExcluir = document.getElementById('btn-excluir');

        let arquivoSelecionado = null;

        const paramsString = window.location.hash.split('?')[1];
        const params = new URLSearchParams(paramsString);
        const idEdicao = params.get('id');

        const toggleCampos = (desabilitar) => {
            inputs.forEach(input => input.disabled = desabilitar);
            if (desabilitar) {
                uploadBox.style.pointerEvents = 'none';
                uploadBox.style.opacity = '0.7';
            } else {
                uploadBox.style.pointerEvents = 'auto';
                uploadBox.style.opacity = '1';
            }
        };

        btnEditar.addEventListener('click', () => {
            toggleCampos(false);
            btnEditar.style.display = 'none';
            btnSalvar.style.display = 'block';
            btnSalvar.innerText = "ATUALIZAR";
        });

        if (uploadBox && fileInput) {
            uploadBox.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    arquivoSelecionado = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                        iconContainer.style.display = 'none';
                    }
                    reader.readAsDataURL(arquivoSelecionado);
                }
            });
        }

        //BOTÃO SALVAR
        btnSalvar.addEventListener('click', async () => {
            const nome = document.getElementById('nome').value;
            const especie = document.getElementById('especie').value;
            const castradoValue = document.getElementById('castrado').value;

            if (!nome || !especie || castradoValue === "") {
                alert("Preencha os campos obrigatórios (Nome, Espécie, Castração).");
                return;
            }

            //CRIAÇÃO DO JSON
            const animalJson = {
                // Campos vindos dos inputs
                "nome": nome,
                "temperamento": document.getElementById('temperamento').value || "Não informado",
                "informacoes_veterinarias": document.getElementById('infos_veterinarias').value || "Não informado",
                "descricao": document.getElementById('descricao').value || "Sem descrição",
                "adaptabilidade": document.getElementById('adaptabilidade').value || "Não informado",

                // Campos de IDs (Convertidos para Int)
                "porte_id": parseInt(document.getElementById('porte').value) || 1,
                "raca_id": parseInt(document.getElementById('raca').value) || 0,
                "especie_id": parseInt(especie) || 1,
                "idade_id": parseInt(document.getElementById('idade').value) || 1,
                "sexo_id": parseInt(document.getElementById('sexo').value) || 1,
                "status_castracao": parseInt(castradoValue), // 0 ou 1

                // Campos Fixos (Sem input na tela)
                "status_adocao": 1,   // 1 = Disponível
                "status_cadastro": 1, // 1 = Ativo
                "usuario_id": 3       // Usuário fixo PARA TESTE
            };

            const formData = new FormData();

            // Anexa o JSON no campo 'data'
            formData.append('data', JSON.stringify(animalJson));

            if (idEdicao) {
                // EDIÇÃO
                if (arquivoSelecionado) {
                    formData.append('image', arquivoSelecionado);
                }
                const sucesso = await atualizarAnimal(idEdicao, formData);
                if (sucesso) {
                    alert("Atualizado com sucesso!");
                    window.location.hash = "/meus-pets";
                } else alert("Erro ao atualizar.");

            } else {
                // CRIAÇÃO
                if (!arquivoSelecionado) {
                    alert("Selecione uma foto.");
                    return;
                }
                // Anexa a imagem no campo 'image'
                formData.append('image', arquivoSelecionado);

                const sucesso = await criarAnimal(formData);
                if (sucesso) {
                    alert("Criado com sucesso!");
                    window.location.hash = "/meus-pets";
                }
            }
        });

        btnExcluir.addEventListener('click', async () => {
            if (confirm("Tem certeza que deseja excluir este pet?")) {
                const sucesso = await deletarAnimal(idEdicao);
                if (sucesso) {
                    alert("Pet excluído.");
                    window.location.hash = "/meus-pets";
                } else {
                    alert("Erro ao excluir.");
                }
            }
        });

        document.getElementById('btn-cancelar').addEventListener('click', () => {
            window.location.hash = "/meus-pets";
        });
    }
};