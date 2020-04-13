import { SECOND, MINUTE, HOUR, DAY } from './constants';

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

  const spans = [DAY, HOUR, MINUTE, SECOND];
  const units = ['day', 'hour', 'minute', 'second'];
  function biggerTimespan(bigger, span, index) {
    if (bigger) return bigger;
    if (deltaMs < span) return;

    const value = Math.floor(deltaMs / span);
    return { moment: 'past', value, unit: units[index] };
  }

  return result(spans.reduce(biggerTimespan, undefined));
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
