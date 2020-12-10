export const renderContainerPhotosTemplate = (photos) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photos.join(`\n`)}
  </div>
</div>`;
};
