/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre pedido de adoção na API.
* Autor: Kauan Lopes Pereira
* Data: 06/12/2025
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

async function orderDataValidation(order, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof order.usuario_id !== "number" ||
            order.usuario_id == '' ||
            order.usuario_id == undefined ||
            order.usuario_id == null) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de usuario_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof order.animal_id !== "number" ||
            order.animal_id == '' ||
            order.animal_id == undefined ||
            order.animal_id == null) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de animal_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof order.status_pedido !== "string" ||
            order.status_pedido == '' ||
            order.status_pedido == undefined ||
            order.status_pedido == null ||
            order.status_pedido.length > 20) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de status_pedido incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof order.data_solicitacao !== "string" ||
            order.data_solicitacao == '' ||
            order.data_solicitacao == undefined ||
            order.data_solicitacao == null ||
            order.status_pedido.length > 10) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de data_solicitacao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    orderDataValidation
}