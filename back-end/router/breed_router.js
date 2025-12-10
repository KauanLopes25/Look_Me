/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de raça.
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

// Importação do arquivo controller de raça
const breedsController = require('../controller/breeds/breeds_controller.js')

//função 01 - lista todas as raças
router.get('/', cors(), async function(request, response){

    //chama a função para listar os portes do BD
    let raca =  await breedsController.listarRacas()

    response.status(raca.status_code)

    response.json(raca)
      console.log('ENDPOINT 1° - Requisitado na tbl_raca')

})

//função 02 - filtra uma raca pelo ID
router.get('/:id', cors(), async function(request, response){

    let idRaca = request.params.id

    let raca =  await breedsController.buscarRacaID(idRaca)

    response.status(raca.status_code)

    response.json(raca)
      console.log('ENDPOINT 2° - Requisitado na tbl_raca')
})


//função 03 - insere uma nova raça
router.post('/', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let raca =  await breedsController.inserirRaca(dadosBody, contentType)

    response.status(raca.status_code)

    response.json(raca)
      console.log('ENDPOINT 3° - Requisitado na tbl_raca')
})

//função 04 - atualiza uma raça
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idRaca = request.params.id
 
    let contentType = request.headers['content-type']

    let raca =  await breedsController.atualizarRaca(dadosBody, idRaca, contentType)

    response.status(raca.status_code)

    response.json(raca)
      console.log('ENDPOINT 4° - Requisitado na tbl_raca')
})

//função 05 - exclui uma raça
router.delete('/:id', cors(), async function (request, response) {
    let idRaca = request.params.id

    let raca = await breedsController.excluirRaca(idRaca)

    response.status(raca.status_code)

    response.json(raca)
      console.log('ENDPOINT 5° - Requisitado na tbl_raca')
})

module.exports = router
