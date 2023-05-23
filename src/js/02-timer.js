import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysShow = document.querySelector('[data-days]');
const hoursShow = document.querySelector('[data-hours]');
const minutesShow = document.querySelector('[data-minutes]');
const secondsShow = document.querySelector('[data-seconds]');

const DELAY = 1000;
let intervalId = null;
let targetDate = 0;
startBtn.disabled = true;
startBtn.style.height = '30px'
dateTimePicker.style.fontSize = '15px';
dateTimePicker.style.height = '30px'

Notiflix.Notify.init({
    position: 'center-top',
    timeout: 2000,
    cssAnimationStyle: 'zoom',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        setDateTimerOnClose(selectedDates)
  },
};

function setDateTimerOnClose(dates) {
    targetDate = dates[0];
    if (targetDate < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
        } else {
          startBtn.disabled = false;
        }
}

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
      return String(value).padStart(2, "0");
    }

function onStartTimer() {
    intervalId = setInterval(() => {
        const differenceTime = targetDate - Date.now();

        if (differenceTime <= 0) {
            clearInterval(intervalId);
            startBtn.disabled = true;
        return;
      }

        const { days, hours, minutes, seconds } = convertMs(differenceTime);

        daysShow.textContent = addLeadingZero(days);
        hoursShow.textContent = addLeadingZero(hours);
        minutesShow.textContent = addLeadingZero(minutes);
        secondsShow.textContent = addLeadingZero(seconds);
        }, DELAY);    
}

startBtn.addEventListener('click', onStartTimer)








 