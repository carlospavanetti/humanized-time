import humanizedTime from '../lib/index.js';

it('Should handle time around now', () => {
  const now = new Date();
  expect(humanizedTime(now)).toBe('just now');
});
