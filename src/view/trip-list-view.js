import AbstractView from '../framework/view/abstract-view';

const tripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView extends AbstractView {
  get template() {
    return tripListTemplate();
  }
}

export default TripListView;
