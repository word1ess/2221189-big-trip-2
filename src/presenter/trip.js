import { render, remove, RenderPosition } from '../framework/render';
import { sortingsList, sortByPrice, filtersList } from '../utils';
import { SORTED_TYPE, FILTERS_TYPE, USER_ACTIONS, UPDATE_TYPES, FILTERS_MESSAGE } from '../const';
import SortView from '../view/sort-view';
import TripListView from '../view/trip-list-view';
import FirstMessageView from '../view/first-message-view';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import LoadingView from '../view/loading-view';

class TripPresenter {
  constructor(container, pointsModel, offersModel, destinationsModel, filtersModel) {
    this._tripListComponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._filtersModel = filtersModel;
    this._points_list = [];
    this._pointPresenter = new Map();

    this._sortComponent = null;
    this._firstMessageComponent = null;
    this._currentSortType = SORTED_TYPE.DAY;
    this._newPointPresenter = new NewPointPresenter(this._tripListComponent.element, this._handleViewAction);

    this._loadingComponent = new LoadingView();
    this._loading = true;

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  get points() {
    const points = this._pointsModel.points;
    const filterType = this._filtersModel.filter;
    const filteredPoints = filtersList[filterType](points);

    switch (this._currentSortType) {
      case SORTED_TYPE.TIME:
        return sortingsList[SORTED_TYPE.TIME]([...filteredPoints]);
      case SORTED_TYPE.PRICE:
        return sortByPrice([...filteredPoints], this._offersModel.offers);
      default:
        return sortingsList[SORTED_TYPE.DAY]([...filteredPoints]);
    }
  }

  initialize() {
    this._renderTrip();
  }

  createPoint = (callback) => {
    this._currentSortType = SORTED_TYPE.DAY;
    this._filtersModel.setFilter(UPDATE_TYPES.MAJOR, FILTERS_TYPE.EVERYTHING);
    this._newPointPresenter.init(callback, this._offersModel.offers,
      this._destinationsModel.destinations, this._destinationsModel.cities);
  }

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList();
    this._renderTrip(this.points);
  }

  _renderFirstMessage() {
    const filterType = this._filtersModel.filter;
    const message = FILTERS_MESSAGE[filterType];
    this._firstMessageComponent = new FirstMessageView(message);
    render(this._firstMessageComponent, this._container);
  }

  _renderSort = () => {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._sortComponent, this._container, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoints = (points) => {
    points.forEach(p => this._renderPoint(p));
  }

  _renderTrip() {
    render(this._tripListComponent, this._container);

    if (this._loading) {
      this._renderLoading();
      return;
    }
    
    this._renderSort();

    if (this.points.length === 0) {
      this._renderFirstMessage();
      return;
    }
    
    render(this._tripListComponent, this._container);
    this._renderPoints(this.points);
  }

  _handleModeChange = () => {
    this._newPointPresenter.destroy();
    for (let presenter in this._pointPresenter) {
      this._pointPresenter[presenter].resetView();
    }
  }

  _handleViewAction = (action_type, updateType, point) => {
    switch (action_type) {
      case USER_ACTIONS.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, point)
        break;
      case USER_ACTIONS.ADD_POINT:
        this._pointsModel.addPoint(updateType, point);
        break;
      case USER_ACTIONS.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, point);
        break;
    }
  };

  _handleModelEvent = (updateType, point) => {
    point; // unused
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this._pointPresenter.get(point.id).init(point);
        break;
      case UPDATE_TYPES.MINOR:
        this._clearList();
        this._renderTrip();
        break;
      case UPDATE_TYPES.MAJOR:
        this._clearList({ resetSortType: true });
        this._renderTrip();
        break;
      case UPDATE_TYPES.INIT:
        this._loading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  };

  _renderLoading = () => {
    render(this._loadingComponent, this._container);
  }

  _renderPoint = (point) => {
    const offers = this._offersModel.offers;
    const destinations = this._destinationsModel.destinations;
    const cities = this._destinationsModel.cities;
    
    const point_presenter = new PointPresenter(this._tripListComponent.element, this._pointsModel,
      offers, destinations, cities,
      this._handleViewAction, this._handleModeChange);
    point_presenter.init(point);
    this._pointPresenter.set(point.id, point_presenter);
  }

  _clearList = ({resetSortType: resetSortType = false} = {}) => {
    this._newPointPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    
    remove(this._sortComponent);
    remove(this._firstMessageComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SORTED_TYPE.DAY
    }
  }
}
export default TripPresenter;
