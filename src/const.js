const TYPES_POINT = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const FILTERS_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const FILTERS_MESSAGE = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  past: 'There are no past events now'
};

const SORTED_TYPE = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_TASK',
}

const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
}

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
};

export {
  TYPES_POINT,
  FILTERS_TYPE,
  FILTERS_MESSAGE,
  SORTED_TYPE,
  USER_ACTIONS,
  UPDATE_TYPES,
  METHOD
};

