import { MODE_FOR_DOT, USER_ACTION, UPDATE_TYPE } from "../constants";
import { render, replace, remove } from "../framework/render";
import { getDifference } from "../utils";
import DotView from "../view/dot";
import FormChangeView from "../view/form-change";

class DotPresenter {
  constructor(dots, listDot, data, modeChange) {
    this._data = data;
    this._dotsModel = dots;
    this._listDotComponent = listDot;
    this._mode = MODE_FOR_DOT.DEFAULT;
    this._handleModeChange = modeChange;
    this._dot;
    this._offers;
    this._destination;
    this._dotComponent;
    this._dotEditComponent;
  }

  init = (dot) => {
    this._dot = dot;

    const prevDotComponent = this._dotComponent;
    const prevDotChangeComponent = this._dotEditComponent;

    this._offers = this._dotsModel.getOffers(this._dot);
    this._destination = this._dotsModel.getDestination(this._dot);
    this._dotComponent = new DotView(
      this._dot,
      this._offers,
      this._destination
    );

    this._dotEditComponent = new FormChangeView(
      this._dot,
      this._offers,
      this._destination
    );

    this._dotComponent._setFavoriteClickHandler(this._handleFavoriteClick);
    this._dotComponent.setEditClickHandler(this._handleEditSubmitClick);
    this._dotEditComponent.setFormSubmitHandler(this._handleFormSubmitClick);
    this._dotEditComponent.setButtonClickHandler(this._handeButtonClick);
    this._dotEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (!prevDotComponent || !prevDotChangeComponent) {
      render(this._dotComponent, this._listDotComponent, "beforeend");
      return;
    }

    if (this._mode === MODE_FOR_DOT.DEFAULT) {
      replace(this._dotComponent, prevDotComponent);
    }

    if (this._mode === MODE_FOR_DOT.EDITING) {
      replace(this._dotEditComponent, prevDotChangeComponent);
    }

    remove(prevDotComponent);
    remove(prevDotChangeComponent);
  };

  _handleFavoriteClick = () => {
    this._data(USER_ACTION.UPDATE_DOT, UPDATE_TYPE.MINOR, {
      ...this._dot,
      isFavorite: !this._dot.isFavorite,
    });
  };

  _handleEditSubmitClick = () => {
    this._replaceDotToForm(this._dot);
    document.addEventListener("keydown", this._onEscKeyDown);
  };
  _handleFormSubmitClick = (update) => {
    const isMinorUpdate =
      this._dot.basePrice !== update.basePrice ||
      this._dot._offers.toString() !== update._offers.toString() ||
      getDifference(this._dot.dateTo, this._dot.dateFrom, "minute") !==
        getDifference(this.update.dateTo, this.update.dateFrom, "minute");

    this._replaceFormToDot();
    this._data(
      USER_ACTION.UPDATE_DOT,
      isMinorUpdate ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH,
      dot
    );
    document.removeEventListener("keydown", this._onEscKeyDown);
  };

  _handeButtonClick = () => {
    this._replaceFormToDot();
    document.removeEventListener("keydown", this._onEscKeyDown);
  };

  _handleDeleteClick = (dot) => {
    this._data(USER_ACTION.DELETE_DOT, UPDATE_TYPE.MINOR, dot);
  };

  destroy = () => {
    remove(this._dotComponent);
    remove(this._dotEditComponent);
  };

  resetView = () => {
    if (this._mode !== MODE_FOR_DOT.DEFAULT) {
      this._replaceFormToDot;
    }
  };

  _replaceDotToForm = () => {
    this._handleModeChange();
    this._mode = MODE_FOR_DOT.EDITING;
    replace(this._dotEditComponent, this._dotComponent);
  };

  _replaceFormToDot = () => {
    this._mode = MODE_FOR_DOT.DEFAULT;
    replace(this._dotComponent, this._dotEditComponent);
  };

  _onEscKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      this._replaceFormToDot();
      document.removeEventListener("keydown", this._onEscKeyDown);
    }
  };

  _onSaveButtonClick = (e) => {
    e.preventDefault();
    this._replaceFormToDot();
    this._dotEditComponent.element.removeEventListener(
      "submit",
      this._onSaveButtonClick
    );
  };

  _onRollupButtonClick = () => {
    this._replaceFormToDot();
    this._dotEditComponent.element.removeEventListener(
      "click",
      this._onRollupButtonClick
    );
  };
}

export default DotPresenter;
