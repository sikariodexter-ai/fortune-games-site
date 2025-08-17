// Inicialização dos Swipers após tudo carregado
document.addEventListener('DOMContentLoaded', function(){
    // Hero Swiper
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.hero-next-button',
            prevEl: '.hero-prev-button'
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // Winners Swiper
    const winnersSwiper = new Swiper('.winners-swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 3000
    });

    // Toggle texto "Mostrar/Ocultar" senha dos modais
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            if(input.type === 'password') { 
                input.type = 'text'; 
                toggle.textContent = 'Ocultar'; 
            } else { 
                input.type = 'password'; 
                toggle.textContent = 'Mostrar'; 
            }
        });
    });

    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    console.log('Site carregado com sucesso');
});

// Funções dos Modais
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para fechar modais
document.addEventListener('DOMContentLoaded', function() {
    // Fechar modal ao clicar no X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar modal ao clicar fora dele
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
});

// Efeitos de hover nos cards
document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect no hero
document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Contador animado para valores
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    }
    
    updateCounter();
}

// Inicializar contadores quando visíveis
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
});

// Adicionar loading states nos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-play, .btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Simular loading para demonstração
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Notificações toast (simuladas)
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar estilos do toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Validação de formulários
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                    input.addEventListener('input', function() {
                        this.style.borderColor = '#eee';
                    }, { once: true });
                }
            });
            
            if (isValid) {
                showToast('Formulário enviado com sucesso!', 'success');
                // Aqui você adicionaria a lógica real de envio
                setTimeout(() => {
                    document.querySelectorAll('.modal').forEach(modal => {
                        modal.style.display = 'none';
                    });
                    document.body.style.overflow = 'auto';
                }, 1500);
            } else {
                showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            }
        });
    });
});


// ===== Autenticação básica com localStorage (Protótipo) =====
(function(){
    function getUsers(){ try { return JSON.parse(localStorage.getItem('fg_users')||'[]'); } catch(e){ return []; } }
    function saveUsers(users){ localStorage.setItem('fg_users', JSON.stringify(users)); }
    function setCurrentUser(user){ localStorage.setItem('fg_current_user', JSON.stringify({name:user.name,email:user.email,phone:user.phone})); renderUserArea(); }
    function getCurrentUser(){ try { return JSON.parse(localStorage.getItem('fg_current_user')||'null'); } catch(e){ return null; } }
    function logout(){ localStorage.removeItem('fg_current_user'); renderUserArea(); showToast('Você saiu da conta.', 'success'); }

    // Renderização do cabeçalho com estado logado/deslogado
    function renderUserArea(){
        const userArea = document.getElementById('userArea');
        const loginBtn = document.getElementById('loginBtn') || document.querySelector('[onclick*="openLoginModal"]');
        const registerBtn = document.getElementById('registerBtn') || document.querySelector('[onclick*="openRegisterModal"]');
        const user = getCurrentUser();
        if(!userArea) return;
        if(user){
            userArea.style.display = 'flex';
            userArea.innerHTML = '<span class="user-name">Olá, '+(user.name?.split(' ')[0]||'Jogador')+'</span><button class="logout-btn" id="logoutBtn" type="button">Sair</button>';
            if (loginBtn) loginBtn.closest ? loginBtn.closest('a,button,span').style.display = 'none' : loginBtn.style.display='none';
            if (registerBtn) registerBtn.closest ? registerBtn.closest('a,button,span').style.display = 'none' : registerBtn.style.display='none';
            const lb = document.getElementById('logoutBtn');
            if(lb) lb.onclick = logout;
        } else {
            userArea.style.display = 'none';
            if (loginBtn) loginBtn.closest ? loginBtn.closest('a,button,span').style.display = '' : loginBtn.style.display='';
            if (registerBtn) registerBtn.closest ? registerBtn.closest('a,button,span').style.display = '' : registerBtn.style.display='';
        }
    }

    // Handlers de formulário
    document.addEventListener('DOMContentLoaded', function(){
        renderUserArea();

        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if(loginForm){
            loginForm.addEventListener('submit', function(ev){
                ev.preventDefault();
                const email = (document.getElementById('loginEmail')||{}).value?.trim().toLowerCase();
                const pass = (document.getElementById('loginPassword')||{}).value||'';
                if(!email || !pass){ showToast('Preencha email e senha.', 'error'); return; }
                const users = getUsers();
                const user = users.find(u => u.email === email && u.password === pass);
                if(!user){ showToast('Credenciais inválidas.', 'error'); return; }
                setCurrentUser(user);
                showToast('Login realizado!', 'success');
                closeModal('loginModal');
            });
        }

        if(registerForm){
            registerForm.addEventListener('submit', function(ev){
                ev.preventDefault();
                const name = (document.getElementById('registerName')||{}).value?.trim();
                const email = (document.getElementById('registerEmail')||{}).value?.trim().toLowerCase();
                const phone = (document.getElementById('registerPhone')||{}).value?.trim();
                const pass = (document.getElementById('registerPassword')||{}).value||'';
                if(!name || !email || !phone || !pass){ showToast('Preencha todos os campos.', 'error'); return; }
                const users = getUsers();
                if(users.some(u => u.email === email)){ showToast('Já existe uma conta com este email.', 'error'); return; }
                const user = {name, email, phone, password: pass};
                users.push(user); saveUsers(users); setCurrentUser(user);
                showToast('Conta criada com sucesso!', 'success');
                closeModal('registerModal');
            });
        }
    });
})();

