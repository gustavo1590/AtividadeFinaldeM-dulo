let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
  }
}

("use strict");
const form = document.querySelector("#infos-prod");
const divErro = document.querySelector("#msg-erro");
const tabela = document.querySelector("#tbody");
const atualizarLocalStorage = (produtos) => {
  localStorage.setItem("produtos", JSON.stringify(produtos));
};
const recuperarLocalStorage = () => {
  const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  return produtos;
};
const preencherTabela = () => {
  const produtos = recuperarLocalStorage();
  tabela.innerHTML = "";
  for (const produto of produtos) {
    tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}</th>
            <td>${produto.descricao}</td>
            <td><span id="detalhamento">${produto.detalhamento}</span></td>
            <td>
              <buttontype="submit"  class="btn button-apagar" onclick="removerProduto(${produto.id})">Apagar</button>
            <td> 
              <button id="button-editar-texto"  class="btn button-editar" onclick="editarTexto(${produto.id})">Editar</button>
            </td>
        </tr>
    `;
  }
};

function editarTexto(id) {
  const produtos = recuperarLocalStorage();
  let prdutoEdit = produtos.findIndex((produto) => produto.id === id);
  produtos[prdutoEdit].descricao = prompt(`Edite a descrição do recado`);
  produtos[prdutoEdit].detalhamento = prompt(`Edite o detalhe do recado`);

  atualizarLocalStorage(produtos);
  preencherTabela();
}

const salvarProduto = (event) => {
  event.preventDefault();
  divErro.innerHTML = "";
  const descricao = form.descricao.value;
  const detalhamento = form.detalhamento.value;
  const erros = [];
  if (!descricao || descricao.length < 2) {
    erros.push("<p>descricao inválido</p>");
  }
  if (erros.length > 0) {
    divErro.innerHTML = erros.join(" ");
    return;
  }
  const produtos = recuperarLocalStorage();
  produtos.push({ id: produtos.length + 1, descricao, detalhamento });
  atualizarLocalStorage(produtos);
  alert("Recado salvo com sucesso");
  preencherTabela();
  form.reset();
};
const removerProduto = (id) => {
  const produtos = recuperarLocalStorage();
  const indexProduto = produtos.findIndex((produto) => produto.id === id);
  if (indexProduto < 0) return;
  produtos.splice(indexProduto, 1);
  atualizarLocalStorage(produtos);
  alert("Recado removido");
  preencherTabela();
};
form === null || form === void 0
  ? void 0
  : form.addEventListener("submit", salvarProduto);
document.addEventListener("DOMContentLoaded", preencherTabela);
