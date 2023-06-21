import AbstractView from "../framework/view/abstract-view";
import { humanizeDate, humanizeTime, getDateDiff, getFinalPrice } from '../utils';
import he from 'he';

const pointTemplate = (point, currentOffers, currentDestination) => {
  const {
    type,
    dateFrom,
    dateTo,
    isFavorite,
    offers} = point;

  const date = dateFrom !== null
    ? humanizeDate(dateFrom, 'D MMMM')
    : 'June 9';

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const timeFrom = dateFrom !== null
    ? humanizeTime(dateFrom)
    : '10:00';

  const timeTo = dateTo !== null
    ? humanizeTime(dateTo)
    : '11:00';

  const date_formatting = (diffDate) => diffDate < 10? `0${diffDate}`: `${diffDate}`;

  const calculate_spent_time = () => {
    const days_diff = date_formatting(getDateDiff(dateFrom, dateTo, 'day'));
    const hours_diff = date_formatting(getDateDiff(dateFrom, dateTo, 'hour') - days_diff * 24);
    const minutes_diff = date_formatting(getDateDiff(dateFrom, dateTo, 'minute') - days_diff * 24 * 60 - hours_diff * 60 + 1);

    if (days_diff !== '00')
      return `${days_diff}D ${hours_diff}H ${minutes_diff}M`;

    if (hours_diff !== '00')
      return `${hours_diff}H ${minutes_diff}M`;

    return `${minutes_diff}M`;
  };
  
  const getOfferTemplate = (offer) => {
    if (offers.find((x) => x === offer['id'])) {
      return(
        `<li class="event__offer">
              <span class="event__offer-title">${offer['title']}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer['price']}</span>
            </li>`);
    }
  };

  const createOffersElement = () => currentOffers.map(getOfferTemplate).join(' ');

  return (
    `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime="2019-03-18">${date}</time>
        <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${he.encode(currentDestination.name)}</h3>
        <div class="event__schedule">
        <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
        </p>
        <p class="event__duration">${calculate_spent_time()}</p>
        </div>
        <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${getFinalPrice(currentOffers, point)}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${createOffersElement()}</ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
        </button>
        <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
        </button>
    </div>
  </li>`
  );};

class PointView extends AbstractView {
  constructor(point, offers, destination) {
    super();
    this._point = point;
	  this._offers = offers;
	  this._destination = destination;
  }

  get template() {
    return pointTemplate(this._point, this._offers, this._destination);
  }
  
  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
  
  _favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

export default PointView;
