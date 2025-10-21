const sess = JSON.parse(localStorage.getItem('sgi_usuario'));
    if (!sess) { window.location.href = 'index.html'; }
    document.getElementById('userGreeting').textContent = sess.username + ' (' + sess.role + ')';

    
    function carregarFuncionariosSelect() {
      const sel = document.getElementById('selFuncionario');
      sel.innerHTML = '';
      const funcionarios = JSON.parse(localStorage.getItem('sgi_funcionarios') || '[]');
      if (funcionarios.length === 0) {
        sel.innerHTML = '<option value="">Sem funcionários cadastrados</option>';
      } else {
        sel.innerHTML = '<option value="">-- selecione --</option>';
        funcionarios.forEach(f => {
          sel.innerHTML += `<option value="${f.id}">${f.nome} (${f.cargo})</option>`;
        });
      }
    }

    carregarFuncionariosSelect();

    document.getElementById('formSalario').addEventListener('submit', function(e){
      e.preventDefault();
      const salarioBase = parseFloat(document.getElementById('salarioBase').value || 0);
      const bonus = parseFloat(document.getElementById('bonus').value || 0);
      const descontos = parseFloat(document.getElementById('descontos').value || 0);

      if (isNaN(salarioBase)) { alert('Informe um salário base válido.'); return; }

      
      const liquido = salarioBase + bonus - descontos;
      document.getElementById('resultadoSalario').textContent = liquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    document.getElementById('btnToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    document.getElementById('logoutLink').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('sgi_usuario');
      window.location.href = 'index.html';
    });