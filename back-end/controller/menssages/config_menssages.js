/********************************************************************************************
* Objetivo: Arquivo responsavel por padronizar as mensagens que o projeto irá realizar, [
            sempre no formato JSON (Mensagens de erro e sucesso)
* Autor: Kauan Lopes Pereira
* Data: 26/11/2025
* Versão: 1.0
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/******************************** MENSAGENS PADRONIZADAS *************************************/
const data_atual = new Date()

const DEFAULT_HEADER = {
    api_description: 'API para manipular dados da Look Me',
    development: 'Kauan Lopes Pereira',
    status: Boolean,
    status_code: Number,
    date_request: data_atual.toString(),
    items: {}

}


/********************************** MENSAGENS DE SUCESSO *************************************/

const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!'
}
const SUCCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso!'
}
const SUCCESS_DELETE_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item deletado com sucesso!'
}

/************************************ MENSAGENS DE ERRO **************************************/

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno!'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição, devido a erros internos no servidor (CONTROLLER)!'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição, devido a erros internos no servidor (MODELAGEM DE DADOS)!'
}
const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possivel processar a requisição, pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme documentação!'
}
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possivel processar a requisição, pois o tipo de dados eviado no corpo deve ser JSON!'
}
const ERROR_RELATIONAL_INSERTION = {
    status: false,
    status_code: 500,
    message: 'A requisição do item principal foi processada, porém houveram problemas ao inserir dados na tabela de relacionamento!'
}
module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETE_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    ERROR_RELATIONAL_INSERTION
}