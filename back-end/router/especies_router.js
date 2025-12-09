/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de especie.
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

// Importação do arquivo controller de espécie
const especiesController = require('../controller/especies/especies_controller.js')


//função 01 - lista todas as espécies
router.get('/v1/lookme/especies', cors(), async function(request, response){

    //chama a função para listar os portes do BD
    let especie =  await especiesController.listarEspecies()

    response.status(especie.status_code)
    response.json(especie)
    console.log('ENDPOINT 1° - Requisitado na tbl_especie')

})

//função 02 - filtra uma espécie pelo ID
router.get('/v1/lookme/especie/:id', cors(), async function(request, response){

    let idEspecie = request.params.id

    let especie =  await especiesController.buscarEspecieID(idEspecie)

    response.status(especie.status_code)
    response.json(especie)
     console.log('ENDPOINT 2° - Requisitado na tbl_especie')

})


//função 03 - insere uma nova espécie
router.post('/v1/lookme/especie', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let especie =  await especiesController.inserirEspecie(dadosBody, contentType)

    response.status(especie.status_code)
    response.json(especie)
     console.log('ENDPOINT 3° - Requisitado na tbl_especie')

})

//função 04 - atualiza uma especie
router.put('/v1/lookme/especie/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idEspecie = request.params.id
 
    let contentType = request.headers['content-type']

    let especie =  await especiesController.atualizarEspecie(dadosBody, idEspecie, contentType)

    response.status(especie.status_code)
    response.json(especie)
     console.log('ENDPOINT 4° - Requisitado na tbl_especie')

})

//função 05 - exclui uma especie
router.delete('/v1/lookme/especie/:id', cors(), async function (request, response) {
    let idEspecie = request.params.id

    let especie = await especiesController.excluirEspecie(idEspecie)

    response.status(especie.status_code)
    response.json(especie)
     console.log('ENDPOINT 5° - Requisitado na tbl_especie')

})

module.exports = router
