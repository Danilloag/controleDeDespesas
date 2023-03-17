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

let listaCategorias = document.querySelector('#lista-categorias')

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

// btnAdicionarCategoria.addEventListener("click",() => {
//     categorias.push(inputNovaCategoria.value);
//     inputNovaCategoria.value = '';
//     msgUsuario.style.display = 'block'
// })

btnAdicionarCategoria.onclick = function () {
    if (inputNovaCategoria.value.trim()) {
        let categoria = {
            nome: inputNovaCategoria.value,
            id: gerarIdUnico()
        }
        armazenaCategoria(categoria);
    }
}

function armazenaCategoria(categoria) {
    categorias.push(categoria);
    atualizarTabelaCategorias(categoria.id, categoria.nome);
}

function atualizarTabelaCategorias(id, nome) {
    listaCategorias.innerHTML += `
    <tr>
        <td>${id}</td>
        <td>${nome}</td>
        <td class="coluna-botao"><button class="botao-primario botao-pequeno">EDITAR</button>
            <button class="botao-pequeno botao-excluir">EXCLUIR</button>
        </td>
    </tr>
    `
}

function gerarIdUnico() {
    let date = new Date();
    let components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    return components.join("").slice(-6);
}


//RETOMAR DESTE PONTO
function verificaCategoriasRepetidas(categoriaRecebida) {
    categorias.forEach(categoria => {
        if (categoria !== categoriaRecebida) {
            console.log("A categoria é diferente")
        } else {
            console.log('A categoria é igual')
        }
    })
}