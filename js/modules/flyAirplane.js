

export const flyAirplane = () => {
  const docEl = document.documentElement;
  
  const fly = document.createElement('div');
  fly.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: url('/img/airplane.svg') center/contain no-repeat;
    transition: 0.3s all;
  `;
  document.body.append(fly);
  
  const calcPositionFly = () => {
    const maxTop = docEl.clientHeight - fly.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScroll;

    const top = maxTop - (maxTop * (percentScroll / 100));
  
    if (+(fly.style.top.split('px')[0]) < top) {
      fly.style.transform = 'rotate(' + '180' + 'deg)';
    } else {
      fly.style.transform = 'rotate(' + '0' + 'deg)';
    }

    fly.style.top = top + 'px';
    

  };

  window.addEventListener('scroll', calcPositionFly);

  calcPositionFly();

  /* delete airplane when width < 758 and remove listener */
  if (docEl.clientWidth < 758) {
    fly.style.display = `none`;
    window.removeEventListener('scroll', calcPositionFly);
  }

};