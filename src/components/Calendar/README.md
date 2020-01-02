# Calendar

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| render | calendar的ui渲染函数 | CalendarChange => React.Element | 必须 |
| startWeekDay | calendar 的起始星期 | number | 0 |
| rangeCount | calendar 的渲染个数 | number | 42 |

## Example

```javascript
<Calendar render={calendarChange => <CalendarUI {...calendarChange} />} />
```

