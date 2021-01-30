const renderDescription = ({description}) => {
  if (description) {
    return `<p class="event__destination-description">${description}</p>`;
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

const renderPhotos = (pictures) => {
  if (pictures) {
    const photos = [];
    for (const photo of pictures) {
      photos.push(`<img class="event__photo" src="${photo.src}" alt="${photo.description}">`);
    }
    return renderContainerPhotosTemplate(photos);
  }
  return ``;
};

export const renderSectionDestination = (description) => {
  if (description) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDescription(description)}

    ${renderPhotos(description.pictures)}
  </section>`;
  }
  return ``;
};
