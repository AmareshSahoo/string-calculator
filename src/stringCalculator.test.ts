import { StringCalculator } from './stringCalculator';

// It sould return 0 for an empty string
describe('StringCalculator', () => {
  test('should return 0 for an empty string', () => {
    expect(StringCalculator.add('')).toBe(0);
  });
});
