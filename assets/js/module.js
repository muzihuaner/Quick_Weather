"use strict";
export const weekDayNames = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export const monthsNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

export const getDate = function (dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthsNames[date.getUTCMonth()];
  return `${weekDayName} ${date.getUTCDate()} ${monthName}`;
};

export const getTime = function (dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${period}`;
};

export const getHours = function (dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);
  const hours = date.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}${period}`;
};

export const mpsToKmh = (mps) => {
  const mph = mps * 3600;
  return mph / 1000;
};

export const aqiText = {
  1: {
    level: "良好",
    message:
      "空气质量令人满意，空气污染造成的风险很小或没有。",
  },
  2: {
    level: "中等",
    message:
      "空气质量合格；然而对于某些污染物，可能会对极少数对空气污染异常敏感的人产生影响。",
  },
  3: {
    level: "一般",
    message:
      "敏感群体的成员可能会受到健康影响，普通公众不太可能受到影响",
  },
  4: {
    level: "轻度污染",
    message:
      "每个人都可能开始经历健康影响；敏感群体的成员可能会遭受更严重的健康影响",
  },
  5: {
    level: "重度污染",
    message:
      "紧急情况，健康警告，全民更有可能受到影响",
  },
};
