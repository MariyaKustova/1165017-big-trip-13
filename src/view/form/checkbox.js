export const renderOfferCheckbox = ({value, title, price}) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value}-1" type="checkbox" name="event-offer-${value}" checked>
  <label class="event__offer-label" for="event-offer-${value}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};
