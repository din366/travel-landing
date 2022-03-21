export const accFunction = (classItem, classButton, classTextWrapper, activeClass) => {
  const items = document.querySelectorAll(`.${classItem}`);
  const buttons = document.querySelectorAll(`.${classButton}`);
  const textWrapper = document.querySelectorAll(`.${classTextWrapper}`);

  let heightWrapper = 0;

  textWrapper.forEach(elem => {
    if (heightWrapper < elem.scrollHeight) {
      heightWrapper = elem.scrollHeight;
    }
  })

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        if (index === i) {
          textWrapper[i].style.height = items[i].classList.contains(activeClass) ?
          '' : `${heightWrapper}px`;
          items[i].classList.toggle(activeClass);
        } else {
          items[i].classList.remove(activeClass);
          textWrapper[i].style.height = '';
        }
      }
    })
  })

}





