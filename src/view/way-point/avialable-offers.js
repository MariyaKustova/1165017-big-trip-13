import {renderOfferCheckbox} from './checkbox';

export const renderOfferCheckboxes = (array) => {
  if (array) {
    let result = ``;
    for (const checkbox of array) {
      result += renderOfferCheckbox(checkbox);
    }
    return result;
  }
  return ``;
};
