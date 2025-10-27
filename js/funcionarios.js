const API_URL = "http://localhost:8080/api/funcionarios";

let funcionarioEditando = null; // armazena o funcionário em edição

// Renderiza tabela
function renderTabela(funcionarios) {
  const tbody = document.querySelector("#tabelaFuncionarios tbody");
  tbody.innerHTML = "";

  funcionarios.forEach((f) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.id}</td>
      <td>${f.nome}</td>
      <td>${f.cargo}</td>
      <td>${f.cpf}</td>
      <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editarFuncionario(${f.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirFuncionario(${f.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Carrega funcionários
async function carregarFuncionarios() {
  const response = await fetch(API_URL);
  const data = await response.json();
  renderTabela(data);
}

// Submissão do formulário (cadastrar ou editar)
document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeFuncionario").value.trim();
  const cargo = document.getElementById("cargoFuncionario").value.trim();
  const cpf = document.getElementById("cpfFuncionario").value.trim();

  if (!nome || !cargo || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }

  const funcionario = { nome, cargo, cpf };

  let response;
  if (funcionarioEditando) {
    // Edição (PUT)
    response = await fetch(`${API_URL}/${funcionarioEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionario)
    });
  } else {
    // Cadastro (POST)
    response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionario)
    });
  }

  if (response.ok) {
    alert(funcionarioEditando ? "Funcionário atualizado!" : "Funcionário cadastrado!");
    document.getElementById("formCadastro").reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCadastro"));
    modal.hide();
    funcionarioEditando = null;
    carregarFuncionarios();
  } else {
    alert("Erro ao salvar funcionário.");
  }
});

// Função para abrir o modal com dados de edição
async function editarFuncionario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      alert("Erro ao buscar funcionário.");
      return;
    }

    const f = await response.json();
    funcionarioEditando = f;

    // Preenche os campos
    document.getElementById("nomeFuncionario").value = f.nome;
    document.getElementById("cargoFuncionario").value = f.cargo;
    document.getElementById("cpfFuncionario").value = f.cpf;

    // Abre o modal
    const modalElement = document.getElementById("modalCadastro");
    if (!modalElement) {
      console.error("Modal não encontrado no DOM!");
      return;
    }

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

  } catch (error) {
    console.error("Erro ao editar funcionário:", error);
  }
}


// Função de exclusão
async function excluirFuncionario(id) {
  if (!confirm("Deseja realmente excluir este funcionário?")) return;

  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (response.ok) {
    alert("Funcionário excluído!");
    carregarFuncionarios();
  } else {
    alert("Erro ao excluir funcionário.");
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  carregarFuncionarios();
});
