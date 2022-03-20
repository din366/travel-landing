import { timer } from "./modules/timer.js";
import { renderTimerFunc } from "./modules/renderTimer.js";

const deadline= document.querySelector('.timer').dataset.timerDeadline;


renderTimerFunc('timer');
timer(deadline);

