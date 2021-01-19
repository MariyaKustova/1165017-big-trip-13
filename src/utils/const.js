import {descriptions, generateRundomPhotos} from '../mock/waypoint';

export const COUNT = 5;

export const SortType = {
  SORT_DEFAULT: `sort-day`,
  SORT_TIME: `sort-time`,
  SORT_PRICE: `sort-price`,
};

export const ConvertTime = {
  BORDERLINE_VALUE: 10,
  MIL_IN_MINUTE: 60000,
  MIL_IN_HOUR: 60000 * 60,
  MIL_IN_DAY: 60000 * 60 * 24,
};

export const FilterType = {
  DEFAULT: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

export const FilterTypeMap = {
  DEFAULT: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

export const destinationsMap = new Map([
  [`Amsterdam`, descriptions[1]],
  [`Chamonix`, descriptions[4] + descriptions[7]],
  [`New York`, descriptions[2] + descriptions[3] + descriptions[5] + descriptions[5]],
  [`Canada`, descriptions[1] + descriptions[3] + descriptions[4]],
  [`Argentina`, descriptions[5] + descriptions[3] + descriptions[8]],
  [`Geneva`, descriptions[6] + descriptions[2] + descriptions[1]],
]);

export const photosMap = new Map([
  [`Amsterdam`, generateRundomPhotos()],
  [`Chamonix`, generateRundomPhotos()],
  [`New York`, generateRundomPhotos()],
  [`Canada`, generateRundomPhotos()],
  [`Argentina`, generateRundomPhotos()],
  [`Geneva`, generateRundomPhotos()],
]);
