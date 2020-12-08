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

export const generateFilters = () => {
  let result = ``;
  for (const element of typesFilters) {
    result += `<div class="trip-filters__filter">
    <input id="filter-${element.value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.value}">
    <label class="trip-filters__filter-label" for="filter-${element.value}">${element.text}</label>
  </div>`;
  }
  return result;
};
