export const renderCostTemplate = (result) => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${result}</span>
</p>`;
};