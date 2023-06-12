import render from "../render";
import DotView from "../view/Dot";
import DotsView from "../view/DotsList";
import FormCreateView from "../view/FormCreate";
import FormChangeView from "../view/FormChange";
import SortView from "../view/Sort";

class TripView {
  constructor(container, dotsModel) {
    this._component = new DotsView();
    this._container = container;
    this._dotsModel = dotsModel;
    this._listDots = this._dotsModel.dots;
  }

  init() {
    render(new SortView(), this._container, "beforeend");
    render(this._component, this._container, "beforeend");
    render(
      new FormCreateView(
        this._dotsModel.getOffers(),
        this._dotsModel.getDestination()
      ),
      this._component._element,
      "beforeend"
    );

    for (let i = 0; i < this._listDots.length; i++) {
      const currentDot = this._listDots[i];
      const curretnOffers = this._dotsModel.getOffers(currentDot);
      const currentDesctination = this._dotsModel.getDestination(currentDot);
      this._renderDot(currentDot, curretnOffers, currentDesctination);
    }
  }
  _renderDot(dot, offers, destination) {
    const dotComponent = new DotView(dot, offers, destination);
    const dotEditComponent = new FormChangeView(dot, offers, destination);

    const replacePointToForm = () => {
      this._component._element.replaceChild(
        dotEditComponent._element,
        dotComponent._element
      );
    };

    const replaceFormToPoint = () => {
      this._component._element.replaceChild(
        dotComponent._element,
        dotEditComponent._element
      );
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener("keydown", onEscKeyDown);
      }
    };

    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      dotEditComponent._element.removeEventListener(
        "submit",
        onSaveButtonClick
      );
    };

    const onRollupButtonClick = () => {
      replaceFormToPoint();
      dotEditComponent._element.removeEventListener(
        "click",
        onRollupButtonClick
      );
    };

    dotComponent._element
      .querySelector(".event__rollup-btn")
      .addEventListener("click", () => {
        replacePointToForm();

        document.addEventListener("keydown", onEscKeyDown);

        dotEditComponent._element
          .querySelector("form")
          .addEventListener("submit", onSaveButtonClick);

        dotEditComponent._element
          .querySelector(".event__rollup-btn")
          .addEventListener("click", onRollupButtonClick);
      });

    return render(dotComponent, this._component._element, "beforeend");
  }
}

export default TripView;
