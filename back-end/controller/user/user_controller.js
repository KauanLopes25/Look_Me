/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela usuarios.
* Autor: Kauan Lopes Pereira
* Data: 01/12/2025
* Versão: 1.0
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************

************************************** OBSERVAÇÕES ******************************************

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/
// Importação do arquivo model da tbl_usuario
const userDAO = require('../../model/DAO/user_model.js')
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')
// Importação do arquivo de validação de dados de usuário
const validation = require('./user_validation.js')

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

// Mostra todos os usuarios do banco
async function listUsers() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de usuarios do BD
        let resultUser = await userDAO.getSelectAllUsers()
        if (resultUser) {
            if (resultUser.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.usuarios = resultUser

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

async function searchUserById(id_user) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de usuarios do BD
        let resultUser = await userDAO.getSelectUserById(Number(id_user))
        if (resultUser) {
            if (resultUser.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.usuarios = resultUser

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

async function searchUserByEmail(email) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de usuarios do BD
        let resultUser = await userDAO.getSelectUserByEmail(email)
        if (resultUser) {
            if (resultUser.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.usuarios = resultUser

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
async function insertUser(user, arquivo) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (user) {

            let dataValidation = await validation.userDataValidation(user)
            // Envia imagem para Azure
            let imageUrl = null;
            if (arquivo) {
                imageUrl = await uploadToAzure(arquivo)
                user.foto_url = imageUrl
            }
            if (!dataValidation) {

                // Processamento
                // Chama a função para update um novo usuario no BD"
                let resultUser = await userDAO.setInsertUser(user)
                if (resultUser) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                    MESSAGES.DEFAULT_HEADER.items = user

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

async function updateUser(email, newDataUser, arquivo) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (newDataUser) {

            let dataValidation = await validation.userDataValidation(newDataUser)
            // Envia imagem para Azure
            let imageUrl = null;
            if (arquivo) {
                imageUrl = await uploadToAzure(arquivo)
                newDataUser.foto_url = imageUrl
            }
            if (!dataValidation) {
                let userValidation = await searchUserByEmail(email)
                if (userValidation.status_code == 200) {
                    // Processamento
                    // Chama a função para update um novo usuario no BD"
                    let resultUser = await userDAO.setUpdateUser(email, newDataUser)
                    if (resultUser) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.usuario = newDataUser

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return userValidation // A função searchUserByEmail poderá retornar (400 ou 404 ou 500)
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

async function deleteUser(email) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let userValidation = await searchUserByEmail(email)
        if (userValidation.status_code == 200) {

            // Processamento
            // Chama a função para deletar usuário no BD
            let resultUser = await userDAO.setDeleteUser(email)
            console.log(resultUser)

            if (resultUser) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função searchUserByEmail poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listUsers,
    searchUserById,
    searchUserByEmail,
    insertUser,
    updateUser,
    deleteUser
}