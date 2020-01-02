# Select

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| className(optional) | Select的类名 (The class property for Select) | string |  |
| triggerCls(optional) | select头部触发器的类名 (The class property for Trigger) | string |  |
| triggerSpanCls(optional) | trigger上已选文字类名 (The class property for TriggerSpan) | string |  |
| popupCls(optional) | 弹出菜单的类名 (The class property for Popup) | string |  |
| searchCls(optional) | 搜索选项option的类名 (The class property for searchCls) | string |  |
| resetCls(optional) | 重置选项option的类名 (The class property for resetCls) | string |  |
| containerStyle(optional) | select container的style(The style  for container) | object |  |
| popupStyle(optional) | 弹出菜单的样式 (The style  for Popup) | object |  |
| optionStyle(optional) | 弹出菜单中选项的样式 (The style  for Popup) | object |  |
| triggerStyle(optional) | trigger的样式 (The style for trigger) | object |  |
| triggerSpanStyle(optional) | trigger内span(已选择项)的样式 (The style for triggerSpan) | object |  |
| multiple(optional) | 是否多选 | boolean | false |
| defaultValue(optional) | 指定默认选中的条目	| string / array | ''/[]
| disabled(optional) | 是否禁用	| boolean | false
| showSearch(optional) | 是否展示筛选框	| boolean | false
| resetOption(optional) | 是否显示重置按钮	| boolean | false
| resetText(optional) | 重置文案	| string | ...
| autoWidth(optional) | 选项是否自适应宽度	| boolean | true
| prefixCls(optional) | 类名前缀	| string | hupu
| searchPlaceholder(optional) | 搜索框的搜索文案提示	| string | ''
| placeholder(optional) | 选择框的文案提示	| string | ''
| onChange(optional) | 选择改变的回调	| function(value/Array<value>, option:Option/Array<Option>) | -'
| onSearch(optional) | 文本框值变化时回调		| function(value: string) | -
| onDelete(optional) | 删除多选标签时回调		|function(value/Array<value>, option:Option/Array<Option>) | -
| onSelect(optional) | 选择选项时的回调		|function(value/Array<value>, option:Option/Array<Option>) | -
| onBlur(optional) | 搜索框失去焦点时回调			| function | -
| onFocus(optional) | 搜索框获得焦点时回调			| function | -


# Option

## API

| 参数(props) | 说明(specification) | 类型(type) | 默认值(defaultProps) |
| --- | --- | --- | --- |
| disabled | 是否禁用	| boolean	 | false |
| className(optional) | Option的类名  string | hfdc |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置| string	 | - |
| value | 默认根据此属性值进行筛选	  | string	 | - |
| extra | option多余的属性  | string or object	 | - |




## 基本用法

```
      <Select
          className={'classname'}
          triggerCls={'trigger'}
          triggerSpanCls={'span'}
          popupCls='menu'
        
          multiple
          showSearch
          searchCls='SEARCH'
          onSearch={(val) => {
            console.log(val);
          }}
      >
        <Option value="jack" key={'3'} className={'jack'}>
          jack
        </Option>
        <Option value="aimer" key={'2'}>
          aimer
        </Option>
        <Option value="a" key={'1'}>
          lucky
        </Option>
      </Select>
```

## 多选 异步 搜索

```

import React from 'react';
import Select, {Option} from '../index';

import {fetch} from './fetch';

const Input = props => <input {...props} />;

class Test extends React.Component {
	state = {
		data: [],
		value: '',
	};
	
	fetchData = value => {
		this.setState({
			value,
		});
		fetch(value, data => {
			this.setState({
				data,
			});
		});
	};

	render() {
		const {data, value} = this.state;
		const options = data.map(d => {
			return <Option key={d.value} value={d.text}>{d.text}</Option>;
		});
		return (
			<div>
				<div>
					<Select
						style={{width: 500}}
						value={value}
						showSearch
						multiple
						resetOption
						resetText='清空所有选项'
						placeholder="placeholder"
						searchPlaceholder='请搜索'
						onSearch={this.fetchData}
						onFocus={() => console.log('focus')}
						onBlur={() => console.log('blur')}
						onChange={(v,p)=>{
							console.log('change', v, p);
						}}
						onDelete={(v,p)=>{
							console.log('onDelete', v, p);
						}}
						onSelect={(v,p)=>{
							console.log('onSelect', v, p);
						}}
					>
						{options}
					</Select>
				</div>
			</div>
		);
	}
}

export default Test;

```
