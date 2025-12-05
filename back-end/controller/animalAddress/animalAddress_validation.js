/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre endereços de animal na API.
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
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')

async function animalAddressDataValidation(animalAddress, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof animalAddress.logradouro !== "string" ||
            animalAddress.logradouro == '' ||
            animalAddress.logradouro == undefined ||
            animalAddress.logradouro == null ||
            animalAddress.logradouro.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de logradouro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.numero !== "string" ||
            animalAddress.numero == '' ||
            animalAddress.numero == undefined ||
            animalAddress.numero == null ||
            animalAddress.numero.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de numero incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.bairro !== "string" ||
            animalAddress.bairro == '' ||
            animalAddress.bairro == undefined ||
            animalAddress.bairro == null ||
            animalAddress.bairro.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de bairro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.cidade !== "string" ||
            animalAddress.cidade == '' ||
            animalAddress.cidade == undefined ||
            animalAddress.cidade == null ||
            animalAddress.cidade.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de cidade incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.uf !== "string" ||
            animalAddress.uf == '' ||
            animalAddress.uf == undefined ||
            animalAddress.uf == null ||
            animalAddress.uf.length > 2) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de uf incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.cep !== "string" ||
            animalAddress.cep == '' ||
            animalAddress.cep == undefined ||
            animalAddress.cep == null ||
            animalAddress.cep.length > 9) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de cep incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.animal_id !== "number" ||
            animalAddress.animal_id == '' ||
            animalAddress.animal_id == undefined ||
            animalAddress.animal_id == null ||
            animalAddress.animal_id.length > 2) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de animal_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animalAddress.regiao !== "string" ||
            animalAddress.regiao == '' ||
            animalAddress.regiao == undefined ||
            animalAddress.regiao == null ||
            animalAddress.regiao.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de regiao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    animalAddressDataValidation
}