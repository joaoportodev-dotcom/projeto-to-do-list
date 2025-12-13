const input = document.getElementById("tarefa");
const botao = document.getElementById("btnadicionar");
const lista = document.getElementById("lista");

// Salva todas as tarefas no localStorage
function salvarTarefas() {
  const tarefas = [];

  document.querySelectorAll("li").forEach(function (item) {
    const span = item.querySelector("span");

    tarefas.push({
      texto: span.textContent,
      concluida: span.classList.contains("concluida"),
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cria um item da lista
function criarItem(texto, concluida = false) {
  const item = document.createElement("li");

  const textoSpan = document.createElement("span");
  textoSpan.textContent = texto;

  if (concluida) {
    textoSpan.classList.add("concluida");
  }

  textoSpan.addEventListener("click", function () {
    textoSpan.classList.toggle("concluida");
    salvarTarefas();
  });

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "❌";

  btnExcluir.addEventListener("click", function () {
    const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");

    if (confirmar) {
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";

      setTimeout(function () {
        lista.removeChild(item);
        salvarTarefas();
      }, 200);
    }
  });

  item.appendChild(textoSpan);
  item.appendChild(btnExcluir);
  lista.appendChild(item);
}

// Carrega tarefas salvas ao abrir a página
function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach(function (tarefa) {
    criarItem(tarefa.texto, tarefa.concluida);
  });
}

carregarTarefas();

// Clique no botão adicionar
botao.addEventListener("click", function () {
  const texto = input.value;
  if (texto === "") return;

  criarItem(texto);
  input.value = "";
  salvarTarefas();
});

// Enter adiciona tarefa
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    botao.click();
  }
});

// Limpar tudo
const btnLimpar = document.getElementById("btnLimpar");

btnLimpar.addEventListener("click", function () {
  const confirmar = confirm("Tem certeza que deseja apagar todas as tarefas?");

  if (confirmar) {
    lista.innerHTML = "";
    localStorage.removeItem("tarefas");
  }
});

// Filtros
const filtros = document.querySelectorAll("#filtros button");

filtros.forEach(function (botaoFiltro) {
  botaoFiltro.addEventListener("click", function () {
    const tipo = botaoFiltro.getAttribute("data-filtro");

    document.querySelectorAll("li").forEach(function (item) {
      const span = item.querySelector("span");
      const concluida = span.classList.contains("concluida");

      if (tipo === "todas") {
        item.style.display = "flex";
      } else if (tipo === "pendentes") {
        item.style.display = concluida ? "none" : "flex";
      } else if (tipo === "concluidas") {
        item.style.display = concluida ? "flex" : "none";
      }
    });
  });
});
const btnDark = document.getElementById("btnDark");

// carregar preferência
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  btnDark.textContent = "☀️";
}

btnDark.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const ativo = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", ativo);

  btnDark.textContent = ativo ? "☀️" : "🌙";
  filtros.forEach(btn => btn.classList.remove("ativo"));
botaoFiltro.classList.add("ativo");

});




