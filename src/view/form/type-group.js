const inputs = [
  {
    value: `Taxi`
  },
  {
    value: `Bus`
  },
  {
    value: `Train`
  },
  {
    value: `Ship`
  },
  {
    value: `Transport`
  },
  {
    value: `Drive`
  },
  {
    value: `Flight`
  },
  {
    value: `Check-in`
  },
  {
    value: `Sightseeing`
  },
  {
    value: `Restaurant`
  }
];

const renderTypeInput = ({value}) => {
  return `<div class="event__type-item">
  <input id="event-type-${value.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value.toLowerCase()}">
  <label class="event__type-label  event__type-label--${value.toLowerCase()}" for="event-type-${value.toLowerCase()}-1" data-type-input = "${value}">${value}</label>
</div>`;
};

export const renderTypeInputs = () => {
  let result = ``;
  for (const input of inputs) {
    result += renderTypeInput(input);
  }
  return result;
};
