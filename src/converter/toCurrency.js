/**
 * 数値を通貨単位に変換します
 * @param number
 * @param currencyCode
 * @param currencyDisplay
 * @returns {string}
 */
export const toCurrency = (number, currencyCode, currencyDisplay) => {
  return number.toLocaleString("ja-JP", {
    style: "currency",
    currency: currencyCode, // ISO通貨コードを指定する
    currencyDisplay: currencyDisplay, // 通貨表示形式を指定する。symbol, narrowSymbol, code, nameのいずれか
  });
};
