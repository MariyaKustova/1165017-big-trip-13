import flatpickr from 'flatpickr';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const dateParser = {
  getDate(date) {
    flatpickr(date, {
      enableTime: true,
      dateFormat: `Y-m-d H:i`,
    });
  }
};
