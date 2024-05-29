<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { separateComma } from "./converter/separateComma";
import {
  toKanjiNumber,
  toKanjiNumberWithDigits,
} from "./converter/toKanjiNumber";
import { toPercentage } from "./converter/toPercentage";
import { roundDecimals } from "./converter/roundDecimals.js";
import { toCurrency } from "./converter/toCurrency.js";
import { fixDigits } from "./converter/fixDigits";
import { addUnit } from "./converter/addUnit";
import { toYYYYMMDD } from "./converter/toYYYYMMDD";
import { toJapaneseCalendar } from "./converter/toJapaneseCalendar";
import { adjustHourDisplay } from "./converter/adjustHourDisplay";

// カンマ区切り
const inputSeparateComma = ref();

const computedSeparateComma = computed(() => {
  if (
    inputSeparateComma.value === undefined ||
    typeof inputSeparateComma.value !== "number"
  ) {
    return "";
  }
  return separateComma(inputSeparateComma.value);
});

const inputRoundDecimals = ref<number | undefined>();

const maximumFractionDigitsRound = ref(0);

// 漢字交じり数値
const inputKanjiNumber = ref();
const inputKanjiNumberWithDigits = ref();

const maximumFractionDigitsKanji = ref(0);

const computedKanjiNumber = computed(() => {
  if (inputKanjiNumber.value === undefined) {
    return "";
  }
  return toKanjiNumber(inputKanjiNumber.value);
});

const computedKanjiNumberWithDigits = computed(() => {
  if (
    inputKanjiNumberWithDigits.value === undefined ||
    typeof maximumFractionDigitsKanji.value !== "number"
  ) {
    return "";
  }
  return toKanjiNumberWithDigits(
    inputKanjiNumberWithDigits.value,
    maximumFractionDigitsKanji.value >= 0
      ? maximumFractionDigitsKanji.value
      : 0,
  );
});

// 小数丸め
const computedRoundDecimals = computed(() => {
  if (
    inputRoundDecimals.value === undefined ||
    typeof maximumFractionDigitsRound.value !== "number"
  ) {
    return "";
  }
  return roundDecimals(
    inputRoundDecimals.value,
    maximumFractionDigitsRound.value >= 0
      ? maximumFractionDigitsRound.value
      : 0,
  );
});

// 桁数固定
const inputFixedDigits = ref();
const minimumFractionDigitsFixed = ref(0);

const computedFixedDigits = computed(() => {
  if (
    inputFixedDigits.value === undefined ||
    typeof minimumFractionDigitsFixed.value !== "number"
  ) {
    return "";
  }
  return fixDigits(
    inputFixedDigits.value,
    minimumFractionDigitsFixed.value >= 0
      ? minimumFractionDigitsFixed.value
      : 0,
  );
});

// パーセント
const inputPercent = ref();

const maximumFractionDigitsPercent = ref(0);

const computedPercent = computed(() => {
  if (
    inputPercent.value === undefined ||
    typeof maximumFractionDigitsPercent.value !== "number"
  ) {
    return "";
  }
  return toPercentage(
    inputPercent.value,
    maximumFractionDigitsPercent.value >= 0
      ? maximumFractionDigitsPercent.value
      : 0,
  );
});

// 通貨表示
const inputCurrency = ref();

const selectedCurrency = ref();

const currencyList = [
  {
    label: "円",
    value: "JPY",
  },
  {
    label: "ドル",
    value: "USD",
  },
  {
    label: "ユーロ",
    value: "EUR",
  },
];

const selectedCurrencyDisplay = ref<"symbol" | "narrowSymbol" | "code" | "name">("symbol");

const currencyDisplayList = [
  {
    label: "記号",
    value: "symbol",
  },
  {
    label: "ISOコード",
    value: "code",
  },
  {
    label: "通貨名",
    value: "name",
  },
];
const maximumFractionDigitsCurrency = ref(0);

