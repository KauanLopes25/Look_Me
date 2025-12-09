/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre usuário na API.
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

async function userDataValidation(user) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (user) {
        // Validações de todas as entradas de dados
        if (
            typeof user.nome !== "string" ||
            user.nome == '' ||
            user.nome == undefined ||
            user.nome == null ||
            user.nome.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de nome incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof user.data_nascimento !== "string" ||
            user.data_nascimento == undefined ||
            user.data_nascimento.length != 10) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de data de lançamento incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof user.telefone !== "string" ||
            user.telefone == '' ||
            user.telefone == undefined ||
            user.telefone == null ||
            user.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de telefone incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof user.email !== "string" ||
            user.email == '' ||
            user.email == undefined ||
            user.email == null ||
            user.email.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de email incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof user.nome !== "number") {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de status_cadastro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof user.senha !== "string" ||
            user.senha == undefined ||
            user.senha == null ||
            user.senha > 200) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de senha incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    userDataValidation
}