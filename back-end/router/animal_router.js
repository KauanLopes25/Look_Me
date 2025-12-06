/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela de animal.
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

// Responsavel por receber arquivos enviados pelo front-end em requisições HTTP usando multipart/form-data.
const multer = require("multer");
// pasta onde os arquivos vão ser salvos temporariamente
// const upload = multer({ dest: 'uploads/' });

// Define variavel para upload sem salvar no disco
const upload = multer({
    storage: multer.memoryStorage()
});

// Criando um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const router = express.Router();

// Importação do arquivo controller da tbl_animal
const animalController = require('../controller/animal/animal_controller.js')
const DEFAULT_MESSAGES = require('../controller/menssages/config_menssages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response) {
    // Chama a função para listar os endereços de animal do BD
    let animal = await animalController.listAnimal()
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 1° - Requisitado na tbl_animal')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idAnimal = request.params.id
    // Chama a função para buscar um animal por id
    let animal = await animalController.searchAnimalById(idAnimal)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 2° - Requisitado na tbl_animal')
})

// 3° BUSCAR POR ID DO PROTETOR
router.get('/mypet/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idUser = request.params.id
    // Chama a função para buscar um animal por id
    let animal = await animalController.searchAnimalByUser(idUser)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 3° - Requisitado na tbl_animal')
})

// 4° INSERIR NOVO ANIMAL
router.post('/', cors(), upload.single('image'), async function (request, response){
    // JSON enviado como texto no form-data
    let dadosBody = JSON.parse(request.body.data)
    // Imagem enviada no form-data
    let arquivo = request.file
    // Chama a função de inserir um novo animal, encaminha os dados e o content-type
    let animal = await animalController.insertAnimal(dadosBody, arquivo)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 4° - Requisitado na tbl_animal')
})
// 5° ATUALIZAR NOVO ANIMAL
router.put('/:id', cors(), upload.single('image'), async function (request, response) {
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let idAnimal = request.params.id
     // JSON enviado como texto no form-data
    let dadosBody = JSON.parse(request.body.data)
    // Imagem enviada no form-data
    let arquivo = request.file
    // Chama a função de atualizar um animal, encaminha os dados e o content-type
    let animal = await animalController.updateAnimal(idAnimal, dadosBody, arquivo)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 5° - Requisitado na tbl_animal')
})
// 5° DELETAR ANIMAL
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idAnimal = request.params.id
    // Chama a função de deletar um animal
    let animal = await animalController.deleteAnimal(idAnimal)
    response.status(animal.status_code)
    response.json(animal)
    console.log('ENDPOINT 5° - Requisitado na tbl_animal')
})
module.exports = router