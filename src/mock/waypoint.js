const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const events = [
  `Taxi Amsterdam`,
  `Flight Chamonix`,
  `Drive Chamonix`,
  `Check-in Chamonix`,
  `Sightseeing Chamonix`
];

const offers = [
  `Add luggage + &#8364; 30`,
  `Switch to comfort class + &#8364; 100`,
  `Add meal + &#8364; 15`,
  `Choose seats + &#8364; 5`,
  `Travel by train + &#8364; 40`
];

const generateEvent = (array) => {

  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const generateWaypoint = () => {
  return {
    day: null,
    event: generateEvent(events),
    time: {
      arrivalDate: null,
      departureDate: null
    },
    price: null,
    offers: generateEvent(offers),
    isFavorite: false
  };
};
