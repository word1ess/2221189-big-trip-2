import AbstractView from '../framework/view/abstract-view';

const createFirstMessage = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  get template() {
    return createFirstMessage(this._message);
  }
}

export default FirstMessageView;
