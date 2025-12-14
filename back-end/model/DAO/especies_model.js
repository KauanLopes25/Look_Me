/********************************************************************************************
* Objetivo:  Arquivo responsável pelo CRUD de dados no MySQL referente à espécie de um animal.
* Autor: Luana Mariana Lopes Bomfim
* Data: 03/12/2025
* Versão: 1.0
********************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllEspecies = async function () {
    try {

        let sql = `select * from tbl_especie order by especie_id desc`

        let result = await prisma.$queryRawUnsafe(sql) 
        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
    
        return false
    }
}

const getSelectEspeciesById = async function (id) {

    try {

        let sql = `select * from tbl_especie where especie_id = ${id}` 
        
        let result = await prisma.$queryRawUnsafe(sql)  

        if  (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertEspecies = async function (especie) {
    try {
        
        let sql = `INSERT INTO tbl_especie (nome_especie) VALUES ('${especie.nome}')`
        

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

        let sql = `SElECT especie_id FROM tbl_especie ORDER BY especie_id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)
      
        if  (Array.isArray(result))
            return Number(result[0].especie_id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateEspecies = async function (especie) {
    try {
        let sql = `UPDATE tbl_especie set nome_especie = '${especie.nome}' where especie_id = ${especie.id}`

        let result = await prisma.$executeRawUnsafe(sql) 
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteEspecies = async function (id) {
    try {
        let sql = `delete from tbl_especie where especie_id = ${id}`

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
    getSelectAllEspecies,
    getSelectEspeciesById,
    setInsertEspecies,
    getSelectLastId,
    setDeleteEspecies,
    setUpdateEspecies
}