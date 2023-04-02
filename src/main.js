import TripView from "./presenter/trip";
import render from "./render";
import FilterView from "./view/Filters";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const tripPresenter = new TripView(tripContainer);

render(new FilterView(), filterContainer, "beforebegin");
tripPresenter.init();
