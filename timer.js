let totalSeconds = 300;
let remainingSeconds = 300;
let intervalId = null;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const ringProgress = document.querySelector('.ring-progress');
const CIRCUMFERENCE = 565.49;

function updateButtons() {
  const running = intervalId !== null;
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
}

function updateDisplay() {
  const min = Math.floor(Math.abs(remainingSeconds) / 60);
  const sec = Math.abs(remainingSeconds) % 60;
  const prefix = remainingSeconds < 0 ? '-' : '';
  display.textContent = `${prefix}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  display.className = '';
  if (remainingSeconds <= 60 && remainingSeconds > 0) display.className = 'warning';
  if (remainingSeconds <= 0) display.className = 'overtime';

  updateRing();
}

function updateRing() {
  const progress = Math.max(remainingSeconds, 0) / totalSeconds;
  const offset = CIRCUMFERENCE * (1 - progress);
  ringProgress.style.strokeDashoffset = offset;
}

function startTimer() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    remainingSeconds--;
    updateDisplay();
  }, 1000);
  updateButtons();
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
  updateButtons();
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
