import { MINUTE, HOUR } from './constants';

export default function humanizedTime(time, { output = 'default' } = {}) {
  const result = outputMethods[output];

  const now = new Date(Date.now());
  const deltaMs = now - time;

  const aroundNow = deltaMs < MINUTE;
  if (aroundNow) return result({ moment: 'now' });

  const lessThanHour = deltaMs < HOUR;
  if (lessThanHour) {
    const minutes = Math.floor(deltaMs / MINUTE);
    return result({ moment: 'past', value: minutes, unit: 'minute' });
  }

  const hours = Math.floor(deltaMs / HOUR);
  return result({ moment: 'past', value: hours, unit: 'hour' });
}

const outputMethods = {
  default({ moment, value, unit }) {
    if (moment === 'now') return 'just now';

    return value === 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
  },
  descriptive(description) {
    return description;
  },
};
