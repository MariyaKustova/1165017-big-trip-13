export const renderTypeInput = ({value, text}) => {
  return `<div class="event__type-item">
  <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}">
  <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${text}</label>
</div>`;
};
