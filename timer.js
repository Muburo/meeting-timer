let totalSeconds = 300;
let remainingSeconds = 300;
let intervalId = null;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const ringProgress = document.querySelector('.ring-progress');
const CIRCUMFERENCE = 565.49;
let alarmPlayed = false;
let flashId = null;

function flashAlarm() {
  let count = 0;
  flashId = setInterval(() => {
    document.body.classList.toggle('flash');
    count++;
    if (count >= 10) {
      clearInterval(flashId);
      flashId = null;
      document.body.classList.remove('flash');
    }
  }, 200);
}

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

  if (remainingSeconds === 0 && !alarmPlayed) {
    alarmPlayed = true;
    flashAlarm();
  }

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
  if (flashId) { clearInterval(flashId); flashId = null; }
  document.body.classList.remove('flash');
  remainingSeconds = totalSeconds;
  alarmPlayed = false;
  updateDisplay();
}

function setTime(minutes) {
  pauseTimer();
  if (flashId) { clearInterval(flashId); flashId = null; }
  document.body.classList.remove('flash');
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  alarmPlayed = false;
  updateDisplay();
}
