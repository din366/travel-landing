import { showModal } from './showModal.js';

export const URL = 'https://jsonplaceholder.typicode.com/posts';
export let bodyData = {};

/* httpRequest main function */
/* const httpRequest = (url, {
  method = 'GET',
  callback,
  body = {},
  headers,
}) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    if (headers) {
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
    }

    xhr.addEventListener('load', () => {
      if (xhr.status < 200 || xhr.status >= 300){
        callback(new Error(xhr.status), xhr.responce);
        return;
      }

      const data = JSON.parse(xhr.response);
      if (callback) callback(null, data); // сделать функцию рендера на странице
    });

    xhr.addEventListener('error', () => {
      callback(new Error(xhr.status), xhr.responce);
    })

    xhr.send(JSON.stringify(body));
  } catch (err) {
    callback(new Error(err));
  }
} */

/* функция httpRequest через fetch */
export const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

/* booking form const */
const formBooking = document.querySelector('.reservation__form');
const reservationTitle = formBooking.querySelector('.reservation__title');
const reservationInputs = formBooking.querySelector('.reservation__inputs');
const reservationContacts = formBooking.querySelector('.reservation__contacts');
const reservationBottom = formBooking.querySelector('.reservation__bottom');
const reservationInputName = formBooking.querySelector('.reservation__input_name');
const reservationPhone = formBooking.querySelector('#reservation__phone');
/* END booking form const */

/* footer form const */
const footerEmailForm = document.querySelector('.footer__form');
const footerFormEmailInput = document.querySelector('.footer__input');
const footerEmailFormTitle = document.querySelector('.footer__form-title');
const footerEmailFormDescr =  document.querySelector('.footer__text');
const footerEmailFormInputWrapper = document.querySelector('.footer__input-wrap');
/* END footer form const */

/* render booking sendBlock in html (in script.js) */
export const createBookingSendBlock = (formClass) => {
  const sendBlockWrapper = document.createElement('div');
  sendBlockWrapper.classList.add('sendBlockWrapper');
  sendBlockWrapper.style = `
  display: none;
  text-align: center;
  padding: 75px;
  `;
  const title = document.createElement('p');
  title.classList.add('reservation__title');
  title.textContent = 'Ваша заявка успешно отправлена';
  sendBlockWrapper.append(title);

  const text = document.createElement('p');
  text.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';
  text.style = `
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 65px;
  `;
  sendBlockWrapper.append(text);

  const okImage = document.createElement('img');
  okImage.src = '../../img/ok.png';
  okImage.style = `
  width: 100px;
  height: 100px;
  margin: 0 auto;
  `;
  sendBlockWrapper.append(okImage);
  document.querySelector(`.${formClass}`).append(sendBlockWrapper);
}

/* render booking errorBlock in html (in script.js) */
export const createBookingErrorBlock = (formClass) => {
  const sendBlockWrapper = document.createElement('div');
  sendBlockWrapper.classList.add('errorBlockWrapper');
  sendBlockWrapper.style = `
  display: none;
  text-align: center;
  padding: 75px;
  `;
  const title = document.createElement('p');
  title.classList.add('reservation__title');
  title.textContent = 'Упс... Что-то пошло не так';
  sendBlockWrapper.append(title);

  const text = document.createElement('p');
  text.textContent = 'Не удалось отправить заявку. Пожалуйста повторите отправку еще раз';
  text.style = `
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 65px;
  `;
  sendBlockWrapper.append(text);

  const button = document.createElement('button');
  button.classList.add('button', 'reservation__button', 'reset__button');
  button.textContent = 'Попробовать заново';

  sendBlockWrapper.append(button);

  button.addEventListener('click', () => {
    /* const document.querySelector(`.${formClass}`).querySelector('.reset__button'); */
    reservationTitle.style.display = 'inherit';
    reservationInputs.style.display = 'inherit';
    reservationContacts.style.display = 'inherit';
    reservationBottom.style.display = 'inherit';
    sendBlockWrapper.style.display = 'none';
  })
  document.querySelector(`.${formClass}`).append(sendBlockWrapper);
}

