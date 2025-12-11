/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de pedido de adoção.
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

// Importação do arquivo controller da tbl_pedido_adocao
const orderController = require('../controller/order/order_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar todas os registros de pedidos de adoção do BD
    let order = await orderController.listOrders()
    response.status(order.status_code)
    response.json(order)
    console.log('ENDPOINT 1° - Requisitado na tbl_pedido_adocao')
})

// 2° BUSCA PEDIDOS PELO ID DO USUÁRIO
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para buscar pedidos de um usuário
    let order = await orderController.searchOrderByIdUser(idUser)
    response.status(order.status_code)
    response.json(order)
    console.log('ENDPOINT 2° - Requisitado na tbl_pedido_adocao')
})

// 3° INSERIR NOVO PEDIDO DE ADOÇÃO
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir um novo pedido de adoção, encaminha os dados e o content-type
    let order = await orderController.insertOrder(dadosBody, contentType)
    response.status(order.status_code)
    response.json(order)
    console.log('ENDPOINT 3° - Requisitado na tbl_pedido_adocao')
})

// 4° ATUALIZAR UM PEDIDO DE ADOÇÃO
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idOrder = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de atualizar um pedido de adoção, encaminha os dados e o content-type
    let order = await orderController.updateOrder(idOrder, dadosBody, contentType)
    response.status(order.status_code)
    response.json(order)
    console.log('ENDPOINT 4° - Requisitado na tbl_pedido_adocao')
})
// 5° DELETAR UM PEDIDO DE ADOÇÃO
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idOrder = request.params.id
    // Chama a função de deletar um pedido de adoção
    let order = await orderController.deleteOrder(idOrder)
    response.status(order.status_code)
    response.json(order)
    console.log('ENDPOINT 5° - Requisitado na tbl_pedido_adocao')
})
module.exports = router