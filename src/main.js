import {render} from './utils/render';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import Filters from './view/filters';
import {generateWaypoint} from './mock/waypoint';
import Trip from './presenter/trip';
import {FilterType, RenderPosition} from './utils/const';
import {filterPointFutureDate, filterPointPastDate} from './utils/common';
import PointsModel from './model/points';
import FilterModel from './model/filter';

const POINT_COUNT = 20;

export const waypoints = new Array(POINT_COUNT).fill().map(generateWaypoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

const renderHeader = (headerContainer) => {
  render(headerContainer, new TripInfoView(waypoints), RenderPosition.AFTERBEGIN);

  render(headerContainer.children[1].children[0], new MenuView(), RenderPosition.AFTEREND);
};

const filterForm = new Filters();

const handleFilterTypeChange = (filterType) => {
  if (!filterType) {
    return;
  }
  trip.clearTrip();
  switch (filterType) {
    case FilterType.FUTURE:
      trip.init(waypoints.filter(filterPointFutureDate));
      break;
    case FilterType.PAST:
      trip.init(waypoints.filter(filterPointPastDate));
      break;
    default:
      trip.init(waypoints);
  }
};


const renderFilter = function (headerContainer) {
  render(headerContainer.children[1], filterForm, RenderPosition.BEFOREEND);
  filterForm.setFilterTypeChangeHandler(handleFilterTypeChange);
};

const tripEvents = siteBodyElement.querySelector(`.trip-events`);
const trip = new Trip(tripEvents, pointsModel);

renderHeader(tripMain);
renderFilter(tripMain);
trip.init();
