import {renderListItemOffer} from './list-item-offer';
export const generateOffers = (array) => {
  let result = ``;
  for (const element of array) {
    result += renderListItemOffer(element);
  }
  return result;
};
