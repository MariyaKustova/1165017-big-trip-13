import {FilterType} from './const';
import dayjs from 'dayjs';

export const filter = {
  [FilterType.DEFAULT]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => dayjs(waypoint.startTime) >= dayjs()),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => dayjs(waypoint.startTime) < dayjs()),
};
