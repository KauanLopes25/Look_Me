/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela notificação.
* Autor: Kauan Lopes Pereira
* Data: 06/12/2025
* Versão: 1.0
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************
* $queryRawUnsafe(script) -> permite executar um script SQL de uma variavel e que retorna 
valores de um banco (SELECT).
* $executeRawUnsafe(script) -> Permite executar um script SQL de uma variavel e que não 
retorna dados do banco (INSERT, UPDATE e DELETE.)
* $queryRaw(script) -> permite executar um script SQL sem estar em uma variavel e que retorna 
valores do banco (SELECT). Faz tratamentos de segurança contra SQL Injection
* $executeRaw(script) -> Permite executar um script SQL sem estar em uma variavel e que não 
retorna dados do banco (INSERT, UPDATE e DELETE.). Faz tratamentos de segurança contra SQL 
Injection
************************************** OBSERVAÇÕES ******************************************
* Todo array possui um indice, e para acessar um indice devemos dizer qual a sua posição [0],
[3] ou [n], seria a posição em que aquele elemento se encontra dentro de todo array.
* Todo Json pode ser acessado com ".mensagemAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
******************************** BIBLIOTECAS UTILIZADAS *************************************
********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Buscar todos as notificações do banco
async function getSelectAllNotification() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de notificação
        let sql = `SELECT * FROM tbl_notificacao ORDER BY notificacao_id DESC`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        return false
    }
}
// Buscar um registro de notificação no banco pelo id
async function getSelectNotificationById(idUser) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de notificação
        let sql = `SELECT * FROM tbl_notificacao WHERE notificacao_id = ${idUser}`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        return false
    }
}
// Inserir um registro de notificação no banco
async function setInsertNotification(notification) {
    try {
        // Variavel com o comando sql para inserir dados na tabela de notificação
        let sql = `
        insert into tbl_notificacao 
        (mensagem, titulo, data_notificacao, usuario_id, pedido_id)
        values (
                '${notification.mensagem}',
                '${notification.titulo}',
                '${notification.data_notificacao}',
                '${notification.usuario_id}',
                '${notification.pedido_id}'
        );`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        return false
    }
}
// Altera um registro de uma notificação no banco de dados
async function setUpdateNotification(idNotification, newDataNotification) {
    try {
        let sql = ` UPDATE tbl_notificacao
                    SET mensagem = '${newDataNotification.mensagem}', 
                    titulo = '${newDataNotification.titulo}', 
                    data_notificacao = '${newDataNotification.data_notificacao}',
                    usuario_id = '${newDataNotification.usuario_id}',
                    pedido_id = '${newDataNotification.pedido_id}'
                    WHERE notificacao_id = '${idNotification}';`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {
        return false
    }
}
// Excluir um registro de notificação no banco de dados
async function setDeleteNotification(idNotification) {
    try {
        let sql = `DELETE FROM tbl_notificacao
                    WHERE notificacao_id = '${idNotification}';`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllNotification,
    getSelectNotificationById,
    setInsertNotification,
    setUpdateNotification,
    setDeleteNotification
}