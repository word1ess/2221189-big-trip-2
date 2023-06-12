import createElement from "../createElement";

const dotsTemplate = () => `<ul class="trip-events__list"></ul>`;

class DotsView {
  get _template() {
    return dotsTemplate();
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

export default DotsView;
