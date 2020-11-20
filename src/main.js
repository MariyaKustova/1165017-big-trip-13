import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(), `afterbegin`);

const menu = tripMain.querySelector(`.trip-controls`);

render(menu, createMenuTemplate(), `afterbegin`);
