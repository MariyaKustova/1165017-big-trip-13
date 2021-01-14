import {getRandomInteger} from '../utils/common';
import {ConvertTime} from '../utils/const';

const COUNT = 5;

const options = [{
  value: `luggage`,
  title: `Add luggage`,
  price: 30,
  kind: 1
}, {
  value: `comfort`,
  title: `Switch to comfort class`,
  price: 100,
  kind: 2
}, {
  value: `meal`,
  title: `Add meal`,
  price: 15,
  kind: 3
}, {
  value: `seats`,
  title: `Choose seats`,
  price: 5,
  kind: 4
}, {
  value: `train`,
  title: `Travel by train`,
  price: 40,
  kind: 5
}
];

const typeWaypointOptionsMap = {
  'taxi': [1, 2],
  'bus': [2, 3, 4],
  'train': [3, 5],
  'ship': [2, 4, 5],
  'transport': [1, 2, 3, 5],
  'check-in': [1, 5],
  'sightseeing': [1, 3, 5],
  'restaurant': [2, 4, 5],
  'flight': [1, 3],
  'drive': [3, 4]
};

const generateOptions = (typeWaypoint) => {
  return options.filter((option) => {
    return typeWaypointOptionsMap[typeWaypoint.toLowerCase()].includes(option.kind);
  });
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

const generateEvent = (array) => {

  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

// Создает описание точки маршрута

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const sentence = text.split(`.`);
const descriptions = sentence.map((item) => `${item}.`);

function generateDescription() {
  let start = getRandomInteger(0, COUNT);
  let end = getRandomInteger(start, COUNT);
  if (start === end) {
    start = 0;
    end = COUNT;
  }
  const newDescriptions = descriptions.slice(start, end);
  if (newDescriptions.length > COUNT) {
    newDescriptions.length = COUNT;
  }
  return newDescriptions.join(` `);
}

// Создает фотографии

const generatePhotos = () => {
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
  return {
    id: generateId(),
    startTime: new Date(`2019-03-18T12:25`),
    endTime: new Date(`2019-03-20T12:55`),
    type,
    to: generateEvent(destinations),
    price: getRandomInteger(1, 1000),
    options: generateOptions(type).map((item, index) => {
      return Object.assign({id: index + 1}, item);
    }),
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: false,

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
        endMonth: this.endTime.toLocaleString(`en-US`, optionsMonth)
      };
    },

    get diffDate() {
      const diff = ((this.endTime.getTime() - this.startTime.getTime()));

      const convertsTime = (duration) => {
        let minutes = Math.floor((duration / ConvertTime.MIL_IN_MINUTE) % 60);
        let hours = Math.floor((duration / ConvertTime.MIL_IN_HOUR) % 24);
        let days = Math.floor(duration / ConvertTime.MIL_IN_DAY);

        days = (days < 10) ? `0` + days : days;
        hours = (hours < 10) ? `0` + hours : hours;
        minutes = (minutes < 10) ? `0` + minutes : minutes;

        if (days > 0) {
          return days + `D` + ` ` + hours + `H` + ` ` + minutes + `M`;
        } else if (hours > 0) {
          return hours + `H` + ` ` + minutes + `M`;
        }
        return minutes + `M`;
      };

      return convertsTime(diff);
    }
  };
};
