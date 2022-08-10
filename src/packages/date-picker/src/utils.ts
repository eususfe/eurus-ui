import { dayjs } from '@/packages/_utils/date';

export function getCurrentMonthCount(month: string) {

  return dayjs(month).daysInMonth();
}

export function getFirstMonthDayWeek(month: string) {
  return dayjs(month).day();
}

export interface datePickerItem {
  value: number;
  disbled: boolean;
  date: string;
  active?: boolean;
  index: number;
  dot: boolean;
  hover: boolean;
}

export function genarateDayData([year, month]: number[], disabled: Function): datePickerItem[][] {
  const listMonth = `${year}-${month - 1}-1`;
  const currentMonth = `${year}-${month}-1`;
  // 获取上月天数
  let lastMonthCount = getCurrentMonthCount(listMonth);
  // 获取当月天数
  const currentMonthCount = getCurrentMonthCount(currentMonth);
  // 获取当月1号星期几
  const currentMonthFirstDayWeek = getFirstMonthDayWeek(currentMonth);

  const dayList = [];
  let lastMonthPointer = 1;
  let currentMonthPointer = 1;
  let nextMonthPointer = 1;
  // 根据日期组件的天数布局，共计42天，包含上月剩余天数+当月天数+下月初始天数
  for (let i = 0; i < 42; i++) {
    // 上个月需要渲染的td个数，以及对应的值
    if (lastMonthPointer < currentMonthFirstDayWeek) {
      // 上月
      dayList.unshift({
        value: lastMonthCount--,
        disbled: true,
        hover: false,
        dot: false,
        date: dayjs(year + '-' + (month - 1) + '-' + (lastMonthCount + 1)).format('YYYY-MM-DD'),
        index: i,
      });
      lastMonthPointer++;
    } else if (currentMonthPointer <= currentMonthCount) {
      // 当月
      const date = dayjs(year + '-' + month + '-' + (currentMonthPointer)).format('YYYY-MM-DD');

      dayList.push({
        value: currentMonthPointer++,
        disbled: !disabled(date),
        active: false,
        date,
        dot:
        new Date().getFullYear() === year
        && new Date().getMonth() + 1 === month
        && currentMonthPointer - 1 === new Date().getDate(),
        hover: false,
        index: i,
      });
    } else {
      // 下月
      dayList.push({
        value: nextMonthPointer++,
        disbled: true,
        hover: false,
        dot: false,
        date: dayjs(year + '-' + (month + 1) + '-' + (nextMonthPointer - 1)).format('YYYY-MM-DD'),
        index: i,
      });
    }
  }

  const result = [];
  let index = 1;
  let i = 0;
  while (index <= 6) {
    const arr = [];
    for (let j = 0; j < 7; j++) {
      arr.push(dayList[i]);
      i++;
    }
    result.push(arr);
    index++;
  }
  return result;
}