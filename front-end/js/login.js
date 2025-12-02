/* *****************************************************************************************
* Objetivo: animações e funcionalidades da pagina de login
* Data: 27/11/2025
* Versão: 1.0
* *****************************************************************************************/

'use strict'

//ANIMAÇÕES

//mostrar ou ocultar a senha no input ao clicar no icone de olho

const inputSenha = document.getElementById("senha")
const iconSenha = document.getElementById("icon-senha")

iconSenha.addEventListener("click", () => {
    const ehSenha = inputSenha.type == "password"

    inputSenha.type = ehSenha ? "text" : "password"

    if (ehSenha) {
        iconSenha.classList.remove("bi-eye")
        iconSenha.classList.add("bi-eye-slash")
    } else {
        iconSenha.classList.remove("bi-eye-slash")
        iconSenha.classList.add("bi-eye")
    }
})

