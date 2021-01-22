import Observer from "../utils/observer";
import {FilterType} from "../utils/const";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.DEFAULT;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
