import {renderContainerPhotosTemplate} from './photo-container';

export const createPhotos = (isEditeble, array) => {
  if (isEditeble) {
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
