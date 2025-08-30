(() => {
  function init() {
    const cards = Array.from(document.querySelectorAll('.charcard'));
    const gameBtn = document.getElementById('gameBtn');
    if (!cards.length || !gameBtn) return;

    let selectedId = null;

    function updateButton() {
      const enabled = !!selectedId;
      gameBtn.disabled = !enabled;
      gameBtn.classList.toggle('btndisabled', !enabled);
    }

    function select(btn, persist) {
      cards.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      selectedId = btn.dataset.id || null;
      if (persist && selectedId) {
        try { localStorage.setItem('selectedCharacter', selectedId); } catch {}
      }
      updateButton();
    }

    // восстановление
    try {
      const saved = localStorage.getItem('selectedCharacter');
      if (saved) {
        const btn = cards.find(b => b.dataset.id === saved);
        if (btn) select(btn, false);
      }
    } catch {}
    updateButton();

    // клики
    cards.forEach(btn => {
      btn.addEventListener('click', () => select(btn, true));
    });

    // кнопка GAME
    gameBtn.addEventListener('click', () => {
      if (!selectedId) return;
      alert(`Стартуем с персонажем: ${labelById(selectedId)}\n(игровая сцена подключится на следующем шаге)`);
      // window.location.href = './game.html';
    });

    // если картинка не загрузилась
    document.querySelectorAll('.charcardimg').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.width = '100%';
        fallback.style.aspectRatio = '1 / 1';
        fallback.style.background = 'repeating-linear-gradient(45deg, #5b4b88, #5b4b88 8px, #3a2f59 8px, #3a2f59 16px)';
        fallback.style.border = '2px dashed rgba(255,255,255,.35)';
        fallback.style.borderRadius = '6px';
        fallback.setAttribute('aria-hidden', 'true');
        img.parentElement?.prepend(fallback);
      }, { once: true });
    });

    function labelById(id) {
      switch (id) {
        case 'gsam': return 'G.SAM';
        case 'dyadyajenya': return 'ДЯДЯ ЖЕНЯ';
        case 'gofman': return 'Гриша Гофман';
        case 'polyana': return 'Polyana';
        default: return id;
      }
    }

    try { window.Telegram?.WebApp?.expand?.(); } catch {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
