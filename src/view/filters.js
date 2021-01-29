import Abstract from './abstract';

const createFilterItemTemplate = (filter, currentFilterType, isDisabled) => {
  const {type, name, countPoints} = filter;

  const isChecked = (currentFilterType === type) ? `checked` : ``;
  const disabledForm = (isDisabled || countPoints === 0) ? `disabled` : ``;

  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked} ${disabledForm}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
};

export const createFilterTemplate = (filterItems, currentFilterType, isDisabled) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisabled))
  .join(``);

  return `<form class="trip-filters" action="#" method="get">

  ${filterItemsTemplate}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class Filters extends Abstract {
  constructor(filters, currentFilterType, isDisabled) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._isDisabled = isDisabled;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilterType, this._isDisabled);
  }

  get currentModeFilter() {
    return this._currentFilterType;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
