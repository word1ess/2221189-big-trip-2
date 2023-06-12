import AbstractView from "../framework/view/abstract-view.js";

const dotsTemplate = () => `<ul class="trip-events__list"></ul>`;

class DotsView extends AbstractView {
  get template() {
    return dotsTemplate();
  }
}

export default DotsView;
