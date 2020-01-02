# Tooltip

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Tooltip的类名 (The class property for Tooltip) | string | - |
| style(optional) | Tooltip的行内样式 (The inline style for Tooltip) | object | {} |
| title(optional) | Tooltip的提示文字 (The tip for Tooltip) | string | - |
| defaultVisible(optional) | 默认是否显隐 (Whether it is hidden by default) | boolean | false |
| placement(optional) | 气泡框位置(top/left/bottom/right) (Bubble frame position) | string | top |
| trigger(optional) | 触发行为(hover/focus/click) (Triggered behavior) | string | hover |
| visible(optional) | 用于手动控制浮层显隐 (For manual control of floating layer display) | boolean | false |
| onVisibleChange(optional) | 显示隐藏的回调 (Show hidden callbacks) | function | (visible) => void |

## Example

```javascript
<Tooltip
  className={'hfdc-Tooltip'}
  style={{
    width: '360px'
  }}
/>
```

