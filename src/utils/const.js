import {descriptions, generateRundomPhotos} from '../mock/waypoint';

export const COUNT = 5;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

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
  DEFAULT: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const MenuItem = {
  ADD_NEW_POINT: `ADD_NEW_POINT`,
  TABLE: `TABLE`,
  STATS: `STATS`
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
