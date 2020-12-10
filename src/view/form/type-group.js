import {renderTypeInput} from './input';

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

export const renderTypeInputs = () => {
  let result = ``;
  for (const input of inputs) {
    result += renderTypeInput(input);
  }
  return result;
};
