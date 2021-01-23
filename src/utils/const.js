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
  STATS: `STATS`,
  INIT: `INIT`
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
