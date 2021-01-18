const renderOfferCheckbox = ({value, title, price, checked}) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value}-1" data-value-offer = ${value} type="checkbox" name="event-offer-${value}" ${(checked) ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${value}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

export const renderOfferCheckboxes = (typeWaypointOptions) => {
  if (typeWaypointOptions) {
    let result = ``;
    for (const checkbox of typeWaypointOptions) {
      result += renderOfferCheckbox(checkbox);
    }
    return result;
  }
  return ``;
};

export const typeWaypointOptionsMap = {
  'taxi': [1, 2],
  'bus': [2, 3, 4],
  'train': [3, 5],
  'ship': [2, 4, 5],
  'transport': [1, 2, 3, 5],
  'check-in': [1, 5],
  'sightseeing': [1, 3, 5],
  'restaurant': [2, 4, 5],
  'flight': [1, 3],
  'drive': [3, 4]
};

export const typeWaypointOptions = [{
  value: `luggage`,
  title: `Add luggage`,
  price: 30,
  checked: true,
  kind: 1,
}, {
  value: `comfort`,
  title: `Switch to comfort class`,
  price: 100,
  checked: true,
  kind: 2
}, {
  value: `meal`,
  title: `Add meal`,
  price: 15,
  checked: true,
  kind: 3
}, {
  value: `seats`,
  title: `Choose seats`,
  price: 5,
  checked: true,
  kind: 4
}, {
  value: `train`,
  title: `Travel by train`,
  price: 40,
  checked: true,
  kind: 5
}
];

export const generateOptions = (typeWaypoint) => {
  return typeWaypointOptions.filter((option) => {
    return typeWaypointOptionsMap[typeWaypoint.toLowerCase()].includes(option.kind);
  });
};
