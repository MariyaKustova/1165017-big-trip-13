import {render, RenderPosition, replace, remove} from '../utils/render';
import NoPointsView from '../view/no-points';
import SortingView from '../view/sorting';
import ListView from '../view/list';
import FormEditView from '../view/form/form-edit';
import PointView from '../view/way-point/point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._noPointsView = new NoPointsView();
    this._sortingView = new SortingView();
    this._listComponent = new ListView();
  }

  init(waypoints) {
    this._waypoints = waypoints;
    this._renderTrip();
  }

  _renderNoPoints() {
    render(this._tripContainer, new NoPointsView(), RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer.children[0], new SortingView(), RenderPosition.AFTEREND);
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(waypoint) {
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

    render(this._listComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    for (const waypoint of this._waypoints) {
      this._renderPoint(waypoint);
    }
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoPoints();
    }

    this._renderSorting();
    this._renderList();
    this._renderPoints();
  }
}
