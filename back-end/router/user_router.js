/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela user.
* Autor: Kauan Lopes Pereira
* Data: 01/12/2025
* Versão: 1.0
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************

************************************** OBSERVAÇÕES ******************************************

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/
// Responsável pela API
const express = require('express')
// Responsável pelas permissões da API (APP)
const cors = require('cors')
// Responsável por gerenciar a chegada dos dados da api com o front
const bodyParser = require('body-parser')

// Criando um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const router = express.Router();

// Importação do arquivo controller da tbl_usuario
const userController = require('../controller/user/user_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response){
    // Chama a função para listar os usuarios do BD
    let user = await userController.listUsers()
    response.status(user.status_code)
    response.json(user)
    console.log('ENDPOINT 1° - Requisitado na tbl_usuario')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para listar os usuarios do BD
    let user = await userController.searchUserById(idUser)
    response.status(user.status_code)
    response.json(user)
    console.log('ENDPOINT 2° - Requisitado na tbl_usuario')
})
// 3° INSERIR NOVO USUARIO
router.post('/', cors(), bodyParserJSON, async function (request, response){
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo usuario, encaminha os dados e o content-type
    let user = await userController.insertUser(dadosBody, contentType)
    
    response.status(user.status_code)
    response.json(user)
    console.log('ENDPOINT 3° - Requisitado na tbl_usuario')
})
module.exports = router