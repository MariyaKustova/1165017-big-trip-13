const typesSort = [
  {
    value: `day`,
    text: `Day`
  },
  {
    value: `event`,
    text: `Event`
  },
  {
    value: `time`,
    text: `Time`
  },
  {
    value: `price`,
    text: `Price`
  },
  {
    value: `offer`,
    text: `Offer`
  }
];

export const generateSorting = () => {
  let result = ``;
  for (const element of typesSort) {
    result += `<div class="trip-sort__item  trip-sort__item--${element.value}">
    <input id="sort-${element.value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" element.value="sort-${element.value}">
    <label class="trip-sort__btn" for="sort-${element.value}">${element.text}</label>
  </div>`;
  }
  return result;
};
