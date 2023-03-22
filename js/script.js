let btnAbreModalDespesa = document.querySelector('#botao-abre-modal-despesa');
let btnFecharModalDespesa = document.getElementById('fechar-modal-despesa');
let btnAbreModalCategoria = document.querySelector('#botao-abre-modal-categoria');
let btnAdicionarCategoria = document.querySelector('#botao-adicionar-categoria');
let btnFecharModalCategoria = document.querySelector('#botao-fechar-modal-categoria');
let btnRemoverFiltroCategoria = document.querySelector('#botao-remover-filtro-categoria');
let btnRemoverFiltroDespesa = document.querySelector('#botao-remover-filtro-despesa');
let btnFecharModalEditarCategoria = document.querySelector('#botao-fechar-modal-editar-categoria');
let btnEditarCategoria = document.querySelector('#botao-editar-categoria');
let btnAdicionarDespesa = document.querySelector('#botao-adicionar-despesa');
let btnConfirmaExclusao = document.querySelector('#botao-confirmar-excluir-categoria');
let btnCancelaExclusao = document.querySelector('#botao-nao-excluir-categoria');

let modalAdicionarDespesa = document.querySelector('#modal-adicionar-despesa');
let fundoModalAdicionarDespesa = document.querySelector('#fundo-modal-despesa');
let modalAdicionarCategoria = document.querySelector('#modal-adicionar-categoria');
let fundoModalAdicionarCategoria = document.querySelector('#fundo-modal-categoria');
let fundoModalEditarCategoria = document.querySelector('#fundo-modal-editar-categoria');
let modalEditarCategoria = document.querySelector('#modal-editar-categoria');
let fundoModalConfirmaExclusao = document.querySelector('#fundo-confirmar-exclusao-categoria');
let modalConfirmaExclusao = document.querySelector('#modal-confirmar-exclusao-categoria');
let telaCadastroCategorias = document.querySelector('#cadastro-categorias');
let home = document.querySelector('#home');

let divMsgUsuario = document.querySelector('#msgUsuario')

let totalValorPago = document.querySelector('#total-pago')
let totalValorPendente = document.querySelector('#total-divida')
let quantidadeAPagar = document.querySelector('#falta-pagar')
let msgConfirmaExclusao = document.querySelector('#texto-confirmar-exclusao-categoria');

let inputNovaCategoria = document.querySelector('#inputNovaCategoria');
let inputFiltroCategoria = document.querySelector('#input-filtro-categoria');
let inputFiltroDespesa = document.querySelector('#input-filtro-despesas');
let inputEditarCategoria = document.querySelector('#input-editar-categoria');
let listaSupensaCategorias = document.querySelector('#lista-suspesa-categorias');
let inputDataDoVencmiento = document.querySelector('#data-do-vencimento');
let inputNomeDaDespesa = document.querySelector('#nome-da-despesa');
let inputValorDaDespesa = document.querySelector('#valor-da-despesa');

let listaCategorias = document.querySelector('#lista-categorias');
let listaDespesas = document.querySelector('#lista-despesas');

//Abrindo os modais
function mostrarHome() {
    home.removeAttribute("hidden")
    telaCadastroCategorias.setAttribute("hidden", "")
    atualizarTabelaDespesas(despesas);
}

function mostrarCategorias() {
    telaCadastroCategorias.removeAttribute("hidden")
    home.setAttribute("hidden", "")
    atualizarTabelaCategorias(categorias);
}

function toggleModal(fundo, modal) {
    fundo.classList.toggle('oculto');
    modal.classList.toggle('oculto');
}

//Fechando os modais
[btnAbreModalDespesa, btnFecharModalDespesa, fundoModalAdicionarDespesa].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalAdicionarDespesa, modalAdicionarDespesa));
});

[btnAbreModalCategoria, btnFecharModalCategoria, fundoModalAdicionarCategoria].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalAdicionarCategoria, modalAdicionarCategoria));
});

[btnCancelaExclusao, btnConfirmaExclusao, fundoModalConfirmaExclusao].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalConfirmaExclusao, modalConfirmaExclusao));
});

[btnFecharModalEditarCategoria, fundoModalEditarCategoria].forEach((el) => {
    el.addEventListener("click", () => toggleModal(fundoModalEditarCategoria, modalEditarCategoria));
});

