import flatpickr from 'flatpickr';
import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

export const dateParser = {
  getDate(date) {
    flatpickr(date, {
      enableTime: true,
      dateFormat: `Y-m-d H:i`,
    });
  }
};

export const sortPointDownDate = (pointA, pointB) => {
  return dayjs(pointB.diffDate).diff(dayjs(pointA.diffDate));
};

export const sortPointDownPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};
