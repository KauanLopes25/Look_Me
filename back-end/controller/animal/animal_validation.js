/********************************************************************************************
* Objetivo: Arquivo responsavel validação de dados fornecidos sobre animal na API.
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
// Importação do arquivo de mensagens da API
const DEFAULT_MESSAGES = require('../menssages/config_menssages.js')

async function animalDataValidation(animal, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (
            typeof animal.nome !== "string" ||
            animal.nome == '' ||
            animal.nome == undefined ||
            animal.nome == null ||
            animal.nome.length > 80) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de nome incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.temperamento !== "string" ||
            animal.temperamento == '' ||
            animal.temperamento == undefined ||
            animal.temperamento == null ||
            animal.temperamento.length > 500) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de temperamento incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.informacoes_veterinarias !== "string" ||
            animal.informacoes_veterinarias == '' ||
            animal.informacoes_veterinarias == undefined ||
            animal.informacoes_veterinarias == null ||
            animal.informacoes_veterinarias.length > 800) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de informacoes_veterinarias incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.descricao !== "string" ||
            animal.descricao == '' ||
            animal.descricao == undefined ||
            animal.descricao == null ||
            animal.descricao.length > 1000) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de descricao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.adaptabildiade !== "string" ||
            animal.adaptabildiade == '' ||
            animal.adaptabildiade == undefined ||
            animal.adaptabildiade == null ||
            animal.adaptabildiade.length > 500) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de adaptabildiade incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.foto_url !== "string" ||
            animal.foto_url == '' ||
            animal.foto_url == undefined ||
            animal.foto_url == null ||
            animal.cep.length > 200) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de foto_url incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.status_adocao !== "number" ||
            animal.status_adocao == '' ||
            animal.status_adocao == undefined ||
            animal.status_adocao == null ) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de status_adocao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.status_castracao !== "number" ||
            animal.status_castracao == '' ||
            animal.status_castracao == undefined ||
            animal.status_castracao == null ) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de status_castracao incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.status_cadastro !== "number" ||
            animal.status_cadastro == '' ||
            animal.status_cadastro == undefined ||
            animal.status_cadastro == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de status_cadastro incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.porte_id !== "number" ||
            animal.porte_id == '' ||
            animal.porte_id == undefined ||
            animal.porte_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de porte_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.raca_id !== "number" ||
            animal.raca_id == '' ||
            animal.raca_id == undefined ||
            animal.raca_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de raca_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.especie_id !== "number" ||
            animal.especie_id == '' ||
            animal.especie_id == undefined ||
            animal.especie_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de especie_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.idade_id !== "number" ||
            animal.idade_id == '' ||
            animal.idade_id == undefined ||
            animal.idade_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de idade_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.sexo_id !== "number" ||
            animal.sexo_id == '' ||
            animal.sexo_id == undefined ||
            animal.sexo_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de sexo_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (
            typeof animal.usuario_id !== "number" ||
            animal.usuario_id == '' ||
            animal.usuario_id == undefined ||
            animal.usuario_id == null ){
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Formato de usuario_id incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    animalDataValidation
}