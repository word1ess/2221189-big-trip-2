// const RenderPosition = {
//   BEFOREBEGIN: "beforebegin",
//   AFTERBEGIN: "afterbegin",
//   BEFOREEND: "beforeend",
//   AFTEREND: "afterend",
// };

const render = (component, container, place) => {
  console.log(place, component, container);
  container.insertAdjacentElement(place, component._element);
};

export default render;
