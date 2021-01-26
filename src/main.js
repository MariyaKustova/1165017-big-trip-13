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
import {isOnline} from './utils/common.js';
import {toast} from './utils/toast/toast.js';

import Api from './api/api';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = `Basic jhf984vnp983wv094`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripEvents = siteBodyElement.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const siteMenuComponent = new MenuView();

const filterPresenter = new FilterPresenter(tripControls, filterModel, pointsModel);
const tripPresenter = new TripPresenter(tripEvents, pointsModel, destinationsModel, offersModel, filterModel, apiWithProvider);

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
      if (!isOnline()) {
        toast(`You can't create new point offline`);
        siteMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      }
      filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      tripPresenter.createPoint();
      break;
    case MenuItem.TABLE:
      remove(statisticsComponent);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
      tripPresenter.showTrip();
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.hideTrip();
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

Promise.all([apiWithProvider.getPoints(), apiWithProvider.getDestinations(), apiWithProvider.getOffers()])
.then(([points, destinations, offers]) => {
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointsModel.setPoints(UpdateType.INIT, points);
  render(tripMain, new TripInfoView(pointsModel.getPoints()), RenderPosition.AFTERBEGIN);
  render(tripMain.children[1].children[0], siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
})
.catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(tripMain.children[1].children[0], siteMenuComponent, RenderPosition.AFTEREND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