const computedCurrency = computed(() => {
  if (
    inputCurrency.value === undefined ||
    typeof maximumFractionDigitsCurrency.value !== "number" ||
    selectedCurrency.value === undefined ||
    selectedCurrencyDisplay.value === undefined
  ) {
    return "";
  }
  return toCurrency(
    inputCurrency.value,
    selectedCurrency.value,
    selectedCurrencyDisplay.value,
  );
});

// 単位付与
const inputWithUnit = ref();

const selectedUnit = ref();

const unitList = [
  {
    label: "km",
    value: "kilometer",
  },
  {
    label: "kg",
    value: "kilogram",
  },
  {
    label: "MB",
    value: "megabyte",
  },
  {
    label: "GB",
    value: "gigabyte",
  },
  {
    label: "TB",
    value: "terabyte",
  },
  {
    label: "℃",
    value: "celsius",
  },
  {
    label: "リットル",
    value: "liter",
  },
];

const computedWithUnit = computed(() => {
  if (inputWithUnit.value === undefined || selectedUnit.value === undefined) {
    return "";
  }
  return addUnit(inputWithUnit.value, selectedUnit.value);
});

const today = new Date();

// YYYY/MM/DD日付に変換
const dateYear = ref(today.getFullYear());
const dateMonth = ref(today.getMonth() + 1);
const dateDay = ref(today.getDate());

const computedDateYYYYMMDD = computed(() => {
  const theDate = new Date(dateYear.value, dateMonth.value - 1, dateDay.value);
  return toYYYYMMDD(theDate);
});

// 年を和暦に変換
const calendarYear = ref(today.getFullYear());
const calendarMonth = ref(today.getMonth() + 1);
const calendarDay = ref(today.getDate());

const computedDateJapaneseCalendar = computed(() => {
  const theDate = new Date(
    calendarYear.value,
    calendarMonth.value - 1,
    calendarDay.value,
  );
  return toJapaneseCalendar(theDate);
});

// ロケールに応じた時間表記
const nowData = ref();
const nowDateInterval = ref();
const computedLocaleTime = computed(() => {
  if (nowData.value === undefined) {
    return "";
  }
  return adjustHourDisplay(nowData.value);
});

onMounted(() => {
  nowData.value = new Date();
  nowDateInterval.value = setInterval(() => {
    nowData.value = new Date();
  }, 1000);
});

onBeforeMount(() => {
  nowDateInterval.value && clearInterval(nowDateInterval.value);
});
</script>

<template>
  <div>
    <v-container>
      <h1 class="text-h4 py-8">toLocaleString()を使った表示変換</h1>
      <v-row class="mb-4">
        <p class="mt-6 pl-4">
          toLocaleString()の詳しい使い方は<a
            href="https://ics.media/entry/240529/"
            target="_blank"
            >記事『数値や日付をさまざまな形式の文字列に変換できるtoLocaleString()を使ってスマートに表示する』</a
          >を参照してください
        </p>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">カンマ区切り</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="mt-6">
                <v-col>
                  <div>
                    <v-text-field
                      v-model.number="inputSeparateComma"
                      label="数値"
                      placeholder="123456"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedSeparateComma }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 数値をカンマ区切りに変換する
 * @param {number} number カンマ区切りにしたい数値
 * @returns {string}
 */
const separateComma = (number) => {
  return number.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
};

// separateComma(12345678) => "12,345,678"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">小数丸め</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="9" cols="6">
                  <div>
                    <v-text-field
                      v-model.number="inputRoundDecimals"
                      label="数値"
                      placeholder="1.23456"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <v-text-field
                      type="number"
                      v-model.number="maximumFractionDigitsRound"
                      label="小数の表示桁数"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedRoundDecimals }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 小数を丸めます
 * @param {number} number 丸めたい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string}
 */
const roundDecimals = (number, maximumFractionDigits) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};


// roundDecimals(1.2345678, 3) => "1.235"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">小数桁固定</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="9" cols="6">
                  <div>
                    <v-text-field
                      v-model.number="inputFixedDigits"
                      label="数値"
                      placeholder="123.4"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <v-text-field
                      type="number"
                      v-model.number="minimumFractionDigitsFixed"
                      label="小数の固定表示桁数"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedFixedDigits }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 数値を指定した桁数で固定します
 * @param {number} number 小数点固定したい数値
 * @param {number} digit 固定したい桁数
 * @returns {string}
 */
const fixDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};

// fixDigits(1.23, 4) => "1.2300"
// fixDigits(1.2345678, 3) => "1.235"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">〜万、〜億表記</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col>
                  <div>
                    <v-text-field
                      v-model.number="inputKanjiNumber"
                      label="数値"
                      placeholder="123456"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedKanjiNumber }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 〜万、〜億表記の数値に変換します
 * @param {number} number 変換したい数値
 * @returns {string}
 */
const toKanjiNumber = (number) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
  });
};

// toKanjiNumber(40000) => "4万"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col> </v-row
      ><v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6"
                  >〜万、〜億表記（小数点表記）</v-card-title
                >
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="9" cols="6">
                  <div>
                    <v-text-field
                      v-model.number="inputKanjiNumberWithDigits"
                      label="数値"
                      placeholder="123456"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <v-text-field
                      type="number"
                      v-model.number="maximumFractionDigitsKanji"
                      label="小数の表示桁数"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span
                  >{{ computedKanjiNumberWithDigits }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 〜万、〜億表記の数値に変換します（小数点表記）
 * @param {number} number 変換したい数値
 * @param {number} digit 小数点以下の最大表示桁数
 * @returns {string}
 */
const toKanjiNumberWithDigits = (number, digit) => {
  return number.toLocaleString("ja-JP", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: digit, // 小数点以下の最大桁数を指定する
    minimumFractionDigits: digit, // 小数点以下の最小桁数を指定する
  });
};

// toKanjiNumberWithDigits(123456, 2) => "12.35万"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">パーセント</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="9" cols="6">
                  <div>
                    <v-text-field
                      v-model.number="inputPercent"
                      label="数値"
                      placeholder="0.123"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <div>
                    <v-text-field
                      type="number"
                      v-model.number="maximumFractionDigitsPercent"
                      label="小数の表示桁数"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedPercent }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 数値を%に変換します
 * @param {number} number %に変換したい数値
 * @param {number} maximumFractionDigits 小数点以下の最大表示桁数
 * @returns {string | undefined}
 */
const toPercentage = (number, maximumFractionDigits) => {
  return number?.toLocaleString("ja-JP", {
    style: "percent",
    maximumFractionDigits: maximumFractionDigits, // 小数点以下の最大桁数を指定する
  });
};

// toPercentage(0.12, 0) => "12%"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">通貨</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="8" cols="4">
                  <div>
                    <v-text-field
                      v-model.number="inputCurrency"
                      label="数値"
                      placeholder="123.45"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col md="2" cols="4">
                  <v-select
                    label="表記"
                    v-model="selectedCurrencyDisplay"
                    :items="currencyDisplayList"
                    item-title="label"
                  />
                </v-col>
                <v-col md="2" cols="4">
                  <v-select
                    label="通貨"
                    v-model="selectedCurrency"
                    :items="currencyList"
                    item-title="label"
                  />
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedCurrency }}
                </p>
              </v-row>
              <v-row>
                <p class="text-subtitle-2 pl-4 mt-2 pr-2">
                  ※日本円には小数点以下の表記が一般的には使われないので、整数に丸められます。
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 数値を通貨単位に変換します
 * @param {number} number
 * @param {string} currencyCode
 * @param {"symbol" | "narrowSymbol" | "code" | "name"} currencyDisplay 通貨の表示形式
 * @returns {string}
 */
const toCurrency = (number, currencyCode, currencyDisplay) => {
  return number.toLocaleString("ja-JP", {
    style: "currency",
    currency: currencyCode, // ISO通貨コードを指定する
    currencyDisplay: currencyDisplay, // 通貨表示形式を指定する。symbol, narrowSymbol, code, nameのいずれか
  });
};

