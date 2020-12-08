import {renderOfferCheckbox} from './checkbox';

const checkboxes = [
  {
    value: `luggage`,
    title: `Add luggage`,
    price: `30`
  },
  {
    value: `comfort`,
    title: `Switch to comfort class`,
    price: `100`
  },
  {
    value: `meal`,
    title: `Add meal`,
    price: `15`
  },
  {
    value: `seats`,
    title: `Choose seats`,
    price: `5`
  },
  {
    value: `train`,
    title: `Travel by train`,
    price: `40`
  }
];

export const renderOfferCheckboxes = () => {
  let result = ``;
  for (const checkbox of checkboxes) {
    result += renderOfferCheckbox(checkbox);
  }
  return result;
};
