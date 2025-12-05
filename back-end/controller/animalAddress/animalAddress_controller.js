/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela endereço de usuarios.
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
// Importação do arquivo model da tbl_endereco_animal
const animalAddressDAO = require('../../model/DAO/animalAddress_model.js')
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')
// Importação do arquivo de validação de dados de endereço de animal
const validation = require('./animalAddress_validation.js')
// Mostra todos os endereço de animal do banco
async function listAnimalAddress() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de endereços de animal do BD
        let resultAnimalAddress = await animalAddressDAO.getSelectAllAnimalAddress()
        if (resultAnimalAddress) {
            if (resultAnimalAddress.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.animal = resultAnimalAddress

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

async function searchAnimalAddressById(idAnimal) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar um endereço de um animal do BD
        let resultAnimalAddress = await animalAddressDAO.getSelectAnimalAddressById(Number(idAnimal))
        if (resultAnimalAddress) {
            if (resultAnimalAddress.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.animal = resultAnimalAddress

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

async function insertAnimalAddress(animalAddress, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let dataValidation = await validation.animalAddressDataValidation(animalAddress, contentType)

            if (!dataValidation) {
                // Processamento
                // Chama a função para inserir um novo endereço de animal no BD"
                let resultAnimalAddress = await animalAddressDAO.setInsertAnimalAddress(animalAddress)
                if (resultAnimalAddress) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                    MESSAGES.DEFAULT_HEADER.items = animalAddress

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

async function updateAnimalAddress(idAnimalAddress, newDataAnimalAddress, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let dataValidation = await validation.animalAddressDataValidation(newDataAnimalAddress, contentType)

            if (!dataValidation) {
                let animalAddressValidation = await searchAnimalAddressById(idAnimalAddress)
                if (animalAddressValidation.status_code == 200) {
                    // Processamento
                    // Chama a função para update um novo endereço de animal no BD"
                    let resultAnimalAddress = await animalAddressDAO.setUpdateAnimalAddress(idAnimalAddress, newDataAnimalAddress)
                    console.log(resultAnimalAddress)
                    if (resultAnimalAddress) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.animal = newDataAnimalAddress

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return animalAddressValidation // A função searchAnimalAddressById poderá retornar (400 ou 404 ou 500)
                }

            } else {
                return dataValidation // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

async function deleteAnimalAddress(idAnimalAddress) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let animalAddressValidation = await searchAnimalAddressById(idAnimalAddress)
        if (animalAddressValidation.status_code == 200) {

            // Processamento
            // Chama a função para deletar endereço de animal no BD
            let resultAnimalAddress = await animalAddressDAO.setDeleteAnimalAddress(idAnimalAddress)
            console.log(resultAnimalAddress)

            if (resultAnimalAddress) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return animalAddressValidation // A função searchAnimalAddressById poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listAnimalAddress,
    searchAnimalAddressById,
    insertAnimalAddress,
    updateAnimalAddress,
    deleteAnimalAddress
}