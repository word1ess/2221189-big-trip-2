import ApiService from '../framework/api-service.js';
import { METHOD } from '../const.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  updateDestinations = async (destination) => {
    const response = await this._load({
      url: `destinations/${destination.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(destination),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const result = await ApiService.parseResponse(response);

    return result;
  };
}