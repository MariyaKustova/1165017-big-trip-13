import FormEditView from '../view/form/form-edit';
import {remove, render} from '../utils/render';
import {UserAction, UpdateType, RenderPosition} from "../utils/const";

export default class PointNew {
  constructor(pointListContainer, changeData, destinationsModel, offersModel) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
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

    this._formEditComponent = new FormEditView(this._isEditable, this._destinationsModel, this._offersModel);
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

  setAborting() {
    const resetFormState = () => {
      this._formEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._formEditComponent.shake(resetFormState);
  }

  setSaving() {
    this._formEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  _handleFormSubmit(waypoint) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        waypoint
    );
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
