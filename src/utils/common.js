import {typeWaypointOptionsMap, typeWaypointOptions, destinationsMap, photosMap} from '../utils/const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const sortPointUpDay = (pointA, pointB) => {
  return pointA.startTime.getTime() - pointB.startTime.getTime();
};

export const sortPointDownDuration = (pointA, pointB) => {
  return pointB.diffDate - pointA.diffDate;
};

export const sortPointDownPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};

export const filterPointFutureDate = (pointA) => {
  const now = new Date();
  return pointA.startTime.getTime() >= now.getTime();
};

export const filterPointPastDate = (pointA) => {
  const now = new Date();
  return pointA.startTime.getTime() < now.getTime();
};

export const generateOptions = (typeWaypoint) => {
  return typeWaypointOptions.filter((option) => {
    return typeWaypointOptionsMap[typeWaypoint.toLowerCase()].includes(option.kind);
  });
};

export const generateDescription = (to) => {
  return destinationsMap.get(to);
};

export const generatePhotos = (to) => {
  return photosMap.get(to);
};
