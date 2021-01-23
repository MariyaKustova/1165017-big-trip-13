import {getRandomInteger, generateDescription} from '../utils/common';
import {calculateDiffDate} from '../utils/point';
import {generateOptions} from '../view/form/available-offers';

const COUNT = 5;

const generateEvent = (typeWaypoints) => {

  const randomIndex = getRandomInteger(0, typeWaypoints.length - 1);

  return typeWaypoints[randomIndex];
};

const typeWaypoints = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Flight`,
  `Drive`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const destinations = [
  `Amsterdam`,
  `Chamonix`,
  `New York`,
  `Canada`,
  `Argentina`
];

// Создает описание точки маршрута

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const sentence = text.split(`.`);
export const descriptions = sentence.map((item) => `${item}.`);

// Создает фотографии

export const generateRundomPhotos = () => {
  const photos = [];
  for (let i = 0; i < getRandomInteger(0, COUNT); i++) {
    photos.push(`http://picsum.photos/248/152?r=${i}`);
  }
  return photos;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// Описывает точку маршрута

export const generateWaypoint = () => {
  const startTime = `2019-03-18T12:25`;
  const endTime = `2019-03-20T12:55`;
  const duration = calculateDiffDate(startTime, endTime);
  const type = generateEvent(typeWaypoints);
  const to = generateEvent(destinations);
  return {
    id: generateId(),
    startTime,
    endTime,
    duration,
    type,
    to,
    price: getRandomInteger(1, 1000),
    description: generateDescription(to),
    photos: generateRundomPhotos(),
    isFavorite: false,
    options: generateOptions(type).map((item, index) => {
      return Object.assign({id: index + 1}, item);
    }),
  };
};
