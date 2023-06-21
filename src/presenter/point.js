import { render, replace, remove } from '../framework/render';
import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import { USER_ACTIONS, UPDATE_TYPES } from '../const';
import { getDateDiff } from '../utils';

const Mode = {
    DEFAULT: 'DEFAULT',
    EDITING: 'EDITING'
};

class PointPresenter {
    constructor (trip_list, points, offers, destinations, cities, changeDataCallback, modeChangeCallback) {
        this._tripListComponent = trip_list;
        this._pointsModel = points;
        this._point = null;
        this._offers = offers;
        this._destinations = destinations;
        this._cities = cities;
        this._pointComponent = null;
        this._pointEditComponent = null;
        this._changeData = changeDataCallback;
        this._handleModeChange = modeChangeCallback;
        this._mode = Mode.DEFAULT;
    }

    init(point) {
        const prevPointComponent = this._pointComponent;
        const prevPointEditComponent = this._pointEditComponent;

        this._point = point;

        const currentOffers = this._offers.find((x) => x.type === this._point['type'])['offers']
        const currentDestination = this._destinations.find((x) => x.id === point['destination']);

        this._pointComponent = new PointView(this._point, currentOffers, currentDestination);
        this._pointEditComponent = new EditPointView(this._cities, this._offers, this._destinations,
            this._point, currentOffers, currentDestination);
        
        this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
        this._pointComponent.setEditClickHandler(this._editClickHandler);
        this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);
        this._pointEditComponent.setButtonClickHandler(this._buttonClickHandler);
        this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

        if (prevPointComponent === null || prevPointEditComponent === null) {
            render(this._pointComponent, this._tripListComponent);
            return;
        }

        if (this._mode === Mode.DEFAULT) {
            replace(this._pointComponent, prevPointComponent);
        }

        if (this._mode === Mode.EDITING) {
            replace(this._pointEditComponent, prevPointEditComponent);
        }  

        remove(prevPointComponent);
        remove(prevPointEditComponent);
    }

    destroy() {
        remove(this._pointComponent);
        remove(this._pointEditComponent);
    }

    resetView = () => {
        if (this._mode !== Mode.DEFAULT) {
            this._pointEditComponent.reset(this._point);
            this._replaceFormToPoint();
        }
    }

    _replacePointToForm = () => {
        this._handleModeChange()
        this._mode = Mode.EDITING;
        replace(this._pointEditComponent, this._pointComponent);
    };

    _replaceFormToPoint = () => {
        this._mode = Mode.DEFAULT;
        replace(this._pointComponent, this._pointEditComponent);
    };
    
    _handleFavoriteClick = () => {
        this._changeData(USER_ACTIONS.UPDATE_POINT, UPDATE_TYPES.MAJOR,
            { ...this._point, isFavorite: !this._point.isFavorite });
    };

    _onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {;
          evt.preventDefault();
          this._pointEditComponent.reset(this._point);
          this._replaceFormToPoint();
          document.removeEventListener('keydown', this._onEscKeyDown);
        }
    }

    _editClickHandler = () => {
        this._replacePointToForm();
        document.addEventListener('keydown', this._onEscKeyDown);
    }

    _formSubmitHandler = (point) => {
        const checkMinorUpdate = 
            this._point.basePrice !== point.basePrice ||
            this._point.offers.toString() !== point.offers.toString() ||
            getDateDiff(this._point.dateTo, this._point.dateFrom, 'minute') !==
            getDateDiff(point.dateTo, point.dateFrom, 'minute')
        
        this._replaceFormToPoint();
        this._changeData(
            USER_ACTIONS.UPDATE_POINT,
            checkMinorUpdate ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
            point);
        document.removeEventListener('keydown', this._onEscKeyDown);
    }

    _buttonClickHandler = () => {
        this._pointEditComponent.reset(this._point);
        this._replaceFormToPoint();
        document.removeEventListener('keydown', this._onEscKeyDown);
    }
    
    _handleDeleteClick = (point) => {
        this._changeData(
            USER_ACTIONS.DELETE_POINT,
            UPDATE_TYPES.MINOR,
            point
        );
    }
}

export default PointPresenter;
