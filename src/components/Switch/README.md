# Switch

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Switch的类名 (The class property for Switch) | string | - |
| style(optional) | Switch的行内样式 (The inline style for Switch) | object | {} |
| autoFocus(optional) | 自动聚焦 (Auto focus when componentDidMount) | boolean | - |
| prefixCls(optional) | 类名前缀 (The prefix of class) | string | 'hfdc-switch' |
| checked(optional) | 是否 `checked`，如果传入该值，则 `Switch` 组件为受控组件 (determine whether the `Switch` component is checked) | boolean | - |
| defaultChecked(optional) | `checked` 的初始值 (The `checked` inital state) | boolean | false |
| renderChecked(optional) | 状态是 `checked` 时展示的内容 (The content to be shown when the state is `checked`) | string \| ReactNode | - |
| renderUnChecked(optional) | 状态是 `unchecked` 时展示的内容 (The content to be shown when the state is `unchecked`) | string \| ReactNode | - |
| onChange(optional) | `checked` 状态更改时的回调 (Trigger when `checked` state changed) | Function(checked: boolean, event?: Event) | - |
| onClick(optional) | 点击的回调 (Trigger when clicked) | Function(checked: boolean, event: Event) | - |
| onMouseUp(optional) | 鼠标抬起时的回调 (Trigger when mouse up) | Function(checked: boolean, event: Event) | - |

## Example
```javascript
class SwitchDemo extends React.PureComponent<any, any> {
  constructor (props: any) {
    super(props);
    this.state = {
      checked: true
    }
  }
  render () {
    const { checked } = this.state;

    return <Switch
      renderChecked='开'
      renderUnChecked='关'
      prefixCls='diana-switch'
      checked={checked}
      onClick={(checked, e) => {
        console.log('triggle click', e)
        this.setState({ checked: !checked })
      }}
    />
  }
}
```