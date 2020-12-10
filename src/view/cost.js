import {renderCostTemplate} from './trip-info-cost';

export const createTripCostTemplate = (array) => {
  const result = array.reduce((accumulator, point) => {
    return accumulator + point.price;
  }, 0);
  return renderCostTemplate(result);
};
