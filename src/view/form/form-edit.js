import {renderTypeInputs} from './type-group';
import {renderOfferCheckboxes, generateOptions} from './available-offers';
import {renderDestinationList} from './destination-list';
import {renderSectionDestination} from './section-destination';
import {updateItem, generateDescription, generatePhotos} from '../../utils/common';
import Smart from '../smart';
import flatpickr from "flatpickr";
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

const createFormTemplate = (isEditeble, waypoint) => {
  const {type, to, price, options, description, photos, objectDay} = waypoint;
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${renderTypeInputs()}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${to}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${renderDestinationList()};
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${objectDay.startDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${objectDay.endDate}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">${price}</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${isEditeble ? `Cancel` : `Delete`}</button>
    ${isEditeble ? `` : `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`}
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${renderOfferCheckboxes(options)}
      </div>
    </section>

    ${renderSectionDestination(isEditeble, description, photos)}
  </section>
</form>
</li>`;
};

export default class FormEditView extends Smart {
  constructor(isEditeble, waypoint) {
    super();
    this._isEditeble = isEditeble;
    this._data = FormEditView.parseWaipointToData(waypoint);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRemoveClickHandler = this._formRemoveClickHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._typePointClickHandler = this._typePointClickHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    // this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    // this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormTemplate(this._isEditeble, this._data);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRemoveClickHandler(this._callback.formRemoveClick);
    this.setFormCloseClickHandler(this._callback.formCloseClick);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
        this.getElement().querySelector(`.card__date`),
        {
          dateFormat: `j F`,
          defaultDate: this._data.dueDate,
          onChange: this._dueDateChangeHandler // На событие flatpickr передаём наш колбэк
        }
    );
  }


  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`click`, this._typePointClickHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._destinationInputHandler);
    this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offerChangeHandler);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseDataToWaypoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formRemoveClickHandler(evt) {
    evt.preventDefault();
    this._callback.formRemoveClick();
  }

  setFormRemoveClickHandler(callback) {
    this._callback.formRemoveClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formRemoveClickHandler);
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.formCloseClick();
  }

  setFormCloseClickHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseClickHandler);
  }

  _typePointClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.dataset.typeInput;
    this.updateData({
      type,
      options: generateOptions(type).map((item, index) => {
        return Object.assign({id: index + 1}, item);
      })
    });
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    const to = evt.target.value;
    this.updateData({
      to,
    }, true);
    this.updateData({
      description: generateDescription(to),
      photos: generatePhotos(to),
    });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    let options = [];
    for (let option of this._data.options) {
      if (option.value === evt.target.dataset.valueOffer) {
        option.checked = false;
        options = updateItem(this._data.options, option);
        break;
      }
    }
    this.updateData({
      options: updateItem(this._data.options, options)
    });
  }

  static parseWaipointToData(waypoint) {
    return Object.assign({}, waypoint);
  }

  static parseDataToWaypoint(data) {
    return Object.assign({}, data);
  }
}
