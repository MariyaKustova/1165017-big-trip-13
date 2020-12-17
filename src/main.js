import {render, RenderPosition} from './utils';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import ListView from './view/list';
import FormEditView from './view/form/form-creation';
import PointView from './view/way-point/point';
import NoPointsView from './view/no-points';
import {generateWaypoint} from './mock/waypoint';

const POINT_COUNT = 20;

export const waypoints = new Array(POINT_COUNT).fill().map(generateWaypoint);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

const renderHeader = (headerContainer) => {
  render(headerContainer, new TripInfoView(waypoints).getElement(), RenderPosition.AFTERBEGIN);

  render(headerContainer.children[1].children[0], new MenuView().getTemplate(), RenderPosition.AFTEREND);

  render(headerContainer.children[1], new FiltersView().getElement(), RenderPosition.BEFOREEND);
};

const renderPoint = (listComponent, waypoint) => {
  const pointView = new PointView(waypoint);
  let isEditeble = false;
  const formEditView = new FormEditView(isEditeble, waypoint);

  const replacePointToForm = () => {
    listComponent.getElement().replaceChild(formEditView.getElement(), pointView.getElement());
  };

  const replaceFormToPoint = () => {
    listComponent.getElement().replaceChild(pointView.getElement(), formEditView.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointView.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formEditView.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  formEditView.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    formEditView.getElement().remove();
  });

  formEditView.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(listComponent.getElement(), pointView.getElement(), RenderPosition.BEFOREEND);
};

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

const renderTravel = (travelContainer, travelPoints) => {
  if (travelPoints.length === 0) {
    render(travelContainer, new NoPointsView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(travelContainer.children[0], new SortingView().getTemplate(), RenderPosition.AFTEREND);
    const listComponent = new ListView();
    render(travelContainer, listComponent.getElement(), RenderPosition.BEFOREEND);

    for (const waypoint of travelPoints) {
      renderPoint(listComponent, waypoint);
    }
  }
};

renderHeader(tripMain);
renderTravel(tripEvents, waypoints);
