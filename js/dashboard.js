window.addEventListener('load', () => {
    const sess = JSON.parse(localStorage.getItem('sgi_usuario'));
    if (!sess) { window.location.href = 'index.html'; return; }
    document.getElementById('userGreeting').textContent = sess.username + ' (' + sess.role + ')';

    const funcionarios = JSON.parse(localStorage.getItem('sgi_funcionario') || '[]');
    document.getElementById('totalFuncionarios').textContent = funcionarios.length;
    document.getElementById('equipesAtivas').textContent = JSON.parse(localStorage.getItem('sgi_equipes') || '[]').length;
    document.getElementById('producaoHoje').textContent = '-';
});

document.getElementById('btnToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

document.getElementById('logoutLink').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('sgi_usuario');
    window.location.href = 'index.html';
});