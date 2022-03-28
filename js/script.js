import { timer } from "./modules/timer.js";
import { renderTimerFunc } from "./modules/renderTimer.js";
import { accFunction } from "./modules/accordion.js"
import { burgerFunc } from "./modules/burger.js";
import { flyAirplane } from "./modules/flyAirplane.js";
import { renderTickets } from "./modules/get-db.js";

const deadline = document.querySelector('[data-deadline]').dataset.deadline;

renderTimerFunc('data-timer-deadline');
timer(deadline);
accFunction('travel__item', 'travel__item-title', 'travel__item-text-wrapper', 'travel__item_active');

burgerFunc('header__menu', 'header__menu-button', 'header__menu_active', 'header__item');

flyAirplane();

renderTickets('tour__form', 'tour__date', 'tour__people'); // small form
renderTickets('reservation__form', 'reservation__date', 'reservation__people', 'reservation__bottom'); // form with calculation
/* revesration__botton - calculation block */
