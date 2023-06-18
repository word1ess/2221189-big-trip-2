import { getRandomInteger } from "../utils";
import { TYPE_POINT } from "../constants";
import { nanoid } from "nanoid";

const generateTypeDot = () =>
  TYPE_POINT[getRandomInteger(0, TYPE_POINT.length - 1)];

const identifyFavorite = () => {
  const id = getRandomInteger();
  return id === 1;
};

const generateDot = () => ({
  id: nanoid(),
  basePrice: getRandomInteger(1, 500),
  dateFrom: `2019-07-10T${getRandomInteger(10, 23)}:${getRandomInteger(
    10,
    59
  )}:00.845Z`,
  dateTo: `2019-07-11T${getRandomInteger(10, 23)}:${getRandomInteger(
    10,
    59
  )}:00.375Z`,
  destination: getRandomInteger(0, 4),
  isFavorite: identifyFavorite(),
  offers: [1, 2],
  type: generateTypeDot(),
});

export default generateDot;
