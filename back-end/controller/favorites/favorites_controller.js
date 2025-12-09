/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela de favoritos.
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
// Importação do arquivo model da tbl_favoritos
const favoriteDAO = require('../../model/DAO/favorites_model.js')
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')
// Importação do arquivo de validação de dados de favorites
const validation = require('./favorites_validation.js')

// Mostra todos os favorites do banco
async function listFavorites() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de favorites presente no banco de dados
        let resultFavorite = await favoriteDAO.getSelectAllFavorites()
        if (resultFavorite) {
            if (resultFavorite.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.favoritos = resultFavorite

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function searchFavoriteById(idFavorite) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de favorites do BD
        let resultFavorite = await favoriteDAO.getSelectFavoriteById(Number(idFavorite))
        if (resultFavorite) {
            if (resultFavorite.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.favoritos = resultFavorite

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function searchFavoriteByIdUser(idUser) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar uma favorites do BD
        let resultFavorite = await favoriteDAO.getSelectFavoritesByIdUser(Number(idUser))
        if (resultFavorite) {
            if (resultFavorite.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.favoritos = resultFavorite

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function insertFavorite(favorite, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (favorite) {
            let dataValidation = await validation.favoriteDataValidation(favorite, contentType)
            if (!dataValidation) {

                // Processamento
                // Chama a função para inserir um novo favorites no BD"
                let resultFavorite = await favoriteDAO.setInsertFavorite(favorite)
                if (resultFavorite) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                    MESSAGES.DEFAULT_HEADER.favoritos = favorite

                    return MESSAGES.DEFAULT_HEADER //201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return dataValidation // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function updateFavorite(idfavorite, newDataFavorite, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (newDataFavorite) {

            let dataValidation = await validation.favoriteDataValidation(newDataFavorite, contentType)
            if (!dataValidation) {
                let favoritosValidation = await searchFavoriteById(idfavorite)
                if (favoritosValidation.status_code == 200) {
                    // Processamento
                    // Chama a função para update uma nova favorites no BD"
                    let resultFavorite = await favoriteDAO.setUpdateFavorite(idfavorite, newDataFavorite)
                    if (resultFavorite) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.favoritos = newDataFavorite

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return favoritosValidation // A função searchFavoritosById poderá retornar (400 ou 404 ou 500)
                }

            } else {
                return dataValidation // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

async function deleteFavorite(idfavorite) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let favoritosValidation = await searchFavoriteById(idfavorite)
        if (favoritosValidation.status_code == 200) {

            // Processamento
            // Chama a função para deletar favorites no BD
            let resultFavorite = await favoriteDAO.setDeleteFavorite(idfavorite)
            console.log(resultFavorite)

            if (resultFavorite) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função searchFavoritosById poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listFavorites,
    searchFavoriteById,
    searchFavoriteByIdUser,
    insertFavorite,
    updateFavorite,
    deleteFavorite
}