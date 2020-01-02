# Drag

## API
| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| onDragStart(optional) | 当drag开始时执行的钩子函数 (The executive function on drag start) | function |
| onDragMoving(optional) | 当drag移动时执行的钩子函数 (The executive function on drag moving) | function |
| onDragEnd(optional) |当drag结束时执行的钩子函数 (The executive function on drag end)| function |

## Tip
When you use prop onDragMoving,you'd better use debounce or throttle to 
optimize this function,because this is a constantly executive function.

## Example

```javascript
<Drag onDragStart={dragStart}
      onDragMoving={draging}
      onDragEnd={dragEnd}>
  <div className='dragable-box'>Drag Box</div>
</Drag>
```

