export default function humanizedTime(timespan, option) {
  return option === 'descriptive' ? { moment: 'now' } : 'just now';
}
