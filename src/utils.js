import dayjs from "dayjs";
import { FILTERS_TYPE, SORTED_TYPE } from "./constants";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format("HH:mm");
const getDifference = (date1, date2, param) => dayjs(date2).diff(date1, param);
const isDotsAlive = (date) => date && dayjs().isAfter(date, "D");

const filter = {
  [FILTERS_TYPE.EVERYTHING]: (dots) => dots,
  [FILTERS_TYPE.FUTURE]: (dots) =>
    dots.filter((dot) => !isDotsAlive(dot.dateFrom)),
  [FILTERS_TYPE.PAST]: (dots) => dots.filter((dot) => isDotsAlive(dot.dateTo)),
};

const sortedDots = {
  [SORTED_TYPE.DAY]: (dots) =>
    dots.sort((prev, next) => getDifference(next.dateFrom, prev.dateFrom, "")),
  [SORTED_TYPE.TIME]: (dots) =>
    dots.sort(
      (prev, next) =>
        getDifference(prev.dateFrom, prev.dateTo, "minute") -
        getDifference(next.dateFrom, next.dateTo, "minute")
    ),
  [SORTED_TYPE.PRICE]: (dots) =>
    dots.sort((prev, next) => prev.basePrice - next.basePrice),
};

const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));
export {
  getRandomInteger,
  humanizeDate,
  humanizeTime,
  getDifference,
  filter,
  sortedDots,
  updateItem,
};
