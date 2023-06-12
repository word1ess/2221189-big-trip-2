import { COUNT_DOT } from "../constants";
import generateDot from "../data/dot";
import offersByType from "../data/offer";
import destinations from "../data/destination";

class DotsModel {
  constructor() {
    this._dots = Array.from({ length: COUNT_DOT }, generateDot);
    this._offers = offersByType;
    this._destinations = destinations;
  }

  get dots() {
    return this._dots;
  }

  getOffers(dots) {
    if (dots) {
      return this._offers.find((x) => x.type === dots["type"])["offers"];
    }
    return this._offers;
  }

  getDestination(dots) {
    if (dots) {
      return this._destinations.find((x) => x.id === dots["destination"]);
    }
    return this._destinations;
  }
}

export default DotsModel;