// toCurrency(123.456, "JPY", "symbol") => "¥123"
// toCurrency(123.456, "USD", "symbol") => "$123.46"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6">単位付与</v-card-title>
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col md="9" cols="6">
                  <div>
                    <v-text-field
                      v-model.number="inputWithUnit"
                      label="数値"
                      placeholder="12345"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <v-select
                    label="単位"
                    v-model="selectedUnit"
                    :items="unitList"
                    item-title="label"
                  />
                </v-col>
              </v-row>
              <v-row>
                <p class="pl-4">
                  <span class="text-h6">結果：</span>{{ computedWithUnit }}
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 単位を付与します
 * @param {number} number 単位を付与したい数値
 * @param {string} unit 単位
 * @returns {string}
 */
const addUnit = (number, unit) => {
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
 * @param {string} unit 単位
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
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6"
                  >日付をYYYY/MM/DDに変換</v-card-title
                >
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col>
                  <v-row>
                    <v-col>
                      <v-select
                        label="年"
                        v-model="dateYear"
                        :items="
                          Array.from(
                            { length: 101 },
                            (_, i) => new Date().getFullYear() - 100 + i,
                          )
                        "
                        item-title="label"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="月"
                        v-model="dateMonth"
                        :items="Array.from({ length: 12 }, (_, i) => i + 1)"
                        item-title="label"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="日"
                        v-model="dateDay"
                        :items="Array.from({ length: 31 }, (_, i) => i + 1)"
                        item-title="label"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="pl-4">
                    <span class="text-h6">結果：</span
                    >{{ computedDateYYYYMMDD }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 日付オブジェクトをYYYY/MM/DD形式の文字列に変換します
 * @param {Date} date YYYY/MM/DD形式に変換したい日付オブジェクト
 * @returns {string}
 */
const toYYYYMMDD = (date) => {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// toYYYYMMDD(new Date(2024, 0, 1)) => "2024/01/01"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6"
                  >日付を和暦に変換</v-card-title
                >
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <v-col>
                  <v-row>
                    <v-col>
                      <v-select
                        label="年"
                        v-model="calendarYear"
                        :items="
                          Array.from(
                            { length: 101 },
                            (_, i) => new Date().getFullYear() - 100 + i,
                          )
                        "
                        item-title="label"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="月"
                        v-model="calendarMonth"
                        :items="Array.from({ length: 12 }, (_, i) => i + 1)"
                        item-title="label"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        label="日"
                        v-model="calendarDay"
                        :items="Array.from({ length: 31 }, (_, i) => i + 1)"
                        item-title="label"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p class="pl-4">
                    <span class="text-h6">結果：</span
                    >{{ computedDateJapaneseCalendar }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * 日付オブジェクトを和暦表示に変換します
 * @param {Date} date 和暦表示に変換したい日付オブジェクト
 * @returns {string}
 */
const toJapaneseCalendar = (date) => {
  return date.toLocaleString("ja-JP-u-ca-japanese", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// toJapaneseCalendar(new Date(2024, 0, 1)) => "令和6年1月1日"
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <v-container class="pa-0">
              <v-row>
                <v-card-title class="pa-4 text-h6"
                  >ロケールに応じた一般的な時間表記</v-card-title
                >
                <v-divider></v-divider>
              </v-row>
              <v-row class="pt-4">
                <p class="pl-4">
                  <span class="text-h6">現在時刻：</span
                  >{{ computedLocaleTime }}
                </p>
              </v-row>
              <v-row>
                <p class="text-subtitle-2 mt-2 pl-4 pr-2">
                  ※日本語環境では24時間表記になりますが、アメリカでは12時間表記が一般的なのでアメリカ英語ロケールでは12時間表記になります
                </p>
              </v-row>
              <v-row class="pt-6">
                <v-col>
                  <v-expansion-panels>
                    <v-expansion-panel title="コード" static elevation="0">
                      <v-expansion-panel-text>
                        <highlightjs
                          lang="javascript"
                          code='/**
 * ロケールに合わせて時刻表示を調整します
 * @param date
 * @returns {string}
 */
const adjustHourDisplay = (date) => {
  const locale = navigator.language; // ユーザーの言語ロケールを取得
  return date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
'
                        >
                        </highlightjs>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.max-width {
  max-width: 600px;
}
</style>
