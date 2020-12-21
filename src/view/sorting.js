import {createElement} from '../utils';

const typesSort = [
  {
    value: `day`,
    text: `Day`
  },
  {
    value: `event`,
    text: `Event`
  },
  {
    value: `time`,
    text: `Time`
  },
  {
    value: `price`,
    text: `Price`
  },
  {
    value: `offer`,
    text: `Offer`
  }
];

const generateSorting = () => {
  let result = ``;
  for (const element of typesSort) {
    const {value, text} = element;
    result += `<div class="trip-sort__item  trip-sort__item--${value}">
    <input id="sort-${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value}">
    <label class="trip-sort__btn" for="sort-${value}">${text}</label>
  </div>`;
  }
  return result;
};


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