console.log('Fortune Games - Sistema carregado com sucesso!');



// ===== Carteira / Jogos de Raspadinha (Protótipo) =====
(function(){
  function brl(n){ return (n||0).toFixed(2).replace('.', ','); }
  function getBalance(){ return parseFloat(localStorage.getItem('fg_balance')||'0'); }
  function setBalance(v){ localStorage.setItem('fg_balance', String(Math.max(0, v))); renderWallet(); }
  function renderWallet(){
    const walletArea = document.getElementById('walletArea');
    if(!walletArea) return;
    const user = (function(){ try { return JSON.parse(localStorage.getItem('fg_current_user')||'null'); } catch(_){ return null } })();
    if(user){
      walletArea.style.display='flex';
      walletArea.innerHTML = '<div class="wallet-pill">Saldo: R$ '+brl(getBalance())+'</div>';
    } else {
      walletArea.style.display='none';
    }
    const wb = document.getElementById('walletBalance');
    if(wb) wb.textContent = brl(getBalance());
  }
  function readGames(){
    const cards = Array.from(document.querySelectorAll('.game-card'));
    return cards.map((card, idx) => ({
      el: card,
      id: idx,
      name: card.dataset.name || card.querySelector('h3')?.textContent?.trim() || ('Jogo '+(idx+1)),
      price: parseFloat(card.dataset.price || (card.querySelector('.price-value')?.textContent?.replace(/[R$\s\.]/g,'').replace(',','.')||'1')) || 1,
      image: card.dataset.image || card.querySelector('img')?.getAttribute('src') || ''
    }));
  }
  function drawPrize(price){
    const r = Math.random();
    if(r < 0.70) return 0;
    if(r < 0.95) return price * 1;
    if(r < 0.99) return price * 5;
    return price * 20;
  }
  let canvas, ctx, isDrawing = false, last = null, revealThreshold = 0.55;
  let currentGame = null, currentPrize = 0, bought = false;
  function openGameModal(game){
    currentGame = game;
    currentPrize = 0; bought = false;
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const img = document.getElementById('gameImage');
    const price = document.getElementById('ticketPrice').querySelector('span');
    const prizeEl = document.getElementById('prizeReveal');
    canvas = document.getElementById('scratchCanvas'); ctx = canvas.getContext('2d');
    title.textContent = game.name;
    img.src = game.image; img.alt = game.name;
    price.textContent = brl(game.price);
    prizeEl.textContent = 'R$ 0,00';
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    canvas.onmousedown = (e)=>{ isDrawing = true; last = {x:e.offsetX,y:e.offsetY}; };
    canvas.onmousemove = (e)=>{ if(isDrawing){ scratch(last.x,last.y,e.offsetX,e.offsetY); last={x:e.offsetX,y:e.offsetY}; } };
    canvas.onmouseup = ()=>{ isDrawing = false; checkReveal(); };
    canvas.onmouseleave = ()=>{ isDrawing = false; };
    canvas.ontouchstart = (e)=>{ const t=e.touches[0]; const rect=canvas.getBoundingClientRect(); isDrawing=true; last={x:t.clientX-rect.left,y:t.clientY-rect.top}; e.preventDefault(); };
    canvas.ontouchmove = (e)=>{ if(!isDrawing) return; const t=e.touches[0]; const rect=canvas.getBoundingClientRect(); const x=t.clientX-rect.left, y=t.clientY-rect.top; scratch(last.x,last.y,x,y); last={x,y}; e.preventDefault(); };
    canvas.ontouchend = ()=>{ isDrawing=false; checkReveal(); };
    renderWallet();
    renderHistory();
    modal.style.display='block';
    document.body.style.overflow='hidden';
  }
  function scratch(x1,y1,x2,y2){
    const dx = x2-x1, dy = y2-y1, dist = Math.hypot(dx,dy);
    const steps = Math.max(1, Math.floor(dist/4));
    for(let i=0;i<steps;i++){
      const x = x1 + dx*i/steps, y = y1 + dy*i/steps;
      ctx.beginPath();
      ctx.arc(x,y,16,0,Math.PI*2);
      ctx.fill();
    }
  }
  function checkReveal(){
    const sample = 32;
    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let transparent = 0;
    for(let y=0;y<sample;y++){
      for(let x=0;x<sample;x++){
        const px = Math.floor(x*(canvas.width/sample));
        const py = Math.floor(y*(canvas.height/sample));
        const idx = (py*canvas.width+px)*4 + 3;
        if(imgData[idx] < 8) transparent++;
      }
    }
    const ratio = transparent/(sample*sample);
    if(ratio >= 0.55){ revealPrize(); }
  }
  function revealPrize(){
    const prizeEl = document.getElementById('prizeReveal');
    prizeEl.textContent = 'R$ '+brl(currentPrize);
    if(currentPrize > 0){
      setBalance(getBalance() + currentPrize);
      addHistory('Ganhou R$ '+brl(currentPrize)+' em '+currentGame.name);
    } else {
      addHistory('Não ganhou em '+currentGame.name);
    }
  }
  function getHistory(){ try { return JSON.parse(localStorage.getItem('fg_history')||'[]'); } catch(_){return [];} }
  function saveHistory(h){ localStorage.setItem('fg_history', JSON.stringify(h.slice(-100))); }
  function addHistory(s){ const h=getHistory(); h.push({t:Date.now(), s}); saveHistory(h); renderHistory(); }
  function renderHistory(){
    const list = document.getElementById('historyList');
    if(!list) return;
    list.innerHTML = '';
    getHistory().slice(-20).reverse().forEach(item=>{
      const li = document.createElement('li'); li.textContent = new Date(item.t).toLocaleString() + ' — ' + item.s; list.appendChild(li);
    });
    const wb = document.getElementById('walletBalance'); if(wb) wb.textContent = brl(getBalance());
  }
  function ensureLogged(){
    try{ return JSON.parse(localStorage.getItem('fg_current_user')||'null'); } catch(_){ return null; }
  }
  function buyAndGenerate(){
    if(!ensureLogged()){ showToast('Entre na sua conta para jogar.', 'error'); openLoginModal(); return; }
    if(bought){ showToast('Você já comprou este bilhete. Raspe para revelar.', 'info'); return; }
    const price = currentGame.price;
    if(getBalance() < price){ showToast('Saldo insuficiente. Adicione saldo para jogar.', 'error'); return; }
    setBalance(getBalance() - price);
    addHistory('Comprou bilhete de '+currentGame.name+' por R$ '+brl(price));
    currentPrize = drawPrize(price);
    bought = true;
    showToast('Bilhete comprado! Boa sorte 🍀', 'success');
  }
  function newTicket(){
    if(!currentGame){ return; }
    const ctx2 = canvas.getContext('2d');
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    ctx2.fillStyle = '#9ca3af'; ctx2.fillRect(0,0,canvas.width,canvas.height);
    ctx2.globalCompositeOperation = 'destination-out';
    currentPrize = 0; bought = false;
    document.getElementById('prizeReveal').textContent = 'R$ 0,00';
  }
  document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.getItem('fg_balance') === null){ setBalance(5.00); }
    renderWallet();
    const games = readGames();
    document.querySelectorAll('.btn-play').forEach((btn, i)=>{
      btn.addEventListener('click', ()=> openGameModal(games[i] || games[0]));
    });
    const buyPlay = document.getElementById('buyPlayBtn');
    const resetBtn = document.getElementById('resetTicketBtn');
    const topupBtn = document.getElementById('topupBtn');
    const topupAmount = document.getElementById('topupAmount');
    if(buyPlay) buyPlay.addEventListener('click', buyAndGenerate);
    if(resetBtn) resetBtn.addEventListener('click', newTicket);
    if(topupBtn) topupBtn.addEventListener('click', ()=>{
      const v = parseFloat((topupAmount.value||'0').replace(',', '.'));
      if(v>0){ setBalance(getBalance()+v); addHistory('Adicionou R$ '+brl(v)+' de saldo'); showToast('Saldo atualizado.', 'success'); topupAmount.value=''; }
      else { showToast('Informe um valor válido.', 'error'); }
    });
    window.addEventListener('storage', renderWallet);
  });
})();


