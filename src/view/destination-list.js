const destinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`
];

export const renderDestinationList = () => {
  let result = ``;
  for (const element of destinations) {
    result += `<option value="${element}"></option>`;
  }
  return result;
};
