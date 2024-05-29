/**
 * 数値を%に変換します
 * @param {number} number %に変換したい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string}
 */
export const toPercentage = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    style: "percent",
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};
