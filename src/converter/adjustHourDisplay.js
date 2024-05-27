/**
 * ロケールに合わせて時刻表示を調整します
 * @param date
 * @returns {string}
 */
export const adjustHourDisplay = (date) => {
  const locale = navigator.language; // ユーザーの言語ロケールを取得
  return date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
