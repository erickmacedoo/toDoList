const input = document.getElementById("adicionarTarefa")
const botaoAdicionar = document.getElementById("botaoAdicionar")
const lista = document.getElementById("listaTarefas")
const mensagemErro = document.getElementById("mensagemErro")
const mensagemVazio = document.getElementById("mensagemVazio")
const listaConcluidas = document.getElementById("listaConcluidas")
const overlayEdicao = document.getElementById("overlayEdicao")
const inputEdicaoModal = document.getElementById("inputEdicaoModal")
const botaoCancelarEdicao = document.getElementById("botaoCancelarEdicao")
const botaoConfirmarEdicao = document.getElementById("botaoConfirmarEdicao")
const overlayRemocao = document.getElementById("overlayRemocao")
const textoConfirmacaoRemocao = document.getElementById("textoConfirmacaoRemocao")
const botaoCancelarRemocao = document.getElementById("botaoCancelarRemocao")
const botaoConfirmarRemocao = document.getElementById("botaoConfirmarRemocao")
const overlayDetalhes = document.getElementById("overlayDetalhes")
const textoDetalhesConclusao = document.getElementById("textoDetalhesConclusao")
const botaoFecharDetalhes = document.getElementById("botaoFecharDetalhes")
const toast = document.getElementById("toast")

let spanEmEdicao = null
let itemEmRemocao = null
let toastTimeout = null
let toastFadeTimeout = null

function adicionarTarefa() {
    const texto = input.value.trim()

    if (texto === "") {
        mensagemVazio.classList.remove("oculto")
        return
    } 

    mensagemVazio.classList.add("oculto")
    input.addEventListener("input", () => {
        mensagemVazio.classList.add("oculto")
    })

    const textoFormatado = capitalizar(texto)
    criarItemTarefa(textoFormatado)
    input.value = ""

    limitarTarefas()
    salvarTarefas()
    mostrarToast("Tarefa adicionada com sucesso!", "adicionar")
}

function criarItemTarefa(texto, concluida = false, dataConclusao = null) {
    const item = document.createElement("li")
    item.classList.add("tarefa")

    const spanTexto = document.createElement("span")
    spanTexto.textContent = texto
    item.appendChild(spanTexto)

    const botaoEditar = document.createElement("button")
    botaoEditar.textContent = "Editar"
    botaoEditar.onclick = () => editarTarefa(item.querySelector("span"))
    item.appendChild(botaoEditar)

    const botaoRemover = document.createElement("button")
    botaoRemover.textContent = "Remover"
    botaoRemover.onclick = () => { 
        itemEmRemocao = item
        textoConfirmacaoRemocao.textContent = `Tem certeza que deseja remover a tarefa "${item.querySelector("span").textContent}"?`
        overlayRemocao.classList.remove("oculto")
    }

    item.appendChild(botaoRemover)

    const botaoConcluir = document.createElement("button")
    botaoConcluir.textContent = "Concluir"
    botaoConcluir.onclick = () => {
        const agora = new Date()
        const dataFormatada = agora.toLocaleDateString("pt-BR")
        const horaFormatada = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", })
        const dataHora = `${dataFormatada} às ${horaFormatada}`

        item.classList.add("concluida")
        item.dataset.dataConclusao = dataHora
        botaoEditar.remove()
        botaoConcluir.remove()
        botaoRemover.remove()

        const dica = document.createElement("span")
        dica.classList.add("dica")
        dica.textContent = "(clique para ver os detalhes)"
        item.appendChild(dica)

        listaConcluidas.appendChild(item)
        limitarTarefas()
        salvarTarefas()
        mostrarToast(`Tarefa concluída em ${dataHora}`, "sucesso")
    }
    item.appendChild(botaoConcluir)

    if (concluida) {
        item.classList.add("concluida")
        item.dataset.dataConclusao = dataConclusao
        botaoEditar.remove()
        botaoConcluir.remove()
        botaoRemover.remove()
        item.onclick = () => mostrarDetalhesConclusao(item)

        const dica = document.createElement("span")
        dica.classList.add("dica")
        dica.textContent = "(clique para ver os detalhes)"
        item.appendChild(dica)

        listaConcluidas.appendChild(item)
    } else {
        lista.appendChild(item)
    }
}

