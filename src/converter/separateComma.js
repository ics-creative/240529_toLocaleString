/**
 * 数値をカンマ区切りに変換する
 * @param {number} number カンマ区切りにしたい数値
 * @returns {string}
 */
export const separateComma = (number) => {
  return number.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
};
