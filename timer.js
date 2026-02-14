let totalSeconds = 300;
let remainingSeconds = 300;
let intervalId = null;

const display = document.getElementById('timer-display');

function updateDisplay() {
  const min = Math.floor(Math.abs(remainingSeconds) / 60);
  const sec = Math.abs(remainingSeconds) % 60;
  const prefix = remainingSeconds < 0 ? '-' : '';
  display.textContent = `${prefix}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  display.className = '';
  if (remainingSeconds <= 60 && remainingSeconds > 0) display.className = 'warning';
  if (remainingSeconds <= 0) display.className = 'overtime';
}

function startTimer() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    remainingSeconds--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = totalSeconds;
  updateDisplay();
}

function setTime(minutes) {
  pauseTimer();
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  updateDisplay();
}
