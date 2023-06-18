import { render } from "./framework/render";
import TripView from "./presenter/trip-presenter";
import FilterView from "./view/filters";
import DotsModel from "./model/dots-model";
import generateFilter from "./data/filter";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const dotsModel = new DotsModel();
const tripPresenter = new TripView(tripContainer, dotsModel);

const filters = generateFilter(dotsModel._dots);
render(new FilterView(filters), filterContainer, "beforeend");
tripPresenter.init();
