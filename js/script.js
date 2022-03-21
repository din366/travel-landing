import { timer } from "./modules/timer.js";
import { renderTimerFunc } from "./modules/renderTimer.js";

const deadline = document.querySelector('[data-deadline]').dataset.deadline;

renderTimerFunc('data-timer-deadline');
timer(deadline);

