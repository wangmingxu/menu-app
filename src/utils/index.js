import moment from 'moment';

export default function genTimeRange(day, rangeType) {
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
