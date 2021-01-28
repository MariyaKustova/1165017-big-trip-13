import {FilterType} from './const';

export const filter = {
  [FilterType.DEFAULT]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => new Date(waypoint.startTime).getTime() >= new Date().getTime()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => new Date(waypoint.endTime).getTime() < new Date().getTime()),
};
