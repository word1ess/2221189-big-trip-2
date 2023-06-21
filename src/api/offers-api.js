import ApiService from '../framework/api-service.js';
import { METHOD } from '../const.js';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updateOffers = async (offer) => {
    const response = await this._load({
      url: `offers/${offer.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(offer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const result = await ApiService.parseResponse(response);

    return result;
  };
}