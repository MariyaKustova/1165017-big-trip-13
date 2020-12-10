import {createTripInfoTemplate} from './view/trip-info';
import {createMenuTemplate} from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortingTemplate} from './view/sorting';
import {createListTemplate} from './view/list';
import {createListItemTemplate} from './view/list-item';
import {createFormTemplate} from './view/form/form-creation';
import {createPointTemplate} from './view/way-point/point';
import {generateWaypoint} from './mock/waypoint';

const TASK_COUNT = 20;

export const waypoints = new Array(TASK_COUNT).fill().map(generateWaypoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(waypoints), `afterbegin`);

const controls = tripMain.querySelector(`.trip-controls`);

render(controls.children[0], createMenuTemplate(), `afterend`);

render(controls, createFiltersTemplate(), `beforeend`);

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

render(tripEvents.children[0], createSortingTemplate(), `afterend`);

render(tripEvents, createListTemplate(), `beforeend`);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

render(tripEventsList, createListItemTemplate(), `afterbegin`);

let isEditeble = false;
render(tripEventsList.children[0], createFormTemplate(isEditeble, waypoints[0]), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEventsList, createPointTemplate(waypoints[i]), `beforeend`);
}

