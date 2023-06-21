import Observable from '../framework/observable';
import { UPDATE_TYPES } from '../const';

class PointsModel extends Observable {
  constructor(pointsApi) {
    super();
    this._pointsApi = pointsApi;
    this._points = [];
  }

  get points() {
    return this._points;
  }

  initialize = async () => {
    try {
      const points = await this._pointsApi.points;
      this._points = points.map(this._adaptToClient);
    } catch(err) {
      this._points = [];
    }

    this._notify(UPDATE_TYPES.INIT);
  };

  updatePoint = async (updateType, points) => {
    const updatedIndex = this._points.findIndex(point => point.id === points.id);

    if (updatedIndex === -1) {
      throw new Error('Can\'t update non-existing point');
    }

    try {
      const response = await this._pointsApi.updatePoints(points);
      const updatedPoint = this._adaptToClient(response);
      this._points = [
        ...this._points.slice(0, updatedIndex),
        updatedPoint,
        ...this._points.slice(updatedIndex + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Error updating point: ' + err);
    }
  }

  addPoint = (updateType, points) => {
    this._points = [points, 
      ...this._points];

    this._notify(updateType, points);
  }

  deletePoint = (updateType, points) => {
    const deletedIndex = this._points.findIndex((point) => point.id === points.id);

    this._points = [
      ...this._points.slice(0, deletedIndex),
      ...this._points.slice(deletedIndex + 1)
    ]

    this._notify(updateType, points);
  }

  _adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  };
}

export default PointsModel;
