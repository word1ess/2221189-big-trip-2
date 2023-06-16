import AbstractView from "../framework/view/abstract-view.js";

const createSortingItemsTemplate = (sorting, checked) => {
  const { name, queue } = sorting;
  return `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" 
      ${checked ? "checked" : ""}
      ${queue === null ? "disabled" : ""}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`;
};

const sortingTemplate = (sortingItems) => {
  const sortingItemsTemplate = sortingItems
    .map((sorting, index) => createSortingItemsTemplate(sorting, index === 3))
    .join(" ");

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingItemsTemplate}
    </form>`;
};
class SortView extends AbstractView {
  constructor(sortedDots) {
    super();
    this._sortedDots = sortedDots;
  }
  get template() {
    return sortingTemplate(this._sortedDots);
  }
}

export default SortView;
