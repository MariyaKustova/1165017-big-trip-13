import Abstract from './abstract';

const createListTemplate = () => `<ul class="trip-events__list"></ul>`;

export default class ListView extends Abstract {
  getTemplate() {
    return createListTemplate();
  }
}
