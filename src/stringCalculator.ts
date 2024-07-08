export class StringCalculator {
  static add(numbers: string): number {
    if (numbers === '' || !numbers) {
      return 0;
    }

    // Default delimiter pattern to match commas or newline characters
    let delimiterPattern = ',|\n';

    // Check for custom delimiter syntax
    if (numbers.startsWith('//')) {
      const delimiterSectionEndIndex = numbers.indexOf('\n');
      const customDelimiterSection = numbers.substring(2, delimiterSectionEndIndex);

      // Extract multiple custom delimiters enclosed in square brackets
      const customDelimiters = customDelimiterSection.match(/\[([^\[\]]+)\]/g);

      if (customDelimiters) {
        delimiterPattern = customDelimiters.map(d => {
          const delimiter = d.substring(1, d.length - 1);
          return this.escapeRegExp(delimiter);
        }).join('|');
      } else {
        // Single custom delimiter case
        const customDelimiter = customDelimiterSection;
        delimiterPattern = this.escapeRegExp(customDelimiter);
      }

      // Update numbers to exclude the delimiter section
      numbers = numbers.substring(delimiterSectionEndIndex + 1);
    }

    const numberArray = numbers.split(new RegExp(delimiterPattern));
    this.checkForNegatives(numberArray);
    return this.calculateSum(numberArray);
  }

  private static calculateSum(numberArray: string[]): number {
    return numberArray.reduce((sum, num) => {
      const parsedNum = parseInt(num);
      return parsedNum <= 1000 ? sum + parsedNum : sum;
    }, 0);
  }

  private static checkForNegatives(numberArray: string[]): void {
    const negativeNumbers = numberArray.filter(num => parseInt(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negatives not allowed: ${negativeNumbers.join(', ')}`);
    }
  }

  // Escape special characters
  private static escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }
}