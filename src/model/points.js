import Observer from '../utils/observer';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(waypoints) {
    this._points = waypoints.slice();
  }

  getPoints() {
    return this._points;
  }
}
