import {renderTypeInputs} from './type-group';
import {renderSectionDestination} from './section-destination';
import Smart from '../smart';
import dayjs from 'dayjs';
import flatpickr from "flatpickr";
import he from "he";
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: `restaurant`,
  price: ``,
  startTime: dayjs().toString(),
  endTime: dayjs().toString(),
  description: {
    description: `Chamonix, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `Chamonix`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.0762563005163317`,
        description: `Chamonix parliament building`
      }
    ]
  },
  options: [
    {
      title: `Choose live music`,
      price: 150
    }, {
      title: `Choose VIP area`,
      price: 70
    }
  ]
};


const renderOfferCheckboxes = (type, options) => {
  if (options.length > 0) {
    const offers = options.map(({title, price}, index) => {
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${index}" data-type-offer = ${type} type="checkbox" name="event-offer-${type}" checked>
      <label class="event__offer-label" for="event-offer-${type}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
    }).join(``);
    return offers;
  }
  return ``;
};

const renderDestinationList = (destinations) => {
  let result = ``;
  for (const element of destinations) {
    result += `<option value="${element.name}"></option>`;
  }
  return result;
};

const renderOfferSection = (type, options) => {
  if (options.length > 0) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${renderOfferCheckboxes(type, options)}
    </div>
  </section>`;
  }
  return ``;
};

const defineNameButton = (isEditable, isDeleting) => {
  if (isEditable) {
    return `Cancel`;
  } else if
  (isDeleting) {
    return `Deleting...`;
  }
  return `Delete`;
};

const createFormTemplate = (isEditable, data, destinations, offers) => {
  const {type, price, options, description, startTime, endTime, isDisabled, isSaving, isDeleting} = data;
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${renderTypeInputs(offers)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(description.name)}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
      <datalist id="destination-list-1">
        ${renderDestinationList(destinations)};
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(startTime).format(`DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(endTime).format(`DD/MM/YY HH:mm`)}" ${isDisabled ? `disabled` : ``}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">${price}</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? `Saving...` : `Save`}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${defineNameButton(isEditable, isDeleting)}</button>
    ${isEditable ? `` : `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`}
  </header>
  <section class="event__details">
    ${renderOfferSection(type, options)}

    ${renderSectionDestination(description)}
  </section>
</form>
</li>`;
};

export default class FormEditView extends Smart {
  constructor(isEditable, waypoint = BLANK_POINT, destinationsModel, offersModel) {
    super();
    this._isEditable = isEditable;
    this._data = FormEditView.parseWaypointToData(waypoint);
    this._destinations = destinationsModel.getDestinations();
    this._offers = offersModel.getOffers();
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._backupData = Object.assign({}, this._data);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRemoveClickHandler = this._formRemoveClickHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._typePointClickHandler = this._typePointClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(waypoint) {
    this.updateData(
        FormEditView.parseWaypointToData(waypoint)
    );
  }

  getTemplate() {
    return createFormTemplate(this._isEditable, this._data, this._destinations, this._offers);
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
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRemoveClickHandler(this._callback.formRemoveClick);
    this.setFormCloseClickHandler(this._callback.formCloseClick);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        Object.assign(
            {},
            {
              dateFormat: `d/m/y H:i`,
              defaultDate: this._data.startTime,
              minDate: new Date(),
              onChange: this._startDateChangeHandler
            },
            {
              enableTime: true,
              [`time_24hr`]: true,
            }
        )
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        Object.assign(
            {},
            {
              dateFormat: `d/m/y H:i`,
              defaultDate: this._data.endTime,
              minDate: this._data.startTime,
              onChange: this._endDateChangeHandler
            },
            {
              enableTime: true,
              [`time_24hr`]: true,
            }
        )
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`click`, this._typePointClickHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`keydown`, this._priceKeydownHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`input`, this._priceChangeHandler);
    if (this._data.options.length > 0) {
      this.getElement().querySelector(`.event__available-offers`).addEventListener(`change`, this._offerChangeHandler);
    }
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._backupData = Object.assign({}, this._data);
    this._callback.formSubmit(FormEditView.parseDataToWaypoint(this._data));
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formRemoveClickHandler(evt) {
    evt.preventDefault();
    this._callback.formRemoveClick(FormEditView.parseDataToWaypoint(this._data));
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
  }

  setFormRemoveClickHandler(callback) {
    this._callback.formRemoveClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formRemoveClickHandler);
  }

  _formCloseClickHandler(evt) {
    evt.preventDefault();
    this.updateData(
        this._backupData
    );
    this._callback.formCloseClick();
  }

  setFormCloseClickHandler(callback) {
    this._callback.formCloseClick = callback;
    const rollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
    if (rollupBtn) {
      rollupBtn.addEventListener(`click`, this._formCloseClickHandler);
    }
  }

  _typePointClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.dataset.typeInput;
    const suitableOffer = this._offers.find((offer) => type === offer.type);
    const options = suitableOffer.offers;
    this.updateData({
      type,
      options
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const name = evt.target.value;
    const suitableDestination = this._destinations.find((destination) => name === destination.name);

    if (!suitableDestination) {
      evt.target.style.outline = `2px solid red`;
      evt.target.setCustomValidity(`Choose actual destination`);
      evt.target.reportValidity();

      return;
    }

    this.updateData({
      description: {
        name,
        description: suitableDestination.description,
        pictures: suitableDestination.pictures
      }
    });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    const offerCheckboxes = this.getElement().querySelectorAll(`input.event__offer-checkbox`);
    let options = [];
    const offer = this._offers.find((item) => this._data.type === item.type);
    const offersOfType = offer.offers;
    offersOfType.forEach((item, index) => {
      if (offerCheckboxes[index].checked) {
        options.push(item);
      }
    });

    this.updateData({
      options
    }, true);
  }

  _priceKeydownHandler(evt) {
    if (evt.keyCode === 46
      || evt.keyCode === 27
      || evt.keyCode === 13
      || evt.keyCode === 9
      || evt.keyCode === 8) {
      return;
    } else {
      if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
        evt.preventDefault();
      }
    }
  }

  _priceChangeHandler(evt) {
    this.updateData({
      price: evt.target.value
    });
  }

  _startDateChangeHandler([userStartDate]) {
    this.updateData({
      startTime: userStartDate
    }, true);
    this._setEndDatepicker();
  }

  _endDateChangeHandler(userEndDate) {
    this.updateData({
      endTime: userEndDate
    }, true);
  }

  static parseWaypointToData(waypoint) {
    return Object.assign({}, waypoint);
  }

  static parseDataToWaypoint(data) {
    return Object.assign({}, data);
  }
}
