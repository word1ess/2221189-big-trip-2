import AbstractView from "../framework/view/abstract-view.js";
import { humanizeDate, humanizeTime, getDifference } from "../utils";

const dotTemplate = (point, currentOffers, currentDesctination) => {
  const { type, basePrice, dateFrom, dateTo, isFavorite, offers } = point;

  const date = dateFrom !== null ? humanizeDate(dateFrom, "D MMMM") : "June 9";

  const favoriteClassName = isFavorite ? "event__favorite-btn--active" : "";

  const timeFrom = dateFrom !== null ? humanizeTime(dateFrom) : "10:00";

  const timeTo = dateTo !== null ? humanizeTime(dateTo) : "11:00";

  const formattingDate = (diffDate) =>
    diffDate < 10 ? `0${diffDate}` : `${diffDate}`;

  const calculateTimeSpent = () => {
    const differenceDays = formattingDate(
      getDifference(dateFrom, dateTo, "day")
    );
    const differenceHours = formattingDate(
      getDifference(dateFrom, dateTo, "hour") - differenceDays * 24
    );
    const differenceMinute = formattingDate(
      getDifference(dateFrom, dateTo, "minute") -
        differenceDays * 24 * 60 -
        differenceHours * 60 +
        1
    );

    if (differenceDays !== "00") {
      return `${differenceDays}D ${differenceHours}H ${differenceMinute}M`;
    }

    if (differenceHours !== "00") {
      return `${differenceHours}H ${differenceMinute}M`;
    }

    return `${differenceMinute}M`;
  };

  const getTemplateOffer = (offer) => {
    if (offers.find((x) => x === offer["id"])) {
      return `<li class="event__offer">
              <span class="event__offer-title">${offer["title"]}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer["price"]}</span>
            </li>`;
    }
  };

  const createOffersElement = () => {
    const offersView = currentOffers.map(getTemplateOffer);

    return offersView.join(" ");
  };

  return `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime="2019-03-18">${date}</time>
        <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${currentDesctination["name"]}</h3>
        <div class="event__schedule">
        <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
        </p>
        <p class="event__duration">${calculateTimeSpent()}</p>
        </div>
        <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
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
  </li>`;
};
class DotView extends AbstractView {
  constructor(dot, offers, destination) {
    super();
    this.dot = dot;
    this.offers = offers;
    this.destination = destination;
  }
  get template() {
    return dotTemplate(this.dot, this.offers, this.destination);
  }

  setEditClickHandler = (cb) => {
    this._callback.click = cb;
    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this._editClickHandler);
  };

  _editClickHandler = (e) => {
    e.preventDefault();
    this._callback.click();
  };

  _setFavoriteClickHandler = (cb) => {
    this._callback.favoriteClick = cb;
    this.element
      .querySelector(".event__favorite-btn")
      .addEventListener("click", this._favoriteClickHandler);
  };
  _favoriteClickHandler = (e) => {
    e.preventDefault();
    this._callback.favoriteClick();
  };
}

export default DotView;
