import { getRandomInteger } from "../utils";
import { CITIES, DESCRIPTIONS } from "../constants";

const generateDescription = () => {
  const randomLength = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const randomDescription = [];

  for (let i = 0; i < randomLength - 1; i++) {
    randomDescription[i] =
      DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  }

  return randomDescription;
};

const generateCity = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateSrc = () =>
  `http://picsum.photos/300/200?r=${getRandomInteger(1, 20)}`;

const generatePhoto = () => ({
  src: generateSrc(),
  description: generateDescription(),
});

const generateDestination = (id) => ({
  id: id,
  description: generateDescription(),
  name: generateCity(),
  pictures: Array.from({ length: getRandomInteger(1, 6) }, generatePhoto),
});

const Destinations = [generateDestination(1), generateDestination(2)];

export default Destinations;
