import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar, { CalendarChange } from '../index';

configure({ adapter: new Adapter() });

function CalendarRender(calendarChange: CalendarChange): React.ReactElement {
  class CalendarUI extends React.Component {
    state = {
      years: Array(61).fill(0).map((v, i) => i + 1970),
      months: Array(12).fill(0).map((v, i) => i + 1),
      days: [],
      hours: Array(24).fill(0).map((v, i) => i),
      minutes: Array(60).fill(0).map((v, i) => i),
      seconds: Array(60).fill(0).map((v, i) => i),
      value: new Date(2019, 10, 15),
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

describe('Calendar', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Calendar 
        render={CalendarRender} />
    );
    expect(wrapper.html()).toMatchSnapshot(); // 普通的render生成文件很大
  });
});
