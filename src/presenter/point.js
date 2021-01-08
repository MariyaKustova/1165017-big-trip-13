import {render, RenderPosition, replace, remove} from '../utils/render';
import FormEditView from '../view/form/form-edit';
import PointView from '../view/way-point/point';

export default class Point {
  constructor(listComponent) {
    this._listComponent = listComponent;

    this._pointComponent = null;
    this._isEditeble = null;
    this._formEditComponent = null;

    this._handleClick = this._handleClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleRemoveClick = this._handleRemoveClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevPointComponent = this._pointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._pointComponent = new PointView(this._waypoint);
    this._isEditeble = false;
    this._formEditComponent = new FormEditView(this._isEditeble, this._waypoint);

    this._pointComponent.setClickHandler(this._handleClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setEditClickHandler(this._handleEditClick);
    this._formEditComponent.setRemoveClickHandler(this._handleRemoveClick);

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this._listComponent, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._listComponent.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._listComponent.getElement().contains(prevFormEditComponent.getElement())) {
      replace(this._formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._formEditComponent);
  }

  _replacePointToForm() {
    replace(this._formEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._formEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }

  _handleRemoveClick() {
    remove(this._formEditComponent);
  }

  _handleEditClick() {
    this._replaceFormToPoint();
  }
}