[modalAdicionarCategoria, modalAdicionarDespesa, modalEditarCategoria, modalConfirmaExclusao].forEach((el) => {
    el.addEventListener("click", function (event) {
        event.stopPropagation();
    });
})

let categoriasLocalStorage = JSON.parse(localStorage.getItem("categorias"));
let despesasLocalStorage = JSON.parse(localStorage.getItem("despesas"));

let categorias = categoriasLocalStorage ?? []
let despesas = despesasLocalStorage ?? []

atualizarTabelaDespesas(despesas);

//Atualizando o valor dos cards
function atualizaDivida() {
    let quantidadeDespesasPendentes = despesas.reduce((contador, despesa) => {
        if (!despesa.pago) {
            return contador + 1;
        }
        return contador;
    }, 0);

    let despesasNaoPagas = despesas.reduce((contador, despesa) => {
        return despesa.pago ? contador : contador + despesa.valor;
    }, 0);

    let despesasPagas = despesas.reduce((contador, despesa) => {
        return despesa.pago ? contador + despesa.valor : contador;
    }, 0);

    quantidadeAPagar.innerHTML = `${quantidadeDespesasPendentes}`;
    totalValorPago.innerHTML = `${formataNumeroParaReal(despesasPagas)}`;
    totalValorPendente.innerHTML = `${formataNumeroParaReal(despesasNaoPagas)}`;
}

//Convertendo número em R$
function formataNumeroParaReal(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits:2 }).format(valor);
}

//Função para validar campos vazios
function validaCamposVazios(input) {
    if (input.value.trim()) {
        return true
    } else {
        feedbackUsuario(false, "Por favor, preencha todos os campos!")
    }
}

btnAdicionarCategoria.onclick = function () {
    if (validaCamposVazios(inputNovaCategoria)) {
        if (verificaCategoriasRepetidas(inputNovaCategoria.value)) {
            feedbackUsuario(false, `A categoria ${inputNovaCategoria.value} já existe`);
        } else {
            let categoria = {
                nome: inputNovaCategoria.value,
                id: gerarIdUnico()
            }
            armazenaCategoria(categoria);
            inputNovaCategoria.value = '';
            feedbackUsuario(true, "Categoria adicionada com sucesso!")
        }
    }
}

//Adicionando uma despesa nova
btnAdicionarDespesa.onclick = function () {
    if (validaCamposVazios(listaSupensaCategorias) && validaCamposVazios(inputNomeDaDespesa) && validaCamposVazios(inputDataDoVencmiento) && validaCamposVazios(inputValorDaDespesa)) {
        let despesa = {
            categoria: listaSupensaCategorias.value,
            nome: inputNomeDaDespesa.value,
            vencimento: inputDataDoVencmiento.value,
            valor: Number(inputValorDaDespesa.value),
            pago: false,
        }
        armazenaDespesa(despesa);
        inputNomeDaDespesa.value = '';
        inputDataDoVencmiento.value = '';
        inputValorDaDespesa.value = '';
        feedbackUsuario(true, "Despesa adicionada!")
    }
    atualizaDivida();
}

//Atualiza as opções de categorias que o usuário deve escolher no formulário de novas despesas
function addOpcaoCategorias() {
    listaSupensaCategorias.innerHTML = '';
    for (let categoria of categorias) {
        listaSupensaCategorias.innerHTML += `
    <option value="${categoria.nome}">${categoria.nome}</option>
    `}
}

//Atualizando localStorage
function atualizarLocalStorageCategorias() {
    localStorage.setItem("categorias",JSON.stringify(categorias));
}

function atualizarLocalStorageDespesas() {
    localStorage.setItem("despesas",JSON.stringify(despesas));
}

//Função para inserir uma nova categoria no array
function armazenaCategoria(categoria) {
    categorias.push(categoria);
    atualizarTabelaCategorias(categorias);
}

//Função para inserir uma nova despesa no array
function armazenaDespesa(despesa) {
    despesas.push(despesa);
    atualizarTabelaDespesas(despesas);
}

