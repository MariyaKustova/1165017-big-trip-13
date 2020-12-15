import {renderTemplate, renderElement, RenderPosition} from './utils';
import {createTripInfoTemplate} from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import ListView from './view/list';
import ListItemView from './view/list-item';
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

renderElement(controls, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

renderElement(tripEvents.children[0], new SortingView().getTemplate(), RenderPosition.AFTEREND);

const listComponent = new ListView();
renderElement(tripEvents, listComponent.getElement(), RenderPosition.BEFOREEND);

const listItemComponent = new ListItemView();
renderElement(listComponent.getElement(), listItemComponent.getElement(), RenderPosition.AFTERBEGIN);

let isEditeble = false;
renderTemplate(listItemComponent.getElement(), createFormTemplate(isEditeble, waypoints[0]), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(listComponent.getElement(), createPointTemplate(waypoints[i]), `beforeend`);
}

