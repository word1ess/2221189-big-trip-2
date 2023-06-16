import { render, replace } from "../framework/render.js";
import DotView from "../view/Dot";
import DotsView from "../view/DotsList";
import FormCreateView from "../view/FormCreate";
import FormChangeView from "../view/FormChange";
import SortView from "../view/Sort";
import EmptyView from "../view/Empty";
import generateSortedDots from "../data/sorted.js";

class TripView {
  constructor(container, dotsModel) {
    this._component = new DotsView();
    this._container = container;
    this._dotsModel = dotsModel;
    this._listDots = this._dotsModel.dots;
    this._sortedDots = generateSortedDots(this._dotsModel._dots);
  }

  init() {
    this._renderWay();
  }

  _renderWay() {
    if (this._listDots.length != 0) {
      render(new SortView(this._sortedDots), this._container, "beforeend");
      render(this._component, this._container, "beforeend");
      render(
        new FormCreateView(
          this._dotsModel.getOffers(),
          this._dotsModel.getDestination()
        ),
        this._component.element,
        "beforeend"
      );

      for (let i = 0; i < this._listDots.length; i++) {
        const currentDot = this._listDots[i];
        const curretnOffers = this._dotsModel.getOffers(currentDot);
        const currentDesctination = this._dotsModel.getDestination(currentDot);
        this._renderDot(currentDot, curretnOffers, currentDesctination);
      }

      return;
    }
    render(
      new EmptyView("Click New Event to create your first point"),
      this._container,
      "beforeend"
    );
  }

  _renderDot(dot, offers, destination) {
    const dotComponent = new DotView(dot, offers, destination);
    const dotEditComponent = new FormChangeView(dot, offers, destination);

    const replaceDotToForm = () => {
      replace(dotEditComponent, dotComponent);
    };

    const replaceFormToDot = () => {
      replace(dotComponent, dotEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        evt.preventDefault();
        replaceFormToDot();
        document.removeEventListener("keydown", onEscKeyDown);
      }
    };

    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      replaceFormToDot();
      dotEditComponent.element.removeEventListener("submit", onSaveButtonClick);
    };

    const onRollupButtonClick = () => {
      replaceFormToDot();
      dotEditComponent.element.removeEventListener(
        "click",
        onRollupButtonClick
      );
    };

    dotComponent.setEditClickHandler(() => {
      replaceDotToForm();
      document.addEventListener("keydown", onEscKeyDown);
    });
    dotEditComponent.setFormSubmitHandler(() => {
      replaceFormToDot();
      document.removeEventListener("keydown", onEscKeyDown);
    });
    dotEditComponent.setButtonClickHandler(() => {
      replaceFormToDot();
      document.removeEventListener("keydown", onEscKeyDown);
    });

    return render(dotComponent, this._component.element, "beforeend");
  }
}

export default TripView;
