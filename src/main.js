import { createInterval, resetTime } from "./timer.js";
import handleCalcDates from "./dates.js";

const dateCalcForm = document.getElementById("datecalc");

dateCalcForm.addEventListener("submit", handleCalcDates);
