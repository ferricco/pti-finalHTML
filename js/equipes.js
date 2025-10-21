const sess = JSON.parse(localStorage.getItem('sgi_usuario'));
    if (!sess) { window.location.href = 'index.html'; }
    document.getElementById('userGreeting').textContent = sess.username + ' (' + sess.role + ')';
    document.getElementById('btnToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });
    document.getElementById('logoutLink').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('sgi_usuario');
      window.location.href = 'index.html';
    });