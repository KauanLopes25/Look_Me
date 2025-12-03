/* *****************************************************************************************
* Objetivo: animações e funcionalidades da pagina de cadastro
* Data de inicio: 27/11/2025
* Versão: 1.0
* *****************************************************************************************/

'use strict'

//ANIMAÇÕES

//mostrar ou ocultar a senha no input ao clicar no icone de olho

const inputCriarSenha = document.getElementById("criar-senha")
const inputConfirmarSenha = document.getElementById("confirmar-senha")

const iconCriarSenha = document.getElementById("icon-criar-senha")
const iconConfirmarSenha = document.getElementById("icon-confirmar-senha")

//como estamos utilizando os icones do bootstrap haveria conflito de class, entao necessita ser 2 ids diferentes
//por tanto não poderia utilizar uma class para os dois icones e os dois inputs

iconCriarSenha.addEventListener("click", () => {
    const ehSenha = inputCriarSenha.type == "password"

    inputCriarSenha.type = ehSenha ? "text" : "password"

    if (ehSenha) {
        iconCriarSenha.classList.remove("bi-eye")
        iconCriarSenha.classList.add("bi-eye-slash")
    } else {
        iconCriarSenha.classList.remove("bi-eye-slash")
        iconCriarSenha.classList.add("bi-eye")
    }
})

iconConfirmarSenha.addEventListener("click", () => {
    const ehSenha = inputConfirmarSenha.type == "password"

    inputConfirmarSenha.type = ehSenha ? "text" : "password"

    if (ehSenha) {
        iconConfirmarSenha.classList.remove("bi-eye")
        iconConfirmarSenha.classList.add("bi-eye-slash")
    } else {
        iconConfirmarSenha.classList.remove("bi-eye-slash")
        iconConfirmarSenha.classList.add("bi-eye")
    }
})

/***************************************/
/***************************************/

// FUNCIONALIDADES

//preencher automaticamente os campos de endereço ao digitar o cep, consumindo a api publica viacep

const limparFormulario = () => {

    document.getElementById('logradouro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('estado').value = ''

}

const preencherFormulario = (endereco) => {

    //selecionando os elementos e adicionando as informações do json referentes a cada um
    document.getElementById('logradouro').value = endereco.logradouro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
    
}

const verificarNumero = (numero) => /^[0-9]+$/.test(numero)
//verifica se é numero

const cepValido = (cep) => cep.length == 8 && verificarNumero(cep)
//verifica se o digitado no campo de cep tem 8 digitos e se é um numero chamando a function que verifica se é numero

const pesquisarCep = async() => {

    limparFormulario()

    const cep = document.getElementById('cep').value.replace("-","")
    const url = `https://viacep.com.br/ws/${cep}/json/`

    if (cepValido(cep)) {

        const dados = await fetch(url)
        const endereco = await dados.json()

        if (endereco.hasOwnProperty('erro')) {
        // se o json tem a propriedade erro (ou seja, caso o cep seja invalido), então mensagem de erro, se não, preencher o formulario
            document.getElementById('cep').value = 'CEP não encontrado!'
        } else {
            preencherFormulario(endereco)
            //acionar a function de preencher os elementos
        }

    } else {
        document.getElementById('cep').value = 'CEP incorreto!'
    }
  
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep)

/***************************************/