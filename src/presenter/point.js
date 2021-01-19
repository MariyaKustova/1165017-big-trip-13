import {render, RenderPosition, replace, remove} from '../utils/render';
import FormEditView from '../view/form/form-edit';
import PointView from '../view/way-point/point';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Point {
  constructor(listComponent, changeData, changeMode) {
    this._listComponent = listComponent;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._isEditeble = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleClick = this._handleClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRemoveClick = this._handleFormRemoveClick.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
  }

  init(waypoint) {
    this._waypoint = waypoint;

    const prevPointComponent = this._pointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._pointComponent = new PointView(this._waypoint);
    this._isEditeble = false;
    this._formEditComponent = new FormEditView(this._isEditeble, this._waypoint);

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

  _replacePointToForm() {
    replace(this._formEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._formEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
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

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._waypoint,
            {
              isFavorite: !this._waypoint.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(waypoint) {
    this._changeData(waypoint);
    this._replaceFormToPoint();
  }

  _handleFormRemoveClick() {
    remove(this._formEditComponent);
  }

  _handleFormCloseClick() {
    this._replaceFormToPoint();
  }
}
