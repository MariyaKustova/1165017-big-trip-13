import Abstract from './abstract';
import {FilterType} from '../utils/const';

const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.DEFAULT.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${FilterType.DEFAULT}" value="${FilterType.DEFAULT.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.DEFAULT.toLowerCase}">${FilterType.DEFAULT}</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.FUTURE.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${FilterType.FUTURE}" value="${FilterType.FUTURE.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.FUTURE.toLowerCase}">${FilterType.FUTURE}</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-${FilterType.PAST.toLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-filter-type="${FilterType.PAST}" value="${FilterType.PAST.toLowerCase}">
    <label class="trip-filters__filter-label" for="filter-${FilterType.PAST.toLowerCase}">${FilterType.PAST}</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends Abstract {
  constructor() {
    super();

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate();
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setfilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}

// _filterPoint(filterType) {
//   switch (filterType) {
//     case FilterType.FUTURE:
//       this._waypoints.filter(filterPointFutureDate);
//       break;
//     case FilterType.PAST:
//       this._waypoints.filter(filterPointPastDate);
//       break;
//     default:
//       this._waypoints = this._sourceWaypoints.slice();
//   }
//   this._currentFilterType = filterType;
// }

// _handleFilterTypeChange(filterType) {
//   if (this._currentFilterType === filterType) {
//     return;
//   }

//   this._filterPoint(filterType);
//   this._clearTrip();
//   this._renderTrip();
// }

