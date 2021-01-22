import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import StatisticsView from './view/statistics';
import {generateWaypoint} from './mock/waypoint';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import {RenderPosition, MenuItem, UpdateType, FilterType} from './utils/const';
import {render, remove} from './utils/render';

const POINT_COUNT = 10;

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

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      if (statisticsComponent) {
        remove(statisticsComponent);
        tripPresenter.destroy();
        filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
        tripPresenter.showTrip();
        tripPresenter.init();
      }
      filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      tripPresenter.createPoint();
      break;
    case MenuItem.TABLE:
      tripPresenter.showTrip();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      tripPresenter.hideTrip();
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(document.querySelector(`.page-main`), statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

renderHeader(tripMain);
filterPresenter.init();
tripPresenter.init();

tripMain.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
  evt.target.setAttribute(`disabled`, `disabled`);
});
