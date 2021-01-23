import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import StatisticsView from './view/statistics';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';

import PointsModel from './model/points';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import FilterModel from './model/filter';

import {RenderPosition, MenuItem, UpdateType, FilterType} from './utils/const';
import {render, remove} from './utils/render';

import Api from './api';

const AUTHORIZATION = `Basic jhf984vnp983wv094`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripEvents = siteBodyElement.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new MenuView();

const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, api);
render(tripMain, new TripInfoView(pointsModel), RenderPosition.AFTERBEGIN);

// const destinationsModel = new DestinationsModel();
// const offersModel = new OffersModel();

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
      // tripPresenter.showTrip();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      // tripPresenter.hideTrip();
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(document.querySelector(`.page-main`), statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filterPresenter.init();
tripPresenter.init();

tripMain.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
  evt.target.setAttribute(`disabled`, `disabled`);
});

api.getPoints().
then((points) => {
  pointsModel.setTasks(UpdateType.INIT, points);
  render(tripMain.children[1].children[0], siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

})
.catch(() => {
  pointsModel.setTasks(UpdateType.INIT, []);
  render(tripMain.children[1].children[0], siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

});