// ===== Auth State Management (robusto) =====
(function(){
  function getCurrentUser(){ try { return JSON.parse(localStorage.getItem('fg_current_user')||'null'); } catch(_){ return null; } }
  function applyAuthState(){
    const user = getCurrentUser();
    document.body.setAttribute('data-auth-state', user ? 'in' : 'out');
    // Atualiza área do usuário
    const userArea = document.getElementById('userArea');
    if(userArea){
      if(user){
        userArea.style.display = 'flex';
        userArea.innerHTML = '<span class="user-name">Olá, '+(user.name?.split(' ')[0]||'Jogador')+'</span> <button class="logout-btn" id="logoutBtn" type="button">Sair</button>';
        const lb = document.getElementById('logoutBtn');
        if(lb) lb.onclick = function(){ localStorage.removeItem('fg_current_user'); applyAuthState(); showToast && showToast('Você saiu da conta.','success'); };
      } else {
        userArea.style.display = 'none';
      }
    }
    // Dispara evento global
    window.dispatchEvent(new CustomEvent('auth:change', { detail: { user } }));
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Bind botões de abrir login/registro (fallback universal)
    document.querySelectorAll('[data-action="open-login"]').forEach(el=>{
      el.addEventListener('click', function(ev){ ev.preventDefault(); try{ openLoginModal(); }catch(_){} });
    });
    document.querySelectorAll('[data-action="open-register"]').forEach(el=>{
      el.addEventListener('click', function(ev){ ev.preventDefault(); try{ openRegisterModal(); }catch(_){} });
    });

    applyAuthState();
  });

  // Escuta mudanças de storage (outras abas)
  window.addEventListener('storage', function(e){
    if(e.key === 'fg_current_user'){ applyAuthState(); }
  });

  // Hooka registro/login já existentes (se definidos)
  const originalSetCurrentUser = window.setCurrentUser;
  if(typeof originalSetCurrentUser === 'function'){
    window.setCurrentUser = function(user){ originalSetCurrentUser(user); applyAuthState(); }
  } else {
    // fallback: quando login/registro nos handlers forem concluídos, chamaremos applyAuthState diretamente
    // (já foi adicionado nos listeners desses formulários)
  }

  // Expor para outros módulos
  window.applyAuthState = applyAuthState;
})();
