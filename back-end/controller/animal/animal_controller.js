/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela de animal.
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
// Importação do arquivo model da tbl_animal
const animalDAO = require('../../model/DAO/animal_model.js')
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')
// Importação do arquivo de validação de dados de usuário
const validation = require('./animal_validation.js')

// Configuração da da azure para enviar arquivos
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = "image";

const blobService = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobService.getContainerClient(CONTAINER_NAME);

async function uploadToAzure(arquivo) {
    // Nome único no Azure
    const blobName = Date.now() + "-" + arquivo.originalname;

    // Cria o blob
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload direto do buffer para o Azure
    await blockBlobClient.uploadData(arquivo.buffer, {
        blobHTTPHeaders: {
            blobContentType: arquivo.mimetype  // mantém o tipo correto
        }
    });

    // Retorna URL pública
    return blockBlobClient.url;
}

// Mostra todos os animal do banco
async function listAnimal() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de animal do BD
        let resultAnimal = await animalDAO.getSelectAllAnimals()
        if (resultAnimal) {
            if (resultAnimal.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.animal = resultAnimal

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

async function searchAnimalById(idAnimal) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de animal do BD
        let resultAnimal = await animalDAO.getSelectAnimalById(Number(idAnimal))
        if (resultAnimal) {
            if (resultAnimal.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.animal = resultAnimal

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

async function searchAnimalByUser(idUser) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de animal do BD
        let resultAnimal = await animalDAO.getSelectAnimalByUser(idUser)
        if (resultAnimal) {
            if (resultAnimal.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.animal = resultAnimal

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
async function insertAnimal(animal, arquivo) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (animal) {
            let dataValidation = await validation.animalDataValidation(animal)

            // Envia imagem para Azure
            let imageUrl = null;
            if (arquivo) {
                imageUrl = await uploadToAzure(arquivo)
                animal.foto_url = imageUrl
            }

            if (!dataValidation) {
                // Processamento
                // Chama a função para inserir um novo animal no BD"
                animal.foto_url = imageUrl
                let resultAnimal = await animalDAO.setInsertAnimal(animal)
                if (resultAnimal) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                    MESSAGES.DEFAULT_HEADER.items = animal

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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function updateAnimal(idAnimal, newDataAnimal, arquivo) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (newDataAnimal) {

            let dataValidation = await validation.animalDataValidation(newDataAnimal)
            // Envia imagem para Azure
            let imageUrl = null;
            if (arquivo) {
                imageUrl = await uploadToAzure(arquivo)
                newDataAnimal.foto_url = imageUrl
            }
            if (!dataValidation) {
                let animalValidation = await searchAnimalById(idAnimal)
                if (animalValidation.status_code == 200) {
                    // Processamento
                    // Chama a função para update um animal no BD"
                    let resultAnimal = await animalDAO.setUpdateAnimal(idAnimal, newDataAnimal)
                    if (resultAnimal) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.animal = newDataAnimal

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return animalValidation // A função searchAnimalById poderá retornar (400 ou 404 ou 500)
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

async function deleteAnimal(idAnimal) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let animalValidation = await searchAnimalById(idAnimal)
        if (animalValidation.status_code == 200) {

            // Processamento
            // Chama a função para deletar animal no BD
            let resultAnimal = await animalDAO.setDeleteAnimal(idAnimal)
            console.log(resultAnimal)

            if (resultAnimal) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função searchAnimalByUser poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listAnimal,
    searchAnimalById,
    searchAnimalByUser,
    insertAnimal,
    updateAnimal,
    deleteAnimal
}