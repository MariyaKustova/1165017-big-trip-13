import FormEditView from '../view/form/form-edit';
import PointView from '../view/way-point/point';

import {render, replace, remove} from '../utils/render';
import {UserAction, UpdateType, RenderPosition} from '../utils/const';
import {isDatesEqual, isOnline} from '../utils/common';
import {toast} from '../utils/toast/toast.js';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Point {
  constructor(listComponent, changeData, changeMode, destinationsModel, offersModel) {
    this._listComponent = listComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._pointComponent = null;
    this._isEditable = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleClick = this._handleClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRemoveClick = this._handleFormRemoveClick.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevPointComponent = this._pointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._pointComponent = new PointView(this._waypoint);
    this._isEditable = false;
    this._formEditComponent = new FormEditView(this._isEditable, this._waypoint, this._destinationsModel, this._offersModel);

    this._pointComponent.setClickHandler(this._handleClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setFormCloseClickHandler(this._handleFormCloseClick);
    this._formEditComponent.setFormRemoveClickHandler(this._handleFormRemoveClick);

    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this._listComponent, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._formEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._formEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._formEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._formEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._formEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._formEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._formEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._formEditComponent.reset(this._pointComponent);
      this._replaceFormToPoint();
    }
  }

  _handleClick() {
    if (!isOnline()) {
      toast(`You can't edit point offline`);
      return;
    }
    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._waypoint,
            {
              isFavorite: !this._waypoint.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(update) {
    if (!isOnline()) {
      toast(`You can't save point offline`);
      return;
    }
    const isMinorUpdate = isDatesEqual(this._waypoint.startTime, update.startTime);
    this._changeData(
        UserAction.UPDATE_POINT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
    this._replaceFormToPoint();
  }

  _handleFormRemoveClick(waypoint) {
    if (!isOnline()) {
      toast(`You can't delete point offline`);
      return;
    }

    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        waypoint
    );
    this._replaceFormToPoint();
  }

  _handleFormCloseClick() {
    this._replaceFormToPoint();
  }
}
