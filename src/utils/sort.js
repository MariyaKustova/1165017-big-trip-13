import dayjs from 'dayjs';
import {calculateDiffDate} from './point';

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
