import render from "../render";
import DotsView from "../view/DotsList";
import FormChangeView from "../view/FormChange";
import FormCreateView from "../view/FormCreate";
import SortView from "../view/Sort";

let dotsCount = 3;

class TripView {
  constructor(container) {
    this.component = new DotsView();
    this.container = container;
  }

  init() {
    render(new SortView(), this.container, "beforebegin");
    render(this.component, this.container, "beforebegin");
    render(new FormChangeView(), this.component.getElement(), "beforebegin");

    for (let i = 0; i < dotsCount; i++) {
      render(new FormCreateView(), this.component.getElement(), "beforebegin");
    }
  }
}

export default TripView;
