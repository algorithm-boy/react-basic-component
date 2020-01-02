import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextArea from '../index';
import TextAreaReadMe from '../README.md';
import './index.scss';

class TextAreaValue extends React.PureComponent<any> {
  state = {
    val: 'I am value'
  }

  render () {
    const { maxLength } = this.props;
    const { val } = this.state;
    return <TextArea value={val} maxLength={maxLength} onChange={(e, val) => {
      this.setState({ val });
    }}/>
  }
}

storiesOf('TextArea', module)
  .addParameters({
    readme: {
      sidebar: TextAreaReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('basic', () => <TextArea />)
  .add('autoFocus', () => <TextArea minRows={3} autoFocus />)
  .add('focus when 2 seconds later, then wait same time it will be blur', () => <TextArea minRows={3} autoFocus={handleFocus => {
    setTimeout(() => {
      handleFocus(true);
      setTimeout(() => {
        handleFocus(false);
      }, 2000);
    }, 2000);
  }} />)
  .add('more than one', () => <div>
      <TextArea />
      <br />
      <br />
      <br />
      <TextArea maxRows={2} />
    </div>
  )
  .add('draggable', () => <TextArea draggable defaultValue='I am draggable textarea' />)
  .add('defaultValue', () => <TextArea defaultValue='I am defaultValue' />)
  .add('value', () => <TextAreaValue />)
  .add('value + maxLength 15', () => <TextAreaValue maxLength={15} />)
  .add('maxLength 5', () => <TextArea maxLength={5} placeholder='maxLength 5' />)
  .add('minRows 3', () => <TextArea minRows={3} placeholder='minRows 3' />)
  .add('minRows 2 & maxRows 3', () => <TextArea minRows={2} maxRows={3} placeholder='minRows 2 & maxRows 3' />)
  .add('autoHeight false', () => <TextArea autoHeight={false} placeholder='autoHeight false' />)
  .add('with some custom style-1', () => <TextArea prefixCls='rc-textarea' maxRows={3} placeholder='with some custom style' />)
  .add('with some custom style-2', () => <TextArea prefixCls='hp-m-textarea' maxRows={5} placeholder='请输入内容' />)
  .add('cannot copy', () => <TextArea copyFree={false} />)
  .add('cannot paste', () => <TextArea pasteFree={false} />)
  .add('cannot cut', () => <TextArea cutFree={false} />)
  .add('forbidden clipboard', () => <TextArea clipboardFree={false} />);
