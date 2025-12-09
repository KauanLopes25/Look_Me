/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre endereços de usuário na API.
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
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')

async function userAddressDataValidation(userAddress, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof userAddress.logradouro !== "string" ||
            userAddress.logradouro == '' ||
            userAddress.logradouro == undefined ||
            userAddress.logradouro == null ||
            userAddress.logradouro.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de logradouro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.numero !== "string" ||
            userAddress.numero == '' ||
            userAddress.numero == undefined ||
            userAddress.numero == null ||
            userAddress.numero.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de numero incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.bairro !== "string" ||
            userAddress.bairro == '' ||
            userAddress.bairro == undefined ||
            userAddress.bairro == null ||
            userAddress.bairro.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de bairro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.cidade !== "string" ||
            userAddress.cidade == '' ||
            userAddress.cidade == undefined ||
            userAddress.cidade == null ||
            userAddress.cidade.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de cidade incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.uf !== "string" ||
            userAddress.uf == '' ||
            userAddress.uf == undefined ||
            userAddress.uf == null ||
            userAddress.uf.length > 2) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de uf incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.cep !== "string" ||
            userAddress.cep == '' ||
            userAddress.cep == undefined ||
            userAddress.cep == null ||
            userAddress.cep.length > 9) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de cep incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.usuario_id !== "number") {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de usuario_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof userAddress.regiao !== "string" ||
            userAddress.regiao == '' ||
            userAddress.regiao == undefined ||
            userAddress.regiao == null ||
            userAddress.regiao.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de regiao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    userAddressDataValidation
}