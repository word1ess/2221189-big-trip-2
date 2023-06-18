import { render, remove } from "../framework/render.js";
import DotView from "../view/dot";
import DotsView from "../view/dots-list";
import SortView from "../view/sort";
import EmptyView from "../view/empry-screen";
import DotPresenter from "./dot-presenter.js";
import { sortByDay, sortByTime, sortByPrice } from "../utils";
import { SORTED_TYPE, UPDATE_TYPE, USER_ACTION } from "../constants.js";

class TripView {
  constructor(container, dotsModel) {
    this._component = new DotsView();
    this._dotPresenter = new Map();
    this._emptyScreen = new EmptyView(
      "Click New Event to create your first point"
    );
    this._container = container;
    this._dotsModel = dotsModel;
    this._dotsModel.addObserver(this._handleModelEvent);
    this._currSorting = SORTED_TYPE.DAY;
    this._listDots = [];
    this._sourcedListDots = [];
    this._sorting;
  }

  init() {
    this._renderWay();
  }

  get dots() {
    switch (this._currSorting) {
      case SORTED_TYPE.PRICE:
        return sortByPrice(this._dotsModel);
      case SORTED_TYPE.TIME:
        return sortByTime([...this._dotsModel._dots]);
    }
    return sortByDay([...this._dotsModel._dots]);
  }

  _renderEmptyScreen = () => {
    render(this._emptyScreen, this._container, "beforeend");
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

  _renderDots = (dots) => {
    console.log(this.dots);
    dots.forEach((dot) => this._renderDot(dot));
  };

  _renderDotsView = () => {
    render(this._component, this._container, "beforeend");
    this._renderDots();
  };

  _renderWay() {
    if (this.dots.length !== 0) {
      this._renderSortedDots();
      render(this._component, this._container, "beforeend");
      this._renderDots(this.dots);
      return;
    }

    this._renderEmptyScreen();
  }

  _renderSortedDots = () => {
    this._sorting = new SortView(this._currSorting);
    render(this._sorting, this._container, "beforeend");
    this._sorting.setSortTypeChangeHandler(this._handleSortTypeChange);
  };

  _renderDot(dot) {
    const dotPresenter = new DotPresenter(
      this._dotsModel,
      this._component.element,
      this._handleViewAction,
      this._handleModeChange
    );
    dotPresenter.init(dot);
    this._dotPresenter.set(dot.id, dotPresenter);
  }

  _clearDotsList = ({ resetSortType = false } = {}) => {
    this._dotPresenter.forEach((el) => el.destroy());
    this._dotPresenter.clear();

    remove(this._sorting);
    remove(this._emptyScreen);

    if (resetSortType) {
      this._currSorting = SORTED_TYPE.DAY;
    }
  };

  _handleDotChange = (newDot) => {
    this._sourcedListDots = updateItem(this._sourcedListDots, newDot);
  };

  _handleModeChange = () => {
    this._dotPresenter.forEach((presenter) => presenter.resetView());
  };

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currSorting) {
      return;
    }

    this._currSorting = sortType;
    this._clearList();
    this._renderWay();
  };

  _handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_DOT:
        this._dotsModel.updateDot(updateType, update);
        break;
      case USER_ACTION.ADD_DOT:
        this._dotsModel.addDot(updateType, update);
        break;
      case USER_ACTION.DELETE_DOT:
        this._dotsModel.deleteDot(updateType, update);
        break;
    }
  };

  _handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this._dotsModel.get(update.id).init(update);
        break;
      case UPDATE_TYPE.MINOR:
        this._clearDotsList();
        this._renderWay();
        break;
      case UPDATE_TYPE.MAJOR:
        this._renderWay();
        break;
    }
  };
}

export default TripView;
