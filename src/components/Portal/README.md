# Portal(传送门)

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Portal的类名 (The class property for Portal) | string | - |
| style(optional) | Portal的行内样式 (The inline style for Portal) | object | {} |
| selector(optional) | 将Portal传送至某个DOM的选择器，基于 `querySelector` API实现 (The DOM selector that Portal will Transfer to which based on `querySelector` API) | string | 'body' |
| visible(optional) | Portal是否显示的开关 (The switch for whether or not display Portal) | boolean | - |
| render(optional) | RenderProps，返回需要渲染的React组件，优先级高于children (RenderProps, which returns the rendered React Component with priority over children) | () => React.ReactNode | - |
| onMount(optional) | 挂载完毕的回调函数 (The callback when mount) | () => any | - |
| onUnmount(optional) | 卸载的回调函数 (The callback when unmount) | () => any | - |

## Example

```javascript
<Portal
  visbale
>
  Message
</Portal>
```

