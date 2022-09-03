const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

stopBtn.setAttribute("disabled", "disabled");

function onStartBtn(e) {
    timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;     
    }, 1000);    
    startBtn.setAttribute("disabled", "disabled");
    stopBtn.removeAttribute("disabled", "disabled");
}

function onStopBtn(e) {
    clearInterval(timerId);
    stopBtn.setAttribute("disabled", "disabled");
    startBtn.removeAttribute("disabled", "disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


