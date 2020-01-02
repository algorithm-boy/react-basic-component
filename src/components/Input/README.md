# Input

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Input的类名 (The class property for Input) | string | - |
| style(optional) | Input的行内样式 (The inline style for Input) | object | {} |
| type(optional) | Input的type属性 (The type property for input) | string | text |
| id(optional) | ID (The ID for input) | string | - |
| prefixCls(optional) | 类名前缀 (The prefix of class) | string | 'hfdc-input' |
| placeholder(optional) | 占位符 (The placeholder) | string | - |
| value(optional) | 文本域的值 (The input content value) | string | - |
| defaultValue(optional) | 文本域的初始值，优先级低于 `value` (The initial input content value, priority is lower than `value`) | string | - |
| maxLength(optional) | 文本长度限制 (The max limit of content length) | number | Infinity |
| clipboardFree(optional) | 是否启用剪贴板 (The input whether or not enable clipboard) | boolean | true |
| copyFree(optional) | 是否启用复制 (The input whether or not enable copy) | boolean | true |
| pasteFree(optional) | 是否启用粘贴 (The input whether or not enable paste) | boolean | true |
| cutFree(optional) | 是否启用剪切 (The input whether or not enable cut) | boolean | true |
| onChange(optional) | 文本域发生变化时的回调 (Trigger when input content changed) | Function(e: React.ChangeEvent, value: string) | - |
| onFocus(optional) | 聚焦的回调 (Trigger when focus) | Function(e: React.ChangeEvent) | - |
| onBlur(optional) | 失焦的回调 (Trigger when blur) | Function(e: React.ChangeEvent) | - |
| onKeyDown(optional) | 按键的回调 (Trigger when keydown) | Function(e: React.KeyboardEvent) | - |
| onPressEnter(optional) | 按回车键的回调 (Trigger when Enter press down) | Function(e: React.KeyboardEvent) | - |
| onPaste(optional) | 粘贴的回调 (Trigger when paste) | Function(e: React.MouseEvent \| React.ClipboardEvent) | - |
| onContextMenu(optional) | 打开上下文菜单的回调 (Trigger when open the ContextMenu) | Function(e: React.MouseEvent \| React.ClipboardEvent) | - |
| onCopy(optional) | 复制的回调 (Trigger when copy) | Function(e: React.MouseEvent \| React.ClipboardEvent) | - |
| onCut(optional) | 剪切的回调 (Trigger when cut) | Function(e: React.MouseEvent \| React.ClipboardEvent) | - |
| onRise(optional) | 移动端检测到软键盘弹起时的回调 (The prefix of class) | Function({ isIOS, isAndroid }) | - |
| onFold(optional) | 移动端检测到软键盘收回时的回调 (The prefix of class) | Function({ isIOS, isAndroid }) | - |
| autoFocus(optional) | 自动聚焦，可以是布尔值，也可传递函数接受参数，而后手动控制聚焦和失焦 (Automatic focus, the value could be a function which will receive the callback that can be control focus or blur by yourself) | boolean \| (handleFocus: (isFocus: boolean) => any) => any | false |

## Example

```javascript
<Input
  type='password'
  className={'hfdc-Input'}
  style={{
    width: '200px'
  }}
  value={val}
  onChange={(e, val) => {
    this.setState({ val });
  }}
  placeholder='I am placeholder'
  autoFocus={handleFocus => {
    if (condition) {
      // focus
      handleFocus(true);
      // blur
      setTimeout(() => handleFocus(false), 2000);
    }
  }}
/>
```

## Tips
使用 `type='password'` 时，为了避免安全问题和React的警告，建议是将组件设置为受控组件，即手动设置 `value` 的值，可参考👆上面的代码片段。
