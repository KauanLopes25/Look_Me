/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela favoritos.
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

// Buscar todos as favoritos do banco
async function getSelectAllFavorites() {
    try {
        // Variavel com o comando sql para buscar todos os registros da tabela de favoritos
        let sql = `SELECT * FROM tbl_favoritos ORDER BY favorito_id DESC`
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

// Buscar um registro de favoritos no banco pelo id
async function getSelectFavoriteById(idFavorite) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de favoritos
        let sql = `SELECT * FROM tbl_favoritos WHERE favorito_id = ${idFavorite}`
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

// Buscar um registro de favoritos no banco pelo id do usuário
async function getSelectFavoritesByIdUser(idUser) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de favoritos
        let sql = `SELECT * FROM tbl_favoritos WHERE usuario_id = ${idUser}`
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

// Inserir um registro de favorito no banco
async function setInsertFavorite(favorite) {
    try {
        // Variavel com o comando sql para inserir dados na tabela de favoritos
        let sql = `
        insert into tbl_favoritos 
        (usuario_id, animal_id)
        values (
                '${favorite.usuario_id}',
                '${favorite.animal_id}'
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
// Altera um registro de favorito no banco de dados
async function setUpdateFavorite(idFavorite, newDataFavorite) {
    try {
        let sql = ` UPDATE tbl_favoritos
                    SET usuario_id = '${newDataFavorite.usuario_id}', 
                    animal_id = '${newDataFavorite.animal_id}'
                    WHERE favorito_id = '${idFavorite}';`

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
// Excluir um registro de favorito no banco de dados
async function setDeleteFavorite(idFavorite) {
    try {
        let sql = `DELETE FROM tbl_favoritos
                    WHERE favorito_id = '${idFavorite}';`

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
    getSelectAllFavorites,
    getSelectFavoriteById,
    getSelectFavoritesByIdUser,
    setInsertFavorite,
    setUpdateFavorite,
    setDeleteFavorite
}