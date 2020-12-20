import Abstract from './abstract';

const typesFilters = [
  {
    value: `everything`,
    text: `Everything`
  },
  {
    value: `future`,
    text: `Future`
  },
  {
    value: `past`,
    text: `Past`
  }
];

const generateFilters = () => {
  let result = ``;
  for (const element of typesFilters) {
    const {value, text} = element;
    result += `<div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}">
    <label class="trip-filters__filter-label" for="filter-${value}">${text}</label>
  </div>`;
  }
  return result;
};

const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
  ${generateFilters()}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default class FiltersView extends Abstract {
  getTemplate() {
    return createFiltersTemplate();
  }
}
