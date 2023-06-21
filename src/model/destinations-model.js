import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  constructor(destinationsApiService) {
    super();
    this._destinationsApiService = destinationsApiService;
    this._destinations = [];
  }

  initialize = async () => {
    try {
      this._destinations = await this._destinationsApiService.destinations;
    } catch(err) {
      this._destinations = [];
    }
  };

  get destinations() {
    return this._destinations;
  }

  get cities() {
    return this._destinations.map(d => ({id: d.id, name: d.name}));
  }
}