/********************************************************************************************
* Objetivo: Arquivo responsável por rodar a aplicação da api, utilizando EndPoints referente 
a API de adoção de pet's Look Me
* Autor: Kauan Lopes Pereira
* Data inicial: 26/11/2025
* Versão: 1.0
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************

************************************** OBSERVAÇÕES ******************************************
* Instalação do Express, cors, Body-Parser.
* npm init -y
* npm install express      --save
* npm install cors         --save
* npm install body-parser  --save
* npm i - Tudo que estiver no package,json sera instalado no node_modules, serve para quando
utilizarmos o projeto em outro computador.
* Prisma -> É uma dependencia atual que trabalha com BD  (MYSQL, PostgreSQL, SQL Server), (SQL ou ORM).
    npm install prisma --save           -> Instalar o prisma (Conexão com o Database).
    npm install @prisma/client --save   -> Instalar o cliente do prisma (Executar scripts SQL no BD).
    npx prisma init                     -> Prompt de comando para inicializar o prisma.
    npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o DB (CUIDADO,
                                           neste processo você poderá perder dados reais do DB, 
                                           pois ele pega e cria tabelas programadas no ORM schema.prisma)
    npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o DB, geralmente
                                           usamos para rodar o projeto em um PC novo 
******************************** BIBLIOTECAS UTILIZADAS *************************************
* Prisma
* Express
* Cors
* Body-parser
********************************************************************************************/
// Responsável pela API
const express = require('express')  // Responsável pelas permissões da API (APP)
const cors = require('cors') // Responsável por gerenciar a chegada dos dados da api com o front
const bodyParser = require('body-parser') // Import das rotas


//Criando um objeto especialista no formato JSON para obter dados via POST e PUT
const bodyParserJSON = bodyParser.json() 

// Criando uma instancia de uma classe do express
const app = express()

// Retorna a porta do servidor local ou colocamos uma porta local
const PORT = process.PORT || 8080

// Configuração de permissões
// next ?
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') // Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos na API
    app.use(cors()) // Carrega as configurações no Cors da API
    next() // Próximo, carregar os proximos endpoints
})


//Import das contollers
const userRoute = require('./router/user_router.js')
const controllerPorte = require('./controller/sizes/size_controller.js')
const controllerEspecie = require('./controller/especies/especies_controller.js')



// ENDPOINT'S de porte

//função 01 - lista todos os portes
app.get('/v1/lookme/portes', cors(), async function(request, response){

    //chama a função para listar os portes do BD
    let porte =  await controllerPorte.listarPortes()

    response.status(porte.status_code)

    response.json(porte)

})

//função 02 - filtra um porte pelo ID
app.get('/v1/lookme/porte/:id', cors(), async function(request, response){

    let idPorte = request.params.id

    let porte =  await controllerPorte.buscarPorteID(idPorte)

    response.status(porte.status_code)

    response.json(porte)
})


//função 03 - insere um novo porte
app.post('/v1/lookme/porte', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let porte =  await controllerPorte.inserirPorte(dadosBody, contentType)

    response.status(porte.status_code)

    response.json(porte)
})

//função 04 - atualiza um porte
app.put('/v1/lookme/porte/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idPorte = request.params.id
 
    let contentType = request.headers['content-type']

    let porte =  await controllerPorte.atualizarPorte(dadosBody, idPorte, contentType)

    response.status(porte.status_code)

    response.json(porte)
})

//função 05 - exclui um porte
app.delete('/v1/lookme/porte/:id', cors(), async function (request, response) {
    let idPorte = request.params.id

    let porte = await controllerPorte.excluirPorte(idPorte)

    response.status(porte.status_code)
    response.json(porte)
})

// ENDPOINT's de usuário
app.use('/v1/lookme/user/', userRoute)



// ENDPOINT'S de espécie

//função 01 - lista todas as espécies
app.get('/v1/lookme/especies', cors(), async function(request, response){

    //chama a função para listar os portes do BD
    let especie =  await controllerEspecie.listarEspecies()

    response.status(especie.status_code)

    response.json(especie)

})

//função 02 - filtra uma espécie pelo ID
app.get('/v1/lookme/especie/:id', cors(), async function(request, response){

    let idEspecie = request.params.id

    let especie =  await controllerEspecie.buscarEspecieID(idEspecie)

    response.status(especie.status_code)

    response.json(especie)
})


//função 03 - insere uma nova espécie
app.post('/v1/lookme/especie', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let especie =  await controllerEspecie.inserirEspecie(dadosBody, contentType)

    response.status(especie.status_code)

    response.json(especie)
})

//função 04 - atualiza uma especie
app.put('/v1/lookme/especie/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idEspecie = request.params.id
 
    let contentType = request.headers['content-type']

    let especie =  await controllerEspecie.atualizarEspecie(dadosBody, idEspecie, contentType)

    response.status(especie.status_code)

    response.json(especie)
})

//função 05 - exclui um porte
app.delete('/v1/lookme/especie/:id', cors(), async function (request, response) {
    let idEspecie = request.params.id

    let especie = await controllerEspecie.excluirEspecie(idEspecie)

    response.status(especie.status_code)
    response.json(especie)
})

// Mensagem de operação da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})