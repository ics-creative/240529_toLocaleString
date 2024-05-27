/**
 * 数値を%に変換します
 * @param number
 * @param maximumFractionDigits
 * @returns {string | undefined}
 */
export const toPercentage = (number, maximumFractionDigits) => {
  return number?.toLocaleString("ja-JP", {
    style: "percent",
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};
