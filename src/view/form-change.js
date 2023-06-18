import AbstractView from "../framework/view/abstract-view.js";
import AbstractStatefulView from "../framework/view/abstract-stateful-view";
import { humanizeDate, humanizeTime, getFinalPrice } from "../utils";
import destinations from "../data/destination.js";
import { CITIES } from "../constants.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import offersByType from "../data/offer.js";

const formChangeTemplate = (dot, currentOffers, currentDestination) => {
  const { type, basePrice, dateFrom, dateTo, offers } = dot;
  const checkTypePoint = (currentType) => {
    if (currentType === type) {
      return "checked";
    }

    return "";
  };
  const getTemplateOffer = (offer) => {
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${
        offer["id"]
      }" type="checkbox" name="event-offer-comfort" ${
      offers.find((x) => x === offer["id"]) ? "checked" : ""
    }>
      <label class="event__offer-label" for="event-offer-comfort-${
        offer["id"]
      }">
      <span class="event__offer-title">${offer["title"]}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer["price"]}</span>
      </label>
    </div>`;
  };

  const createOffersElement = () => {
    const offersRenderElements = currentOffers.map(getTemplateOffer);

    return offersRenderElements.join("");
  };

  const getTemplatePhoto = (photo) =>
    `<img class="event__photo" src="${photo["src"]}" alt="Event photo">`;

  const createPhotosElement = () => {
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
                currentDestination["name"]
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getFinalPrice(
                currentOffers,
                dot
              )}">
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
                currentDestination["description"]
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
class FormChangeView extends AbstractStatefulView {
  constructor(dot, offers, destination) {
    super();
    this._state = FormChangeView.parseDotToState(dot);
    this._offers = offers;
    this._destination = destination;
    this._prevOffers = offers;
    this._prevDestination = destination;
    this._datePicker;

    this._setDatePickerTo();
    this._setDatePickerFrom();
    this._setInnerHandlers();
  }
  get template() {
    return formChangeTemplate(this._state, this._offers, this._destination);
  }
  setFormSubmitHandler = (cb) => {
    this._callback.submit = cb;
    this.element
      .querySelector("form")
      .addEventListener("submit", this._formSubmitHandler);
  };

  _formSubmitHandler = (e) => {
    e.preventDefault();
    this._callback.submit(FormChangeView.parseStateToDot(this._state));
  };

  setButtonClickHandler = (cb) => {
    this._callback.click = cb;
    this.element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", this._buttonClickHandler);
  };

  _buttonClickHandler = (e) => {
    e.preventDefault();
    this._callback.click();
  };

  _offersChangeHandler = (e) => {
    const checkedOfferId = Number(e.target.id.slice(-1));
    if (this._state.offers.includes(checkedOfferId)) {
      this._state.offers = this._state.offers.filter(
        (x) => x !== checkedOfferId
      );
    } else {
      this._state.offers.push(checkedOfferId);
    }
    this.updateElement({
      offers: this._state.offers,
    });
  };

  _destinationChangeHandler = (e) => {
    e.preventDefault();
    const currentCity = e.target.value;
    const currentId = CITIES.find((x) => x.city === currentCity)["id"];
    this._destination = destinations.find((x) => x.id === currentId);
    this.updateElement({ destination: currentId });
  };

  _typeChangeHandler = (e) => {
    this._offers = offersByType.find((x) => x.type === e.target.value)[
      "offers"
    ];
    this.updateElement({ type: e.target.value, offers: [] });
  };

  _priceChangeHandler = (e) => {
    e.preventDefault();
    this._setState({
      basePrice: Number(e.target.value),
    });
  };

  _setInnerHandlers = () => {
    this.element
      .querySelector(".event__type-group")
      .addEventListener("change", this._typeChangeHandler);
    this.element
      .querySelector(".event__input--destination")
      .addEventListener("change", this._destinationChangeHandler);
    this.element
      .querySelector(".event__section--offers")
      .addEventListener("change", this._offersChangeHandler);
    this.element
      .querySelector(".event__input--price")
      .addEventListener("change", this._priceChangeHandler);
  };

  reset = (dot) => {
    this._offers = this._prevOffers;
    this._destination = this._destination;
    this.updateElement(FormChangeView.parseDotToState(dot));
  };

  _restoreHandlers = () => {
    this._setInnerHandlers();
    this._setDatePickerFrom();
    this._setDatePickerTo();
    this.setFormSubmitHandler(this._callback.submit);
    this.setButtonClickHandler(this._callback.click);
    this.setButtonClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.delete);
  };

  removeElement = () => {
    super.removeElement();
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  };

  _dotDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  _dotDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  _setDatePickerFrom = () => {
    if (this._state.dateFrom) {
      this._datepicker = flatpickr(
        this.element.querySelector("#event-start-time-1"),
        {
          enableTime: true,
          dateFormat: "d/m/y H:i",
          defaultDate: this._state.dateFrom,
          minDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this._dotDateFromChangeHandler,
        }
      );
    }
  };

  _setDatePickerTo = () => {
    if (this._state.dateTo) {
      this._datepicker = flatpickr(
        this.element.querySelector("#event-end-time-1"),
        {
          enableTime: true,
          dateFormat: "d/m/y H:i",
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this._dotDateToChangeHandler,
        }
      );
    }
  };

  setDeleteClickHandler = (callback) => {
    this._callback.delete = callback;
    this.element
      .querySelector(".event__reset-btn")
      .addEventListener("click", this._deleteClickHandler);
  };

  _deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(FormChangeView.parseStateToDot(this._state));
  };

  static parseDotToState = (dot) => ({
    ...dot,
    dateTo: dayjs(dot.dateTo).toDate(),
    dateFrom: dayjs(dot.dateFrom).toDate(),
  });

  static parseStateToDot = (state) => ({ ...state });
}

export default FormChangeView;