botaoConfirmarRemocao.onclick = () => {
    itemEmRemocao.remove()
    limitarTarefas()
    salvarTarefas()
    overlayRemocao.classList.add("oculto")
    mostrarToast("Tarefa removida com sucesso!")
}

botaoCancelarRemocao.onclick = () => {
    overlayRemocao.classList.add("oculto")
}

function mostrarDetalhesConclusao(item) {
    textoDetalhesConclusao.textContent = `Finalizada em: ${item.dataset.dataConclusao}`
    overlayDetalhes.classList.remove("oculto")
}

botaoFecharDetalhes.onclick = () => {
    overlayDetalhes.classList.add("oculto")
}


function mostrarToast(mensagem, tipo = "sucesso") {
    clearTimeout(toastTimeout)
    clearTimeout(toastFadeTimeout)

    toast.textContent = mensagem
    toast.className = `toast toast--${tipo}`
    toast.classList.remove("oculto")

    requestAnimationFrame(() => {
        toast.classList.add("toast--visivel")
    })

    toastFadeTimeout = setTimeout(() => {
        toast.classList.remove("toast--visivel")
    }, 3200)

    clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
        toast.classList.add("oculto")
    }, 3500)
}

botaoAdicionar.addEventListener("click", adicionarTarefa)

function limitarTarefas() {
    const tarefas = lista.getElementsByClassName("tarefa")

    if (tarefas.length >= 10) {
        botaoAdicionar.disabled = true
        mensagemErro.classList.remove("oculto")
    } else {
        botaoAdicionar.disabled = false
        mensagemErro.classList.add("oculto")
    }
}

function salvarTarefas() {
    const pendentes = [...lista.querySelectorAll(".tarefa")].map(item => ({
        texto: item.querySelector("span").textContent,
        concluida: false,
        dataConclusao: null
    }))    

    const concluidas = [...listaConcluidas.querySelectorAll(".tarefa")].map(item => ({
        texto: item.querySelector("span").textContent,
        concluida: true,
        dataConclusao: item.dataset.dataConclusao
    }))

    localStorage.setItem("tarefas", JSON.stringify([...pendentes, ...concluidas]))
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefasSalvas.forEach(tarefa => criarItemTarefa(tarefa.texto, tarefa.concluida, tarefa.dataConclusao));
    limitarTarefas();
}

carregarTarefas()

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function editarTarefa(spanTexto) {
    spanEmEdicao = spanTexto
    inputEdicaoModal.value = spanTexto.textContent
    overlayEdicao.classList.remove("oculto")
    inputEdicaoModal.focus()

    botaoConfirmarEdicao.onclick = () => {
        const novoTexto = inputEdicaoModal.value.trim()
        if(novoTexto !== "") {
            spanEmEdicao.textContent = capitalizar(novoTexto)
            salvarTarefas()
            mostrarToast("Tarefa editada com sucesso!", "editar")
        }
        overlayEdicao.classList.add("oculto")
    }

    botaoCancelarEdicao.onclick = () => {
        overlayEdicao.classList.add("oculto")
    }

    inputEdicaoModal.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") botaoConfirmarEdicao.click()
    })

    function salvarEdicao() {
        const novoTexto = inputEdicao.value.trim()
        const spanNovo = document.createElement("span")
        spanNovo.textContent = novoTexto === "" ? textoAtual : capitalizar(novoTexto)
        inputEdicao.replaceWith(spanNovo)
        salvarTarefas()
    }

    inputEdicao.addEventListener("blur", salvarEdicao)
    inputEdicao.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") inputEdicao.blur()
    })
}