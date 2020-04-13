import { SECOND, MINUTE, HOUR } from './constants';

export default function humanizedTime(
  time,
  { output = 'default', precision } = {},
) {
  const result = outputMethods[output];

  const now = new Date(Date.now());
  const deltaMs = now - time;

  const nowRange = precision === 'seconds' ? SECOND : MINUTE;
  const aroundNow = deltaMs < nowRange;
  if (aroundNow) return result({ moment: 'now' });

  const lessThanMinutes = nowRange === SECOND && deltaMs < MINUTE;
  if (lessThanMinutes) {
    const seconds = Math.floor(deltaMs / SECOND);
    return result({ moment: 'past', value: seconds, unit: 'second' });
  }

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
