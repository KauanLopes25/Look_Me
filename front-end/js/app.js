/* *********************************************************************
* Objetivo: Comportamento dinâmico e a lógica central da aplicação
* Data: 04/12/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const routes = {
    "/": {
        title: "NOSSOS PETS",
        template: `
            <div class="overlay"></div>
            
            <aside class="filtros">
                <h2>FILTROS</h2>
                <div class="grupo">
                    <h3>Região</h3>
                    <div>
                        <label><input type="checkbox"> Sudeste</label>
                        <label><input type="checkbox"> Nordeste</label>
                        <label><input type="checkbox"> Norte</label>
                        <label><input type="checkbox"> Sul</label>
                        <label><input type="checkbox"> Centro-Oeste</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Espécie</h3>
                    <div>
                        <label><input type="checkbox"> Cachorro</label>
                        <label><input type="checkbox"> Gato</label>
                        <label><input type="checkbox"> Outros</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Raça</h3>
                    <select class="select-raca">
                        <option value="">Selecione uma raça</option>
                        <option value="sem-raca">Sem raça definida</option>
                        <option value="poodle">Poodle</option>
                        <option value="bulldog">Bulldog</option>
                        <option value="siames">Siamês</option>
                        <option value="persa">Persa</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <div class="grupo">
                    <h3>Porte</h3>
                    <div>
                        <label><input type="checkbox"> Pequeno</label>
                        <label><input type="checkbox"> Médio</label>
                        <label><input type="checkbox"> Grande</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Idade</h3>
                    <div>
                        <label><input type="checkbox"> Filhote</label>
                        <label><input type="checkbox"> Adulto</label>
                        <label><input type="checkbox"> Idoso</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Sexo</h3>
                    <div>
                        <label><input type="checkbox"> Macho</label>
                        <label><input type="checkbox"> Fêmea</label>
                    </div>
                </div>

                <div class="grupo">
                    <h3>Status</h3>
                    <div>
                        <label><input type="checkbox"> Adotado</label>
                        <label><input type="checkbox"> Disponível</label>
                    </div>
                </div>
            </aside>

            <section class="cards">
                <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                    <img src="./img/pet-teste.jpg" alt="Pet">
                    <h3>teste</h3>
                    <p>Disponível</p>
                </div>
                 <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                    <img src="./img/pet-teste.jpg" alt="Pet">
                    <h3>teste</h3>
                    <p>Disponível</p>
                </div>
                 <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                    <img src="./img/pet-teste.jpg" alt="Pet">
                    <h3>teste</h3>
                    <p>Disponível</p>
                </div>
                 <div class="card" onclick="window.history.pushState({}, '', '/pet'); window.route();">
                    <img src="./img/pet-teste.jpg" alt="Pet">
                    <h3>teste</h3>
                    <p>Disponível</p>
                </div>
            </section>
        `,
        //função específica para fazer os scripts da Home funcionarem
        init: () => {
            const btnFilter = document.querySelector('.botao-mobile-filter');
            const menuFiltros = document.querySelector('.filtros');
            const overlay = document.querySelector('.overlay');

            // adiciona o evento se os elementos existirem (proteção de erro)
            if (btnFilter && menuFiltros && overlay) {
                
                //abrir menu
                btnFilter.addEventListener('click', () => {
                    menuFiltros.classList.add('ativo');
                    overlay.classList.add('ativo');
                });

                //fechar ao clicar no overlay
                overlay.addEventListener('click', () => {
                    menuFiltros.classList.remove('ativo');
                    overlay.classList.remove('ativo');
                });
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
                        <input type="text" placeholder="Preferencia de pet" class="input-padrao">
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
            
            if(uploadBox && fileInput) {
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
                
                if(input && icon) {
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
                     if(cep.length > 0) alert('CEP incorreto!');
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
            
            if(input && icon) {
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
                        <div class="upload-icon">
                            <i class="bi bi-cloud-upload-fill"></i>
                        </div>
                        <input type="file" id="file-input" style="display: none;" accept="image/*">
                    </div>

                    <div class="info-basica">
                        <input type="text" placeholder="Nome do Pet" class="input-padrao">

                        <div class="input-selecao">
                            <select class="input-padrao">
                                <option disabled selected>Espécie</option>
                                <option value="cachorro">Cachorro</option>
                                <option value="gato">Gato</option>
                                <option value="outro">Outro</option>
                            </select>
                            <select class="input-padrao">
                                <option disabled selected>Raça</option>
                                <option value="sem-raca">Sem raça definida</option>
                                <option value="poodle">Poodle</option>
                                <option value="bulldog">Bulldog</option>
                                <option value="siames">Siamês</option>
                                <option value="persa">Persa</option>
                                <option value="outros">Outros</option>
                            </select>

                            <select class="input-padrao">
                                <option disabled selected>Porte</option>
                                <option value="pequeno">Pequeno</option>
                                <option value="medio">Médio</option>
                                <option value="grande">Grande</option>
                            </select>
                            <select class="input-padrao">
                                <option disabled selected>Idade</option>
                                <option value="filhote">Filhote</option>
                                <option value="adulto">Adulto</option>
                                <option value="idoso">Idoso</option>
                            </select>

                            <select class="input-padrao">
                                <option disabled selected>Sexo</option>
                                <option value="m">Macho</option>
                                <option value="f">Femea</option>
                            </select>
                        </div>
                    </div>

                    <div class="description-box">
                        <textarea placeholder="Descrição" class="input-padrao"></textarea>
                    </div>
                </div>

                <div class="details-section">
                    <textarea placeholder="Temperamento" class="input-padrao"></textarea>
                    <textarea placeholder="Informações Veterinárias" class="input-padrao"></textarea>
                    <textarea placeholder="Adaptabilidade" class="input-padrao"></textarea>
                </div>

                <div class="actions-section">
                    <button class="botao botao-salvar">Salvar</button>
                    <button class="botao botao-editar">Editar</button>
                    <button class="botao botao-excluir">Excluir</button>
                    <button class="botao botao-cancelar">Cancelar</button>
                </div>
            </div>
        `,
        init: () => {
            //logica para simular o clique no upload de imagem (NECESSARIO ALTERAR DEPOIS)
            const uploadBox = document.querySelector('.photo-upload');
            const fileInput = document.getElementById('file-input');
            
            if(uploadBox && fileInput) {
                uploadBox.addEventListener('click', () => {
                    fileInput.click();
                });
                
                fileInput.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files[0]) {
                        // Apenas um feedback visual simples que selecionou
                        alert(`Imagem selecionada: ${e.target.files[0].name}`);
                    }
                });
            }
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

            if(btnAceitar) {
                btnAceitar.addEventListener('click', () => {
                    if(confirm('Deseja aceitar este pedido de adoção?')) {
                        alert('Pedido aceito com sucesso! Entre em contato com o adotante.');
                    }
                });
            }

            if(btnRecusar) {
                btnRecusar.addEventListener('click', () => {
                    if(confirm('Tem certeza que deseja recusar este pedido?')) {
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

                <div class="pet-card">
                    <div class="pet-header">
                        <div class="pet-image">
                            <img src="./img/pet-teste.jpg" alt="Will - Gato para adoção">
                        </div>
                        <div class="pet-info">
                            <h1 class="pet-nome">Will</h1>
                            <div class="pet-detalhes">
                                <p><strong>Espécie:</strong> Gato</p>
                                <p><strong>Raça:</strong> Sem Informação</p>
                                <p><strong>Porte:</strong> Médio</p>
                                <p><strong>Idade:</strong> Adulto</p>
                                <p><strong>Sexo:</strong> Macho</p>
                                <p><strong>Castrado:</strong> Sem Informação</p>
                                <p><strong>Status:</strong> Disponível</p>
                                <p><strong>Responsável:</strong> Victor</p>
                                <p><strong>Localização:</strong> São Paulo - SP</p>
                                <p><strong>Telefone:</strong> 11 99447-6842</p>
                                <p><strong>Email:</strong> vitchugo@gmail.com</p>
                            </div>
                            <button class="botao-adote">ADOTE</button>
                        </div>
                        <button class="botao-favorito">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>

                <div class="info-card descricao-card">
                    <h2>Descrição</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius eros quis nisi fermentum, sed
                        placerat arcu dignissim. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>

                <div class="bottom-cards">
                    
                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Temperamento</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p>Super dócil e brincalhão. Gosta de dormir no sofá e brincar com bolinhas de papel.</p>
                        </div>
                    </div>

                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Informações Veterinárias</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p>Vacinas V4 e Antirrábica em dia. Vermifugado recentemente. Teste de FIV/FELV negativo.</p>
                        </div>
                    </div>

                    <div class="info-card expandable-card">
                        <div class="card-header">
                            <h2>Adaptabilidade</h2>
                            <i class="bi bi-chevron-down chevron-icon"></i>
                        </div>
                        <div class="card-conteudo">
                            <p>Convive bem com outros gatos e cães de porte pequeno. Gosta de crianças respeitosas.</p>
                        </div>
                    </div>

                </div>
            </div>
        `,
        init: () => {
            //lógica do botão Favoritar
            const btnFavContainer = document.querySelector('.botao-favorito');
            if(btnFavContainer) {
                const btnFav = btnFavContainer.querySelector('i');
                btnFavContainer.addEventListener('click', (e) => {
                    e.stopPropagation(); // Previne comportamentos estranhos
                    if(btnFav.classList.contains('bi-heart')) {
                        btnFav.classList.remove('bi-heart');
                        btnFav.classList.add('bi-heart-fill');
                        btnFav.style.color = 'red';
                    } else {
                        btnFav.classList.remove('bi-heart-fill');
                        btnFav.classList.add('bi-heart');
                        btnFav.style.color = '#0475A8';
                    }
                });
            }

            // logica do botão Adote
            const btnAdote = document.querySelector('.botao-adote');
            if(btnAdote) {
                btnAdote.addEventListener('click', () => {
                    alert('Interesse registrado! O responsável entrará em contato.');
                });
            }

            // lógica do Accordion
            // cabeçalhos clicaveis
            const headers = document.querySelectorAll('.expandable-card .card-header');

            headers.forEach(header => {
                // remover listeners antigos
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);

                newHeader.addEventListener('click', (e) => {
                    e.stopPropagation(); // impedir que o clique se propague

                    //encontra o card PAI específico deste cabeçalho clicado
                    const currentCard = newHeader.closest('.expandable-card');
                    const currentContent = currentCard.querySelector('.card-conteudo');

                    // alterna a classe APENAS neste card
                    currentCard.classList.toggle('active');

                    // aplica a animação APENAS neste conteúdo
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
    if(pageTitle) pageTitle.innerText = route.title;

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