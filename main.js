'use strict';
document.addEventListener('DOMContentLoaded', () => { const cards = Array.from(document.querySelectorAll('.char-card')); const gameBtn = document.getElementById('gameBtn'); let selectedId = null;
function enableGame(state) { if (!gameBtn) return; gameBtn.disabled = !state; gameBtn.classList.toggle('btn--disabled', !state); }
function selectCard(card, save = true) { if (!card) return; cards.forEach(c => c.setAttribute('aria-pressed', c === card ? 'true' : 'false')); selectedId = card.dataset.id || null;
const nameEl = card.querySelector('.char-card__name');
const name = nameEl ? nameEl.textContent.trim() : '';

if (save && selectedId) {
  localStorage.setItem('selectedCharacterId', selectedId);
  localStorage.setItem('selectedCharacterName', name);
}
enableGame(!!selectedId);
}
function restoreSelection() { const savedId = localStorage.getItem('selectedCharacterId'); if (!savedId) return; const card = cards.find(c => c.dataset.id === savedId); if (card) selectCard(card, false); }
// Click and keyboard activate cards.forEach(card => { card.setAttribute('tabindex', '0'); card.addEventListener('click', () => selectCard(card)); card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectCard(card); } }); });
// Arrow-key navigation within the 2x2 grid document.addEventListener('keydown', e => { const active = document.activeElement; if (!active || !active.classList.contains('char-card')) return;
const idx = cards.indexOf(active);
if (idx < 0) return;

const cols = 2;
let nextIdx = idx;

switch (e.key) {
  case 'ArrowRight': nextIdx = Math.min(cards.length - 1, idx + 1); break;
  case 'ArrowLeft':  nextIdx = Math.max(0, idx - 1); break;
  case 'ArrowDown':  nextIdx = Math.min(cards.length - 1, idx + cols); break;
  case 'ArrowUp':    nextIdx = Math.max(0, idx - cols); break;
  default: return;
}
e.preventDefault();
cards[nextIdx]?.focus();
});
// GAME button behavior if (gameBtn) { gameBtn.addEventListener('click', () => { if (!selectedId) return;
  const name = localStorage.getItem('selectedCharacterName') || '';
  // Dispatch a custom event for integration with the game
  window.dispatchEvent(new CustomEvent('start-game', {
    detail: { id: selectedId, name }
  }));

  // Example navigation (uncomment if you have a game page):
  // location.href = './game.html';
});
}
// Init enableGame(false); restoreSelection(); });

