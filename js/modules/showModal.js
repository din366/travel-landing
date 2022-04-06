import loadStyle from './loadStyle.js';
import { dateAndPeoplesArr } from './get-db.js'; // ? dateAndPeoplesArr [date, peoples, price]
import { fetchRequest, URL, bodyData, bookingRenderFormAfterSend } from './forms.js';

export const showModal = async (err) => {
  await loadStyle('css/modal.css');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'overlay_confirm');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки'; 

  const firstParagraph = document.createElement('p');
  firstParagraph.classList.add('modal__text');
  firstParagraph.textContent = `Бронирование путешествия в Индию на ${dateAndPeoplesArr[1]}`;

  const secondParagraph = document.createElement('p');
  secondParagraph.classList.add('modal__text');
  secondParagraph.textContent = `В даты: ${dateAndPeoplesArr[0]}`;

  const thirdParagraph = document.createElement('p');
  thirdParagraph.classList.add('modal__text');
  thirdParagraph.textContent = `Стоимость тура: ${dateAndPeoplesArr[2]}`;

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('modal__button');

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('modal__btn', 'modal__btn_confirm');
  confirmButton.textContent = 'Подтверждаю';

  const changeButton = document.createElement('button');
  changeButton.classList.add('modal__btn', 'modal__btn_edit');
  changeButton.textContent = 'Изменить данные';

  buttonsWrapper.append(confirmButton, changeButton);
  modal.append(title, firstParagraph, secondParagraph, thirdParagraph, buttonsWrapper);
  overlay.append(modal);

  document.querySelector('.reservation__form').append(overlay);

  changeButton.addEventListener('click', () => {
    overlay.remove();
  });

  confirmButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (bodyData.userName === '' || bodyData.userPhone === '') return;
    await fetchRequest(URL, {
      method: 'POST',
      body: {
        title: 'Заявка на бронирование тура',
        body: bodyData,
      },
      callback: function callbackFunc() {
        overlay.remove();
        bookingRenderFormAfterSend();
      },
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
  });
};