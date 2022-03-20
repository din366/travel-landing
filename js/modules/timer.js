export const timer = (deadline) => {

  const getTimerField = () => { // ? get items from html
    const days = document.querySelector('.timer__item_days');
    const hours = document.querySelector('.timer__item_hours');
    const minutes = document.querySelector('.timer__item_minutes');
    const seconds = document.querySelector('.timer__item_seconds');
    const salesText = document.querySelector('.hero__text');
    const counterWrapper = document.querySelector('.hero__timer');
    return {days, hours, minutes, seconds, salesText, counterWrapper};
  }

  const timerCounter = (deadline) => { // ? get deadline timing
    const timerStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = timerStop - dateNow;
    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days};
  }

  const declOfNum = (n, titles) => { // ? word case correction
    return [n, titles[
        n % 10 === 1 && n % 100 !== 11
          ? 0
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? 1
          : 2
      ],];
  };

  const mainFunction = () => {
    const timerFields = getTimerField();
    const timerCounters = timerCounter(deadline);

    // ? correction of case of words and assignment to variables as an array [1, день]
    const daysArray = declOfNum(timerCounters.days, ['день','дня','дней']);
    const hoursArray = declOfNum(timerCounters.hours, ['час','часа','часов']);
    const minutesArray = declOfNum(timerCounters.minutes, ['минута','минуты','минут']);
    const secondsArray = declOfNum(timerCounters.seconds, ['секунда','секунды','секунд']);

    // ? function to add text to html unit block
    const addCounterContent = (item, unit, currentCountArray) => {
      item.querySelector(`.timer__count_${unit}`).textContent = ('0' + currentCountArray[0]).slice(-2);
      item.querySelector(`.timer__units_${unit}`).textContent = currentCountArray[1];
    };

    addCounterContent(timerFields.days, 'days', daysArray);
    addCounterContent(timerFields.hours, 'hours', hoursArray);
    addCounterContent(timerFields.minutes, 'minutes', minutesArray);
    addCounterContent(timerFields.seconds, 'seconds', secondsArray);

    // ? hide days block and show seconds block if days < 1
    if (daysArray[0] < 1) {
      timerFields.seconds.style.display = 'block';
      timerFields.days.style.display = 'none';
    }

    const intervalId = setTimeout(() => {
      if (daysArray[0] >= 1) {
        setTimeout(mainFunction, 60000);
      } else {
        setTimeout(mainFunction, 1000);
      }
    }, 0);

    // ? if deadline === 0
    if (timerCounters.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerFields.days.querySelector('.timer__count_days').textContent = '00';
      timerFields.hours.querySelector('.timer__count_hours').textContent = '00';
      timerFields.minutes.querySelector('.timer__count_minutes').textContent = '00';
      timerFields.salesText.style.display = 'none';
      timerFields.counterWrapper.style.display = 'none';
      
    }
  }
  
  mainFunction();
};
