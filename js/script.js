let btnAbreModalDespesa = document.querySelector('#botao-abre-modal-despesa')
let btnAdicionarDespesa = document.getElementById('botao-adicionar-despesa');
let btnFecharModalDespesa = document.getElementById('fechar-modal-despesa');
let btnAbreModalCategoria = document.querySelector('#botao-abre-modal-categoria')
let btnAdicionarCategoria = document.querySelector('#botao-adicionar-categoria');
let btnFecharModalCategoria = document.querySelector('#botao-fechar-modal-categoria');

let modalAdicionarDespesa = document.querySelector('#modal-adicionar-despesa');
let fundoModalAdicionarDespesa = document.querySelector('#fundo-modal-despesa');
let modalAdicionarCategoria = document.querySelector('#modal-adicionar-categoria');
let fundoModalAdicionarCategoria = document.querySelector('#fundo-modal-categoria');

let msgUsuario = document.querySelector('#msgUsuario')

let inputNovaCategoria = document.querySelector('#inputNovaCategoria');

function toggleModal(fundo, modal) {
    fundo.classList.toggle('oculto');
    modal.classList.toggle('oculto');
}

[btnAbreModalDespesa, btnFecharModalDespesa, fundoModalAdicionarDespesa].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalAdicionarDespesa, modalAdicionarDespesa));
});

[btnAbreModalCategoria, btnFecharModalCategoria, fundoModalAdicionarCategoria].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalAdicionarCategoria, modalAdicionarCategoria));
});

[modalAdicionarCategoria, modalAdicionarDespesa].forEach((el) => {
    el.addEventListener("click", function (event) {
        event.stopPropagation();
    });
})

let categorias = []

// function adicionarCategoria(categoria) {
//     categorias.push(categoria);
//     console.log(categorias);
// }

btnAdicionarCategoria.addEventListener("click",() => {
    categorias.push(inputNovaCategoria.value);
    inputNovaCategoria.value = '';
    msgUsuario.style.display = 'block'
    console.log(categorias)
})