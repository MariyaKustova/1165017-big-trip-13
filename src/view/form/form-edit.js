import {renderTypeInputs} from './type-group';
import {renderOfferCheckboxes} from './avialable-offers';
import {renderDestinationList} from './destination-list';
import {renderSectionDestination} from './section-destination';
import Abstract from '../abstract';

const createFormTemplate = (isEditeble, waypoint) => {
  const {type, to, price, startTime, endTime, options, description, photos} = waypoint;
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
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
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

export default class FormEditView extends Abstract {
  constructor(isEditeble, waypoint) {
    super();
    this._isEditeble = isEditeble;
    this._waypoint = waypoint;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._isEditeble, this._waypoint);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setRemoveClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._clickHandler);
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
}
