/**
 * 日付オブジェクトを和暦表示に変換します
 * @param date
 * @returns {string}
 */
export const toJapaneseCalendar = (date) => {
  return date.toLocaleString("ja-JP-u-ca-japanese", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
