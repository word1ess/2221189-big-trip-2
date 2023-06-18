import { getRandomInteger } from "../utils";
import { TITLES_OFFER } from "../constants";

const generateTitleOffer = () =>
  TITLES_OFFER[getRandomInteger(0, TITLES_OFFER.length - 1)];

const generateOffer = (id) => ({
  id: id,
  title: generateTitleOffer(),
  price: getRandomInteger(1, 200),
});

const offersByType = [
  {
    type: "taxi",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "bus",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "train",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "ship",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "drive",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "flight",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "check-in",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "sightseeing",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
  {
    type: "restaurant",
    offers: [generateOffer(1), generateOffer(2), generateOffer(3)],
  },
];

export default offersByType;
