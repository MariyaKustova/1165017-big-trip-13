import Abstract from './abstract';

const createTripCost = (waypoints) => {
  const result = waypoints.reduce((accumulator, point) => {
    return accumulator + point.price;
  }, 0);
  return result;
};

const createRouteName = (waypoints) => {
  if (waypoints.length === 1) {
    return waypoints[0].to;
  } else if (waypoints.length === 2) {
    return waypoints[0].to + ` - ` + waypoints[1].to;
  } else if (waypoints.length === 3) {
    return waypoints[0].to + ` - ` + waypoints[1].to + ` - ` + waypoints[2].to;
  }
  return waypoints[0].to + ` - ... - ` + waypoints[waypoints.length - 1].to;
};

const createDuretionRoute = (waypoints) => {
  const startMonth = waypoints[0].objectDay.startMonth;
  const endMonth = waypoints[waypoints.length - 1].objectDay.endMonth;
  const startDay = waypoints[0].objectDay.startDay;
  const endDay = waypoints[waypoints.length - 1].objectDay.endDay;
  return (startMonth === endMonth) ? (startMonth + ` ` + startDay + ` - ` + endDay) : (startMonth + ` ` + startDay + ` - ` + endMonth + ` ` + endDay);
};


const createTripInfoTemplate = (waypoints) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createRouteName(waypoints)}</h1>
    <p class="trip-info__dates">${createDuretionRoute(waypoints)}</p>
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
