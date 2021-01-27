import Abstract from './abstract';
import dayjs from 'dayjs';

const createTripCost = (waypoints) => {
  const result = waypoints.reduce((accumulator, point) => {
    return accumulator + point.price;
  }, 0);
  return result;
};

const createRouteName = (waypoints) => {
  const firstPointName = waypoints[0].description.name;
  const secondPointName = waypoints[1].description.name;
  const lastPointName = waypoints[waypoints.length - 1].description.name;
  if (waypoints.length === 1) {
    return firstPointName;
  } else if (waypoints.length === 2) {
    return firstPointName + ` - ` + secondPointName;
  } else if (waypoints.length === 3) {
    return firstPointName + ` - ` + secondPointName + ` - ` + lastPointName;
  }
  return firstPointName + ` - ... - ` + lastPointName;
};

const createDurationRoute = (waypoints) => {
  const startDate = waypoints[0].startTime;
  const endDate = waypoints[waypoints.length - 1].endTime;
  const startMonth = dayjs(startDate).format(`MMM`);
  const endMonth = dayjs(endDate).format(`MMM`);
  const startDay = dayjs(startDate).format(`DD`);
  const endDay = dayjs(endDate).format(`DD`);
  return (startMonth === endMonth) ? (startMonth + ` ` + startDay + ` - ` + endDay) : (startMonth + ` ` + startDay + ` - ` + endMonth + ` ` + endDay);
};


const createTripInfoTemplate = (waypoints) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createRouteName(waypoints)}</h1>
    <p class="trip-info__dates">${createDurationRoute(waypoints)}</p>
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
