import Abstract from './abstract';

const createNoPoints = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class NoPointsView extends Abstract {
  getTemplate() {
    return createNoPoints();
  }
}
