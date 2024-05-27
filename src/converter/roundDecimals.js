/**
 * 小数を丸めます
 * @param number
 * @param maximumFractionDigits
 * @returns {string}
 */
export const roundDecimals = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};
