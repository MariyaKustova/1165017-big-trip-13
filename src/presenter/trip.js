import {render, remove} from '../utils/render';
import NoPointsView from '../view/no-points';
import Sort from '../view/sorting';
import ListView from '../view/list';
import PointPresenter from '../presenter/point';
import {sortPointsUpDay, sortPointsDownDuration, sortPointsDownPrice} from '../utils/common';
import {SortType, UpdateType, UserAction, RenderPosition} from '../utils/const';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.SORT_DEFAULT;

    this._noPointsComponent = new NoPointsView();
    this._sort = null;
    this._listComponent = new ListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.SORT_DEFAULT:
        this._pointsModel.getPoints().sort(sortPointsUpDay);
        break;
      case SortType.SORT_TIME:
        this._pointsModel.getPoints().sort(sortPointsDownDuration);
        break;
      case SortType.SORT_PRICE:
        this._pointsModel.getPoints().sort(sortPointsDownPrice);
        break;
    }

    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this.clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this.clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this.clearTrip();
    this._renderTrip();
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sort !== null) {
      this._sort = null;
    }
    this._sort = new Sort(this._currentSortType);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer.children[0], this._sort, RenderPosition.AFTEREND);
  }

  _changeFilter() {
    render(this._tripContainer.children[0], this._sort, RenderPosition.AFTEREND);
    this._filter.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(waypoint);
    this._pointPresenter[waypoint.id] = pointPresenter;
  }

  _renderPoints(waypoints) {
    waypoints.forEach((waypoint) => {
      this._renderPoint(waypoint);
    });
  }

  _renderTrip() {
    const waypoints = this._getPoints();
    const waypointsCount = waypoints.length;
    if (waypointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(waypoints);
  }

  clearTrip({resetSortType = false} = {}) {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    remove(this._sort);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
