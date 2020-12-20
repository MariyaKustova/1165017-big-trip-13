import Abstract from './abstract';

const createTripCost = (waypoints) => {
  const result = waypoints.reduce((accumulator, point) => {
    return accumulator + point.price;
  }, 0);
  return result;
};

const createTripInfoTemplate = (waypoints) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>
  <p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${createTripCost(waypoints)}</span>
</p>
</section>`;
};

export default class TripInfoView extends Abstract {
  constructor(waypoints) {
    super();
    this._waypoints = waypoints;
  }

  getTemplate() {
    return createTripInfoTemplate(this._waypoints);
  }
}
