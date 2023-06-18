const CITIES = [
  {
    id: 0,
    city: "Tokyo",
  },
  {
    id: 1,
    city: "Toronto",
  },
  {
    id: 2,
    city: "Cape Town",
  },
  {
    id: 3,
    city: "Paris",
  },
  {
    id: 4,
    city: "Milan",
  },
];

const DESCRIPTIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Cras aliquet varius magna, non porta ligula feugiat eget.",
  "Fusce tristique felis at fermentum pharetra.",
  "Aliquam id orci ut lectus varius viverra.",
  "Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.",
  "Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",
  "Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.",
  "Sed sed nisi sed augue convallis suscipit in sed felis.",
  "Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.",
  "In rutrum ac purus sit amet tempus.",
];

const TITLE_OFFER = [
  "Add a child safety seat",
  "Stay overnight",
  "Add lunch",
  "Rent a polaroid",
  "Add a place for a pet",
  "Book a window seat",
  "Book a place in the recreation area",
  "Use the translator service",
  "Upgrade to a business class",
];

const TYPE_POINT = [
  "taxi",
  "bus",
  "train",
  "ship",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant",
];

const FILTERS_TYPE = {
  EVERYTHING: "everything",
  FUTURE: "future",
  PAST: "past",
};

const FILTERS_MESSAGE = {
  EVERYTHING: "Click New Event to create your first point",
  FUTURE: "There are no future events now",
  PAST: "There are no past events now",
};

const SORTED_TYPE = {
  DAY: "day",
  TIME: "time",
  PRICE: "price",
  EVENT: "event",
  OFFERS: "offers",
};

const COUNT_DOT = 20;

const MODE_FOR_DOT = {
  EDITING: "EDITING",
  DEFAULT: "DEFAULT",
};

export {
  CITIES,
  TITLE_OFFER,
  DESCRIPTIONS,
  TYPE_POINT,
  COUNT_DOT,
  FILTERS_TYPE,
  FILTERS_MESSAGE,
  SORTED_TYPE,
  MODE_FOR_DOT,
};
