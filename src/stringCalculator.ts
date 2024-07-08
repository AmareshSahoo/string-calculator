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

  private static calculateSum(numbers: string[]): number {
    return numbers.reduce((sum, num) => sum + this.parseNumber(num), 0);
  }

  private static checkForNegatives(numbers: string[]): void {
    const negatives = numbers.filter(num => this.parseNumber(num) < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  }

  // Escape special characters
  private static escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }

  private static parseNumber(num: string): number {
    const parsed = parseInt(num);
    return parsed <= 1000 ? parsed : 0; // Ignore numbers greater than 1000
  }
}