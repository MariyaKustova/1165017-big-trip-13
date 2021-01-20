import {render, remove, RenderPosition} from '../utils/render';
import NoPointsView from '../view/no-points';
import Sort from '../view/sorting';
import ListView from '../view/list';
import PointPresenter from '../presenter/point';
import {sortPointsUpDay, sortPointsDownDuration, sortPointsDownPrice} from '../utils/common';
import {SortType} from '../utils/const';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.SORT_DEFAULT;

    this._noPointsComponent = new NoPointsView();
    this._sort = new Sort();
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
        this.this._pointsModel.getPoints().sort(sortPointsUpDay);
        break;
      case SortType.SORT_TIME:
        this.this._pointsModel.getPoints().sort(sortPointsDownDuration);
        break;
      case SortType.SORT_PRICE:
        this.this._pointsModel.getPoints().sort(sortPointsDownPrice);
        break;
    }

    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
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
    render(this._tripContainer.children[0], this._sort, RenderPosition.AFTEREND);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderPoints() {
    for (const waypoint of this._waypoints) {
      this._renderPoint(waypoint);
    }
  }

  _renderTrip() {
    if (this._getPoints.length === 0) {
      this._renderNoPoints();
    }

    this._renderSort();
    this._renderPoints();
  }

  clearTrip() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
    }
  }
}
