/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela de endereço de usuario.
* Autor: Kauan Lopes Pereira
* Data: 04/12/2025
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
* Todo Json pode ser acessado com ".logradouroAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
******************************** BIBLIOTECAS UTILIZADAS *************************************
********************************************************************************************/
// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Buscar todos os endereços de usuários do banco
async function getSelectAllUsersAddress() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de endereço de Usuário
        let sql = `SELECT * FROM tbl_endereco_usuario ORDER BY endereco_usuario_id DESC`
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
// Buscar um registro de endereço de usuário no banco pelo id
async function getSelectUserAddressById(idUser) {
    try {
        // Variavel com o comando sql para buscar um registro de endereço de usuário
        let sql = `SELECT * FROM tbl_endereco_usuario WHERE usuario_id = ${idUser}`
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

// Buscar um registro de endereço de usuário no banco pelo id do endereço
async function getSelectUserAddressByIdAddress(idUserAddress) {
    try {
        // Variavel com o comando sql para buscar um registro de endereço de usuário
        let sql = `SELECT * FROM tbl_endereco_usuario WHERE endereco_usuario_id = ${idUserAddress}`
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

// Inserir um registro de endereço de um usuário no banco
async function setInsertUserAddress(userAddress) {
    try {
        // Variavel com o comando sql para inserir um registro em uma tabela
        let sql = `
        insert into tbl_endereco_usuario 
        (logradouro, numero, bairro, cidade, uf, cep, usuario_id, regiao)
        values (
                '${userAddress.logradouro}',
                '${userAddress.numero}',
                '${userAddress.bairro}',
                '${userAddress.cidade}',
                '${userAddress.uf}',
                '${userAddress.cep}', 
                '${userAddress.usuario_id}',
                '${userAddress.regiao}'
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
// Altera um registro de endereço de um usuario no banco de dados
async function setUpdateUserAddress(idUserAddress, newDataUserAddress) {
    try {
        let sql = ` UPDATE tbl_endereco_usuario
                    SET logradouro = '${newDataUserAddress.logradouro}', 
                    numero = '${newDataUserAddress.numero}', 
                    bairro = '${newDataUserAddress.bairro}',
                    cidade = '${newDataUserAddress.cidade}',
                    uf = '${newDataUserAddress.uf}',
                    cep = '${newDataUserAddress.cep}',
                    usuario_id = ${newDataUserAddress.usuario_id},
                    regiao = '${newDataUserAddress.regiao}'
                    WHERE endereco_usuario_id = '${idUserAddress}';`
                    

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
// Excluir um registro de endereço de um usuario no banco de dados
async function setDeleteUserAddress(idUserAddress) {
    try {
        let sql = `DELETE FROM tbl_endereco_usuario
                    WHERE endereco_usuario_id = '${idUserAddress}';`

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

module.exports = {
    getSelectAllUsersAddress,
    getSelectUserAddressById,
    getSelectUserAddressByIdAddress,
    setInsertUserAddress,
    setUpdateUserAddress,
    setDeleteUserAddress
}