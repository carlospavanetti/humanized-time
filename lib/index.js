import { MINUTE, HOUR } from './constants';

export default function humanizedTime(time, { output } = {}) {
  const now = new Date(Date.now());
  const deltaMs = now - time;

  const aroundNow = deltaMs < MINUTE;
  if (aroundNow) {
    return output === 'descriptive' ? { moment: 'now' } : 'just now';
  }

  const lessThanHour = deltaMs < HOUR;
  if (lessThanHour) {
    const minutes = Math.floor(deltaMs / MINUTE);
    if (output !== 'descriptive') {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }
    return { moment: 'past', value: minutes, unit: 'minute' };
  }

  const hours = Math.floor(deltaMs / HOUR);
  return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
}
