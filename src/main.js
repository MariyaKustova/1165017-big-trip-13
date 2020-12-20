import {render, RenderPosition, replace, remove} from './utils/render';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortingView from './view/sorting';
import ListView from './view/list';
import FormEditView from './view/form/form-edit';
import PointView from './view/way-point/point';
import NoPointsView from './view/no-points';
import {generateWaypoint} from './mock/waypoint';

const POINT_COUNT = 20;

export const waypoints = new Array(POINT_COUNT).fill().map(generateWaypoint);

const siteBodyElement = document.querySelector(`.page-body`);
const tripMain = siteBodyElement.querySelector(`.trip-main`);

const renderHeader = (headerContainer) => {
  render(headerContainer, new TripInfoView(waypoints), RenderPosition.AFTERBEGIN);

  render(headerContainer.children[1].children[0], new MenuView(), RenderPosition.AFTEREND);

  render(headerContainer.children[1], new FiltersView(), RenderPosition.BEFOREEND);
};

const renderPoint = (listComponent, waypoint) => {
  const pointComponent = new PointView(waypoint);
  let isEditeble = false;
  const formEditComponent = new FormEditView(isEditeble, waypoint);

  const replacePointToForm = () => {
    replace(formEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, formEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  formEditComponent.setRemoveClickHandler(() => {
    remove(formEditComponent);
  });

  formEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(listComponent, pointComponent, RenderPosition.BEFOREEND);
};

const tripEvents = siteBodyElement.querySelector(`.trip-events`);

const renderTravel = (travelContainer, travelPoints) => {
  if (travelPoints.length === 0) {
    render(travelContainer, new NoPointsView(), RenderPosition.BEFOREEND);
  } else {
    render(travelContainer.children[0], new SortingView(), RenderPosition.AFTEREND);
    const listComponent = new ListView();
    render(travelContainer, listComponent, RenderPosition.BEFOREEND);

    for (const waypoint of travelPoints) {
      renderPoint(listComponent, waypoint);
    }
  }
};

renderHeader(tripMain);
renderTravel(tripEvents, waypoints);
