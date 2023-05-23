const bodyEl = document.querySelector('body')
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId = null;
const DELAY = 1000;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function setBackgroundColor() {
    intervalId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, DELAY);
    startBtn.disabled = true;
};


function stopInterval() {
    clearInterval(intervalId);
    startBtn.disabled = false;
}

function changeBackgroundColor(e) {
    if (e.target === startBtn) {
        setBackgroundColor();
    };
    if (e.target === stopBtn) {
        stopInterval();
    };
}

bodyEl.addEventListener('click', changeBackgroundColor);




