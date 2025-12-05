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
const express = require('express')
// Responsável pelas permissões da API (APP)
const cors = require('cors')
// Responsável por gerenciar a chegada dos dados da api com o front
const bodyParser = require('body-parser')
// Import das rotas
const userRoute = require('./router/user_router.js')
const userAddressRoute = require('./router/userAddress_router.js')
const animalRoute = require('./router/animal_router.js')
const animalAddressRoute = require('./router/animalAddress_router.js')


// Retorna a porta do servidor local ou colocamos uma porta local
const PORT = process.PORT || 8080
// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões
// next ?
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') // Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos na API
    app.use(cors()) // Carrega as configurações no Cors da API
    next() // Próximo, carregar os proximos endpoints
})

// ENDPOINT's
// USUÁRIOS
app.use('/v1/lookme/user/', userRoute)
// ENDEREÇO DE USUÁRIO
app.use('/v1/lookme/useraddress/', userAddressRoute)
// ANIMAL
app.use('/v1/lookme/animal/', animalRoute)
// ENDEREÇo DE ANIMAL
app.use('/v1/lookme/animaladdress/', animalAddressRoute)
// Mensagem de operação da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})