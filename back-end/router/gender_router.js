/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de gênero.
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

// Importação do arquivo controller de genero
const genderController = require('../controller/gender/gender_controller.js')


//função 01 - lista todos os generos
router.get('/', cors(), async function(request, response){

    //chama a função para listar os generos do BD
    let genero =  await genderController.listarGeneros()

    response.status(genero.status_code)

    response.json(genero)
      console.log('ENDPOINT 1° - Requisitado na tbl_sexo')

})

//função 02 - filtra um genero pelo ID
router.get('/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let genero =  await genderController.buscarGeneroID(idGenero)

    response.status(genero.status_code)

    response.json(genero)
    console.log('ENDPOINT 2° - Requisitado na tbl_sexo')
})


//função 03 - insere um novo genero
router.post('/', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body
    
    //recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']

    let genero =  await genderController.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)

    response.json(genero)
    console.log('ENDPOINT 3° - Requisitado na tbl_sexo')
})

//função 04 - atualiza um genero
router.put('/:id', cors(), bodyParserJSON, async function(request, response){

    //recebe os dados do corpo (body) da requisição
    //---- se você utilizar o bodyParser, é obrigatório ter no endPoint----
    let dadosBody = request.body

    let idGenero = request.params.id
 
    let contentType = request.headers['content-type']

    let genero =  await genderController.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)

    response.json(genero)
    console.log('ENDPOINT 4° - Requisitado na tbl_sexo')
})

//função 05 - exclui um genero
router.delete('/:id', cors(), async function (request, response) {
    let idGenero = request.params.id

    let genero = await genderController.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
    console.log('ENDPOINT 5° - Requisitado na tbl_sexo')
})

module.exports = router