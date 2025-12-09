/********************************************************************************************
* Objetivo:  Arquivo responsável pelo CRUD de dados no MySQL referente ao gênero de um animal.
* Autor: Luana Mariana Lopes Bomfim
* Data: 03/12/2025
* Versão: 1.0
********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllGenders= async function () {
    try {

        let sql = `select * from tbl_sexo order by sexo_id desc`

        let result = await prisma.$queryRawUnsafe(sql) 
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

const getSelectGenderById = async function (id) {

    try {

        let sql = `select * from tbl_sexo where sexo_id = ${id}` 
        
        let result = await prisma.$queryRawUnsafe(sql)  

        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertGender = async function (genero) {
    try {
        
        let sql = `INSERT INTO tbl_sexo (descricao) VALUES ('${genero.descricao}')`
        

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

        let sql = `SELECT sexo_id FROM tbl_sexo ORDER BY sexo_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)
      
        if  (Array.isArray(result))
            return Number(result[0].sexo_id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateGender = async function (genero) {
    try {
        let sql = `UPDATE tbl_sexo set descricao = '${genero.descricao}' where sexo_id = ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql) 
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteGender = async function (id) {
    try {
        let sql = `delete from tbl_sexo where sexo_id = ${id}`

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
    getSelectAllGenders,
    getSelectGenderById,
    setInsertGender,
    getSelectLastId,
    setDeleteGender,
    setUpdateGender
}
