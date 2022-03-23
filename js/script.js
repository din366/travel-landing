import { timer } from "./modules/timer.js";
import { renderTimerFunc } from "./modules/renderTimer.js";
import { accFunction } from "./modules/accordion.js"
import { burgerFunc } from "./modules/burger.js";
import { flyAirplane } from "./modules/flyAirplane.js";

const deadline = document.querySelector('[data-deadline]').dataset.deadline;

renderTimerFunc('data-timer-deadline');
timer(deadline);
accFunction('travel__item', 'travel__item-title', 'travel__item-text-wrapper', 'travel__item_active');

burgerFunc('header__menu', 'header__menu-button', 'header__menu_active', 'header__item');

flyAirplane();
