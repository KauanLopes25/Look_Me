/********************************************************************************************
* Objetivo:  Arquivo responsável pelo CRUD de dados no MySQL referente à idade de um animal.
* Autor: Luana Mariana Lopes Bomfim
* Data: 04/12/2025
* Versão: 1.0
********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllAges = async function () {
    try {
        let sql = `select * from tbl_idade order by idade_id desc`

        let result = await prisma.$queryRawUnsafe(sql) 
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

const getSelectAgesById = async function (id) {

    try {
        let sql = `select * from tbl_idade where idade_id = ${id}` 
        
        let result = await prisma.$queryRawUnsafe(sql)  

        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


const setInsertAges = async function (idade) {
    try {
        
        let sql = `INSERT INTO tbl_idade (descricao) VALUES ('${idade.descricao}')`
        

        let result = await prisma.$executeRawUnsafe(sql) 

        if (result)
            return true
        else
            return false


    } catch (error) {
        return false
    }
}

const getSelectLastId = async function(){
    try {

        let sql = `SElECT idade_id FROM tbl_idade ORDER BY idade_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if  (Array.isArray(result))
            return Number(result[0].idade_id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateAges = async function (idade) {
    try {
        let sql = `UPDATE tbl_idade set descricao = '${idade.descricao}' where idade_id = ${idade.id}`

        let result = await prisma.$executeRawUnsafe(sql) 
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteAges = async function (id) {
    try {
        let sql = `delete from tbl_idade where idade_id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllAges,
    getSelectAgesById,
    setInsertAges,
    getSelectLastId,
    setDeleteAges,
    setUpdateAges
}