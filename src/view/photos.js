const photos = [
  {
    url: `img/photos/1.jpg`
  },
  {
    url: `img/photos/2.jpg`
  },
  {
    url: `img/photos/3.jpg`
  },
  {
    url: `img/photos/4.jpg`
  },
  {
    url: `img/photos/5.jpg`
  },
];

export const renderPhotos = (isEditeble) => {
  if (isEditeble) {
    return ``;
  }
  let photosString = [];
  for (const photo of photos) {
    photosString.push(`<img class="event__photo" src="${photo.url}" alt="Event photo">`);
  }
  return `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photosString.join(`\n`)}
    </div>
  </div>`;
};
