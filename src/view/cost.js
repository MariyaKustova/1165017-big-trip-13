export const createTripCostTemplate = (array) => {
  let result = 0;
  for (const element of array) {
    result += element.price;
  }
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${result}</span>
</p>`;
};
