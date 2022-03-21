export const burgerFunc = (classBurgerWrapper, classBurgerButton, classActive) => {
  const button = document.querySelector(`.${classBurgerButton}`);
  const burgerMenu = document.querySelector(`.${classBurgerWrapper}`);

  button.addEventListener('click', (e) => {
    burgerMenu.classList.toggle(classActive);
  });

  document.body.addEventListener('click', ({target}) => {
    if (!target.classList.contains(classBurgerButton) && !target.classList.contains(classBurgerWrapper)) {
      burgerMenu.classList.remove(classActive);
    }
  });
}