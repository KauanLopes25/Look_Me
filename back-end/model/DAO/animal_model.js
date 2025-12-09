/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela de animal.
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
* Todo Json pode ser acessado com ".nomeAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
******************************** BIBLIOTECAS UTILIZADAS *************************************
********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Buscar todos os animais no banco
async function getSelectAllAnimals() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de animal
        let sql = `SELECT * FROM tbl_animal ORDER BY animal_id DESC`
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
// Buscar um registro de animal no banco pelo id
async function getSelectAnimalById(idAnimal) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de animal
        let sql = `SELECT * FROM tbl_animal WHERE animal_id = ${idAnimal}`
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
// Buscar um registro de animal no banco pelo protetor cadastrado
async function getSelectAnimalByUser(idUser) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de animal
        let sql = `SELECT * FROM tbl_animal WHERE usuario_id = ${idUser}`
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
// Inserir um registro de animal no banco
async function setInsertAnimal(animal) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de animal
        let sql = `
        insert into tbl_animal 
        (
            nome, temperamento, informacoes_veterinarias, descricao, 
            adaptabilidade, foto_url, status_adocao, status_castracao,
            status_cadastro, porte_id, raca_id, especie_id, idade_id,
            sexo_id, usuario_id
        )
        values (
                '${animal.nome}',
                '${animal.temperamento}',
                '${animal.informacoes_veterinarias}',
                '${animal.descricao}',
                '${animal.adaptabilidade}',
                '${animal.foto_url}', 
                '${animal.status_adocao}',
                '${animal.status_castracao}',
                '${animal.status_cadastro}',
                '${animal.porte_id}',
                '${animal.raca_id}',
                '${animal.especie_id}',
                '${animal.idade_id}',
                '${animal.sexo_id}',
                '${animal.usuario_id}'
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
// Altera um registro de um animal no banco de dados
async function setUpdateAnimal(idAnimal, newDataAnimal) {
    try {
        let sql = ` UPDATE tbl_animal
                    SET nome = '${newDataAnimal.nome}', 
                    temperamento = '${newDataAnimal.temperamento}', 
                    informacoes_veterinarias = '${newDataAnimal.informacoes_veterinarias}',
                    descricao = '${newDataAnimal.descricao}',
                    adaptabilidade = '${newDataAnimal.adaptabilidade}',
                    foto_url = '${newDataAnimal.foto_url}',
                    status_adocao = '${newDataAnimal.status_adocao}',
                    status_castracao = '${newDataAnimal.status_castracao}',
                    status_cadastro = '${newDataAnimal.status_cadastro}',
                    porte_id = '${newDataAnimal.porte_id}',
                    raca_id = '${newDataAnimal.raca_id}',
                    especie_id = '${newDataAnimal.especie_id}',
                    idade_id = '${newDataAnimal.idade_id}',
                    sexo_id = '${newDataAnimal.sexo_id}',
                    usuario_id = '${newDataAnimal.usuario_id}'
                    WHERE animal_id = '${idAnimal}';`

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
// Excluir um registro de animal no banco de dados
async function setDeleteAnimal(idAnimal) {
    try {
        let sql = `DELETE FROM tbl_animal
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
    getSelectAllAnimals,
    getSelectAnimalById,
    getSelectAnimalByUser,
    setInsertAnimal,
    setUpdateAnimal,
    setDeleteAnimal
}