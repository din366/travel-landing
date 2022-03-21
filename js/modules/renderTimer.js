export const renderTimerFunc = (wrapperDataset) => {

  const wrapper = document.querySelector(`[${wrapperDataset}]`);
  const classesArray = [
  ['timer__item_days', 'timer__count_days', 'timer__units_days'],
  ['timer__item_hours', 'timer__count_hours', 'timer__units_hours'],
  ['timer__item_minutes', 'timer__count_minutes', 'timer__units_minutes'],
  ['timer__item_seconds', 'timer__count_seconds', 'timer__units_seconds']]

  for (const item of classesArray) {
    const paragraphText = document.createElement('p');
    const paragraphWrapperCounter = document.createElement('p');
    const spanDateCount = document.createElement('span');
    const spanDateText = document.createElement('span');

    paragraphText.classList.add('timer__title');
    paragraphText.textContent = 'До конца акции осталось:';
    paragraphWrapperCounter.classList.add('timer__item', item[0]);
    spanDateCount.classList.add('timer__count', item[1]);
    spanDateText.classList.add('timer__units', item[2]);
    paragraphWrapperCounter.append(spanDateCount, spanDateText);
    wrapper.append(paragraphText, paragraphWrapperCounter);
  }
}