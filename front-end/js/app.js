/* *********************************************************************
* Objetivo: Comportamento dinâmico e a lógica central da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

/* CRUD - ANIMAIS */
const API_URL_ANIMAIS = "http://localhost:8080/v1/lookme/animal/";

async function criarAnimal(formData) {
    const options = {
        method: "POST",
        body: formData
    };
    try {
        const response = await fetch(API_URL_ANIMAIS, options);
        
        // SE DER ERRO (Status diferente de 200 ou 201)
        if (!response.ok) {
            // Tenta ler o erro que o backend mandou (texto ou json)
            const errorData = await response.text(); 
            console.error("ERRO DETALHADO DO BACKEND:", errorData);
            alert(`O Backend recusou: ${response.status} - ${errorData}`);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Erro de Rede/Fetch:", error);
        alert("Erro de conexão com a API.");
        return false;
    }
}

async function atualizarAnimal(id, formData) {
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

async function deletarAnimal(id) {
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

async function lerAnimal(id) {
    const url = `${API_URL_ANIMAIS}${id}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // Ajuste defensivo para pegar o objeto correto
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

const routes = {
    "/": {
        title: "NOSSOS PETS",
        template: `
            <div class="overlay"></div>
            
            <aside class="filtros">
                <h2>FILTROS</h2>
                
                <div class="grupo">
                    <h3>Status</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="status" value="0"> Adotado</label>
                        <label><input type="checkbox" name="status" value="1" checked> Disponível</label> 
                    </div>
                </div>

                <div class="grupo">
                    <h3>Espécie</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="especie" value="1"> Cachorro</label>
                        <label><input type="checkbox" name="especie" value="2"> Gato</label>
                        <label><input type="checkbox" name="especie" value="3"> Outros</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Raça</h3>
                     <select class="select-raca" id="filtro-raca">
                        <option value="">Todas as raças</option>
                        <option value="0">Sem raça definida</option>
                        <option value="1">Poodle</option>
                        <option value="2">Bulldog</option>
                        <option value="3">Siamês</option>
                        <option value="4">Persa</option>
                        </select>
                </div>

                <div class="grupo">
                    <h3>Porte</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="porte" value="1"> Pequeno</label>
                        <label><input type="checkbox" name="porte" value="2"> Médio</label>
                        <label><input type="checkbox" name="porte" value="3"> Grande</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Idade</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="idade" value="1"> Filhote</label>
                        <label><input type="checkbox" name="idade" value="2"> Adulto</label>
                        <label><input type="checkbox" name="idade" value="3"> Idoso</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Sexo</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="sexo" value="1"> Macho</label>
                        <label><input type="checkbox" name="sexo" value="2"> Fêmea</label>
                    </div>
                </div>

                <div class="grupo">
                <h3>Região</h3>
                    <div class="filter-group">
                        <label><input type="checkbox" name="regiao" value="sudeste"> Sudeste</label>
                        <label><input type="checkbox" name="regiao" value="nordeste"> Nordeste</label>
                        <label><input type="checkbox" name="regiao" value="norte"> Norte</label>
                        <label><input type="checkbox" name="regiao" value="sul"> Sul</label>
                        <label><input type="checkbox" name="regiao" value="centro-oeste"> Centro-Oeste</label>
                    </div>
                </div>
            </aside>

            <section class="cards" id="container-cards">
                <div style="text-align: center; width: 100%; padding-top: 50px;">
                    <p style="font-size: 20px;">Carregando pets...</p>
                </div>
            </section>
        `,
        init: async () => {
            //Lógica do Menu Mobile (Visual)
            const btnFilter = document.querySelector('.botao-mobile-filter');
            const menuFiltros = document.querySelector('.filtros');
            const overlay = document.querySelector('.overlay');

            if (btnFilter && menuFiltros && overlay) {
                btnFilter.addEventListener('click', () => {
                    menuFiltros.classList.add('ativo');
                    overlay.classList.add('ativo');
                });
                overlay.addEventListener('click', () => {
                    menuFiltros.classList.remove('ativo');
                    overlay.classList.remove('ativo');
                });
            }

            // Variáveis de Estado 
            const containerCards = document.getElementById('container-cards');
            const apiUrl = 'http://localhost:8080/v1/lookme/animal/';
            let todosOsPets = []; // Guarda a lista original para não precisar refazer o fetch

            // Função de Renderização
            const renderizarPets = (lista) => {
                containerCards.innerHTML = ''; // Limpa a tela

                if (!lista || lista.length === 0) {
                    containerCards.innerHTML = '<p style="text-align:center; width:100%">Nenhum pet encontrado com esses filtros.</p>';
                    return;
                }

                lista.forEach(pet => {
                    const statusTexto = pet.status_adocao === 1 ? 'Disponível' : 'Adotado';
                    const imagemPet = pet.foto_url ? pet.foto_url : './img/pet-teste.jpg';

                    const card = document.createElement('div');
                    card.classList.add('card');

                    // ID na URL
                    card.onclick = () => {
                        window.history.pushState({}, '', `/pet?id=${pet.animal_id}`);
                        window.route();
                    };

                    card.innerHTML = `
                        <img src="${imagemPet}" alt="${pet.nome}" onerror="this.src='./img/pet-teste.jpg'">
                        <h3>${pet.nome}</h3>
                        <p>${statusTexto}</p>
                    `;
                    containerCards.appendChild(card);
                });
            };

            // Função de Filtragem 
            const aplicarFiltros = () => {
                // Captura os valores marcados
                const especiesSelecionadas = Array.from(document.querySelectorAll('input[name="especie"]:checked')).map(el => parseInt(el.value));
                const portesSelecionados = Array.from(document.querySelectorAll('input[name="porte"]:checked')).map(el => parseInt(el.value));
                const idadesSelecionadas = Array.from(document.querySelectorAll('input[name="idade"]:checked')).map(el => parseInt(el.value));
                const sexosSelecionados = Array.from(document.querySelectorAll('input[name="sexo"]:checked')).map(el => parseInt(el.value));
                const statusSelecionados = Array.from(document.querySelectorAll('input[name="status"]:checked')).map(el => parseInt(el.value));

                const racaSelecionada = document.getElementById('filtro-raca').value;

                // Filtra o array original
                const petsFiltrados = todosOsPets.filter(pet => {
                    // Verifica Espécie (se nenhum marcado, aceita todos)
                    if (especiesSelecionadas.length > 0 && !especiesSelecionadas.includes(pet.especie_id)) return false;

                    // Verifica Porte
                    if (portesSelecionados.length > 0 && !portesSelecionados.includes(pet.porte_id)) return false;

                    // Verifica Idade
                    if (idadesSelecionadas.length > 0 && !idadesSelecionadas.includes(pet.idade_id)) return false;

                    // Verifica Sexo
                    if (sexosSelecionados.length > 0 && !sexosSelecionados.includes(pet.sexo_id)) return false;

                    // Verifica Status
                    if (statusSelecionados.length > 0 && !statusSelecionados.includes(pet.status_adocao)) return false;

                    // Verifica Raça
                    if (racaSelecionada !== "" && pet.raca_id != racaSelecionada) return false;

                    return true; // Passou em tudo
                });

                renderizarPets(petsFiltrados);
            };

            // Adicionar Event Listeners aos Inputs 
            // Seleciona todos os checkboxes e selects dentro de .filtros e adiciona o evento 'change'
            const inputsFiltro = document.querySelectorAll('.filtros input, .filtros select');
            inputsFiltro.forEach(input => {
                input.addEventListener('change', aplicarFiltros);
            });

            // Fetch Inicial 
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`Erro API: ${response.status}`);

                const dados = await response.json();
                todosOsPets = dados.items.animal || []; // Salva na memória global da função

                // Aplica o filtro inicial (para pegar o status "checked" do HTML, por exemplo)
                aplicarFiltros();

            } catch (error) {
                console.error("Erro:", error);
                containerCards.innerHTML = '<p style="text-align:center;">Erro ao carregar pets. Verifique a API.</p>';
            }
        }
    },
    "/favoritos": {
        title: "FAVORITOS",
        template: `
            <div class="favoritos-container">
                <section class="cards">
                    <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Rex</h3>
                        <p>Disponível</p>
                    </div>
                    <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Bolinha</h3>
                        <p>Disponível</p>
                    </div>
                    <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Thor</h3>
                        <p>Disponível</p>
                    </div>
                     <div class="card">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Jade</h3>
                        <p>Disponível</p>
                    </div>
                </section>
            </div>
        `
    },
    "/notificacoes": {
        title: "NOTIFICAÇÕES",
        template: `
            <div class="notificacoes-wrapper">
                <div class="notificacoes-container">
                    
                    <div class="notificacao-card">
                        <span class="card-titulo">PEDIDO DE ADOÇÃO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                    <div class="notificacao-card">
                        <span class="card-titulo">RETORNO DO PEDIDO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                    <div class="notificacao-card">
                        <span class="card-titulo">RETORNO DO PEDIDO</span>
                        <a href="/detalhes-pedido" class="spa-link botao">VER DETALHES</a>
                    </div>

                </div>
            </div>
        `
    },
    "/perfil": {
        title: "MEU PERFIL",
        template: `
            <div class="perfil-container">
                <div class="perfil-section">
                    <div class="photo-upload">
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
        }
    },
    "/cadastro": {
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
        }
    },
    "/login": {
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
    },
    "/anunciar": {
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
                if(desabilitar) {
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

            if(uploadBox && fileInput) {
                uploadBox.addEventListener('click', () => fileInput.click());
                fileInput.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files[0]) {
                        arquivoSelecionado = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = function(e) {
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
                    if(sucesso) {
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
                    if(sucesso) {
                        alert("Criado com sucesso!");
                        window.location.hash = "/meus-pets";
                    } 
                }
            });

            btnExcluir.addEventListener('click', async () => {
                if(confirm("Tem certeza que deseja excluir este pet?")) {
                    const sucesso = await deletarAnimal(idEdicao);
                    if(sucesso) {
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
    },
    "/detalhes-pedido": {
        title: "DETALHES DO PEDIDO",
        template: `
            <div class="detalhes-pedido-container">
                <div class="card-solicitacao">
                    
                    <div class="pet-area">
                        <img src="./img/pet-teste.jpg" alt="Foto do Gato" class="pet-img">
                        <h3>Will</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="interessado-area">
                        
                        <div class="interessado-info">
                            <img src="./img/pessoa-teste.PNG" alt="Foto do Solicitante" class="requester-avatar">
                            
                            <div class="interessado-detalhes">
                                <h4>Michael Corleone</h4>
                                <p><strong>Data de Nascimento:</strong> 23/03/1999</p>
                                <p><strong>Telefone:</strong> 11 99582-5234</p>
                                <p><strong>Endereço:</strong> Rua Italia, 99, Jandira - SP</p>
                                <p><strong>Email:</strong> corleone@gmail.com</p>
                            </div>
                        </div>

                        <div class="botoes-acao">
                            <button class="botao botao-aceitar">Aceitar</button>
                            <button class="botao botao-recusar">Recusar</button>
                        </div>

                    </div>

                </div>
            </div>
        `,
        init: () => {
            const btnAceitar = document.querySelector('.botao-aceitar');
            const btnRecusar = document.querySelector('.botao-recusar');

            if (btnAceitar) {
                btnAceitar.addEventListener('click', () => {
                    if (confirm('Deseja aceitar este pedido de adoção?')) {
                        alert('Pedido aceito com sucesso! Entre em contato com o adotante.');
                    }
                });
            }

            if (btnRecusar) {
                btnRecusar.addEventListener('click', () => {
                    if (confirm('Tem certeza que deseja recusar este pedido?')) {
                        alert('Pedido recusado.');
                        // Opcional: voltar para notificações
                        window.history.pushState({}, "", "/notificacoes");
                        window.route();
                    }
                });
            }
        }
    },
    "/pet": {
        title: "DETALHES DO PET",
        template: `
            <div class="detalhes-pet-container">
                <div id="loading-message" style="text-align: center; padding: 50px;">
                    <h2>Carregando informações do pet...</h2>
                </div>

                <div id="pet-content" style="display: none;">
                    <div class="pet-card">
                        <div class="pet-header">
                            <div class="pet-image">
                                <img id="detalhe-img" src="./img/pet-teste.jpg" alt="Foto do Pet">
                            </div>
                            <div class="pet-info">
                                <h1 class="pet-nome" id="detalhe-nome">Nome do Pet</h1>
                                <div class="pet-detalhes">
                                    <p><strong>Espécie:</strong> <span id="detalhe-especie">...</span></p>
                                    <p><strong>Raça:</strong> <span id="detalhe-raca">...</span></p>
                                    <p><strong>Porte:</strong> <span id="detalhe-porte">...</span></p>
                                    <p><strong>Idade:</strong> <span id="detalhe-idade">...</span></p>
                                    <p><strong>Sexo:</strong> <span id="detalhe-sexo">...</span></p>
                                    <p><strong>Status:</strong> <span id="detalhe-status">...</span></p>
                                </div>
                                <button class="botao-adote">QUERO ADOTAR</button>
                            </div>
                            <button class="botao-favorito"><i class="bi bi-heart"></i></button>
                        </div>
                    </div>

                    <div class="info-card descricao-card">
                        <h2>Descrição</h2>
                        <p id="detalhe-descricao">...</p>
                    </div>

                    <div class="bottom-cards">
                        <div class="info-card expandable-card">
                            <div class="card-header">
                                <h2>Temperamento</h2>
                                <i class="bi bi-chevron-down chevron-icon"></i>
                            </div>
                            <div class="card-conteudo">
                                <p id="detalhe-temperamento">...</p>
                            </div>
                        </div>

                        <div class="info-card expandable-card">
                            <div class="card-header">
                                <h2>Informações Veterinárias</h2>
                                <i class="bi bi-chevron-down chevron-icon"></i>
                            </div>
                            <div class="card-conteudo">
                                <p id="detalhe-vet">...</p>
                            </div>
                        </div>

                        <div class="info-card expandable-card">
                            <div class="card-header">
                                <h2>Adaptabilidade</h2>
                                <i class="bi bi-chevron-down chevron-icon"></i>
                            </div>
                            <div class="card-conteudo">
                                <p id="detalhe-adaptabilidade">...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        init: async () => {
            //Pega o ID da URL
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');

            if (!id) {
                alert("Pet não identificado!");
                return;
            }

            // Mapas para traduzir os IDs 
            const mapEspecie = { 1: 'Cachorro', 2: 'Gato', 3: 'Outros' };
            const mapPorte = { 1: 'Pequeno', 2: 'Médio', 3: 'Grande' };
            const mapIdade = { 1: 'Filhote', 2: 'Adulto', 3: 'Idoso' };
            const mapSexo = { 1: 'Macho', 2: 'Fêmea' };
            const mapRaca = { 1: 'Sem raça definida', 2: 'Poodle', 3: 'Bulldog', 4: 'Siamês' }; // Exemplo

            // Busca os dados na API
            try {
                // Tenta buscar no endpoint específico: .../animal/3
                const response = await fetch(`http://localhost:8080/v1/lookme/animal/${id}`);

                if (!response.ok) throw new Error('Erro ao buscar detalhes do pet');

                const dados = await response.json();

                let pet = dados;

                if (dados.items && dados.items.animal) pet = dados.items.animal[0];
                else if (Array.isArray(dados)) pet = dados[0];

                // Preenche o HTML
                document.getElementById('detalhe-nome').innerText = pet.nome;
                document.getElementById('detalhe-descricao').innerText = pet.descricao || "Sem descrição.";
                document.getElementById('detalhe-temperamento').innerText = pet.temperamento || "Não informado.";
                document.getElementById('detalhe-vet').innerText = pet.informacoes_veterinarias || "Não informado.";
                document.getElementById('detalhe-adaptabilidade').innerText = pet.adaptabilidade || "Não informado.";

                // Tradução dos IDs usando os mapas
                document.getElementById('detalhe-especie').innerText = mapEspecie[pet.especie_id] || 'Desconhecido';
                document.getElementById('detalhe-raca').innerText = mapRaca[pet.raca_id] || 'Outra';
                document.getElementById('detalhe-porte').innerText = mapPorte[pet.porte_id] || 'Desconhecido';
                document.getElementById('detalhe-idade').innerText = mapIdade[pet.idade_id] || 'Desconhecido';
                document.getElementById('detalhe-sexo').innerText = mapSexo[pet.sexo_id] || 'Desconhecido';

                document.getElementById('detalhe-status').innerText = pet.status_adocao === 1 ? 'Disponível' : 'Indisponível';

                // Imagem
                const imgEl = document.getElementById('detalhe-img');
                imgEl.src = pet.foto_url || './img/pet-teste.jpg';
                imgEl.onerror = () => imgEl.src = './img/pet-teste.jpg';

                // Mostra o conteúdo e esconde o loading
                document.getElementById('loading-message').style.display = 'none';
                document.getElementById('pet-content').style.display = 'block';

            } catch (error) {
                console.error(error);
                document.getElementById('loading-message').innerHTML = '<h3 style="color:red">Erro ao carregar detalhes. Tente novamente.</h3>';
            }

            // Accordions
            const headers = document.querySelectorAll('.expandable-card .card-header');
            headers.forEach(header => {
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                newHeader.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const currentCard = newHeader.closest('.expandable-card');
                    const currentContent = currentCard.querySelector('.card-conteudo');
                    currentCard.classList.toggle('active');
                    if (currentCard.classList.contains('active')) {
                        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
                        currentContent.style.marginTop = "15px";
                        currentContent.style.opacity = "1";
                    } else {
                        currentContent.style.maxHeight = null;
                        currentContent.style.marginTop = "0";
                        currentContent.style.opacity = "0";
                    }
                });
            });

            // Lógica do botão favorito
            const btnFav = document.querySelector('.botao-favorito');
            if (btnFav) {
                btnFav.addEventListener('click', () => {
                    const icon = btnFav.querySelector('i');
                    if (icon.classList.contains('bi-heart')) {
                        icon.classList.remove('bi-heart');
                        icon.classList.add('bi-heart-fill');
                        icon.style.color = 'red';
                    } else {
                        icon.classList.remove('bi-heart-fill');
                        icon.classList.add('bi-heart');
                        icon.style.color = '#0475A8';
                    }
                });
            }
        }
    },
    "/meus-pets": {
        title: "MEUS PETS",
        template: `
            <div class="meus-pets-container">
                <section class="cards">
                    
                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Thor</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Mel</h3>
                        <p>Disponível</p>
                    </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Bob</h3>
                        <p>Disponível</p>
                    </div>

                </section>
            </div>
        `
    },
    "/meus-pedidos": {
        title: "MEUS PEDIDOS",
        template: `
            <div class="meus-pedidos-container">
                <section class="cards">

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Luna</h3>
                        <p style="color: orange;">Aguardando</p> </div>

                    <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                        <img src="./img/pet-teste.jpg" alt="Pet">
                        <h3>Max</h3>
                        <p style="color: green;">Aprovado</p>
                    </div>

                </section>
            </div>
        `
    },
    404: {
        title: "Página não encontrada",
        template: `<h2>Erro 404</h2>`
    }
};

const router = () => {
    let path = window.location.pathname;
    if (path === '/index.html') path = '/';

    const route = routes[path] || routes[404];

    // insere o html
    document.getElementById('app').innerHTML = route.template;

    // atualiza o Título
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.innerText = route.title;

    // ocultar Cabeçalho Secundário fora da Home
    const cabecalhoSecundario = document.querySelector('.cabecalho-secundario');
    if (cabecalhoSecundario) {
        if (path === '/') {
            // Se for Home, mostra (usa o display original do CSS, que é flex)
            cabecalhoSecundario.style.display = 'flex';
        } else {
            // Se for qualquer outra página, esconde
            cabecalhoSecundario.style.display = 'none';
        }
    }

    // executa o script específico da página (se houver)
    if (route.init) {
        route.init();
    }
};

// Navegação via links
document.addEventListener('click', (e) => {
    // Procura o link mais próximo que tenha a classe spa-link
    const link = e.target.closest('.spa-link');

    // VERIFICAÇÃO EXTRA: Se for o botão de filtro, NÃO navega
    if (e.target.closest('.botao-mobile-filter')) return;

    if (link) {
        e.preventDefault();
        window.history.pushState({}, "", link.getAttribute('href'));
        router();
    }
});

window.onpopstate = router;
window.route = router;

// Inicia o router ao carregar
router();