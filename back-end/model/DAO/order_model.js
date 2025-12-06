/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela de pedidos de adoção.
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
* Todo Json pode ser acessado com ".usuario_idAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
******************************** BIBLIOTECAS UTILIZADAS *************************************
********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Buscar todos as pedidos de adoção do banco
async function getSelectAllOrders() {
    try {
        // Variavel com o comando sql para buscar todos os registros da tabela de pedido de adoção
        let sql = `SELECT * FROM tbl_pedido_adocao ORDER BY pedido_id DESC`
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

// Buscar um registro de pedido de adoção no banco pelo id
async function getSelectOrderById(idOrder) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de pedido de adoção
        let sql = `SELECT * FROM tbl_pedido_adocao WHERE pedido_id = ${idOrder}`
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

// Buscar um registro de pedido de adoção no banco pelo id do usuário
async function getSelectOrderByIdUser(idUser) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de pedido de adoção
        let sql = `SELECT * FROM tbl_pedido_adocao WHERE usuario_id = ${idUser}`
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

// Buscar um registro de pedido de adoção no banco pelo id do animal
async function getSelectOrderByIdAnimal(idAnimal) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de pedido de adoção
        let sql = `SELECT * FROM tbl_pedido_adocao WHERE animal_id = ${idAnimal}`
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

// Inserir um registro de pedido de adoção no banco
async function setInsertOrder(order) {
    try {
        // Variavel com o comando sql para inserir dados na tabela de pedido de adoção
        let sql = `
        insert into tbl_pedido_adocao 
        (status_pedido, data_solicitacao, usuario_id, animal_id)
        values (
                '${order.status_pedido}',
                '${order.data_solicitacao}',
                '${order.usuario_id}',
                '${order.animal_id}'
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
// Altera um registro de pedido de adoção no banco de dados
async function setUpdateOrder(idOrder, newDataOrder) {
    try {
        let sql = ` UPDATE tbl_pedido_adocao
                    SET status_pedido = '${newDataOrder.status_pedido}', 
                    data_solicitacao = '${newDataOrder.data_solicitacao}',
                    usuario_id = '${newDataOrder.usuario_id}', 
                    animal_id = '${newDataOrder.animal_id}'
                    WHERE pedido_id = '${idOrder}';`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}
// Excluir um registro de pedido de adoção no banco de dados
async function setDeleteOrder(idOrder) {
    try {
        let sql = `DELETE FROM tbl_pedido_adocao
                    WHERE pedido_id = '${idOrder}';`

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
    getSelectAllOrders,
    getSelectOrderById,
    getSelectOrderByIdUser,
    getSelectOrderByIdAnimal,
    setInsertOrder,
    setUpdateOrder,
    setDeleteOrder
}