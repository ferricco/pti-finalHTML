function getUsuarioSessao() {
  try {
    return JSON.parse(localStorage.getItem('sgi_usuario'));
  } catch (e) {
    return null;
  }
}

/**
 * Verifica se o usuário tem role necessária
 * @param {string[]} roles - array de roles permitidas, ex: ['ADMIN','RH']
 */
function temPermissao(roles = []) {
  const u = getUsuarioSessao();
  if (!u) return false;
  return roles.includes(u.role);
}

/**
 * Função simples para exibir mensagem toast (padrão bootstrap)
 * Requer container em HTML ou usa alert()
 */
function showMsg(msg, tipo='info') {
  // por simplicidade, usa alert — você pode trocar por toasts/bootstrap later
  alert(msg);
}

/**
 * Inicialização global (chamada em cada página)
 */
(function initGlobal() {
  // Se necessário, inicialize something global aqui
  // ex: bloquear páginas sem login
  const usuario = getUsuarioSessao();
  if (!usuario) {
    // permitir acesso apenas à página de login (index.html)
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
      // redireciona
      // window.location.href = 'index.html';
    }
  }
})();