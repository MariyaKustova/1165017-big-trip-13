import {createElement} from '../utils';

const createNoPoints = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoPointsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoPoints();
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
