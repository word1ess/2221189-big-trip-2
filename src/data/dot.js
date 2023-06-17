import { getRandomInteger } from "../utils";
import { TYPES_POINT } from "../constants";
import { nanoid } from "nanoid";

const generateTypeDot = () =>
  TYPES_POINT[getRandomInteger(0, TYPES_POINT.length - 1)];

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
  destination: getRandomInteger(1, 2),
  isFavorite: identifyFavorite(),
  offers: [1, 2],
  type: generateTypeDot(),
});

export default generateDot;
