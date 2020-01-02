# Steps

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| current(required) | Steps的当前状态（Current status of Steps） | number | - |
| direction(optional) | Steps的方向 (Steps Direction) | string | '' |

## Example

```javascript
<Steps current={1} direction='horizontal'>
    <Step title="已完成" />
    <Step title="进行中" />
    <Step title="待运行" />
    <Step title="待运行" />
</Steps>
```

