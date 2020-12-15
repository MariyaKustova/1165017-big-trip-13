import {renderTemplate, renderElement, RenderPosition} from './utils';
import {createTripInfoTemplate} from './view/trip-info';
import MenuView from './view/menu';
import {createFiltersTemplate} from './view/filters';
import {createSortingTemplate} from './view/sorting';
import {createListTemplate} from './view/list';
import {createListItemTemplate} from './view/list-item';
import {createFormTemplate} from './view/form/form-creation';
import {createPointTemplate} from './view/way-point/point';
import {generateWaypoint} from './mock/waypoint';

const TASK_COUNT = 20;

export const waypoints = new Array(TASK_COUNT).fill().map(generateWaypoint);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

renderTemplate(tripMain, createTripInfoTemplate(waypoints), `afterbegin`);

const controls = tripMain.querySelector(`.trip-controls`);

renderElement(controls.children[0], new MenuView().getTemplate(), RenderPosition.AFTEREND);

renderTemplate(controls, createFiltersTemplate(), `beforeend`);

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

renderTemplate(tripEvents.children[0], createSortingTemplate(), `afterend`);

renderTemplate(tripEvents, createListTemplate(), `beforeend`);

const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

renderTemplate(tripEventsList, createListItemTemplate(), `afterbegin`);

let isEditeble = false;
renderTemplate(tripEventsList.children[0], createFormTemplate(isEditeble, waypoints[0]), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(tripEventsList, createPointTemplate(waypoints[i]), `beforeend`);
}

