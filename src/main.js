import render from "./render";
import TripView from "./presenter/trip";
import FilterView from "./view/Filters";
import DotsModel from "./model/DotsModel";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const dotsModel = new DotsModel();
const tripPresenter = new TripView(tripContainer, dotsModel);

render(new FilterView(), filterContainer, "beforeend");
tripPresenter.init();
