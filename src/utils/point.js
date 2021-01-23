import {ConvertTime} from './const';
import dayjs from 'dayjs';

export const calculateDiffDate = (startTime, endTime) => dayjs(endTime).diff(dayjs(startTime));

export const convertDurationPoint = (date) => {
  let minutes = Math.floor((date / ConvertTime.MIL_IN_MINUTE) % 60);
  let hours = Math.floor((date / ConvertTime.MIL_IN_HOUR) % 24);
  let days = Math.floor(date / ConvertTime.MIL_IN_DAY);
  days = (days < ConvertTime.BORDERLINE_VALUE) ? `0` + days : days;
  hours = (hours < ConvertTime.BORDERLINE_VALUE) ? `0` + hours : hours;
  minutes = (minutes < ConvertTime.BORDERLINE_VALUE) ? `0` + minutes : minutes;

  if (days > 0) {
    return days + `D` + ` ` + hours + `H` + ` ` + minutes + `M`;
  } else if (hours > 0) {
    return hours + `H` + ` ` + minutes + `M`;
  }
  return minutes + `M`;
};
