/**
 * 日付オブジェクトをYYYY/MM/DD形式の文字列に変換します
 * @param {Date} date YYYY/MM/DD形式に変換したい日付オブジェクト
 * @returns {string}
 */
export const toYYYYMMDD = (date) => {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
