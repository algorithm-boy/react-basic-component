# TextArea

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | TextArea的类名 (The class property for TextArea) | string | - |
| style(optional) | TextArea的行内样式 (The inline style for TextArea) | object | {} |
| id(optional) | ID (The ID for textarea) | string | - |
| prefixCls(optional) | 类名前缀 (The prefix of class) | string | 'hfdc-textarea' |
| placeholder(optional) | 占位符 (The placeholder) | string | - |
| value(optional) | 文本域的值 (The textarea content value) | string | - |
| defaultValue(optional) | 文本域的初始值，优先级低于 `value` (The initial textarea content value, priority is lower than `value`) | string | - |
| minRows(optional) | 最小行数 (The minimum of row) | number | 1 |
| maxRows(optional) | 最小行数 (The maximum of row) | number | 6 |
| maxLength(optional) | 文本长度限制 (The max limit of content length) | number | Infinity |
| autoHeight(optional) | 自动改变高度 (auto change height) | boolean | true |
| draggable(optional) | 是否可拖动 (The textarea whether or not can be drag) | boolean | false |
| onChange(optional) | 文本域发生变化时的回调 (Trigger when textarea content changed) | Function(e: React.ChangeEvent<HTMLTextAreaElement>, value: string) | - |
| onFocus(optional) | 聚焦的回调 (Trigger when focus) | Function(e: React.ChangeEvent<HTMLTextAreaElement>) | - |
| onBlur(optional) | 失焦的回调 (Trigger when blur) | Function(e: React.ChangeEvent<HTMLTextAreaElement>) | - |
| onRise(optional) | 移动端检测到软键盘弹起时的回调 (The prefix of class) | Function({ isIOS, isAndroid }) | - |
| onFold(optional) | 移动端检测到软键盘收回时的回调 (The prefix of class) | Function({ isIOS, isAndroid }) | - |

## Example

```javascript
<TextArea
  style={{
    width: '360px'
  }}
  className={'hfdc-TextArea'}
  minRows={2}
  maxRows={3}
  placeholder='I am placeholder'
/>
```

## Tips
和 `height` 相关的css属性请勿设置，若需要调整文本域的初始高度，可以使用 `minRows` 属性，或者 `font-size`、`line-height`、`padding` 等css属性。