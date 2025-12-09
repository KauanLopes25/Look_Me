/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre favoritos na API.
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

async function favoriteDataValidation(favorite, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof favorite.usuario_id !== "number" ||
            favorite.usuario_id == '' ||
            favorite.usuario_id == undefined ||
            favorite.usuario_id == null ) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de usuario_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof favorite.animal_id !== "number" ||
            favorite.animal_id == '' ||
            favorite.animal_id == undefined ||
            favorite.animal_id == null) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de animal_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    favoriteDataValidation
}