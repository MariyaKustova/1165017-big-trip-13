const renderDescription = (element) => {
  if (element) {
    return `<p class="event__destination-description">${element}</p>`;
  }
  return ``;
};

const renderContainerPhotosTemplate = (photos) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photos.join(`\n`)}
  </div>
</div>`;
};

const createPhotos = (isEditable, array) => {
  if (isEditable) {
    return ``;
  } else if (array) {
    let photos = [];
    for (const photo of array) {
      photos.push(`<img class="event__photo" src="${photo}" alt="Event photo">`);
    }
    return renderContainerPhotosTemplate(photos);
  }
  return ``;
};

export const renderSectionDestination = (isEditable, description, photos) => {
  if (description || photos) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDescription(description)}

    ${createPhotos(isEditable, photos)}
  </section>`;
  }
  return ``;
};
