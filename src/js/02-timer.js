import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix'

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
refs.startBtn.setAttribute("disabled", "disabled");
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
    refs.dataDays.textContent = '00';  
    refs.dataHours.textContent = '00';
    refs.dataMins.textContent = '00';
    refs.dataSecs.textContent = '00';
    console.log("selectedDates", selectedDates[0]);
    const checkTime = Date.now();
    futureDate = selectedDates[0].getTime();
    if (futureDate === 0 || (futureDate - checkTime) < 0) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute("disabled", "disabled");
    }
  },
};

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
        
    decorClockFace();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = futureDate - currentTime;
      console.log("deltaTime", deltaTime);
      const time = convertMs(deltaTime);
      updateClockFace(time);
      if (deltaTime < 1000) {
        timer.stop();
      }
    }, 1000);
  },
  
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

flatpickr(refs.dateTimePicker, options);

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMins.textContent = `${minutes}`;
  refs.dataSecs.textContent = `${seconds}`;
}

function decorClockFace() {
  refs.body.style.backgroundColor = getRandomHexColor();
  const colorFont = getRandomHexColor();
  refs.dataDays.style.color = colorFont;
  refs.dataHours.style.color = colorFont;
  refs.dataMins.style.color = colorFont;
  refs.dataSecs.style.color = colorFont;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
  // const days = pad(Math.floor(time / (1000 * 60 * 60* 24)));
  // const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  // const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  // const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  // return { days, hours, mins, secs };
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
