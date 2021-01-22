import Abstract from './abstract';
import {MenuItem} from '../utils/const';

const createMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
  <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATS}" href="#">Stats</a>
</nav>`;
};

export default class MenuView extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }
  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`trip-tabs__btn--active`)) {
      return;
    }
    this._callback.menuClick(evt.target.dataset.menuItem);
    this.setMenuItem(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

    if (item !== null) {
      this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((itemMenu) => itemMenu.classList.remove(`trip-tabs__btn--active`));
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
