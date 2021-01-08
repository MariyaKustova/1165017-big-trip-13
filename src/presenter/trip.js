import {render, RenderPosition} from '../utils/render';
import NoPointsView from '../view/no-points';
import SortingView from '../view/sorting';
import ListView from '../view/list';
import Point from '../presenter/point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._noPointsView = new NoPointsView();
    this._sortingView = new SortingView();
    this._listComponent = new ListView();
  }

  init(waypoints) {
    this._waypoints = waypoints;
    this._renderTrip();
  }

  _renderNoPoints() {
    render(this._tripContainer, new NoPointsView(), RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer.children[0], new SortingView(), RenderPosition.AFTEREND);
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(waypoint) {
    const pointPresenter = new Point(this._listComponent);
    pointPresenter.init(waypoint);
  }

  _renderPoints() {
    for (const waypoint of this._waypoints) {
      this._renderPoint(waypoint);
    }
  }

  _renderTrip() {
    if (this._waypoints.length === 0) {
      this._renderNoPoints();
    }

    this._renderSorting();
    this._renderList();
    this._renderPoints();
  }
}
