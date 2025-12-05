/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de endereços de
animal.
* Autor: Kauan Lopes Pereira
* Data: 05/12/2025
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

// Importação do arquivo controller da tbl_endereco_animal
const animalAddressController = require('../controller/animalAddress/animalAddress_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar os endereços de animal do BD
    let animalAddress = await animalAddressController.listAnimalAddress()
    response.status(animalAddress.status_code)
    response.json(animalAddress)
    console.log('ENDPOINT 1° - Requisitado na tbl_endereco_animal')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idAnimal = request.params.id
    // Chama a função para buscar um endereço de animal por id
    let animalAddress = await animalAddressController.searchAnimalAddressById(idAnimal)
    response.status(animalAddress.status_code)
    response.json(animalAddress)
    console.log('ENDPOINT 2° - Requisitado na tbl_endereco_animal')
})


// 3° INSERIR NOVO ENDEREÇO DE ANIMAL
router.post('/', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo endereço de animal, encaminha os dados e o content-type
    let animal = await animalAddressController.insertAnimalAddress(dadosBody, contentType)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 3° - Requisitado na tbl_endereco_animal')
})

// 4° ATUALIZAR NOVO ENDEREÇO DE USUARIO
router.put('/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idAnimal = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo endereço de animal, encaminha os dados e o content-type
    let animal = await animalAddressController.updateAnimalAddress(idAnimal, dadosBody, contentType)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 4° - Requisitado na tbl_endereco_animal')
})
// 5° DELETAR ENDEREÇO DE USUARIO
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idAnimal = request.params.id
    // Chama a função de deletar um endereço de animal
    let animalAddress = await animalAddressController.deleteAnimalAddress(idAnimal)
    response.status(animalAddress.status_code)
    response.json(animalAddress)
    console.log('ENDPOINT 5° - Requisitado na tbl_endereco_animal')
})
module.exports = router