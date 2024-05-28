/**
 * 日付オブジェクトを和暦表示に変換します
 * @param {Date} date 和暦表示に変換したい日付オブジェクト
 * @returns {string}
 */
export const toJapaneseCalendar = (date) => {
  return date.toLocaleString("ja-JP-u-ca-japanese", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
