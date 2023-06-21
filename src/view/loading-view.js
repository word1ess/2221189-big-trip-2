import AbstractView from '../framework/view/abstract-view.js';

const loadingTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return loadingTemplate();
  }
}