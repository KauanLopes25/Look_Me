/********************************************************************************************
* Objetivo:  Arquivo responsável pelo CRUD de dados no MySQL referente à raça de um animal.
* Autor: Luana Mariana Lopes Bomfim
* Data: 04/12/2025
* Versão: 1.0
********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllBreeds = async function () {
    try {
        let sql = `select * from tbl_raca order by raca_id desc`

        let result = await prisma.$queryRawUnsafe(sql) 
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

const getSelectBreedsById = async function (id) {

    try {
        let sql = `select * from tbl_raca where raca_id = ${id}` 
        
        let result = await prisma.$queryRawUnsafe(sql)  

        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

const setInsertBreeds = async function (raca) {
    try {
        
        let sql = `INSERT INTO tbl_raca (nome_raca) VALUES ('${raca.nome}')`
        

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

        let sql = `SElECT raca_id FROM tbl_raca ORDER BY raca_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)
      
        if  (Array.isArray(result))
            return Number(result[0].especie_id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateBreeds = async function (raca) {
    try {
        let sql = `UPDATE tbl_raca set nome_raca = '${especie.nome}' where raca_id = ${especie.id}`

        let result = await prisma.$executeRawUnsafe(sql) 
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteBreeds = async function (id) {
    try {
        let sql = `delete from tbl_raca where raca_id = ${id}`

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
    getSelectAllBreeds,
    getSelectBreedsById,
    setInsertBreeds,
    getSelectLastId,
    setDeleteBreeds,
    setUpdateBreeds
}