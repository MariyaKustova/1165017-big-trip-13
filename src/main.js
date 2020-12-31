import {render, RenderPosition} from './utils/render';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import {generateWaypoint} from './mock/waypoint';
import Trip from './presenter/trip';

const POINT_COUNT = 20;

export const waypoints = new Array(POINT_COUNT).fill().map(generateWaypoint);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

const renderHeader = (headerContainer) => {
  render(headerContainer, new TripInfoView(waypoints), RenderPosition.AFTERBEGIN);

  render(headerContainer.children[1].children[0], new MenuView(), RenderPosition.AFTEREND);

  render(headerContainer.children[1], new FiltersView(), RenderPosition.BEFOREEND);
};

const tripEvents = siteBodyElement.querySelector(`.trip-events`);
const trip = new Trip(tripEvents);

renderHeader(tripMain);
trip.init(waypoints);
