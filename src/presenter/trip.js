import {render, RenderPosition} from '../utils/render';
import NoPointsView from '../view/no-points';
import Sort from '../view/sorting';
import ListView from '../view/list';
import PointPresenter from '../presenter/point';
import {updateItem, sortPointDownDate, sortPointDownPrice} from '../utils/common';
import {SortType, FilterType} from '../utils/const';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.SORT_DEFAULT;
    this._currentFilterType = FilterType.DEFAULT;

    this._noPointsComponent = new NoPointsView();
    this._sort = new Sort();
    this._listComponent = new ListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(waypoints) {
    this._waypoints = waypoints.slice();
    this._sourceWaypoints = waypoints.slice();
    this._renderTrip();
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._waypoints = updateItem(this._waypoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoint(sortType) {
    switch (sortType) {
      case SortType.SORT_TIME:
        this._waypoints.sort(sortPointDownDate);
        break;
      case SortType.SORT_PRICE:
        this._waypoints.sort(sortPointDownPrice);
        break;
      default:
        this._waypoints = this._sourceWaypoints.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoint(sortType);
    this._clearTrip();
    this._renderTrip();
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContainer.children[0], this._sort, RenderPosition.AFTEREND);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(waypoint);
    this._pointPresenter[waypoint.id] = pointPresenter;
  }

  _renderPoints() {
    for (const waypoint of this._waypoints) {
      this._renderPoint(waypoint);
    }
  }

  _clearTrip() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoPoints();
    }

    this._renderSort();
    this._renderList();
    this._renderPoints();
  }
}
