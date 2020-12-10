import {createPhotos} from './photos';
import {renderDescription} from './description';

export const renderSectionDestination = (isEditeble, description, photos) => {
  if (description || photos) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDescription(description)}

    ${createPhotos(isEditeble, photos)}
  </section>`;
  }
  return ``;
};
