import {createElement} from '../utils';

const createListItemTemplate = () => `<li class="trip-events__item"></li>`;

export default class ListItemView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListItemTemplate();
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
