import createElement from "../createElement";
import { humanizeDate, humanizeTime } from "../utils";

const formCreateTemplate = (allOffers, allDestination, dot = {}) => {
  const {
    type = "taxi",
    basePrice = 99,
    destination = 1,
    dateFrom = "2019-07-10T22:55:56.845Z",
    dateTo = "2019-07-11T11:22:13.375Z",
    offers = [0],
  } = dot;

  const checkTypePoint = (currentType) => {
    if (currentType === type) {
      return "checked";
    }

    return "";
  };
  const getTemplateOffer = (offer) => {
    if (offers.find((x) => x === offer["id"])) {
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
        <label class="event__offer-label" for="event-offer-comfort-1">
      <span class="event__offer-title">${offer["title"]}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer["price"]}</span>
        </label>
      </div>`;
    } else {
      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort">
        <label class="event__offer-label" for="event-offer-comfort-1">
      <span class="event__offer-title">${offer["title"]}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer["price"]}</span>
        </label>
      </div>`;
    }
  };

  const createOffersElement = () => {
    const currentOffers = allOffers.find((x) => x.type === type);
    const offersRenderElements = currentOffers["offers"].map(getTemplateOffer);

    return offersRenderElements.join("");
  };
  const getDestinationDate = () =>
    allDestination.find((x) => x.id === destination);

  const getTemplatePhoto = (photo) =>
    `<img class="event__photo" src="${photo["src"]}" alt="Event photo">`;

  const createPhotosElement = () => {
    const currentDestination = getDestinationDate();
    const photosRenderElements =
      currentDestination["pictures"].map(getTemplatePhoto);

    return photosRenderElements.join("");
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
      <header class="event__header">
      <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
          <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${checkTypePoint(
                "taxi"
              )}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${checkTypePoint(
                "bus"
              )}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${checkTypePoint(
                "train"
              )}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${checkTypePoint(
                "ship"
              )}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${checkTypePoint(
                "drive"
              )}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${checkTypePoint(
                "flight"
              )}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${checkTypePoint(
                "check-in"
              )}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${checkTypePoint(
                "sightseeing"
              )}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${checkTypePoint(
                "restaurant"
              )}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
          </fieldset>
          </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
            getDestinationDate()["name"]
          }" list="destination-list-1">
          <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(
            dateFrom,
            "DD/MM/YY"
          )} ${humanizeTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(
            dateTo,
            "DD/MM/YY"
          )} ${humanizeTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
      </button>
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${createOffersElement()}
      </section>

      <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${
            getDestinationDate()["description"]
          }</p>

          <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPhotosElement()}
          </div>
          </div>
      </section>
      </section>
  </form>
</li>`;
};
class FormCreateView {
  constructor(offers, destination, dot) {
    this._dot = dot;
    this._offers = offers;
    this._destination = destination;
  }

  get _template() {
    return formCreateTemplate(this._offers, this._destination, this._dot);
  }

  get _element() {
    if (!this.element) {
      this.element = createElement(this._template);
    }

    return this.element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FormCreateView;
