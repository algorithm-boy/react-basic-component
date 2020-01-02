# Popconfirm

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Popconfirm的类名 (The class property for Popconfirm) | string | hfdc-popconfirm |
| style(optional) | Popconfirm的行内样式 (The inline style for Popconfirm) | object | {} |
| content | 浮层内提示语 | string | '确定执行此操作吗?' |
| confirmTxt | 确认按钮文字 | string | 确认 |
| cancelTxt | 取消按钮文字 | string | 取消 |
| onConfirm | 点击确认按钮触发的回调函数 | function | - |
| onCancel | 点击取消按钮触发的回调函数 | function | - |

## Example

```javascript
<Popconfirm
  className={'hfdc-Popconfirm'}
  style={{
    width: '360px'
  }}
>
  {...your code}
</Popconfirm>
```

