import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format("HH:mm");
const getDifference = (date1, date2, param) => dayjs(date2).diff(date1, param);

export { getRandomInteger, humanizeDate, humanizeTime, getDifference };
