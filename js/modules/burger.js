let countListItem = 0;

export const burgerFunc = (classBurgerWrapper, classBurgerButton, classActive, classBurgerLi) => {
  const button = document.querySelector(`.${classBurgerButton}`);
  const burgerMenu = document.querySelector(`.${classBurgerWrapper}`);
  const burgerMenuLi = document.querySelectorAll(`.${classBurgerLi}`);

  button.addEventListener('click', (e) => {
    burgerMenu.classList.toggle(classActive);

    /* smooth appearance of menu items  */
    let timerId = setTimeout(function showLiTimer() {
      if (countListItem === burgerMenuLi.length) {
        clearTimeout(timerId);
        return;
      } 
      burgerMenuLi[countListItem].style.left = `0px`;
      countListItem++;
      timerId = setTimeout(showLiTimer, 100);
    }, 100)
    /* END mooth appearance of menu items  */
  });

  document.body.addEventListener('click', ({target}) => {
    if (!target.classList.contains(classBurgerButton) && !target.classList.contains(classBurgerWrapper)) {
      burgerMenu.classList.remove(classActive);

      /* for smooth appearance of menu items  */
      setTimeout(() => {
        for (const item of burgerMenuLi) {
          item.style.left = `-170px`;
        }
      },300);
      countListItem = 0;
      /* END for smooth appearance of menu items  */
    }
  });
}