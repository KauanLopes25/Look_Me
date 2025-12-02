/* *****************************************************************************************
* Objetivo: animações e funcionalidades da pagina de cadastro
* Data: 27/11/2025
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

