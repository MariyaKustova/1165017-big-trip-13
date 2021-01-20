import {FilterType} from './const';

export const filter = {
  [FilterType.DEFAULT]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => waypoint.startTime.getTime() >= new Date().getTime()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => waypoint.startTime.getTime() < new Date().getTime()),
};
