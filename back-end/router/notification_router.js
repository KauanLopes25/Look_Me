/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de notificação.
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

// Importação do arquivo controller da tbl_notificacao
const notificationController = require('../controller/notification/notification_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar todas as notificações no BD
    let notification = await notificationController.listNotifications()
    response.status(notification.status_code)
    response.json(notification)
    console.log('ENDPOINT 1° - Requisitado na tbl_notificacao')
})

// 2° BUSCA NOTIFICAÇÃO POR ID USUÁRIO
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para buscar uma notificação por id de usuário
    let notification = await notificationController.searchNotificationById(idUser)
    response.status(notification.status_code)
    response.json(notification)
    console.log('ENDPOINT 2° - Requisitado na tbl_notificacao')
})

// 4° INSERIR NOVA NOTIFICAÇÃO
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir uma nova notificação, encaminha os dados e o content-type
    let notificacao = await notificationController.insertNotification(dadosBody, contentType)
    response.status(notificacao.status_code)
    response.json(notificacao)
    console.log('ENDPOINT 4° - Requisitado na tbl_notificacao')
})

// 5° ATUALIZAR NOTIFICAÇÃO
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idNotification = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de atualizar uma notificacao, encaminha os dados e o content-type
    let notificacao = await notificationController.updateNotification(idNotification, dadosBody, contentType)
    response.status(notificacao.status_code)
    response.json(notificacao)
    console.log('ENDPOINT 5° - Requisitado na tbl_notificacao')
})
// 6° DELETAR UMA NOTIFICAÇÃO
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idNotification = request.params.id
    // Chama a função de deletar uma notificação
    let notification = await notificationController.deleteNotification(idNotification)
    response.status(notification.status_code)
    response.json(notification)
    console.log('ENDPOINT 6° - Requisitado na tbl_notificacao')
})
module.exports = router