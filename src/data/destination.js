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

const generateCity = (id) => {
  return CITIES.find((x) => x.id === id)["city"];
};

const generateSrc = () =>
  `http://picsum.photos/300/200?r=${getRandomInteger(1, 20)}`;

const generatePhoto = () => ({
  src: generateSrc(),
  description: generateDescription(),
});

const generateDestination = (id) => ({
  id: id,
  description: generateDescription(),
  name: generateCity(id),
  pictures: Array.from({ length: getRandomInteger(1, 6) }, generatePhoto),
});

const destinations = [
  generateDestination(0),
  generateDestination(1),
  generateDestination(2),
  generateDestination(3),
  generateDestination(4),
];

export default destinations;
