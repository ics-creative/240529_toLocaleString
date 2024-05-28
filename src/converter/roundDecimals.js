/**
 * 小数を丸めます
 * @param {number} number 丸めたい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string}
 */
export const roundDecimals = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};
