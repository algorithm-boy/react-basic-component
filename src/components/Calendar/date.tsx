export interface DateRange {
  current: Date;
  range: Date[];
}

export function prevYear(date: Date): Date {
  return new Date(new Date(date).setFullYear(date.getFullYear() - 1));
}

export function prevMonth(date: Date): Date {
  return new Date(new Date(date).setMonth(date.getMonth() - 1));
}

export function yesterDay(date: Date): Date {
  return new Date(new Date(date).setDate(date.getDate() - 1));
}

export function prevHours(date: Date): Date {
  return new Date(new Date(date).setHours(date.getHours() - 1));
}

export function prevMinutes(date: Date): Date {
  return new Date(new Date(date).setMinutes(date.getMinutes() - 1));
}

export function prevSeconds(date: Date): Date {
  return new Date(new Date(date).setSeconds(date.getSeconds() - 1));
}

export function today(date: Date): Date {
  const current = new Date();
  return new Date(current.getFullYear(), current.getMonth(), current.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
}

export function nextSeconds(date: Date): Date {
  return new Date(new Date(date).setSeconds(date.getSeconds() + 1));
}

export function nextMinutes(date: Date): Date {
  return new Date(new Date(date).setMinutes(date.getMinutes() + 1));
}

export function nextHours(date: Date): Date {
  return new Date(new Date(date).setHours(date.getHours() + 1));
}

export function tomorrow(date: Date): Date {
  return new Date(new Date(date).setDate(date.getDate() + 1));
}

export function nextMonth(date: Date): Date {
  return new Date(new Date(date).setMonth(date.getMonth() + 1));
}

export function nextYear(date: Date): Date {
  return new Date(new Date(date).setFullYear(date.getFullYear() + 1));
}

export function setDate(date: Date, n: number, identifier = 'date') {
  switch(identifier) {
    case 'year': return new Date(new Date(date).setFullYear(n));
    case 'month': return new Date(new Date(date).setMonth(n));
    case 'day': return new Date(new Date(date).setDate(n));
    case 'hour': return new Date(new Date(date).setHours(n));
    case 'minute': return new Date(new Date(date).setMinutes(n));
    case 'second': return new Date(new Date(date).setSeconds(n));
    default: return date;
  } 
}

function isLeapYear(year: number): boolean {
  return !(year % (year % 100 ? 4 : 400));
}

function getMonthDays(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  if (isLeapYear(year) && month === 1) {
    return 29;
  } else if (month === 1) {
    return 28;
  } else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
    return 31;
  }
  return 30;
}

function getDate(date: Date, day: number): Date {
  return new Date(new Date(date).setDate(day));
}

export function getDays(date: Date, startWeekDay: number, rangeCount: number): DateRange {
  const day = date.getDate();
  const monthDays = getMonthDays(date);
  const leaveRangeCount = rangeCount - 1;
  let leftRangeCount = 0;
  let rightRangeCount = 0;
  const leftRange: Date[] = [];
  const rightRange: Date[] = [];

  if(leaveRangeCount === 0 || rangeCount > 42) {
    return {
      current: date,
      range: [date],
    };
  }

  if(rangeCount >= monthDays) {
    const weekday = date.getDay();
    for(let i = 0; i < rangeCount; i ++) {
      leftRange.push(getDate(date, i + 1));
    }
  }else {
    if(leaveRangeCount % 2 === 0) {
      rightRangeCount = leftRangeCount = leaveRangeCount / 2;
    }else {
      leftRangeCount = (leaveRangeCount - 1) / 2;
      rightRangeCount = (leaveRangeCount + 1) / 2;
    }
  
    for(let i = 0; i < leftRangeCount; i ++) {
      leftRange.unshift(getDate( date, day - i - 1 ));
    }
  
    for(let i = 0; i < rightRangeCount; i ++) {
      rightRange.push(getDate( date, day + i + 1 ));
    }
  }

  let range = rangeCount >= monthDays ? leftRange :  [...leftRange, date, ...rightRange];
  
  const weekday = range[0].getDay();
  let dayCount = 0;

  if(weekday > startWeekDay) {
    dayCount = weekday - startWeekDay;
  }

  if(weekday < startWeekDay) {
    dayCount = (weekday || 7) - startWeekDay;
  }

  if(rangeCount >= 14) {
    if(dayCount == 0) {
      dayCount = 7;
    }
    const firstDate = range[0];
    const day = firstDate.getDate();
    const lastRanges = range.slice(-dayCount).map(x => x.valueOf());
    const supplier = [];
    for(let i = 0; i < dayCount; i ++) {
      supplier.unshift(getDate(firstDate, day - i - 1));
    }

    range = [...supplier, ...range].slice(0, rangeCount);
    if(lastRanges.includes(date.valueOf())) {
      range = range.slice(7);
      const lastDate = range[range.length - 1];
      const lastDay = lastDate.getDate();
      for(let i = 1; i <= 7; i ++) {
        range.push(getDate(lastDate, lastDay + i));
      }
    }
  }

  return {
    current: date,
    range,
  };
}
