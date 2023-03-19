let btnAbreModalDespesa = document.querySelector('#botao-abre-modal-despesa')
let btnAdicionarDespesa = document.getElementById('botao-adicionar-despesa');
let btnFecharModalDespesa = document.getElementById('fechar-modal-despesa');
let btnAbreModalCategoria = document.querySelector('#botao-abre-modal-categoria')
let btnAdicionarCategoria = document.querySelector('#botao-adicionar-categoria');
let btnFecharModalCategoria = document.querySelector('#botao-fechar-modal-categoria');
let btnFiltrarCategoria = document.querySelector('#botao-filtrar-categoria');
let btnRemoverFiltroCategoria = document.querySelector('#botao-remover-filtro-categoria');
let btnFecharModalEditarCategoria = document.querySelector('#botao-fechar-modal-editar-categoria');
let btnEditarCategoria = document.querySelector('#botao-editar-categoria');

let modalAdicionarDespesa = document.querySelector('#modal-adicionar-despesa');
let fundoModalAdicionarDespesa = document.querySelector('#fundo-modal-despesa');
let modalAdicionarCategoria = document.querySelector('#modal-adicionar-categoria');
let fundoModalAdicionarCategoria = document.querySelector('#fundo-modal-categoria');
let fundoModalEditarCategoria = document.querySelector('#fundo-modal-editar-categoria');
let modalEditarCategoria = document.querySelector('#modal-editar-categoria');

let divMsgUsuario = document.querySelector('#msgUsuario')

let inputNovaCategoria = document.querySelector('#inputNovaCategoria');
let inputFiltroCategoria = document.querySelector('#input-filtro-categoria');
let inputEditarCategoria = document.querySelector('#input-editar-categoria')

let listaCategorias = document.querySelector('#lista-categorias');

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

[btnFecharModalEditarCategoria, fundoModalEditarCategoria].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalEditarCategoria, modalEditarCategoria));
});

[modalAdicionarCategoria, modalAdicionarDespesa, modalEditarCategoria].forEach((el) => {
    el.addEventListener("click", function (event) {
        event.stopPropagation();
    });
})

let categorias = []

btnAdicionarCategoria.onclick = function () {
    if (inputNovaCategoria.value.trim()) {
        let categoria = {
            nome: inputNovaCategoria.value,
            id: gerarIdUnico()
        }
        armazenaCategoria(categoria);
        inputNovaCategoria.value = '';
        feedbackUsuario(true, "Categoria adicionada com sucesso!")
    }
}

function armazenaCategoria(categoria) {
    categorias.push(categoria);
    atualizarTabelaCategorias(categorias);
}

function atualizarTabelaCategorias(arrayCategorias) {
    listaCategorias.innerHTML = '';
    arrayCategorias.forEach(categoria =>
        listaCategorias.innerHTML += `
    <tr>
        <td>${categoria.id}</td>
        <td>${categoria.nome}</td>
        <td class="coluna-botao">
            <button class="botao-primario botao-pequeno" onclick="editarCategoria(${categoria.id})">EDITAR</button>
            <button class="botao-pequeno botao-excluir" onclick="removerCategoria(${categoria.id})">EXCLUIR</button>
        </td>
    </tr>
    `)
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

//REFAZER ESTA FUNÇÃO
function verificaCategoriasRepetidas(categoriaRecebida) {
    for (let categoria of categorias) {
        if (categoria.nome !== categoriaRecebida) {
            return true;
        } else {
            return false;
        }
    }
    // categorias.forEach(categoria => {
    //     if (categoria.nome !== categoriaRecebida) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // })
}

btnFiltrarCategoria.onclick = function () {
    let filtroCategoria = categorias.filter(categoria => categoria.nome.toLowerCase() == inputFiltroCategoria.value.toLowerCase());
    listaCategorias.innerHTML = '';
    filtroCategoria.forEach(() => atualizarTabelaCategorias(filtroCategoria));
}

btnRemoverFiltroCategoria.onclick = function () {
    listaCategorias.innerHTML = '';
    categorias.forEach(() => atualizarTabelaCategorias(categorias))
}

function removerCategoria(idCategoria) {
    categorias.filter((categoria, indice) => {
        if (categoria.id == idCategoria) {
            categorias.splice(indice, 1)
        }
    });
    feedbackUsuario(true, "Categoria removida com sucesso!")
    atualizarTabelaCategorias(categorias);
}

function editarCategoria(idCategoria) {
    let categoriaIndex = categorias.findIndex(categoria => categoria.id == idCategoria);
    toggleModal(fundoModalEditarCategoria, modalEditarCategoria);
    inputEditarCategoria.value += categorias[categoriaIndex].nome;
    btnEditarCategoria.addEventListener("click", function () {
        if (inputEditarCategoria.value !== '') {
            categorias[categoriaIndex].nome = inputEditarCategoria.value
            atualizarTabelaCategorias(categorias);
            feedbackUsuario(true, "Categoria alterada com sucesso!");
        } else {
            feedbackUsuario(false, "A categoria precisa ter um nome!")
        }
    })
}

function feedbackUsuario(sucesso = true, mensagem) {
        let classeAtual = divMsgUsuario.getAttribute("class");
        classeAtual = sucesso 
        ? classeAtual.replace("msgErro", "msgSucesso") 
        : classeAtual.replace("msgSucesso", "msgErro");
        divMsgUsuario.setAttribute("class", classeAtual);
        divMsgUsuario.innerHTML = `
        ${mensagem}       
        <button class="botao-pequeno botao-excluir" onclick="fecharFeedback()">FECHAR</button>
        `
    divMsgUsuario.style.display = "flex";
}

function fecharFeedback() {
    divMsgUsuario.style.display = "none";
}