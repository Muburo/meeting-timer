let totalSeconds = 300;
let remainingSeconds = 300;
let intervalId = null;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const ringProgress = document.querySelector('.ring-progress');
const CIRCUMFERENCE = 565.49;
let alarmPlayed = false;

function playAlarm() {
  const ctx = new AudioContext();
  const beep = (freq, start, duration) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.value = 0.5;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + duration);
  };
  beep(1000, 0, 0.2);
  beep(1000, 0.3, 0.2);
  beep(1000, 0.6, 0.2);
  beep(1500, 0.9, 0.5);
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
    playAlarm();
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
  remainingSeconds = totalSeconds;
  alarmPlayed = false;
  updateDisplay();
}

function setTime(minutes) {
  pauseTimer();
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  alarmPlayed = false;
  updateDisplay();
}
