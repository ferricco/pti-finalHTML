const sess = JSON.parse(localStorage.getItem('sgi_usuario'));
    if (!sess) { window.location.href = 'index.html'; }

    document.getElementById('userGreeting').textContent = sess.username + ' (' + sess.role + ')';

    // renderiza tabela inicial
    function renderTabela() {
      const tbody = document.querySelector('#tabelaFuncionarios tbody');
      tbody.innerHTML = '';
      const funcionarios = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
      funcionarios.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${f.id}</td>
          <td>${f.nome}</td>
          <td>${f.cargo}</td>
          <td>${f.cpf}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${f.id}"><i class="fa fa-pen"></i></button>
            <button class="btn btn-sm btn-danger btn-excluir" data-id="${f.id}"><i class="fa fa-trash"></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderTabela();

    // salvar cadastro
    document.getElementById('formCadastro').addEventListener('submit', function(e){
      e.preventDefault();
      const id = document.getElementById('idFuncionario').value.trim();
      const nome = document.getElementById('nomeFuncionario').value.trim();
      const cargo = document.getElementById('cargoFuncionario').value.trim();
      const cpf = document.getElementById('cpfFuncionario').value.trim();

      if (!id || !nome || !cargo || !cpf) {
        // bootstrap will show invalid-feedback if uses needs-validation + novalidate (basic)
        this.classList.add('was-validated');
        return;
      }

      const funcionarios = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
      // simples verificação de ID duplicado
      if (funcionarios.some(x => x.id === id)) {
        alert('Já existe funcionário com esse ID.');
        return;
      }

      funcionarios.push({ id, nome, cargo, cpf });
      localStorage.setItem('sgi_funcionarios', JSON.stringify(funcionarios));
      renderTabela();
      // fechar modal
      const modalEl = document.querySelector('#modalCadastro');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      this.reset();
      this.classList.remove('was-validated');
    });

    // delegação para editar/excluir (simples)
    document.querySelector('#tabelaFuncionarios tbody').addEventListener('click', function(e){
      if (e.target.closest('.btn-excluir')) {
        const id = e.target.closest('.btn-excluir').dataset.id;
        if (confirm('Deseja remover o funcionário?')) {
          let funcionarios = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
          funcionarios = funcionarios.filter(f => f.id !== id);
          localStorage.setItem('sgi_funcionarios', JSON.stringify(funcionarios));
          renderTabela();
        }
      } else if (e.target.closest('.btn-editar')) {
        const id = e.target.closest('.btn-editar').dataset.id;
        const funcionarios = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
        const f = funcionarios.find(x => x.id === id);
        if (!f) return;
        // preencher modal com dados existentes
        document.getElementById('idFuncionario').value = f.id;
        document.getElementById('idFuncionario').setAttribute('disabled','disabled');
        document.getElementById('nomeFuncionario').value = f.nome;
        document.getElementById('cargoFuncionario').value = f.cargo;
        document.getElementById('cpfFuncionario').value = f.cpf;
        const modal = new bootstrap.Modal(document.getElementById('modalCadastro'));
        modal.show();

        // ao salvar, remover antigo e inserir atualizado (simples)
        document.getElementById('formCadastro').onsubmit = function(evt) {
          evt.preventDefault();
          const nome2 = document.getElementById('nomeFuncionario').value.trim();
          const cargo2 = document.getElementById('cargoFuncionario').value.trim();
          const cpf2 = document.getElementById('cpfFuncionario').value.trim();
          let funcionarios2 = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
          funcionarios2 = funcionarios2.map(item => item.id === id ? { id, nome: nome2, cargo: cargo2, cpf: cpf2 } : item);
          localStorage.setItem('sgi_funcionarios', JSON.stringify(funcionarios2));
          renderTabela();
          modal.hide();
          // restaurar comportamento original do form
          document.getElementById('formCadastro').onsubmit = null;
          document.getElementById('idFuncionario').removeAttribute('disabled');
        };
      }
    });

    document.getElementById('logoutLink').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('sgi_usuario');
      window.location.href = 'index.html';
    });

    document.getElementById('btnToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });