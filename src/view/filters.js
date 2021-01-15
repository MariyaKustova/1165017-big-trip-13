import Abstract from './abstract';
import {FilterType} from '../utils/const';
// import {filterPointFutureDate, filterPointPastDate} from '../utils/common';

const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.DEFAULT.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.DEFAULT.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.DEFAULT.toLowerCase}" data-filter-type="${FilterType.DEFAULT}">${FilterType.DEFAULT}</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.FUTURE.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.FUTURE.toLowerCase}" data-filter-type="${FilterType.FUTURE}">${FilterType.FUTURE}</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.PAST.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.PAST.toLowerCase}"  data-filter-type="${FilterType.PAST}">${FilterType.PAST}</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends Abstract {
  constructor() {
    super();
    this._currentFilterType = FilterType.DEFAULT;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate();
  }

  get currentModeFilter() {
    return this._currentFilterType;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
