import dayjs from 'dayjs';
import {calculateDiffDate} from './point';

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

export const isOnline = () => {
  return window.navigator.onLine;
};

export const sortPointsUpDay = (pointA, pointB) => {
  const itemA = pointA.startTime;
  const itemB = pointB.startTime;
  return dayjs(itemA) - dayjs(itemB);
};

export const sortPointsDownDuration = (pointA, pointB) => {
  const durationPointA = calculateDiffDate(pointA.startTime, pointA.endTime);
  const durationPointB = calculateDiffDate(pointB.startTime, pointB.endTime);
  return durationPointB - durationPointA;
};

export const sortPointsDownPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dayjs(dateA) === dayjs(dateB)) ? true : false;
};
