import FormEditView from '../view/form/form-edit';
import {generateId} from '../mock/waypoint';
import {remove, render} from '../utils/render';
import {UserAction, UpdateType, RenderPosition} from "../utils/const";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._isEditable = null;

    this._formEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRemoveClick = this._handleFormRemoveClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._formEditComponent !== null) {
      return;
    }

    this._isEditable = true;

    this._formEditComponent = new FormEditView(this._isEditable);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setFormRemoveClickHandler(this._handleFormRemoveClick);

    render(this._pointListContainer, this._formEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._formEditComponent === null) {
      return;
    }

    remove(this._formEditComponent);
    this._formEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, waypoint)
    );
    this.destroy();
  }

  _handleFormRemoveClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
      document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
    }
  }
}
