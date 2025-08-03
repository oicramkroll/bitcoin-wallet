export function showToast(message: string, isError = false) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  toast.style.background = isError ? 'red' : 'var(--accent)';
  toast.style.color = isError ? 'white' : 'black';

  document.body.appendChild(toast);

  const sound = new Audio(isError ? '/sound/smw_spring_jump.wav' : '/sound/smw_1-up.wav');
  sound.volume = 0.5;
  sound.play().catch(() => {});

  setTimeout(() => toast.remove(), 4000);
}
