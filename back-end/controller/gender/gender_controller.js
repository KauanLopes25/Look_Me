/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela de idade.
* Autor: Luana Mariana Lopes Bomfim
* Data: 04/12/2025
* Versão: 1.0
********************************************************************************************/

const generoDAO = require('../../model/DAO/gender_model.js')

const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')

const listarGeneros = async function () {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de espécies do BD
        let resultGender = await generoDAO.getSelectAllGenders()

        if (resultGender) {

            if (resultGender.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.generos = resultGender


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

const buscarGeneroID = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultGender = await generoDAO.getSelectGenderById(Number(id))

            if (resultGender) {
                if (resultGender.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.genero = resultGender

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

const inserirGenero = async function (genero, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (genero.descricao != '' && genero.descricao != undefined && genero.descricao != null && genero.descricao.length < 10) {

                let resultGender = await generoDAO.setInsertGender(genero)

                if (resultGender) {
    
                    let lastID = await generoDAO.getSelectLastId()

                    if (lastID) {

                        genero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = genero

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {

                MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [descrição incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const atualizarGenero = async function (genero, id, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo da requisição (TEM QUE SER JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (genero.descricao != '' && genero.descricao != undefined && genero.descricao != null && genero.descricao.length < 10) {

               //validando a existência do ID no Banco de Dados
                let validarID = await buscarGeneroID(id)

                if (validarID.status_code == 200) {

                    //Adiciona o id no JSON de dados para ser encaminhado ao DAO
                    genero.id = Number(id)

                    //Processamento
                    let resultGender = await generoDAO.setUpdateGender(genero)
                    if (resultGender) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.genero = genero

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarID 
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[descrição incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const excluirGenero = async function(id){

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido
            let validarId = await buscarGeneroID(id)

            if(validarId.status_code == 200){

                let resultGender = await generoDAO.setDeleteGender(Number(id))

                if(resultGender){

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
    listarGeneros,
    buscarGeneroID,
    inserirGenero,
    atualizarGenero,
    excluirGenero
}