/**
 * 〜万、〜億表記の数値に変換します
 * @param {number} number 変換したい数値
 * @returns {string}
 */
export const toKanjiNumber = (number) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
  });
};

/**
 * 〜万、〜億表記の数値に変換します（小数点表記）
 * @param {number} number 変換したい数値
 * @param {number} digit 小数点以下の最大表示桁数
 * @returns {string}
 */
export const toKanjiNumberWithDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};
