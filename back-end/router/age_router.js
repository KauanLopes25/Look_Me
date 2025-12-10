/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de idade.
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

// Importação do arquivo controller de idade
const ageController = require('../controller/ages/ages_controller.js')

//função 01 - lista todas as idades
router.get('/', cors(), async function(request, response){

    //chama a função para listar as idades do BD
    let idade =  await ageController.listarIdades()

    response.status(idade.status_code)

    response.json(idade)
       console.log('ENDPOINT 1° - Requisitado na tbl_idade')

})

//função 02 - filtra uma idade pelo ID
router.get('/:id', cors(), async function(request, response){

    let idIdade = request.params.id

    let idade =  await ageController.buscarIdadeID(idIdade)

    response.status(idade.status_code)

    response.json(idade)
    console.log('ENDPOINT 2° - Requisitado na tbl_idade')
})


//função 03 - insere uma nova idade
router.post('/', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let idade =  await ageController.inserirIdade(dadosBody, contentType)

    response.status(idade.status_code)

    response.json(idade)
    console.log('ENDPOINT 3° - Requisitado na tbl_idade')
})

//função 04 - atualiza uma idade
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idIdade = request.params.id
 
    let contentType = request.headers['content-type']

    let idade =  await ageController.atualizarIdade(dadosBody, idIdade, contentType)

    response.status(idade.status_code)

    response.json(idade)
    console.log('ENDPOINT 4° - Requisitado na tbl_idade')
})

//função 05 - exclui uma idade
router.delete('/:id', cors(), async function (request, response) {
    let idIdade = request.params.id

    let idade = await ageController.excluirIdade(idIdade)

    response.status(idade.status_code)
    response.json(idade)
    console.log('ENDPOINT 5° - Requisitado na tbl_idade')
})

module.exports = router