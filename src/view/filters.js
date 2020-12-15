import {generateFilters} from './trip-filters';
import {createElement} from '../utils';

const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
  ${generateFilters()}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FiltersView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate();
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
