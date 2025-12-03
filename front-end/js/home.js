/* *****************************************************************************************
* Objetivo: animações e funcionalidades da pagina principal de listagem de pets
* Data: 27/11/2025
* Versão: 1.0
* *****************************************************************************************/

'use strict'

//ANIMAÇÕES

//menu filtros

const botaoFiltro = document.querySelector(".botao-mobile-filter")
const sidebar = document.querySelector(".filtros")

//criar overlay no body
const overlay = document.createElement("div")
overlay.classList.add("overlay")
document.body.appendChild(overlay)

//abrir o menu
botaoFiltro.addEventListener("click", () => {
    sidebar.classList.add("ativo")
    overlay.classList.add("ativo")
})

//fechar ao clicar fora
overlay.addEventListener("click", () => {
    sidebar.classList.remove("ativo")
    overlay.classList.remove("ativo")
})
