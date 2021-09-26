import { s1 } from "./sound.js";

let sec = 0;
let min = 0;
let hour = 0;
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const stop = document.getElementById("stop");

let closeSeconds;
let closeMinutes;
let closeHours;

const resetTime = () => {
  closeSeconds();
  closeMinutes();
  closeHours();
  sec = 0;
  min = 0;
  hour = 0;
  s1.stop();
  const xs = document.querySelectorAll(".t");
  xs.forEach((time, i) => {
    if (time.dataset.time === "hour" || time.dataset.time === "min") {
      time.innerHTML = "00:";
    } else {
      time.innerHTML = "00";
    }
  });
  document.getElementById("time").classList.remove("pulse");
  reset.setAttribute("disabled", true);
  stop.setAttribute("disabled", true);
};

const createInterval = (ms) => (fn) => {
  let id = setInterval(fn, ms);
  return () => clearInterval(id);
};

start.addEventListener("click", () => {
  document.getElementById("time").classList.remove("pulse");
  //start sound
  s1.play();
  reset.removeAttribute("disabled");
  stop.removeAttribute("disabled");
  closeSeconds = createInterval(1000)(() => {
    sec++;
    if (sec >= 60) {
      sec = 0;
    }
    let pre = `0${sec}`;
    document.getElementById("sec").innerText = sec < 10 ? pre : sec;
  });
  closeMinutes = createInterval(60000)(() => {
    min++;
    let pre = `0${min}:`;
    document.getElementById("min").innerText = min < 10 ? pre : min + ":";
  });

  closeHours = createInterval(3_600_000)(() => {
    hour++;
    let pre = `0${hour}:`;
    document.getElementById("hour").innerText = hour < 10 ? pre : hour + ":";
  });
});
stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  //start sound
  s1.stop();
  document.getElementById("time").classList.add("pulse");
  closeSeconds();
  closeMinutes();
  closeHours();
});
reset.addEventListener("click", resetTime);

reset.setAttribute("disabled", true);
stop.setAttribute("disabled", true);

export { createInterval, resetTime };
