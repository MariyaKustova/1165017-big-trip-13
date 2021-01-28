import {render, remove} from '../utils/render';
import {RenderPosition} from '../utils/const';
import {sortPointsUpDay} from '../utils/sort';

import TripInfoView from '../view/trip-info';

export default class TripInfo {
  constructor(tripInfoContainer, PointsModel) {
    this._pointsModel = PointsModel;
    this._tripInfoContainer = tripInfoContainer;
    this._tripInfoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._points = this._pointsModel.getPoints().slice().sort(sortPointsUpDay);

    if (this._points.length > 0) {
      this._renderTripInfo();
    }
  }

  _handleModelEvent() {
    this._destroy();
    this.init();
  }

  _destroy() {
    if (this._tripInfoComponent === null) {
      return;
    }

    remove(this._tripInfoComponent);
    this._tripInfoComponent = null;
  }

  _renderTripInfo() {
    this._tripInfoComponent = new TripInfoView(this._points);
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }
}
