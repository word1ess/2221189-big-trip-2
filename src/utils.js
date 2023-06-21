import dayjs from 'dayjs';
import { FILTERS_TYPE, SORTED_TYPE } from './const';

const humanizeDate = (date, form) => dayjs(date).format(form);
const humanizeTime = (date) => dayjs(date).format('HH:mm');
const getDateDiff = (date1, date2, param) => dayjs(date2).diff(date1, param);
const checkPointExpired = (date) => date && dayjs().isAfter(date, 'D');

const filtersList = {
  [FILTERS_TYPE.EVERYTHING]: (points) => points,
  [FILTERS_TYPE.FUTURE]: (points) => points.filter((point) => !checkPointExpired(point.dateFrom)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => checkPointExpired(point.dateTo)),
};

const sortingsList = {
  [SORTED_TYPE.DAY]: (points) => points.sort((prev, next) => getDateDiff(next.dateFrom, prev.dateFrom, '')),
  [SORTED_TYPE.EVENT]: (points) => points,
  [SORTED_TYPE.TIME]: (points) => points.sort((prev, next) => getDateDiff(prev.dateFrom, prev.dateTo, 'minute') - getDateDiff(next.dateFrom, next.dateTo, 'minute')),
  [SORTED_TYPE.PRICE]: (points) => points.sort((prev, next) => prev.basePrice - next.basePrice),
  [SORTED_TYPE.OFFERS]: (points) => points
};

const getFinalPrice = (currentOffers, point) => {
  let price = point.basePrice;
  
  if (point.offers.length === 0) {
    return price;
  }

  point.offers.forEach((id, index) => {
    price += currentOffers[index]['price'];
  });

  return price;
};

const sortByPrice = (points, offers) => points.sort((prev, next) => {
  const prevOffers = offers.find((x) => x.type === prev['type'])['offers'];
  const nextOffers = offers.find((x) => x.type === next['type'])['offers'];
  const prevFinalPrice = getFinalPrice(prevOffers, prev);
  const nextFinalPrice = getFinalPrice(nextOffers, next);
  return prevFinalPrice - nextFinalPrice;
});

export {
  humanizeDate, humanizeTime, getDateDiff,
  filtersList, sortingsList,
  sortByPrice, getFinalPrice
};
