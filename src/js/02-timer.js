import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
let futureDate = 0;
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
  dataDays: document.querySelector('.value[data-days]'),
  dataHours: document.querySelector('.value[data-hours]'),
  dataMins: document.querySelector('.value[data-minutes]'),
  dataSecs: document.querySelector('.value[data-seconds]'),
};
decorClockFace();

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.stop();
    console.log("selectedDates", selectedDates[0]);
    futureDate = selectedDates[0].getTime();
    refs.dataDays.textContent = '00';  
    refs.dataHours.textContent = '00';
    refs.dataMins.textContent = '00';
    refs.dataSecs.textContent = '00';
  },
};

const timer = {
  intervalId: null,
  isActive: false,
  start() {
  
    if (this.isActive) {
      return;
    }
    
    const startTime = futureDate;
    const checkTime = Date.now();
    if (startTime === 0 || (startTime - checkTime) < 0) {
      alert('Please select a date in the future');
    } else {
      decorClockFace();
      this.isActive = true;
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        console.log("deltaTime", deltaTime);
        const time = getTimeComponents(deltaTime);
        updateClockFace(time);
      }, 1000);
    }    
  },
  
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

flatpickr(refs.dateTimePicker, options);

function updateClockFace({ days, hours, mins, secs }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMins.textContent = `${mins}`;
  refs.dataSecs.textContent = `${secs}`;
}

function decorClockFace() {
  refs.body.style.backgroundColor = getRandomHexColor();
  const colorFont = getRandomHexColor();
  refs.dataDays.style.color = colorFont;
  refs.dataHours.style.color = colorFont;
  refs.dataMins.style.color = colorFont;
  refs.dataSecs.style.color = colorFont;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60* 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
