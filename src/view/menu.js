import Abstract from './abstract';
import {MenuItem} from '../utils/const';

const createMenuTemplate = (currentMenuItem) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn ${currentMenuItem === MenuItem.TABLE ? `trip-tabs__btn--active` : ``}" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
  <a class="trip-tabs__btn ${currentMenuItem === MenuItem.STATS ? `trip-tabs__btn--active` : ``}" data-menu-item="${MenuItem.STATS}" href="#">Stats</a>
</nav>`;
};

export default class MenuView extends Abstract {
  constructor() {
    super();
    this._currentMenuItem = MenuItem.TABLE;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }
  getTemplate() {
    return createMenuTemplate(this._currentMenuItem);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._currentMenuItem = evt.target.dataset.menuItem;
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
