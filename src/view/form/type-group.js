const inputs = [
  {
    value: `taxi`,
    text: `Taxi`
  },
  {
    value: `bus`,
    text: `Bus`
  },
  {
    value: `train`,
    text: `Train`
  },
  {
    value: `ship`,
    text: `Ship`
  },
  {
    value: `transport`,
    text: `Transport`
  },
  {
    value: `drive`,
    text: `Drive`
  },
  {
    value: `flight`,
    text: `Flight`
  },
  {
    value: `check-in`,
    text: `Check-in`
  },
  {
    value: `sightseeing`,
    text: `Sightseeing`
  },
  {
    value: `restaurant`,
    text: `Restaurant`
  }
];

const renderTypeInput = ({value, text}) => {
  return `<div class="event__type-item">
  <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}">
  <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${text}</label>
</div>`;
};

export const renderTypeInputs = () => {
  let result = ``;
  for (const input of inputs) {
    result += renderTypeInput(input);
  }
  return result;
};
