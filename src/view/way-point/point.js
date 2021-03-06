import Abstract from '../abstract';
import dayjs from 'dayjs';
import {convertDurationPoint, calculateDiffDate} from '../../utils/point';

const renderListItemOffer = ({title, price}) => {
  return `<li class="event__offer">
<span class="event__offer-title">${title}</span>
&plus;&euro;&nbsp;
<span class="event__offer-price">${price}</span>
</li>`;
};

const generateOffers = (options) => {
  let result = ``;
  for (const element of options) {
    result += renderListItemOffer(element);
  }
  return result;
};

const createPointTemplate = (waypoint) => {
  const {type, price, startTime, endTime, options, description, isFavorite} = waypoint;
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(startTime, `YYYY-MM-DDTHH:mm`)}">${dayjs(startTime).format(`DD MMM`)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${description.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(startTime, `YYYY-MM-DDTHH:mm`)}">${dayjs(startTime).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(endTime, `YYYY-MM-DDTHH:mm`)}">${dayjs(endTime).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${convertDurationPoint(calculateDiffDate(startTime, endTime))}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${generateOffers(options)}
    </ul>
    <button class="event__favorite-btn event__favorite-btn${isFavorite ? `--active` : ``}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class PointView extends Abstract {
  constructor(waypoint) {
    super();
    this._waypoint = waypoint;

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._waypoint);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
