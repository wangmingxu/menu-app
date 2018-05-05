import moment from 'moment';

export function genTimeRange(day, rangeType) {
  const d = moment(moment().set('days', day).format('YYYY MM DD'));
  if (rangeType === 1) {
    return [moment(d).set('hours', 0), moment(d).set('hours', 10)];
  } else if (rangeType === 2) {
    return [moment(d).set('hours', 11), moment(d).set('hours', 14)];
  } else if (rangeType === 3) {
    return [moment(d).set('hours', 15), moment(d).set('hours', 23)];
  }
  return [d, d];
}

export function getMeal() {
  const hour = moment().get('hour');
  if (hour >= 0 && hour <= 10) {
    return 1;
  } else if (hour >= 11 && hour <= 14) {
    return 2;
  } else if (hour >= 15 && hour <= 23) {
    return 3;
  }
  return 1;
}
