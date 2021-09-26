import { createInterval, resetTime } from "./timer.js";
import handleCalcDates from "./dates.js";
import "../style/style.css";
const dateCalcForm = document.getElementById("datecalc");

dateCalcForm.addEventListener("submit", handleCalcDates);
