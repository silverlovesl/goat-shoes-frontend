export class StringUtils {
  static isBlank(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  static formatAmount(src: number): string {
    if (src) {
      return String(src).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return null;
  }
}
