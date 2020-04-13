import { MINUTE, HOUR } from './constants';

export default function humanizedTime(time, option) {
  const now = new Date(Date.now());
  const deltaMs = now - time;

  const aroundNow = deltaMs < MINUTE;
  if (aroundNow) {
    return option === 'descriptive' ? { moment: 'now' } : 'just now';
  }

  const lessThanHour = deltaMs < HOUR;
  if (lessThanHour) {
    const minutes = Math.floor(deltaMs / MINUTE);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }

  const hours = Math.floor(deltaMs / HOUR);
  return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
}
