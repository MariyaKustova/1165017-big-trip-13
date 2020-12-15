import {createElement} from '../utils';
import {generateSorting} from './trip-sort-item';

const createSortingTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${generateSorting()}
</form>`;
};

export default class SortingView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
