import { COUNT_DOT } from "../constants";
import Observable from "../framework/observable";
import generateDot from "../data/dot";
import offersByType from "../data/offer";
import destinations from "../data/destination";

class DotsModel extends Observable {
  constructor() {
    super();
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

  updateDot = (updateType, update) => {
    const updatedIndex = this._dots.findIndex((dot) => dot.id === update.id);

    this._dots = [
      ...this._dots.slice(0, updatedIndex),
      update,
      ...this._dots.slice(updatedIndex + 1),
    ];

    this._notify(updateType, update);
  };

  addDot = (updateType, update) => {
    this._dots = [update, ...this._dots];

    this._notify(updateType, update);
  };

  deleteDot = (updateType, update) => {
    const deletedIndex = this._dots.findIndex((dot) => dot.id === update.id);

    this._dots = [
      ...this._dots.slice(0, deletedIndex),
      ...this._dots.slice(deletedIndex + 1),
    ];

    this._notify(updateType, update);
  };
}

export default DotsModel;