/* show info after send request (send/error) in booking form */
export const bookingRenderFormAfterSend = (err, data) => {
  const resetForm = () => {
    formBooking.reset();

    const labelChoicePeople = formBooking.querySelector('#reservation__people');
    labelChoicePeople.textContent = '';
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.textContent = 'Количество человек';
    labelChoicePeople.append(option);

    reservationTitle.style.display = 'none';
    reservationInputs.style.display = 'none';
    reservationContacts.style.display = 'none';
    reservationBottom.style.display = 'none';

    formBooking.querySelector('.reservation__data').textContent = '';
    formBooking.querySelector('.reservation__price').textContent = '';
  }

  if (err) {
    console.warn(err, data);
    resetForm();
    const errorBlockWrapper = formBooking.querySelector('.errorBlockWrapper');
    errorBlockWrapper.style.display = 'block';
    return;
  }

  resetForm();
  const sendBlockWrapper = formBooking.querySelector('.sendBlockWrapper');
  sendBlockWrapper.style.display = 'block';

  setTimeout(() => {
    reservationTitle.style.display = 'inherit';
    reservationInputs.style.display = 'inherit';
    reservationContacts.style.display = 'inherit';
    reservationBottom.style.display = 'inherit';
    sendBlockWrapper.style.display = 'none';
  }, 5000);
}

/* show info after send request (send/error) in footer email form */
const footerRenderFormAfterSend = (err, data) => {
  const resetForm = (err) => {
    footerEmailForm.reset();

    footerEmailFormInputWrapper.style.display = 'none';
    if (err) {
      footerEmailFormTitle.textContent = 'Проблемы с отправкой заявки';
      return;
    }

    footerEmailFormTitle.textContent = 'Ваша заявка успешно отправлена';
    footerEmailFormDescr.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней'
  }

  if (err) {
    console.warn(err, data);
    resetForm(err);
    footerEmailFormDescr.textContent = 'Произошла ошибка! Попробуйте еще раз через 5 секунд.';

    setTimeout(() => {
      footerEmailFormInputWrapper.style.display = 'flex';
      footerEmailFormTitle.textContent = 'Есть вопросы по туру?';
      footerEmailFormDescr.textContent = 'Введите свой Email и мы свяжемся с вами в течении 3 рабочих дней'
    }, 5000);
    return;
  }

  resetForm();

  setTimeout(() => {
    footerEmailFormInputWrapper.style.display = 'flex';
    footerEmailFormTitle.textContent = 'Есть вопросы по туру?';
    footerEmailFormDescr.textContent = 'Введите свой Email и мы свяжемся с вами в течении 3 рабочих дней'
  }, 5000);
}

/* add listeners to submit button in booking form and footer form */
export const sendForms = () => {
  formBooking.addEventListener('click', async (e) => {    

    if (e.target.classList.contains('reservation__button')) {
      bodyData = {
        date: `${formBooking.querySelector('#reservation__date').value}`,
        peoples: `${formBooking.querySelector('#reservation__people').value}`,
        userName: `${formBooking.querySelector('#reservation__name').value}`,
        userPhone: `${formBooking.querySelector('#reservation__phone').value}`
      };

      const regExpValidationName = /[а-я]+/gi; // full name check regexp
      const regExpResultArray = reservationInputName.value.match(regExpValidationName);
      if (regExpResultArray.length < 3) return; // if not fullname - exit

        /* async function for show confirm modal */
        showModal();
    }
  });

  reservationInputName.addEventListener('input', () => {
    reservationInputName.value = reservationInputName.value.replace(/[^а-я ]/gi, '');
  });

  reservationPhone.addEventListener('input', () => {
    reservationPhone.value = reservationPhone.value.replace(/[^0-9\+]/, '');
  }) 

  footerEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const bodyData = {
      email: `${footerFormEmailInput.value}`,
    };

    fetchRequest(URL, {
      method: 'POST',
      body: {
        title: 'Вопросы по туру (из футера)',
        body: bodyData,
      },
      callback: footerRenderFormAfterSend,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  })
}
