const renderTypeInput = ({type}) => {
  return `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" type="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1" data-type-input = "${type}">${type}</label>
</div>`;
};

export const renderTypeInputs = (offers) => {
  let result = ``;
  for (const inputOffer of offers) {
    result += renderTypeInput(inputOffer);
  }
  return result;
};
