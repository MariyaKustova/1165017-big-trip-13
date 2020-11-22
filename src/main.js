import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortingTemplate} from './view/sorting';
import {createListTemplate} from './view/list';
import {createListItemTemplate} from './view/list-item';
import {createFormTemlate} from './view/form-creation';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(), `afterbegin`);

const controls = tripMain.querySelector(`.trip-controls`);

render(controls.children[0], createMenuTemplate(), `afterend`);

render(controls, createFiltersTemplate(), `beforeend`);

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

render(tripEvents.children[0], createSortingTemplate(), `afterend`);

render(tripEvents, createListTemplate(), `beforeend`);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

render(tripEventsList, createListItemTemplate(), `afterbegin`);

render(tripEventsList.children[0], createFormTemlate(), `afterbegin`);
