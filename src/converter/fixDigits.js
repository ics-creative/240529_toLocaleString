/**
 * 数値を指定した桁数で整形します
 * @param number
 * @param digit
 * @returns {string}
 */
export const fixDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};
