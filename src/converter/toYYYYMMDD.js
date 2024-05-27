/**
 * 日付オブジェクトをYYYY/MM/DD形式の文字列に変換します
 * @param date
 * @returns {string}
 */
export const toYYYYMMDD = (date) => {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
