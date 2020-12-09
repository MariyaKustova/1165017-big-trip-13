import {renderPhotos} from './photos';
import {renderDescription} from './description';

export const renderSectionDestination = (isEditeble, arr1, arr2) => {
  if (arr1 || arr2) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${renderDescription(arr1)}

    ${renderPhotos(isEditeble, arr2)}
  </section>`;
  }
  return ``;
};
