/* *********************************************************************
* Objetivo: Template e lógica de cadastro/edição de Pets
* Autor: Marcelo Vieira
* Data: 14/12/2025
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
                    <button id="btn-salvar" class="botao botao-salvar">Salvar Pet</button>
                    <button id="btn-excluir" class="botao botao-excluir" style="display: none;">Excluir Pet</button>
                    <button id="btn-cancelar" class="botao botao-cancelar">Cancelar</button>
                </div>
            </div>
        `,
    init: async () => {
        //Elementos do DOM
        const uploadBox = document.querySelector('.photo-upload');
        const fileInput = document.getElementById('file-input');
        const previewImg = document.getElementById('preview-image');
        const iconContainer = document.getElementById('upload-icon-container');
        
        const btnSalvar = document.getElementById('btn-salvar');
        const btnExcluir = document.getElementById('btn-excluir');

        let arquivoSelecionado = null;

        //Verifica Login e Pega ID do Usuário
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuarioLogado) {
            alert("Faça login para anunciar um pet.");
            window.location.hash = "/login";
            return;
        }
        // Garante que pega o ID correto independente da variação do nome
        const idUsuario = usuarioLogado.id || usuarioLogado.id_usuario || usuarioLogado.usuario_id;

        // Verifica se é EDIÇÃO (pega ID da URL)
        const paramsString = window.location.hash.split('?')[1];
        const params = new URLSearchParams(paramsString);
        const idEdicao = params.get('id');

        // LÓGICA DE CARREGAMENTO PARA EDIÇÃO
        if (idEdicao) {
            console.log("Modo Edição ativado para ID:", idEdicao);
            btnSalvar.innerText = "Atualizar Dados";
            btnExcluir.style.display = "inline-block";

            try {
                const pet = await lerAnimal(idEdicao);
                if (pet) {
                    // Preenche os campos
                    document.getElementById('nome').value = pet.nome || "";
                    document.getElementById('especie').value = pet.especie_id || "";
                    document.getElementById('raca').value = pet.raca_id || "";
                    document.getElementById('porte').value = pet.porte_id || "";
                    document.getElementById('idade').value = pet.idade_id || "";
                    document.getElementById('sexo').value = pet.sexo_id || "";
                    document.getElementById('castrado').value = (pet.status_castracao !== undefined) ? pet.status_castracao : "";
                    
                    document.getElementById('descricao').value = pet.descricao || "";
                    document.getElementById('temperamento').value = pet.temperamento || "";
                    document.getElementById('infos_veterinarias').value = pet.informacoes_veterinarias || "";
                    document.getElementById('adaptabilidade').value = pet.adaptabilidade || "";

                    // Mostra foto existente
                    if (pet.foto_url) {
                        previewImg.src = pet.foto_url;
                        previewImg.style.display = 'block';
                        iconContainer.style.display = 'none';
                    }
                } else {
                    alert("Pet não encontrado.");
                    window.location.hash = "/meuspets";
                }
            } catch (error) {
                console.error("Erro ao carregar pet:", error);
            }
        }

        //Lógica de Upload de Imagem (Preview)
        if (uploadBox && fileInput) {
            uploadBox.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    arquivoSelecionado = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function (evt) {
                        previewImg.src = evt.target.result;
                        previewImg.style.display = 'block';
                        iconContainer.style.display = 'none';
                    }
                    reader.readAsDataURL(arquivoSelecionado);
                }
            });
        }

        // BOTÃO SALVAR
        btnSalvar.addEventListener('click', async () => {
            const nome = document.getElementById('nome').value;
            const especie = document.getElementById('especie').value;
            const castradoValue = document.getElementById('castrado').value;

            if (!nome || !especie || castradoValue === "") {
                alert("Preencha os campos obrigatórios (Nome, Espécie, Castração).");
                return;
            }

            // Criação do JSON
            const animalJson = {
                "nome": nome,
                "temperamento": document.getElementById('temperamento').value || "Não informado",
                "informacoes_veterinarias": document.getElementById('infos_veterinarias').value || "Não informado",
                "descricao": document.getElementById('descricao').value || "Sem descrição",
                "adaptabilidade": document.getElementById('adaptabilidade').value || "Não informado",

                "porte_id": parseInt(document.getElementById('porte').value) || 1,
                "raca_id": parseInt(document.getElementById('raca').value) || 0,
                "especie_id": parseInt(especie) || 1,
                "idade_id": parseInt(document.getElementById('idade').value) || 1,
                "sexo_id": parseInt(document.getElementById('sexo').value) || 1,
                "status_castracao": parseInt(castradoValue), 

                "status_adocao": 1, 
                "status_cadastro": 1, 
                "usuario_id": parseInt(idUsuario) //ID DINÂMICO AQUI
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(animalJson));

            // Feedback visual
            btnSalvar.disabled = true;
            btnSalvar.innerText = "Salvando...";

            try {
                if (idEdicao) {
                    // ATUALIZAÇÃO
                    if (arquivoSelecionado) {
                        formData.append('image', arquivoSelecionado);
                    }
                    
                    const sucesso = await atualizarAnimal(idEdicao, formData);
                    if(sucesso) {
                        alert("Atualizado com sucesso!");
                        window.location.hash = "/meuspets"; 
                    } else {
                        alert("Erro ao atualizar.");
                    }

                } else {
                    // CRIAÇÃO
                    if (!arquivoSelecionado) {
                        alert("Por favor, selecione uma foto para o pet.");
                        btnSalvar.disabled = false;
                        btnSalvar.innerText = "Salvar Pet";
                        return;
                    }
                    formData.append('image', arquivoSelecionado);
                    
                    const sucesso = await criarAnimal(formData);
                    if(sucesso) {
                        alert("Pet anunciado com sucesso!");
                        window.location.hash = "/meuspets"; 
                    } 
                }
            } catch (error) {
                console.error(error);
                alert("Ocorreu um erro técnico.");
            } finally {
                btnSalvar.disabled = false;
                if(!idEdicao) btnSalvar.innerText = "Salvar Pet";
            }
        });

        // BOTÃO EXCLUIR
        btnExcluir.addEventListener('click', async () => {
            if (confirm("Tem certeza que deseja excluir este pet permanentemente?")) {
                const sucesso = await deletarAnimal(idEdicao);
                if (sucesso) {
                    alert("Pet excluído.");
                    window.location.hash = "/meuspets";
                } else {
                    alert("Erro ao excluir.");
                }
            }
        });

        // BOTÃO CANCELAR
        document.getElementById('btn-cancelar').addEventListener('click', () => {
            window.location.hash = "/meuspets";
        });
    }
};