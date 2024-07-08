import { StringCalculator } from "./stringCalculator";

// It will test all the testcases for StringCalculator
describe("StringCalculator", () => {
  test("should return 0 for an empty string", () => {
    expect(StringCalculator.add("")).toBe(0);
  });

  test("should return the number for a single number input", () => {
    expect(StringCalculator.add("1")).toBe(1);
  });

  test("should return the sum for two numbers separated by a comma", () => {
    expect(StringCalculator.add("1,2")).toBe(3);
  });

  test("should return the sum for multiple numbers separated by commas", () => {
    expect(StringCalculator.add("1,2,3,4,5")).toBe(15);
  });

  test('should handle new lines between numbers', () => {
    expect(StringCalculator.add('1\n2,3')).toBe(6);
  });

  test('should allow custom delimiter', () => {
    expect(StringCalculator.add('//;\n1;2')).toBe(3);
  });

  test('should allow custom delimiter with any length', () => {
    expect(StringCalculator.add('//[***]\n1***2***3')).toBe(6);
  });

  test('should allow multiple custom delimiters', () => {
    expect(StringCalculator.add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('should allow multiple custom delimiters with longer length', () => {
    expect(StringCalculator.add('//[***][%%%]\n1***2%%%3')).toBe(6);
  });
});
