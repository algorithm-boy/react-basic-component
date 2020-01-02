import React, { SFC, ReactElement, Fragment } from 'react';
import { GeneralProps } from '../global.d';
import {
  prevYear,
  prevMonth,
  yesterDay,
  prevHours,
  prevMinutes,
  prevSeconds,
  today,
  nextSeconds,
  nextMinutes,
  nextHours,
  tomorrow,
  nextMonth,
  nextYear,
  DateRange,
  getDays,
  setDate,
} from './date';

export interface CalendarProps extends GeneralProps {
  render: (calendarChange: CalendarChange) => ReactElement;
  startWeekDay?: number;
  rangeCount?: number;
};

export interface CalendarChange {
  prevYear: (date: Date) => Date;
  prevMonth: (date: Date) => Date;
  yesterDay: (date: Date) => Date;
  prevHours: (date: Date) => Date;
  prevMinutes: (date: Date) => Date;
  prevSeconds: (date: Date) => Date;
  today: (date: Date) => Date;
  nextSeconds: (date: Date) => Date;
  nextMinutes: (date: Date) => Date;
  nextHours: (date: Date) => Date;
  tomorrow: (date: Date) => Date;
  nextMonth: (date: Date) => Date;
  nextYear: (date: Date) => Date;
  getDays: (date: Date) => DateRange;
  setDate: (date: Date, n: number, identifier: string) => Date;
}

const Calendar: SFC<CalendarProps> = props => {
  const { render, startWeekDay = 0, rangeCount = 42 } = props;
  const calendarChange = {
    prevYear,
    prevMonth, 
    yesterDay, 
    prevHours, 
    prevMinutes, 
    prevSeconds, 
    today,
    nextSeconds, 
    nextMinutes, 
    nextHours,
    tomorrow,
    nextMonth,
    nextYear,
    setDate,
    getDays: date => getDays(date, startWeekDay, rangeCount),
  } as CalendarChange;
  return render(calendarChange);
};

export default Calendar;
