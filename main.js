(function(){
  const cards = Array.from(document.querySelectorAll('.char-card'));
  const gameBtn = document.getElementById('gameBtn');

  let selectedId = null;

  // Восстановить выбор из localStorage
  const saved = localStorage.getItem('selectedCharacter');
  if (saved) {
    const btn = cards.find(b => b.dataset.id === saved);
    if (btn) select(btn, false);
  }

  // Навесить обработчики выбора персонажа
  cards.forEach(btn => {
    btn.addEventListener('click', () => select(btn, true), {passive:true});
  });

  // Обработчик кнопки GAME
  gameBtn.addEventListener('click', () => {
    if (!selectedId) return;
    // На этом шаге только меню. Позже переведем на игру (game.html).
    alert(`Стартуем с персонажем: ${labelById(selectedId)}.\nИгровая сцена будет подключена на следующем шаге.`);
    // Пример будущей навигации:
    // window.location.href = './game.html';
  });

  function select(btn, persist){
    // Сбросить состояние других карточек
    cards.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    selectedId = btn.dataset.id;

    // Активировать кнопку GAME
    gameBtn.disabled = false;
    gameBtn.classList.remove('btn--disabled');

    if (persist) {
      localStorage.setItem('selectedCharacter', selectedId);
    }
  }

  function labelById(id){
    switch(id){
      case 'gsam': return 'G.SAM';
      case 'dyadya-jenya': return 'ДЯДЯ ЖЕНЯ';
      case 'gofman': return 'Гофман';
      case 'polyana': return 'Polyana';
      default: return id;
    }
  }

  // Простейшая проверка ассетов: если картинка не грузится — затемним карточку
  document.querySelectorAll('.char-card__img').forEach(img=>{
    img.addEventListener('error', ()=>{
      img.style.display='none';
      const fallback = document.createElement('div');
      fallback.style.width='100%';
      fallback.style.aspectRatio='1/1';
      fallback.style.background='repeating-linear-gradient(45deg, #5b4b88, #5b4b88 8px, #3a2f59 8px, #3a2f59 16px)';
      fallback.style.border='2px dashed rgba(255,255,255,.35)';
      fallback.style.borderRadius='6px';
      img.parentElement.prepend(fallback);
    }, {once:true});
  });
})();
