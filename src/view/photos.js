export const renderPhotos = (isEditeble, array) => {
  if (isEditeble) {
    return ``;
  } else if (array) {
    let photosString = [];
    for (const photo of array) {
      photosString.push(`<img class="event__photo" src="${photo}" alt="Event photo">`);
    }
    return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photosString.join(`\n`)}
    </div>
  </div>`;
  }
  return ``;
};
