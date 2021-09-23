import { diffDates, diffToHtml } from './datecalc.js'; // 1
import { formatError } from './utils.js'; // 2
import { resetTime } from './resetTimer.js'; // 3

const dateCalcForm = document.getElementById('datecalc');
const dateCalcResult = document.getElementById('datecalc__result');

dateCalcForm.addEventListener('submit', handleCalcDates);

function handleCalcDates(event) {
  dateCalcResult.innerHTML = '';
  event.preventDefault();

  let { firstDate, secondDate } = event.target.elements;
  (firstDate = firstDate.value), (secondDate = secondDate.value);

  if (firstDate && secondDate) {
    const diff = diffDates(firstDate, secondDate); // 3
    dateCalcResult.innerHTML = diffToHtml(diff); // 4
  } else
    dateCalcResult.innerHTML = formatError('Для расчета промежутка необходимо заполнить оба поля'); // 5
}

//timer
let sec = 0;
let min = 0;
let hour = 0;

const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('stop');

const createInterval = (ms) => (fn) => {
  let id = setInterval(fn, ms);
  return () => clearInterval(id);
};
let closeSeconds;
let closeMinutes;
let closeHours;

reset.setAttribute('disabled', true);
stop.setAttribute('disabled', true);

start.addEventListener('click', () => {
  document.getElementById('time').classList.remove('pulse');
  reset.removeAttribute('disabled');
  stop.removeAttribute('disabled');
  closeSeconds = createInterval(1000)(() => {
    sec++;
    if (sec >= 60) {
      sec = 0;
    }
    let pre = `0${sec}`;
    document.getElementById('sec').innerText = sec < 10 ? pre : sec;
  });
  closeMinutes = createInterval(60000)(() => {
    min++;
    let pre = `0${min}:`;
    document.getElementById('min').innerText = min < 10 ? pre : min + ':';
  });

  closeHours = createInterval(3_600_000)(() => {
    hour++;
    let pre = `0${hour}:`;
    document.getElementById('hour').innerText = hour < 10 ? pre : hour + ':';
  });
});
stop.addEventListener('click', () => {
  stop.setAttribute('disabled', true);
  document.getElementById('time').classList.add('pulse');
  closeSeconds();
  closeMinutes();
  closeHours();
});

reset.addEventListener('click', resetTime);
