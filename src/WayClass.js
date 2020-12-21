import Point from './PointClass';
import {dateParser} from './utils';

export default class Way {
  constructor(points) {
    this.points = points.map((point) => new Point(point));
  }

  get date() {
    return dateParser.getDateDif();
  }
}
