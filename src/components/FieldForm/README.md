# Form

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| store(object) | new FormStore(values,rules) 对象, values默认值,rules各字段对应的校验 | object |  |
| labelWidth(number) | label的宽度 | number |  |
| gutter(number) | label距离右侧表单内容的距离（margin） | number |  |
| compact(boolean) |是否为紧凑型 | boolean |  |
| inline(boolean) | 是否表单以行排列 | boolean |  |
| errorClassName(string) | 校验错误自定定义classname | boolean |  |


# Form.Field

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| label(string) | label名称 | string |  |
| name(string) | 字段名称 | string |  |
| labelWidth(number) | label的宽度 | number |  |
| gutter(number) | label距离右侧表单内容的距离（margin） | number |  |
| compact(boolean) |是否为紧凑型 | boolean |  |
| inline(boolean) | 是否表单以行排列 | boolean |  |
| errorClassName(string) | 校验错误自定定义classname | boolean |  |

# Store



## Store.subscribe(listener)
| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| listener(function) | (name)=>{} ,name当前form的字段  | Function |  |


## Store.validate([name])
```
store.validate([name]]),返回promise,res=>[errors,value]
```
| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| name | 要验证表单的字段，不填则全部验证 | string |  |

## Store.get([name])
```
store.get([name])
```
| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| name | 要获取表单的字段，不填则全部获取 | string |  |


## Store.reset()

## 基本用法

```
         <Form
           store={store}
           inline={boolean('Inline', false)}
           required={boolean('Required', true)}
           labelWidth={number('Label Width', 120)}
         >
           <Form.Field label='Username' name='username'
                       required={boolean('Required', true)}
           >
             <input type='text'/>
           </Form.Field>
   
           <Form.Field label='Password' name='password'>
             <input type='password'/>
           </Form.Field>
   
           <Form.Field label='Gender' name='gender'>
             <Select
               autoWidth
               placeholder="please select"
               onChange={(value: any, option: any) => {
                 console.log('onchange', value, option)
               }}
               defaultValue={store.get('gender') + ''}
             >
               <Option value="male" key={'3'}>
                 male
               </Option>
               <Option value="female" key={'2'}>
                 female
               </Option>
             </Select>
           </Form.Field>
   
           <Form.Field label='Phone' name='contact.phone'>
             <input type='text'/>
           </Form.Field>
   
           <Form.Field label='Address' name='contact.address'>
             <input type='text'/>
           </Form.Field>
   
           <Form.Field label=''>
             <button onClick={onReset}>Reset</button>
             <button onClick={onSubmit}>Submit</button>
           </Form.Field>
         </Form>
```

## with hook 

```
 function HookForm() {
      const store = useFormStore(
        {
          username: 'Default',
          password: '',
          gender: 'male',
          contact: {
            phone: '',
            address: ''
          }
        },
        {
          username: (val) => !!val.trim() || 'Name is required',
          password: (val) => !!val.trim() || 'Password is required',
          'contact.phone': (val) => /[0-9]{11}/.test(val) || 'Phone is invalid',
          'contact.address': (val) => !!val.trim() || 'Address is required'
        }
      )

      useFormChange(store, (name: string) => {
        console.log('change', name, store.get(name))
      })

      const onReset = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        store.reset()
      }, [])

      const onSubmit = React.useCallback(async (e: React.MouseEvent) => {
        e.preventDefault()

        const [error, values] = await store.validate()
        console.log(error, values)
      }, [])

      return (
        <Form
          store={store}
          inline={boolean('Inline', false)}
          compact={boolean('Compact', false)}
          required={boolean('Required', false)}
        >
          <Form.Field label='Username' name='username'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label='Password' name='password'>
            <input type='password'/>
          </Form.Field>
          <Form.Field label='Gender' name='gender'>
            <select>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </Form.Field>
          <Form.Field label='Phone' name='contact.phone'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label='Address' name='contact.address'>
            <input type='text'/>
          </Form.Field>
          <Form.Field label=''>
            <button onClick={onReset}>Reset</button>
            <button onClick={onSubmit}>Submit</button>
          </Form.Field>
        </Form>
      )
    }
    return <HookForm/>
```
