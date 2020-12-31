import {render, RenderPosition} from '../utils/render';
import NoPointsView from '../view/no-points';
import SortingView from '../view/sorting';
import ListView from '../view/list';

export default class Trip {
  constructor(tripContainer, tripPoints) {
    this._tripContainer = tripContainer;
    this._tripPoints = tripPoints;

    this._noPointsView = new NoPointsView();
    this._sortingView = new SortingView();
    this._listComponent = new ListView();
  }

  init(waypoints) {
    this._waypoints = waypoints;
  }

  _renderNoPoint() {
    render(this._tripContainer, new NoPointsView(), RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    render(this._tripContainer.children[0], new SortingView(), RenderPosition.AFTEREND);
  }

  _renderList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint() {

  }

  _renderTrip() {

  }
}
