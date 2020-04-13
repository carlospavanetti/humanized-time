import humanizedTime from '../lib/index.js';
import { SECOND, MINUTE, HOUR } from '../lib/constants';

it('Should handle time around now', () => {
  const now = new Date(Date.now());
  expect(humanizedTime(now)).toBe('just now');
});

it('Should handle option to return an object', () => {
  const now = new Date(Date.now());
  expect(humanizedTime(now, { output: 'descriptive' })).toEqual({
    moment: 'now',
  });
});

it('Should handle a time 1 minute ago', () => {
  const oneMinute = new Date(Date.now() - MINUTE);
  expect(humanizedTime(oneMinute)).toBe('1 minute ago');
});

it('Should handle a time of more minutes ago', () => {
  Array.from(Array(8)).forEach((_, index) => {
    const minutes = index + 2;
    const minutesAgo = new Date(Date.now() - minutes * MINUTE);
    expect(humanizedTime(minutesAgo)).toBe(`${minutes} minutes ago`);
  });
});

it('Should handle a time of 1 hour ago', () => {
  const oneHour = new Date(Date.now() - HOUR);
  expect(humanizedTime(oneHour)).toBe('1 hour ago');
});

it('Should handle a time of more hours ago', () => {
  Array.from(Array(8)).forEach((_, index) => {
    const hours = index + 2;
    const hoursAgo = new Date(Date.now() - hours * HOUR);
    expect(humanizedTime(hoursAgo)).toBe(`${hours} hours ago`);
  });
});

it('Should accept descriptive option with minutes ago', () => {
  const minutesAgo = new Date(Date.now() - 2 * MINUTE);
  expect(humanizedTime(minutesAgo, { output: 'descriptive' })).toEqual({
    moment: 'past',
    value: 2,
    unit: 'minute',
  });
});

it('Should accept descriptive option with hours ago', () => {
  const minutesAgo = new Date(Date.now() - 5 * HOUR);
  expect(humanizedTime(minutesAgo, { output: 'descriptive' })).toEqual({
    moment: 'past',
    value: 5,
    unit: 'hour',
  });
});

it('Should accept option to consider seconds', () => {
  const secondsAgo = new Date(Date.now() - 59 * SECOND);
  expect(humanizedTime(secondsAgo, { precision: 'seconds' })).toBe(
    '59 seconds ago',
  );
});
