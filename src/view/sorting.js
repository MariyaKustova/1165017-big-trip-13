import {generateSorting} from './trip-sort-item';

export const createSortingTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${generateSorting()}
</form>`;
};
