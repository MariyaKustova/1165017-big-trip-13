import {getRandomInteger, generateDescription} from '../utils/common';
import {ConvertTime} from '../utils/const';
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

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// Описывает точку маршрута

export const generateWaypoint = () => {
  const type = generateEvent(typeWaypoints);
  const to = generateEvent(destinations);
  return {
    id: generateId(),
    startTime: new Date(`2019-03-18T12:25`),
    endTime: new Date(`2019-03-20T12:55`),
    type,
    to,
    price: getRandomInteger(1, 1000),
    description: generateDescription(to),
    photos: generateRundomPhotos(),
    isFavorite: false,
    options: generateOptions(type).map((item, index) => {
      return Object.assign({id: index + 1}, item);
    }),

    get start() {
      return this.startTime.getHours() + `:` + this.startTime.getMinutes();
    },

    get end() {
      return this.endTime.getHours() + `:` + this.endTime.getMinutes();
    },

    get day() {
      const optionsDate = {month: `short`, day: `numeric`};
      return this.startTime.toLocaleString(`en-US`, optionsDate);
    },

    get objectDay() {
      const optionsMonth = {month: `short`};
      const optionsDay = {day: `numeric`};
      return {
        startDay: this.startTime.toLocaleString(`en-US`, optionsDay),
        startMonth: this.startTime.toLocaleString(`en-US`, optionsMonth),
        endDay: this.endTime.toLocaleString(`en-US`, optionsDay),
        endMonth: this.endTime.toLocaleString(`en-US`, optionsMonth),
        startDate: this.startTime.getDay() + `/` + (this.startTime.getMonth() + 1) + `/` + this.startTime.getFullYear() + ` ` + this.start,
        endDate: this.endTime.getDay() + `/` + (this.endTime.getMonth() + 1) + `/` + this.endTime.getFullYear() + ` ` + this.end,
      };
    },

    get diffDate() {
      return ((this.endTime.getTime() - this.startTime.getTime()));
    },

    get durationPoint() {
      let minutes = Math.floor((this.diffDate / ConvertTime.MIL_IN_MINUTE) % 60);
      let hours = Math.floor((this.diffDate / ConvertTime.MIL_IN_HOUR) % 24);
      let days = Math.floor(this.diffDate / ConvertTime.MIL_IN_DAY);

      days = (days < ConvertTime.BORDERLINE_VALUE) ? `0` + days : days;
      hours = (hours < ConvertTime.BORDERLINE_VALUE) ? `0` + hours : hours;
      minutes = (minutes < ConvertTime.BORDERLINE_VALUE) ? `0` + minutes : minutes;

      if (days > 0) {
        return days + `D` + ` ` + hours + `H` + ` ` + minutes + `M`;
      } else if (hours > 0) {
        return hours + `H` + ` ` + minutes + `M`;
      }
      return minutes + `M`;
    }
  };
};
