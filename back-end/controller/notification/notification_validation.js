/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre notificação na API.
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

async function notificationDataValidation(notification, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof notification.mensagem !== "string" ||
            notification.mensagem == '' ||
            notification.mensagem == undefined ||
            notification.mensagem == null ||
            notification.mensagem.length > 500) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de mensagem incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof notification.titulo !== "string" ||
            notification.titulo == '' ||
            notification.titulo == undefined ||
            notification.titulo == null ||
            notification.titulo.length > 50) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de titulo incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof notification.data_notificacao !== "string" ||
            notification.data_notificacao == '' ||
            notification.data_notificacao == undefined ||
            notification.data_notificacao == null ||
            notification.data_notificacao.length > 10) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de data_notificacao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof notification.usuario_id !== "number" ||
            notification.usuario_id == '' ||
            notification.usuario_id == undefined ||
            notification.usuario_id == null) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de usuario_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
         else if (
            typeof notification.pedido_id !== "number" ||
            notification.pedido_id == '' ||
            notification.pedido_id == undefined ||
            notification.pedido_id == null) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de pedido_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    notificationDataValidation
}