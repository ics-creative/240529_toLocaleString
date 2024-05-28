/**
 * 数値を指定した桁数で固定します
 * @param {number} number 小数点固定したい数値
 * @param {number} digit 固定したい桁数
 * @returns {string}
 */
export const fixDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};
