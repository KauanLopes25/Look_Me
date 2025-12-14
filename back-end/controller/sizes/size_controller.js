/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela porte.
* Autor: Luana Mariana Lopes Bomfim
* Data: 03/12/2025
* Versão: 1.0
********************************************************************************************/

const porteDAO = require('../../model/DAO/size_model.js')

const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')

const listarPortes = async function () {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de portes do BD
        let resultSizes = await porteDAO.getSelectAllSizes()

        if (resultSizes) {

            if (resultSizes.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.porte = resultSizes


                return MESSAGES.DEFAULT_HEADER//200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarPorteID = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultSize = await porteDAO.getSelectSizeById(Number(id))

            if (resultSize) {
                if (resultSize.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.porte = resultSize

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const inserirPorte = async function (porte, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (porte.nome != '' && porte.nome != undefined && porte.nome != null && porte.nome.length < 100) {

                let resultSize = await porteDAO.setInsertSize(porte)

                if (resultSize) {

                
                    let lastID = await porteDAO.getSelectLastId()

                    if (lastID) {

                        porte.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = porte

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const atualizarPorte = async function (porte, id, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo da requisição (TEM QUE SER JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //validação dos dados do porte
            if (porte.nome != '' && porte.nome != undefined && porte.nome != null && porte.nome.length < 100) {

               //validando a existência do ID no Banco de Dados
                let validarID = await buscarPorteID(id)

                if (validarID.status_code == 200) {

                    //Adiciona o id do genero no JSON de dados para ser encaminhado ao DAO
                    porte.id = Number(id)

                    //Processamento
                    //chama a função do model para atualizar um genero no BD
                    let resultSize = await porteDAO.setUpdateSize(porte)
                    if (resultSize) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.porte = porte

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID //retorna erros da função buscarGeneroID()
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const excluirPorte = async function(id){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarPorteID(id)

            if(validarId.status_code == 200){

                let resultSize = await porteDAO.setDeleteSize(Number(id))

                if(resultSize){

                    MESSAGES.DEFAULT_HEADER.status          = DEFAULT_MESSAGES.SUCCESS_DELETE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = DEFAULT_MESSAGES.SUCCESS_DELETE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = DEFAULT_MESSAGES.SUCCESS_DELETE_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //200
                    
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    listarPortes,
    buscarPorteID,
    inserirPorte,
    atualizarPorte,
    excluirPorte
}