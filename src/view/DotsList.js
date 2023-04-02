import createElement from "../createElement";

const dotsTemplate = () => {
  `<ul class="trip-events__list">
    </ul>`;
};

class DotsView {
  getTemplate() {
    return dotsTemplate;
  }
  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default DotsView;
