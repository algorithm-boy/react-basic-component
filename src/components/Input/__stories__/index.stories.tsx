import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../index';
import InputReadMe from '../README.md';
import './index.scss';

class InputValue extends React.PureComponent<any> {
  state = {
    val: 'I am value'
  }

  render () {
    const { maxLength, type } = this.props;
    const { val } = this.state;
    return <Input type={type} value={val} maxLength={maxLength} onChange={(e, val) => {
      this.setState({ val });
    }}/>
  }
}

storiesOf('Input', module)
  .addParameters({
    readme: {
      sidebar: InputReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => <Input />)
  .add('with password', () => <InputValue type='password' />)
  .add('autoFocus', () => <Input autoFocus />)
  .add('focus when 2 seconds later, then wait same time it will be blur', () => <Input autoFocus={handleFocus => {
    setTimeout(() => {
      handleFocus(true);
      setTimeout(() => {
        handleFocus(false);
      }, 2000);
    }, 2000);
  }} />)
  .add('defaultValue', () => <Input defaultValue='I am defaultValue' />)
  .add('value', () => <InputValue />)
  .add('value + maxLength 15', () => <InputValue maxLength={15} />)
  .add('maxLength 5', () => <Input maxLength={5} placeholder='maxLength 5' />)
  .add('with some custom style-1', () => <Input prefixCls='rc-input'  placeholder='with some custom style' />)
  .add('with some custom style-2', () => <Input prefixCls='hp-m-input' placeholder='请输入内容' />)
  .add('cannot copy', () => <Input copyFree={false} />)
  .add('cannot paste', () => <Input pasteFree={false} />)
  .add('cannot cut', () => <Input cutFree={false} />)
  .add('forbidden clipboard', () => <Input clipboardFree={false} />);