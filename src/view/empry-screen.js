import AbstractView from "../framework/view/abstract-view.js";
const createEmpty = (msg) => `p class="trip-events__msg">${msg}</p>`;

class EmptyView extends AbstractView {
  constructor(msg) {
    super();
    this._msg = msg;
  }

  get template() {
    return createEmpty(this._msg);
  }
}

export default EmptyView;
