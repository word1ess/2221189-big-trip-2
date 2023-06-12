import createElement from "../createElement";

const createEmpty = (msg) => `p class="trip-events__msg">${msg}</p>`;

class EmptyView {
  constructor(msg) {
    this._msg = msg;
  }

  get _template() {
    return createEmpty(this._msg);
  }

  get _element() {
    if (!this.element) {
      this.element = createElement(this._template);
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default EmptyView;
