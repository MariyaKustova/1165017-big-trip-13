import {ConvertTime} from './const';

export const convertStartTime = (date) => date.getHours() + `:` + date.getMinutes();

export const convertEndTime = (date) => date.getHours() + `:` + date.getMinutes();

export const convertDay = (date) => {
  const optionsDate = {month: `short`, day: `numeric`};
  return date.toLocaleString(`en-US`, optionsDate);
};

export const convertObjectDay = (startDate, endDate) => {
  const optionsMonth = {month: `short`};
  const optionsDay = {day: `numeric`};
  if (endDate) {
    return {
      startDay: startDate.toLocaleString(`en-US`, optionsDay),
      startMonth: startDate.toLocaleString(`en-US`, optionsMonth),
      startDate: startDate.getDay() + `/` + (startDate.getMonth() + 1) + `/` + startDate.getFullYear() + ` ` + convertStartTime(startDate),
      endDay: endDate.toLocaleString(`en-US`, optionsDay),
      endMonth: endDate.toLocaleString(`en-US`, optionsMonth),
      endDate: endDate.getDay() + `/` + (endDate.getMonth() + 1) + `/` + endDate.getFullYear() + ` ` + convertEndTime(endDate),
    };
  }
  return {
    startDay: startDate.toLocaleString(`en-US`, optionsDay),
    startMonth: startDate.toLocaleString(`en-US`, optionsMonth),
    startDate: startDate.getDay() + `/` + (startDate.getMonth() + 1) + `/` + startDate.getFullYear() + ` ` + convertStartTime(startDate),
    endDay: ``,
    endMonth: ``,
    endDate: ``
  };
};

export const calculateDiffDate = (startDate, endDate) => {
  if (!endDate) {
    return startDate.getTime();
  }
  return ((endDate.getTime() - startDate.getTime()));
};

export const convertDurationPoint = (startDate, endDate) => {
  let minutes = null;
  let hours = null;
  let days = null;
  if (!endDate && !startDate) {
    minutes = 0;
    hours = 0;
    days = 0;
  } else {
    minutes = Math.floor((calculateDiffDate(startDate, endDate) / ConvertTime.MIL_IN_MINUTE) % 60);
    hours = Math.floor((calculateDiffDate(startDate, endDate) / ConvertTime.MIL_IN_HOUR) % 24);
    days = Math.floor(calculateDiffDate(startDate, endDate) / ConvertTime.MIL_IN_DAY);
  }

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

export const convertDurationPointInDay = (date) => {
  return Math.max(date / ConvertTime.BORDERLINE_VALUE) + `D`;
};
