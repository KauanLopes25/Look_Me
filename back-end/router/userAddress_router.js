/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de endereços de
Usuários.
* Autor: Kauan Lopes Pereira
* Data: 04/12/2025
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

// Importação do arquivo controller da tbl_endereco_usuario
const userAddressController = require('../controller/userAddress/userAddress_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar os endereços de usuarios do BD
    let userAddress = await userAddressController.listUsersAddress()
    response.status(userAddress.status_code)
    response.json(userAddress)
    console.log('ENDPOINT 1° - Requisitado na tbl_endereco_usuario')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para buscar um endereço de usuario por id
    let userAddress = await userAddressController.searchUserAddressById(idUser)
    response.status(userAddress.status_code)
    response.json(userAddress)
    console.log('ENDPOINT 2° - Requisitado na tbl_endereco_usuario')
})


// 3° INSERIR NOVO ENDEREÇO DE USUARIO
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo endereço de usuario, encaminha os dados e o content-type
    let user = await userAddressController.insertUserAddress(dadosBody, contentType)
    response.status(user.status_code)
    response.json(user)
    console.log('ENDPOINT 3° - Requisitado na tbl_endereco_usuario')
})
// 4° ATUALIZAR NOVO ENDEREÇO DE USUARIO
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idUser = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo endereço de usuario, encaminha os dados e o content-type
    let user = await userAddressController.updateUserAddress(idUser, dadosBody, contentType)
    response.status(user.status_code)
    response.json(user)
    console.log('ENDPOINT 4° - Requisitado na tbl_endereco_usuario')
})
// 5° DELETAR ENDEREÇO DE USUARIO
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função de deletar um usuario
    let userAddress = await userAddressController.deleteUserAddress(idUser)
    response.status(userAddress.status_code)
    response.json(userAddress)
    console.log('ENDPOINT 5° - Requisitado na tbl_endereco_usuario')
})
module.exports = router