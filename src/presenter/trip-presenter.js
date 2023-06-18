import { render } from "../framework/render.js";
import DotView from "../view/dot";
import DotsView from "../view/dots-list";
import SortView from "../view/sort";
import EmptyView from "../view/empty-screen.js";
import DotPresenter from "./dot-presenter.js";
import { updateItem, sortByDay, sortByTime, sortByPrice } from "../utils";
import { SORTED_TYPE } from "../constants.js";

class TripView {
  constructor(container, dotsModel) {
    this._component = new DotsView();
    this._dotPresenter = new Map();
    this._sorting = new SortView();
    this._container = container;
    this._dotsModel = dotsModel;
    this._currSorting = SORTED_TYPE.DAY;
    this._listDots = [];
    this._sourcedListDots = [];
  }

  init() {
    this._listDots = sortByDay(this._dotsModel._dots);
    this._renderWay();
    this._sourcedListDots = this._listDots;
  }

  _renderEmptyScreen = () => {
    render(
      new EmptyView("Click New Event to create your first point"),
      this._container,
      "beforeend"
    );
  };

  _sortDots = (sortType) => {
    switch (sortType) {
      case SORTED_TYPE.PRICE:
        this._listDots = sortByPrice(this._dotsModel);
        break;
      case SORTED_TYPE.TIME:
        this._listDots = sortByTime(this._listDots);
        break;
      default:
        this._listDots = [...this._sourcedListDots];
    }
    this._currSorting = sortType;
  };

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currSorting) {
      return;
    }

    this._sortDots(sortType);
    this._clearDotsList();
    this._renderDots();
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

  _renderSortedDots = () => {
    render(this._sorting, this._container, "beforeend");
    this._sorting.setSortTypeChangeHandler(this._handleSortTypeChange);
  };

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

  _clearDotsList = () => {
    this._dotPresenter.forEach((el) => el.destroy());
    this._dotPresenter.clear();
  };

  _handleDotChange = (newDot) => {
    this._listDots = updateItem(this._listDots, newDot);
    this._sourcedListDots = updateItem(this._sourcedListDots, newDot);
    this._dotPresenter.get(newDot.id).init(newDot);
  };

  _handleModeChange = () => {
    this._dotPresenter.forEach((presenter) => presenter.resetView());
  };
}

export default TripView;
