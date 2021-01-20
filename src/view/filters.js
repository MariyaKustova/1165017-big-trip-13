import Abstract from './abstract';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${(currentFilterType === type) ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${name}" data-filter-type="${name}">${name}</label>
  </div>`;
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType))
  .join(``);

  return `<form class="trip-filters" action="#" method="get">

  ${filterItemsTemplate}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilterType);
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
