import { render } from "../framework/render.js";
import DotView from "../view/Dot";
import DotsView from "../view/DotsList";
import SortView from "../view/Sort";
import EmptyView from "../view/Empty";
import generateSortedDots from "../data/sorted.js";
import DotPresenter from "./dot-presenter.js";
import { updateItem } from "../utils";
import { SORTED_TYPE } from "../constants.js";

class TripView {
  constructor(container, dotsModel) {
    this._component = new DotsView();
    this._container = container;
    this._dotsModel = dotsModel;
    this._sortedDots = generateSortedDots(this._dotsModel._dots);
    this._dotPresenter = new Map();
    this._listDots = [];
  }

  init() {
    this._listDots = this._dotsModel._dots;
    this._renderWay();
  }

  _renderEmptyScreen = () => {
    render(
      new EmptyView("Click New Event to create your first point"),
      this._container,
      "beforeend"
    );
  };

  _renderSortedDots = () => {
    render(new SortView(this._sortedDots), this._container, "beforeend");
  };

  _renderNewDot = () => {
    render(
      new DotView(
        this._component.element,
        this._dotsModel.getOffers(),
        this._dotsModel.getDestination()
      ),
      this._container,
      "beforeend"
    );
  };

  _renderDots = () => {
    this._listDots.forEach((dot) => this._renderDot(dot));
  };

  _renderDotsView = () => {
    render(this._component, this._container, "beforeend");
    this._renderDots();
  };

  _renderWay() {
    if (this._listDots.length != 0) {
      this._renderSortedDots();
      this._renderDotsView();
      return;
    }

    this._renderEmptyScreen();
  }

  _renderDot(dot) {
    const dotPresenter = new DotPresenter(
      this._dotsModel,
      this._component.element,
      this._handleDotChange,
      this._handleModeChange
    );
    dotPresenter.init(dot);
    this._dotPresenter.set(dot.id, dotPresenter);
  }

  _clearDontList = () => {
    this._dotPresenter.forEach((el) => el.destroy);
    this._dotPresenter.clear();
  };

  _handleDotChange = (newDot) => {
    this._listDots = updateItem(this._listDots, newDot);
    this._dotPresenter.get(newDot.id).init(newDot);
  };

  _handleModeChange = () => {
    this._dotPresenter.forEach((presenter) => presenter.resetView());
  };
}

export default TripView;
