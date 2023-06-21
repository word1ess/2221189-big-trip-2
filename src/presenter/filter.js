import { remove, render, replace } from "../framework/render";
import FiltersView from "../view/filters-view";
import { filtersList } from "../utils";
import { UPDATE_TYPES, FILTERS_TYPE } from "../const";

class FilterPresenter {
    constructor(filterContainer, filtersModel, pointsModel) {
        this._filterContainer = filterContainer;
        this._filterComponent = null;
        this._filtersModel = filtersModel;
        this._pointsModel = pointsModel;

        this._pointsModel.addObserver(this._handleModelEvent);
        this._filtersModel.addObserver(this._handleModelEvent);
    }

    get filters() {
        const points = this._pointsModel.points;

        return [
            {
                type: FILTERS_TYPE.EVERYTHING,
                name: 'everything',
                count: filtersList[FILTERS_TYPE.EVERYTHING](points).length
            },
            {
                type: FILTERS_TYPE.FUTURE,
                name: 'future',
                count: filtersList[FILTERS_TYPE.FUTURE](points).length
            },
            {
                type: FILTERS_TYPE.PAST,
                name: 'past',
                count: filtersList[FILTERS_TYPE.PAST](points).length
            }
        ];
    }

    initialize = () => {
        const filters = this.filters;
        const prevFilterComponent = this._filterComponent;

        this._filterComponent = new FiltersView(filters, this._filtersModel.filter);
        this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

        if (prevFilterComponent === null) {
            render(this._filterComponent, this._filterContainer);
            return;
        }

        replace(this._filterComponent, prevFilterComponent);
        remove(prevFilterComponent);
    }

    _handleModelEvent = () => {
        this.initialize();
    }

    _handleFilterTypeChange = (filterType) => {
        if (this._filtersModel.filter === filterType) {
            return;
        }

        this._filtersModel.setFilter(UPDATE_TYPES.MAJOR, filterType);
    }
}

export default FilterPresenter;
