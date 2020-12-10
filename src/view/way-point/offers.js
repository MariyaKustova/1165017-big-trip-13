export const generateOffers = (array) => {
  let result = ``;
  for (const element of array) {
    const {title, price} = element;
    result += `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`;
  }
  return result;
};
