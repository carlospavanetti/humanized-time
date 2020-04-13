import { MINUTE } from './constants';

export default function humanizedTime(time, option) {
  const now = new Date(Date.now());
  const deltaMs = now - time;
  const aroundNow = deltaMs < MINUTE;

  if (aroundNow) {
    return option === 'descriptive' ? { moment: 'now' } : 'just now';
  }

  const minutes = Math.floor(deltaMs / MINUTE);
  return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
}
