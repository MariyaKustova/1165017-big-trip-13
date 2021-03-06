import SmartView from '../view/smart';
import {renderMoneyChart, renderTypeChart, renderTimeSpendChart} from '../utils/statistics';

const createStatisticsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor(waypoints) {
    super();

    this._data = waypoints;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeSpendChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeSpendChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const types = [];
    this._data.forEach((item) => types.push(item.type.toUpperCase()));
    const labels = [...new Set(types)];

    const BAR_HEIGHT = 55;
    const LABELS_COUNT = labels.length;

    moneyCtx.height = BAR_HEIGHT * LABELS_COUNT;
    typeCtx.height = BAR_HEIGHT * LABELS_COUNT;
    timeSpendCtx.height = BAR_HEIGHT * LABELS_COUNT;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data, labels);
    this._typeChart = renderTypeChart(typeCtx, this._data, labels);
    this._timeChart = renderTimeSpendChart(timeSpendCtx, this._data, labels);
  }
}
