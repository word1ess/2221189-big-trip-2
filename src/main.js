import TripView from './presenter/trip';
import { render } from './framework/render';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter';
import NewPointButtonView from './view/new-point-button-view';
import PointsApiService from './api/points-api';
import OffersApiService from './api/offers-api';
import DestinationsApiService from './api/destinations-api';

const AUTHORIZATION = 'Basic a5mgd5w2tbyqp3hw6t';
const SERVER = 'https://18.ecmascript.pages.academy/big-trip';

const tripContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newPointContainer = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(SERVER, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(SERVER, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(SERVER, AUTHORIZATION));
const filtersModel = new FiltersModel();

const newPointButtonComponent = new NewPointButtonView();

const tripPresenter = new TripView(tripContainer, pointsModel, offersModel, destinationsModel, filtersModel);
const filterPresenter = new FilterPresenter(filterContainer, filtersModel, pointsModel);

const handleNewPointFormClose = () => {
    newPointButtonComponent.element.disabled = false;
  };

const handleNewPointButtonClick = () => {
    tripPresenter.createPoint(handleNewPointFormClose);
    newPointButtonComponent.element.disabled = true;
};

offersModel.initialize().finally(() => {
  destinationsModel.initialize().finally(() => {
    pointsModel.initialize().finally(() => {
      render(newPointButtonComponent, newPointContainer);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    });
  });
});

tripPresenter.initialize();
filterPresenter.initialize();
