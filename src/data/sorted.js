import { sortedDots } from "../utils";

const generateSortedDots = (dot) =>
  Object.entries(sortedDots).map(([sortedName, sortedDots]) => ({
    name: sortedName,
    sequence: sortedDots(dot),
  }));

export default generateSortedDots;
