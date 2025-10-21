document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    const u = document.getElementById('usuario');
    const s = document.getElementById('senha');

    if(!u.value) { u.classList.add('is-invalid'); return; } else u.classList.remove('is.invalid');
    if(!s.value) { s.classList.add('is-invalid'); return; } else s.classList.remove('is-invalid');

    const users = {
        'admin': { role: 'ADMIN' },
        'rh': { role: 'RH'},
        'user': { role: 'USER' }
    };

    if ((u.value === 'admin' && s.value === 'admin') || 
        (u.value === 'rh' && s.value === 'rh') ||
        (u.value === 'user' && s.value === 'user')) {

            const role = users[u.value].role;
            localStorage.setItem('sgi_usuario', JSON.stringify({username: u.value, role}));

            window.location.href = 'dashboard.html';
        } else{
            alert('Usuário ou senha inválidos.')
        }
});
    

