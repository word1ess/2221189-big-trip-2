import createElement from '../createElement';

const dotsTemplate = () => '<ul class="trip-events__list"></ul>';

class DotsView {
  get template() {
    return dotsTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this.element = null;
  }
}

export default DotsView;
