import {render} from './utils/render';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import {generateWaypoint} from './mock/waypoint';
import TripPresenter from './presenter/trip';
import {RenderPosition} from './utils/const';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import FilterPresenter from './presenter/filter';

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

const tripEvents = siteBodyElement.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);
const tripControls = tripMain.querySelector(`.trip-controls`);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);

renderHeader(tripMain);
filterPresenter.init();
tripPresenter.init();
