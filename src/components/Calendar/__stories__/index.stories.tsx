import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar, { CalendarChange } from '../index';
import CalendarReadMe from '../README.md';

interface SimplifyCalendarProps {
}

interface SimplifyCalendarState {
  value: Date
  range: Date[][]
}

function getRangedivide7(dates: Date[]): Date[][] {
  return dates.reduce((acc: Date[][], cur: Date): Date[][] => {

    const last = acc[acc.length - 1]
    if(last.length < 7) {
      last.push(cur)
      return acc
    }
    acc.push([cur])
    return acc
  }, [[]])
} 

function simplifyCalendarRender(calendarChange: CalendarChange): React.ReactElement {

  const weeks = ['日',  '一', '二', '三', '四', '五', '六'];
  class CalendarUI extends React.Component<SimplifyCalendarProps, SimplifyCalendarState> {

    constructor(props: any){
      super(props);
      const { getDays } = calendarChange;
      const date = new Date(2035, 3, 22);
      const { current, range } = getDays(date);
      const rangedivide7 = getRangedivide7(range);

      this.state = {
        value: current,
        range: rangedivide7,
      };
    }

    private selectDate = (date: Date): void => {
      const { getDays } = calendarChange;
      const { current, range } = getDays(date);
      const rangedivide7 = getRangedivide7(range);

      this.setState({
        value: current,
        range: rangedivide7,
      });
    }
    

    public render() {

      const { value, range } = this.state;

      const { selectDate } = this;

      return (
        <div className="simplify-calendar">
          <div className="header">{value.getFullYear()}年{value.getMonth() + 1}月</div>
          <div className="article">
            <table>
              <thead>
                <tr>
                  { weeks.map(week => (
                    <th key={week}><div className="week-simplify-cell">{ week }</div></th>
                  )) }
                </tr>
              </thead>
              <tbody>
                { range.map((days, index) => (
                  <tr key={index}>
                    { days.map(day => (
                      <td key={day.valueOf()}><div onClick={() => selectDate(day)} className={`day-simplify-cell ${day.valueOf() === value.valueOf() ? 'current-day-simplify-cell' : ''}`}>{ day.getDate() }</div></td>
                    )) }
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
          <div className="footer" onClick={() => selectDate(new Date())}>今天</div>
          <style>{`
            .simplify-calendar {
              width: 232px;
              height: 270px;
              box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px 0px;
              text-align: center;
              color: rgb(102, 102, 102);
              box-sizing: border-box;
              font-size: 12px;
              background: rgb(255, 255, 255);
              border-width: 1px;
              border-style: solid;
              border-color: rgb(217, 217, 217);
              border-image: initial;
              border-radius: 4px;
              padding: 0px 2px;
            }

            .simplify-calendar .header {
              width: 100%;
              height: 34px;
              line-height: 34px;
              font-size: 16px;
              border-bottom: 1px solid rgb(233, 233, 233);
            }

            .simplify-calendar .article .week-simplify-cell {
              display: inline-block;
              width: 20px;
              height: 20px;
              font-weight: normal;
              font-size: 14px;
              box-sizing: border-box;
            }

            .simplify-calendar .article .day-simplify-cell {
              display: inline-block;
              width: 20px;
              height: 20px;
              box-sizing: border-box;
              line-height: 20px;
              vertical-align: middle;
              font-size: 12px;
              font-family: HelveticaNeue;
              color: rgb(102, 102, 102);
              cursor: pointer;
              border-radius: 2px;
              margin: 2px 4px;
            }

            .simplify-calendar .article .day-simplify-cell:hover {
              color: rgb(255, 255, 255);
              background: rgb(26, 104, 255);
              border-radius: 2px;
            }

            .simplify-calendar .article .current-day-simplify-cell {
              display: inline-block;
              width: 20px;
              height: 20px;
              line-height: 20px;
              vertical-align: middle;
              font-size: 12px;
              font-family: HelveticaNeue;
              color: rgb(26, 104, 255);
              cursor: pointer;
              border-width: 1px;
              border-style: solid;
              border-color: rgb(26, 104, 255);
              border-image: initial;
              border-radius: 2px;
              margin: 2px 4px;
            }

            .simplify-calendar .footer {
              width: 100%;
              height: 38px;
              line-height: 38px;
              cursor: pointer;
              color: rgb(26, 104, 255);
              border-top: 1px solid rgb(233, 233, 158);
            }

            .day-cell{
              display: inline-block;
              width: 30px;
              height: 30px;
              cursor: pointer;
              text-align: center;
              line-height: 30px;
              border: 1px solid #f4f4f4;
              margin-left: -1px;
              margin-top: -1px;
              
            }
            .day-cell:nth-child(7n){
              margin-right: 0;
            }

            .hover-span {
              display: inline-block;
              margin-right: 8px;
              cursor: pointer;
              user-select: none;
              border: 1px solid #1EA7FD;
              padding: 4px 6px;
              border-radius: 8px;
              font-size: 12px;
            }

            .active-date {
              color: #1EA7FD;
            }

            .not-current-month {
              color: #96999f;
            }
          `}</style>
        </div>
      );
    }

  }


  return <CalendarUI />;
}

function refinedCalendarRender(calendarChange: CalendarChange): React.ReactElement {
  class CalendarUI extends React.Component {
    state = {
      years: Array(61).fill(0).map((v, i) => i + 1970),
      months: Array(12).fill(0).map((v, i) => i + 1),
      days: [],
      hours: Array(24).fill(0).map((v, i) => i),
      minutes: Array(60).fill(0).map((v, i) => i),
      seconds: Array(60).fill(0).map((v, i) => i),
      value: new Date(),
      range: [] as Date[],
    }

    public componentWillMount() {
      this.selectDate(this.state.value);
    }

    private prevMonth = () => {
      const { value } = this.state;
      const { prevMonth } = calendarChange;
      this.selectDate(prevMonth(value));
    }

    private nextMonth = () => {
      const { value } = this.state;
      const { nextMonth } = calendarChange;
      this.selectDate(nextMonth(value));
    }

    private prevYear = () => {
      const { value } = this.state;
      const { prevYear } = calendarChange;
      this.selectDate(prevYear(value));
    }

    private nextYear = () => {
      const { value } = this.state;
      const { nextYear } = calendarChange;
      this.selectDate(nextYear(value));
    }

    private prevHours = () => {
      const { value } = this.state;
      const { prevHours } = calendarChange;
      this.selectDate(prevHours(value));
    }

    private nextHours = () => {
      const { value } = this.state;
      const { nextHours } = calendarChange;
      this.selectDate(nextHours(value));
    }

    private selectDate = (date: Date) => {
      const { getDays } = calendarChange;
      const { current, range } = getDays(date);
      const daysCount = range.filter(date => date.getMonth() === current.getMonth()).length;
      this.setState({
        value: current,
        days: Array(daysCount).fill(0).map((v, i) => i + 1),
        range,
      });
    }

    private selectYear = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const year = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, year, 'year'));
    }

    private selectMonth = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const month = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, month - 1, 'month'));
    }

    private selectDay = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const day = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, day, 'day'));
    }

    private selectHour = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const hour = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, hour, 'hour'));
    }

    private selectMinute = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const minute = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, minute, 'minute'));
    }

    private selectSecond = (event: React.FormEvent<HTMLSelectElement>) => {
      const { value } = this.state;
      const second = +event.currentTarget.value;
      const { setDate } = calendarChange;
      this.selectDate(setDate(value, second, 'second'));
    }

    public render() {
      const { 
        value, 
        range,
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      } = this.state;
      const { 
        prevMonth, 
        nextMonth,
        prevYear,
        nextYear,
        prevHours,
        nextHours,
        selectDate,
        selectYear,
        selectMonth,
        selectDay,
        selectHour,
        selectMinute,
        selectSecond,
      } = this;
      return <div>
        <header className="select-header">
          <span>你当前正在选择的日期是: </span>
          <select onChange={selectYear} value={value.getFullYear()}>{ years.map(year => <option value={year} key={year}>{year}</option>) }</select>
          <span> 年 </span>
          <select onChange={selectMonth} value={value.getMonth() + 1}>{ months.map(month => <option value={month} key={month}>{month}</option>) }</select>
          <span> 月 </span>
          <select onChange={selectDay} value={value.getDate()}>{ days.map(day => <option value={day} key={day}>{day}</option>) }</select>
          <span> 日 </span>
          <select onChange={selectHour} value={value.getHours()}>{ hours.map(hour => <option value={hour} key={hour}>{hour}</option>) }</select>
          <span> 时 </span>
          <select onChange={selectMinute} value={value.getMinutes()}>{ minutes.map(minute => <option value={minute} key={minute}>{minute}</option>) }</select>
          <span> 分 </span>
          <select onChange={selectSecond} value={value.getSeconds()}>{ seconds.map(second => <option value={second} key={second}>{second}</option>) }</select>
          <span> 秒 </span>
        </header>
        <article className="date-container">
          {range.map((day, index) => (
            <React.Fragment
              key={ day.valueOf() } 
            >
              <span 
                onClick={() => selectDate(day)} 
                className={`day-cell ${day.valueOf() === value.valueOf() ? 'active-date' : ''} ${day.getMonth() !== value.getMonth() ? 'not-current-month' : ''}`}>{day.getDate().toString().padStart(2, '0')}</span>
              {(index + 1) % 7 == 0 ? <br /> : ''}
            </React.Fragment>
          ))}
        </article>
        <footer>
          <span className="hover-span" onClick={prevMonth}>上月</span>
          <span className="hover-span" onClick={nextMonth}>下月</span>
          <span className="hover-span" onClick={prevYear}>上一年</span>
          <span className="hover-span" onClick={nextYear}>下一年</span>
          <span className="hover-span" onClick={prevHours}>上一小时</span>
          <span className="hover-span" onClick={nextHours}>下一小时</span>
        </footer>
        <style>{`
        .date-container {
          margin: 16px;
        }

        .day-cell{
          display: inline-block;
          width: 30px;
          height: 30px;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
          border: 1px solid #f4f4f4;
          margin-left: -1px;
          margin-top: -1px;
          
        }
        .day-cell:nth-child(7n){
          margin-right: 0;
        }

        .hover-span {
          display: inline-block;
          margin-right: 8px;
          cursor: pointer;
          user-select: none;
          border: 1px solid #1EA7FD;
          padding: 4px 6px;
          border-radius: 8px;
          font-size: 12px;
        }

        .active-date {
          color: #1EA7FD;
        }

        .not-current-month {
          color: #96999f;
        }
      `}</style>
      </div>
    }
  }

  return <CalendarUI />;
}

storiesOf('Calendar', module)
  .addParameters({
    readme: {
      sidebar: CalendarReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('simplify', () => <Calendar
     render={simplifyCalendarRender} />)
  .add('refined', () => <Calendar 
     render={refinedCalendarRender} />)
