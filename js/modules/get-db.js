import { declOfNum } from './timer.js';

const loadGoods = async (cb) => {
  const result = await fetch('../../db.json');
  const data = await result.json();
  return data;
}

/* Months for result block in form  */
const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export const renderTickets = async (formClass, selectLabelDateId, selectLabelPeoplesId, priceCalcBlock) => {
  /* (form class, label id with dates, label id with number of people, block with results and button) */
  const data = await loadGoods();
  const selectLabelDate = document.querySelector(`#${selectLabelDateId}`);
  const selectLabelPeoples = document.querySelector(`#${selectLabelPeoplesId}`);

  /* render label travel dates */
  const itemDate = data.map(item => {
    const select = document.createElement('option');
    select.classList.add('tour__option');
    select.value = item.date;
    select.textContent = item.date;
    return select;
  });
  selectLabelDate.append(...itemDate);

  /* getDatabasesItem - item in databased when user choice travel date */
  let getDatabasesItem = null;

  selectLabelDate.addEventListener('change', (e) => {
    /* reset options */
    selectLabelPeoples.textContent = '';
    
    /* find database item by choice user travel date */
    getDatabasesItem = data.find((item) => {
      if (selectLabelDate.value === item.date){
        return item;
      }
    })
    
    /* if getDatabasedItem == 'Выбери дату' render is'nt start  */
    if (getDatabasesItem) {
      for (let i = getDatabasesItem['min-people']; i <= getDatabasesItem['max-people']; i++){
        const select = document.createElement('option');
        select.classList.add('tour__option');
        select.value = i;
        select.textContent = i;
        selectLabelPeoples.append(select);
      }

      /* if the form with cost calculation */
      if (priceCalcBlock) {
        const priceCalcBlockWrapper = document.querySelector(`.${formClass}`).querySelector(`.${priceCalcBlock}`);
        
        /* converting information from the database to the desired format */
        const selectedDate = getDatabasesItem.date.split(' - ');
        const dateSplitArray = [];
        for (let date of selectedDate) {
          dateSplitArray.push(...date.split('.'));
        }

        priceCalcBlockWrapper.querySelector('.reservation__data').textContent = 
        `${+dateSplitArray[0]} ${month[+dateSplitArray[1] - 1]} - ${+dateSplitArray[2]} ${month[+dateSplitArray[3] - 1]}, 
          ${declOfNum(selectLabelPeoples.value, ['человек','человека','человек'])[0]} 
          ${declOfNum(selectLabelPeoples.value, ['человек','человека','человек'])[1]}`;
        priceCalcBlockWrapper.querySelector('.reservation__price').textContent = `${getDatabasesItem.price * selectLabelPeoples.value} ₽`;  
      }
    } else {
      /* clearing the block with calculations when choosing the item "Выбери дату" */
      if (priceCalcBlock) {
        document.querySelector(`.${formClass}`).querySelector(`.${priceCalcBlock}`).querySelector('.reservation__data').textContent = '';
        document.querySelector(`.${formClass}`).querySelector(`.${priceCalcBlock}`).querySelector('.reservation__price').textContent = '';
      }
      const select = document.createElement('option');
      select.classList.add('tour__option');
      select.textContent = 'Количество человек';
      selectLabelPeoples.append(select);
    }
  });

  /* updating the block with calculations when the number of people changes  */
  selectLabelPeoples.addEventListener('change', () => {
    if (priceCalcBlock) {
      const priceCalcBlockWrapper = document.querySelector(`.${formClass}`).querySelector(`.${priceCalcBlock}`);
      const infoParagraph = priceCalcBlockWrapper.querySelector('.reservation__data').textContent.split(',');
      infoParagraph[1] = selectLabelPeoples.value + ' ' + declOfNum(selectLabelPeoples.value, ['человек','человека','человек'])[1];
      priceCalcBlockWrapper.querySelector('.reservation__data').textContent = infoParagraph.join(', ');
      priceCalcBlockWrapper.querySelector('.reservation__price').textContent = `${getDatabasesItem.price * selectLabelPeoples.value} ₽`
    }
  })
}



