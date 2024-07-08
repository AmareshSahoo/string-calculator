export class StringCalculator {
  static add(numbers: string): number {
    if (numbers === '' || !numbers) {
      return 0;
    }

    // Regex to match commas or newline characters.
    const regex = /,|\n/;
    const numberArray = numbers.split(regex);
    return numberArray.reduce((sum, num) => sum + parseInt(num), 0);
  }
}