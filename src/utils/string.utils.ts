export class StringUtils {
  /**
   * Check if input is blank string
   * @param str input string
   * @returns if input is "" or null or undefined
   */
  static isBlank(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  /**
   * Format number with commas
   * @param src input number
   * @returns formatted number. ex: 2000 => 2,000
   */
  static formatAmount(src: number): string {
    if (src) {
      return String(src).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return null;
  }
}
