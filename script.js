const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;
let elapsedTime = 0;
let timerId = null;

function format(ms) {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

function update() {
    const now = Date.now();
    display.textContent = format(elapsedTime + (now - startTime));
}

startBtn.addEventListener('click', () => {
    if (timerId) return;
    startTime = Date.now();
    timerId = setInterval(update, 10);
});

stopBtn.addEventListener('click', () => {
    if (!timerId) return;
    clearInterval(timerId);
    elapsedTime += Date.now() - startTime;
    timerId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
});
