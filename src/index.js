import { SECOND, MINUTE, HOUR, DAY } from './constants';

export default function humanizedTime(
  time,
  { reference = new Date(Date.now()), format = 'default', precision } = {},
) {
  const result = typeof format === 'function' ? format : outputMethods[format];

  const deltaMs = Math.abs(time - reference);
  const moment = (time - reference) / deltaMs > 0 ? 'future' : 'past';

  const nowRange = precision === 'seconds' ? SECOND : MINUTE;
  const aroundNow = deltaMs < nowRange;
  if (aroundNow) return result({ moment: 'now' });

  const spans = [DAY, HOUR, MINUTE, SECOND];
  const units = ['day', 'hour', 'minute', 'second'];
  function biggerTimespan(bigger, span, index) {
    if (bigger) return bigger;
    if (deltaMs < span) return;

    const value = Math.floor(deltaMs / span);
    return { moment, value, unit: units[index] };
  }

  return result(spans.reduce(biggerTimespan, undefined));
}

const outputMethods = {
  default({ moment, value, unit }) {
    if (moment === 'now') return 'just now';

    const time = value === 1 ? `1 ${unit}` : `${value} ${unit}s`;
    return moment === 'past' ? `${time} ago` : `in ${time}`;
  },
  descriptive(description) {
    return description;
  },
};
