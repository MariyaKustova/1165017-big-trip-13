import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import StatisticsView from "./view/statistics.js";
import {generateWaypoint} from './mock/waypoint';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import {RenderPosition, MenuItem, UpdateType, FilterType} from './utils/const';
import {render} from './utils/render';

const POINT_COUNT = 20;

export const waypoints = new Array(POINT_COUNT).fill().map(generateWaypoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);
const siteMenuComponent = new MenuView();

const renderHeader = (headerContainer) => {
  render(headerContainer, new TripInfoView(waypoints), RenderPosition.AFTERBEGIN);
  render(headerContainer.children[1].children[0], siteMenuComponent, RenderPosition.AFTEREND);
};

const tripControls = tripMain.querySelector(`.trip-controls`);
const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);


const tripEvents = siteBodyElement.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);

const handlePointNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

renderHeader(tripMain);
filterPresenter.init();
// tripPresenter.init();
render(document.querySelector(`.page-body__container`), new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

tripMain.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
  tripPresenter.init();
  tripPresenter.createPoint(handlePointNewFormClose);
  siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`).classList.remove(`trip-tabs__btn--active`);
  evt.target.setAttribute(`disabled`, `disabled`);
});
