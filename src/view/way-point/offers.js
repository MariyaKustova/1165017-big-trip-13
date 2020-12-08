export const generateOffers = (array) => {
  let result = ``;
  array.forEach((item) => {
    result += `<li class="event__offer">
    <span class="event__offer-title">${item.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${item.price}</span>
  </li>`;
  });
  return result;
};
