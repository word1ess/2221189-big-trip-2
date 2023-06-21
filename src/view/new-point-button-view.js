import AbstractView from '../framework/view/abstract-view.js';

function newPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

class NewPointButtonView extends AbstractView {
    get template() {
        return newPointButtonTemplate();
    }

    setClickHandler = (callback) => {
        this._callback.click = callback;
        this.element.addEventListener('click', this._clickHandler);
    };

    _clickHandler = (evt) => {
        evt.preventDefault();
        this._callback.click();
    };
}

export default NewPointButtonView;