//Função que atualiza a tabela de despesas que é exibida para o usuário
function atualizarTabelaDespesas(arrayDespesas) {
    listaDespesas.innerHTML = '';
    arrayDespesas.forEach((despesa, indice) => {
            listaDespesas.innerHTML += `
        <tr class="despesa-pendente">
            <td>${despesa.vencimento}</td>
            <td>${despesa.nome}</td>
            <td>${formataNumeroParaReal(despesa.valor)}</td>
            <td><button class="botao-pendente botao-pequeno" onclick="alteraStatusDespesa(this, ${indice})">PENDENTE</button></td>
        </tr>
        `})
        atualizarLocalStorageDespesas();
}

//Função que atualiza a tabela de categorias que é exibida para o usuário
function atualizarTabelaCategorias(arrayCategorias) {
    listaCategorias.innerHTML = '';
    arrayCategorias.forEach(categoria =>
        listaCategorias.innerHTML += `
    <tr>
        <td>${categoria.id}</td>
        <td>${categoria.nome}</td>
        <td class="coluna-botao">
            <button class="botao-primario botao-pequeno" onclick="editarCategoria('${categoria.id}')">EDITAR</button>
            <button class="botao-pequeno botao-excluir" onclick="removerCategoria('${categoria.id}')">EXCLUIR</button>
        </td>
    </tr>
    `)
    addOpcaoCategorias();
    atualizarLocalStorageCategorias();
}

//Função para alternar o status da despesa entre pago e pendente
function alteraStatusDespesa(botao, indice) {
    let tr = botao.parentElement.parentElement;
    let despesa = despesas[indice];
    if (botao.classList.contains('botao-pendente')) {
        tr.classList.remove('despesa-pendente');
        tr.classList.add('despesa-paga');
        botao.classList.remove('botao-pendente');
        botao.classList.add('botao-pago');
        botao.textContent = 'PAGO';
        despesa.pago = true;
    } else if (botao.classList.contains('botao-pago')) {
        tr.classList.remove('despesa-paga');
        tr.classList.add('despesa-pendente');
        botao.classList.remove('botao-pago');
        botao.classList.add('botao-pendente');
        botao.textContent = 'PENDENTE';
        despesa.pago = false;
    }
    atualizaDivida();
}

//Função para gerar ID
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

//VERIFICA CATEGORIA REPETIDA
function verificaCategoriasRepetidas(nomeCategoria) {
    for (let categoria of categorias) {
        if (categoria.nome === nomeCategoria) {
            return true;
        }
    }
    return false;
}

//Filtrar categorias
inputFiltroCategoria.addEventListener("keyup", () => {
    let pesquisa = inputFiltroCategoria.value.toLowerCase().trim();
    let listaFiltrada = categorias.filter((categoria) => {
        let comparaCategoria = categoria.nome.toLowerCase().startsWith(pesquisa);
        let comparaId = categoria.id.startsWith(pesquisa);
        return comparaCategoria || comparaId;
    });
    atualizarTabelaCategorias(listaFiltrada);
})

//Filtrar Despesas
inputFiltroDespesa.addEventListener("keyup", () => {
    let pesquisa = inputFiltroDespesa.value.toLowerCase().trim();
    let listaFiltrada = despesas.filter((despesa) => {
        let comparaNomeDespesa = despesa.nome.toLowerCase().startsWith(pesquisa);
        let comparaVencimentoDespesa = despesa.vencimento.startsWith(pesquisa);
        return comparaNomeDespesa || comparaVencimentoDespesa
    })
    atualizarTabelaDespesas(listaFiltrada);
})

//Remover filtro das despesas
btnRemoverFiltroDespesa.onclick = function () {
    inputFiltroDespesa.value = '';
    atualizarTabelaDespesas(despesas);
}

//Remover filtro das categorias
btnRemoverFiltroCategoria.onclick = function () {
    inputFiltroCategoria.value = '';
    atualizarTabelaCategorias(categorias);
}

//Remover uma categoria cadastrada
function removerCategoria(idCategoria) {
    toggleModal(fundoModalConfirmaExclusao, modalConfirmaExclusao);
    btnConfirmaExclusao.addEventListener("click", function () {
    categorias.filter((categoria, indice) => {
        if (categoria.id == idCategoria) {
            categorias.splice(indice, 1)
        }
    });
    feedbackUsuario(true, "Categoria removida com sucesso!")
    atualizarTabelaCategorias(categorias);})
}

//Editar uma categoria cadastrada
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

//Exibe a div de feedback para o usuário
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

//Fecha a div de feedback do usuário
function fecharFeedback() {
    divMsgUsuario.style.display = "none";
}