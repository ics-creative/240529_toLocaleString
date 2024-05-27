/**
 * 数値をカンマ区切りに変換する
 * @param number
 * @returns {string}
 */
export const separateComma = (number) => {
  return number.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
};
