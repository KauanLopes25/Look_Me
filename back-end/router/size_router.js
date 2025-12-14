/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de porte.
* Autor: Luana Mariana Lopes Bomfim
* Data: 08/12/2025
* Versão: 1.0
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

// Importação do arquivo controller de porte
const sizeController = require('../controller/sizes/size_controller.js')

//função 01 - lista todos os portes
router.get('/', cors(), async function(request, response){

    //chama a função para listar os portes do BD
    let porte =  await sizeController.listarPortes()

    response.status(porte.status_code)

    response.json(porte)
     console.log('ENDPOINT 1° - Requisitado na tbl_porte')

})

//função 02 - filtra um porte pelo ID
router.get('/:id', cors(), async function(request, response){

    let idPorte = request.params.id

    let porte =  await sizeController.buscarPorteID(idPorte)

    response.status(porte.status_code)

    response.json(porte)
    console.log('ENDPOINT 2° - Requisitado na tbl_porte')
})


//função 03 - insere um novo porte
router.post('/', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let porte =  await sizeController.inserirPorte(dadosBody, contentType)

    response.status(porte.status_code)

    response.json(porte)
    console.log('ENDPOINT 3° - Requisitado na tbl_porte')
})

//função 04 - atualiza um porte
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idPorte = request.params.id
 
    let contentType = request.headers['content-type']

    let porte =  await sizeController.atualizarPorte(dadosBody, idPorte, contentType)

    response.status(porte.status_code)

    response.json(porte)
    console.log('ENDPOINT 4° - Requisitado na tbl_porte')
})

//função 05 - exclui um porte
router.delete('/:id', cors(), async function (request, response) {
    let idPorte = request.params.id

    let porte = await sizeController.excluirPorte(idPorte)

    response.status(porte.status_code)
    response.json(porte)
    console.log('ENDPOINT 5° - Requisitado na tbl_porte')
})

module.exports = router