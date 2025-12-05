/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela de endereço de animal.
* Autor: Kauan Lopes Pereira
* Data: 05/12/2025
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

// Buscar todos os endereços de animal do banco
async function getSelectAllAnimalAddress() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de endereço de animal
        let sql = `SELECT * FROM tbl_endereco_animal ORDER BY endereco_animal_id DESC`
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
// Buscar um registro de endereço de animal no banco pelo id
async function getSelectAnimalAddressById(idAnimal) {
    try {
        // Variavel com o comando sql para buscar um registro de endereço de animal
        let sql = `SELECT * FROM tbl_endereco_animal WHERE animal_id = ${idAnimal}`
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

// Inserir um registro de endereço de um animal no banco
async function setInsertAnimalAddress(AnimalAddress) {
    try {
        // Variavel com o comando sql para inserir um registro em uma tabela
        let sql = `
        insert into tbl_endereco_animal 
        (logradouro, numero, bairro, cidade, uf, cep, animal_id, regiao)
        values (
                '${AnimalAddress.logradouro}',
                '${AnimalAddress.numero}',
                '${AnimalAddress.bairro}',
                '${AnimalAddress.cidade}',
                '${AnimalAddress.uf}',
                '${AnimalAddress.cep}', 
                '${AnimalAddress.animal_id}',
                '${AnimalAddress.regiao}'
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
// Altera um registro de endereço de um animal no banco de dados
async function setUpdateAnimalAddress(idAnimal, newDataAnimalAddress) {
    try {
        let sql = ` UPDATE tbl_endereco_animal
                    SET logradouro = '${newDataAnimalAddress.logradouro}', 
                    numero = '${newDataAnimalAddress.numero}', 
                    bairro = '${newDataAnimalAddress.bairro}',
                    cidade = '${newDataAnimalAddress.cidade}',
                    uf = '${newDataAnimalAddress.uf}',
                    cep = '${newDataAnimalAddress.cep}',
                    animal_id = ${newDataAnimalAddress.animal_id},
                    regiao = '${newDataAnimalAddress.regiao}'
                    WHERE animal_id = '${idAnimal}';`
                    

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
// Excluir um registro de endereço de um animal no banco de dados
async function setDeleteAnimalAddress(idAnimal) {
    try {
        let sql = `DELETE FROM tbl_endereco_animal
                    WHERE animal_id = '${idAnimal}';`

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
    getSelectAllAnimalAddress,
    getSelectAnimalAddressById,
    setInsertAnimalAddress,
    setUpdateAnimalAddress,
    setDeleteAnimalAddress
}