import { MINUTE } from './constants';

export default function humanizedTime(time, option) {
  const now = new Date(Date.now());
  const deltaMs = now - time;
  const aroundNow = deltaMs < MINUTE;

  if (aroundNow) {
    return option === 'descriptive' ? { moment: 'now' } : 'just now';
  }
  return '1 minute ago';
}
