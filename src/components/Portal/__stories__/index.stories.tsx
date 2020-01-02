import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Portal from '../index';
import PortalReadMe from '../README.md';

const Basic: React.SFC<any> = props => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <button onClick={() => setVisible(!visible)}>开关</button>
      <Portal visible={visible}>Hello Portal</Portal>
    </>
  )
}

const Message: React.SFC<any> = props => {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <button onClick={() => setVisible(!visible)}>点击出现Message弹窗</button>
      <Portal visible={visible}>
        <div className='portal'>
          <p>Message内容1...</p>
          <p>Message内容2...</p>
          <p>Message内容3...</p>
        </div>
      </Portal>
      <style>
        {`
          .portal {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            heitht: 300px;
            background-color: #eee;
            border-radius: 4px;
          }
        `}
      </style>
    </>
  )
}

storiesOf('Portal', module)
  .addParameters({
    readme: {
      sidebar: PortalReadMe,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('Basic', () => <Basic />)
  .add('Message', () => <Message />);
