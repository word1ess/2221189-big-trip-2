// const RenderPosition = {
//   BEFOREBEGIN: "beforebegin",
//   AFTERBEGIN: "afterbegin",
//   BEFOREEND: "beforeend",
//   AFTEREND: "afterend",
// };

const render = (component, container, place) => {
  console.log(component, container, place);
  container.insertAdjacentElement(place, component.getElement());
};

export default render;
