import { filter } from "../utils";

const generateFilter = (dots) =>
  Object.entries(filter).map(([filterName, filterPoint]) => ({
    name: filterName,
    queue: filterPoint(dots),
  }));

export default generateFilter;
