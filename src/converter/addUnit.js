/**
 * 単位を付与します
 * @param number
 * @param unit
 * @returns {string}
 */
export const addUnit = (number, unit) => {
  const locale = adjustLocale(unit);
  return number.toLocaleString(locale, {
    style: "unit",
    unit: unit,
    compactDisplay: "short",
  });
};

/**
 * 単位に応じてロケールを調整します
 * 例えばkmの場合、ja-JPだと「キロメートル」と返されてしまいますが、en-USだと「km」と返されます
 * そのため、キロメートル、キログラム、リットルのみen-USに変更します。それ以外は日本語にします
 * @param unit
 */
const adjustLocale = (unit) => {
  switch (unit) {
    case "kilometer":
      return "en-US";
    case "kilogram":
      return "en-US";
    case "litter":
      return "en-US";
    default:
      return "ja-JP";
  }
};
