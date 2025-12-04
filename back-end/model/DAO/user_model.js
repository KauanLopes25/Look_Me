/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela usuario.
* Autor: Kauan Lopes Pereira
* Data: 01/12/2025
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
* Todo Json pode ser acessado com ".nomeAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
******************************** BIBLIOTECAS UTILIZADAS *************************************
********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Buscar todos os usuários do banco
async function getSelectAllUsers() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de Usuário
        let sql = `SELECT * FROM tbl_usuario ORDER BY usuario_id DESC`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }
}
// Buscar um registro de usuário no banco pelo id
async function getSelectUserById(id_user) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de Usuário
        let sql = `SELECT * FROM tbl_usuario WHERE usuario_id = ${id_user}`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }
}
// Buscar um registro de usuário no banco pelo email
async function getSelectUserByEmail(email) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de Usuário
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${email}'`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}
// Inserir um registro de usuário no banco
async function setInsertUser(user) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de usuário
        let sql = `
        insert into tbl_usuario 
        (nome, data_nascimento, telefone, email, foto_url, senha, status_cadastro)
        values (
                '${user.nome}',
                '${user.data_nascimento}',
                '${user.telefone}',
                '${user.email}',
                '${user.foto_url}',
                '${user.senha}', 
                '${user.status_cadastro}' 
        );`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }
}
// Altera um registro de um usuario no banco de dados
async function setUpdateUser(email, newDataUser) {
    try {
        let sql = ` UPDATE tbl_usuario
                    SET nome = '${newDataUser.nome}', 
                    data_nascimento = '${newDataUser.data_nascimento}', 
                    telefone = '${newDataUser.telefone}',
                    email = '${newDataUser.email}',
                    foto_url = '${newDataUser.foto_url}',
                    senha = '${newDataUser.senha}',
                    status_cadastro = '${newDataUser.status_cadastro}'
                    WHERE email = '${email}';`

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
// Excluir um registro de usuario no banco de dados
async function setDeleteUser(email) {
    try {
        let sql = `DELETE FROM tbl_usuario
                    WHERE email = '${email}';`

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
    getSelectAllUsers,
    getSelectUserById,
    getSelectUserByEmail,
    setInsertUser,
    setUpdateUser,
    setDeleteUser
}