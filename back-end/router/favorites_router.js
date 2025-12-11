/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de favoritos.
* Autor: Kauan Lopes Pereira
* Data: 06/12/2025
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

// Importação do arquivo controller da tbl_favoritos
const favoritesController = require('../controller/favorites/favorites_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar todas os registros de favoritos do BD
    let favorite = await favoritesController.listFavorites()
    response.status(favorite.status_code)
    response.json(favorite)
    console.log('ENDPOINT 1° - Requisitado na tbl_favoritos')
})

// 2° BUSCA FAVORITOS POR ID USUÁRIO
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para buscar animais favoritos de um usuário
    let favorite = await favoritesController.searchFavoriteByIdUser(idUser)
    response.status(favorite.status_code)
    response.json(favorite)
    console.log('ENDPOINT 2° - Requisitado na tbl_favoritos')
})

// 3° INSERIR NOVO FAVORITO
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir um novo favorito, encaminha os dados e o content-type
    let favorite = await favoritesController.insertFavorite(dadosBody, contentType)
    response.status(favorite.status_code)
    response.json(favorite)
    console.log('ENDPOINT 3° - Requisitado na tbl_favoritos')
})

// 4° ATUALIZAR UM FAVORITO
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idfavorite = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de atualizar um favorito, encaminha os dados e o content-type
    let favorite = await favoritesController.updateFavorite(idfavorite, dadosBody, contentType)
    response.status(favorite.status_code)
    response.json(favorite)
    console.log('ENDPOINT 4° - Requisitado na tbl_favoritos')
})
// 5° DELETAR UM FAVORITO
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idfavorite = request.params.id
    // Chama a função de deletar um favorito
    let favorite = await favoritesController.deleteFavorite(idfavorite)
    response.status(favorite.status_code)
    response.json(favorite)
    console.log('ENDPOINT 5° - Requisitado na tbl_favoritos')
})
module.exports = router