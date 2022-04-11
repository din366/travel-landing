export const runPlugins = () => {
  /* phone mask */
  IMask(
    document.getElementById('reservation__phone'), {
      mask: '+{7}(000)000-00-00'
    });

  /* swiper */
  new Swiper('.swiper', {
    slidesPerView: 3,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.album__right',
      prevEl: '.album__left',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  }); 

  /* just-validate for email form */
  const validate = new JustValidate('.footer__form');
  validate.addField('.footer__input', [
    {
      rule: 'minLength',
      value: 6,
    },
    {
      rule: 'required',
      errorMessage: 'Email is required',
    },
    {
      rule: 'email',
      errorMessage: 'Email is invalid!',
    },
  ])
}