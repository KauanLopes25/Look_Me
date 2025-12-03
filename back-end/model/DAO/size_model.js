/********************************************************************************************
* Objetivo:  Arquivo responsável pelo CRUD de dados no MySQL referente ao tamanho de um animal.
* Autor: Luana Mariana Lopes Bomfim
* Data: 03/12/2025
* Versão: 1.0
********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllSizes = async function () {
    try {

        let sql = `select * from tbl_porte order by porte_id desc`

        let result = await prisma.$queryRawUnsafe(sql) 
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

const getSelectSizeById = async function (id) {

    try {

        let sql = `select * from tbl_porte where porte_id = ${id}` 
        
        let result = await prisma.$queryRawUnsafe(sql)  

        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

const setInsertSize = async function (porte) {
    try {
        
        let sql = `INSERT INTO tbl_porte (nome_porte) VALUES ('${porte.nome}')`
        

        let result = await prisma.$executeRawUnsafe(sql) 

        if (result)
            return true
        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }
}

const getSelectLastId = async function(){
    try {

        let sql = `SElECT porte_id FROM tbl_porte ORDER BY porte_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)
      
        if  (Array.isArray(result))
            return Number(result[0].porte_id)
        else
            return false

    } catch (error) {
        
        return false
    }
}

const setUpdateSize = async function (porte) {
    try {
        let sql = `UPDATE tbl_porte set nome_porte = '${porte.nome}' where porte_id = ${porte.id}`

        let result = await prisma.$executeRawUnsafe(sql) 
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteSize = async function (id) {
    try {
        let sql = `delete from tbl_porte where porte_id = ${id}`

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
    getSelectAllSizes,
    getSelectSizeById,
    setInsertSize,
    getSelectLastId,
    setDeleteSize,
    setUpdateSize
}