import { render } from "./framework/render";
import TripView from "./presenter/trip";
import FilterView from "./view/Filters";
import DotsModel from "./model/DotsModel";
import generateFilter from "./data/filter";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const dotsModel = new DotsModel();
const tripPresenter = new TripView(tripContainer, dotsModel);

const filters = generateFilter(dotsModel._dots);
render(new FilterView(filters), filterContainer, "beforeend");
tripPresenter.init();
